import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Enrollment } from "../models/enrollment.model.js";
import { EnrollmentApplication } from "../models/enrollmentApplication.model.js";
import { User } from "../models/user.model.js";
import { normalizeEmail } from "../utils/email.js";

export const hasActiveEnrollment = async (userId, userEmail, courseId) => {
  if (!courseId) return false;

  const queryOr = [];
  if (userId) {
    queryOr.push({ userId });
  }
  const normalized = normalizeEmail(userEmail);
  if (normalized) {
    queryOr.push({ studentEmail: normalized });
  }

  if (queryOr.length > 0) {
    const activeEnrollment = await Enrollment.findOne({
      courseId,
      status: "active",
      $or: queryOr,
    });
    if (activeEnrollment) return true;
  }

  // Check legacy CoursePurchase for backward compatibility
  if (userId) {
    const legacyPurchase = await CoursePurchase.findOne({
      userId,
      courseId,
      status: "completed",
    });
    if (legacyPurchase) return true;
  }

  return false;
};

export const getStudentCourseStatus = async (userId, userEmail, courseId) => {
  const isEnrolled = await hasActiveEnrollment(userId, userEmail, courseId);
  if (isEnrolled) return "active";

  const normalized = normalizeEmail(userEmail);
  if (normalized) {
    const pendingApp = await EnrollmentApplication.findOne({
      email: normalized,
      courseId,
      status: "pending",
    });
    if (pendingApp) return "pending";

    const rejectedApp = await EnrollmentApplication.findOne({
      email: normalized,
      courseId,
      status: "rejected",
    });
    if (rejectedApp) return "rejected";
  }

  return "none";
};

export const createApplication = async ({
  studentName,
  email,
  phone = "",
  courseId,
  educationBackground = "",
  reason = "",
}) => {
  const normalized = normalizeEmail(email);
  if (!normalized) {
    throw new Error("Invalid or missing email address");
  }

  if (!studentName || !studentName.trim()) {
    throw new Error("Student name is required");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const isEnrolled = await Enrollment.findOne({
    studentEmail: normalized,
    courseId,
    status: "active",
  });
  if (isEnrolled) {
    throw new Error("Student is already actively enrolled in this course");
  }

  let existingPending = await EnrollmentApplication.findOne({
    email: normalized,
    courseId,
    status: "pending",
  });

  if (existingPending) {
    existingPending.studentName = studentName.trim();
    existingPending.phone = phone.trim();
    existingPending.educationBackground = educationBackground.trim();
    existingPending.reason = reason.trim();
    await existingPending.save();
    return existingPending;
  }

  // Allow re-application if previous application was rejected or cancelled
  let existingPrevious = await EnrollmentApplication.findOne({
    email: normalized,
    courseId,
    status: { $in: ["rejected", "cancelled"] },
  }).sort({ updatedAt: -1 });

  if (existingPrevious) {
    existingPrevious.studentName = studentName.trim();
    existingPrevious.phone = phone.trim();
    existingPrevious.educationBackground = educationBackground.trim();
    existingPrevious.reason = reason.trim();
    existingPrevious.status = "pending";
    existingPrevious.submittedAt = new Date();
    existingPrevious.reviewedAt = undefined;
    existingPrevious.reviewedBy = undefined;
    existingPrevious.adminNote = "";
    await existingPrevious.save();
    return existingPrevious;
  }

  const application = await EnrollmentApplication.create({
    studentName: studentName.trim(),
    email: normalized,
    phone: phone.trim(),
    courseId,
    educationBackground: educationBackground.trim(),
    reason: reason.trim(),
    status: "pending",
    submittedAt: new Date(),
  });

  return application;
};

export const approveApplication = async ({ applicationId, adminId, adminNote = "" }) => {
  const application = await EnrollmentApplication.findById(applicationId);
  if (!application) {
    throw new Error("Enrollment application not found");
  }

  if (application.status !== "pending") {
    throw new Error(`Application cannot be approved because current status is '${application.status}'`);
  }

  const normalized = normalizeEmail(application.email);
  const course = await Course.findById(application.courseId);
  if (!course) {
    throw new Error("Associated course not found");
  }

  const user = await User.findOne({ email: normalized });

  let enrollment = await Enrollment.findOne({
    studentEmail: normalized,
    courseId: application.courseId,
    status: "active",
  });

  if (!enrollment) {
    enrollment = await Enrollment.create({
      userId: user ? user._id : null,
      studentEmail: normalized,
      courseId: application.courseId,
      applicationId: application._id,
      status: "active",
      source: "google_form",
      enrolledAt: new Date(),
    });
  } else if (user && !enrollment.userId) {
    enrollment.userId = user._id;
    await enrollment.save();
  }

  application.status = "approved";
  application.reviewedAt = new Date();
  application.reviewedBy = adminId;
  if (adminNote) application.adminNote = adminNote.trim();
  await application.save();

  if (user) {
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: application.courseId },
    });
    await Course.findByIdAndUpdate(application.courseId, {
      $addToSet: { enrolledStudents: user._id },
    });
  }

  return { application, enrollment };
};

export const rejectApplication = async ({ applicationId, adminId, adminNote = "" }) => {
  const application = await EnrollmentApplication.findById(applicationId);
  if (!application) {
    throw new Error("Enrollment application not found");
  }

  if (application.status !== "pending") {
    throw new Error(`Application cannot be rejected because current status is '${application.status}'`);
  }

  application.status = "rejected";
  application.reviewedAt = new Date();
  application.reviewedBy = adminId;
  if (adminNote) application.adminNote = adminNote.trim();
  await application.save();

  return application;
};

export const manualAdminEnroll = async ({
  studentEmail,
  courseId,
  adminId,
  studentName = "Manual Enroll Student",
  adminNote = "Manually enrolled by admin",
}) => {
  const normalized = normalizeEmail(studentEmail);
  if (!normalized) {
    throw new Error("Invalid student email address");
  }

  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const existingActive = await Enrollment.findOne({
    studentEmail: normalized,
    courseId,
    status: "active",
  });

  if (existingActive) {
    throw new Error("Student is already actively enrolled in this course");
  }

  const user = await User.findOne({ email: normalized });

  const enrollment = await Enrollment.create({
    userId: user ? user._id : null,
    studentEmail: normalized,
    courseId,
    status: "active",
    source: "manual_admin",
    enrolledAt: new Date(),
  });

  if (user) {
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: courseId },
    });
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: user._id },
    });
  }

  return enrollment;
};

export const linkPendingEnrollmentToUser = async (user) => {
  if (!user || !user.email) return;

  const normalized = normalizeEmail(user.email);
  if (!normalized) return;

  const pendingEnrollments = await Enrollment.find({
    studentEmail: normalized,
    userId: null,
    status: "active",
  });

  for (const enrollment of pendingEnrollments) {
    enrollment.userId = user._id;
    await enrollment.save();

    await User.findByIdAndUpdate(user._id, {
      $addToSet: { enrolledCourses: enrollment.courseId },
    });
    await Course.findByIdAndUpdate(enrollment.courseId, {
      $addToSet: { enrolledStudents: user._id },
    });
  }
};
