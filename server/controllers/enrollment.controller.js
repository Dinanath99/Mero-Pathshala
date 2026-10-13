import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";
import { EnrollmentApplication } from "../models/enrollmentApplication.model.js";
import { User } from "../models/user.model.js";
import {
  approveApplication,
  createApplication,
  getStudentCourseStatus,
  manualAdminEnroll,
  rejectApplication,
} from "../services/enrollment.service.js";
import { normalizeEmail } from "../utils/email.js";

export const applyForEnrollment = async (req, res) => {
  try {
    const { studentName, email, phone, courseId, educationBackground, reason } = req.body;

    const application = await createApplication({
      studentName,
      email,
      phone,
      courseId,
      educationBackground,
      reason,
    });

    return res.status(201).json({
      success: true,
      message: "Enrollment application submitted successfully. Pending admin review.",
      application,
    });
  } catch (error) {
    console.error("Apply for enrollment error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to submit enrollment application",
    });
  }
};

export const googleFormWebhook = async (req, res) => {
  try {
    const providedSecret =
      req.headers["x-webhook-secret"] || req.query.secret || req.body.secret;
    const expectedSecret =
      process.env.ENROLLMENT_WEBHOOK_SECRET || "meropathsala_google_form_secret_2026";

    if (!providedSecret || providedSecret !== expectedSecret) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid webhook authentication secret",
      });
    }

    const {
      studentName,
      email,
      phone,
      courseId,
      courseTitle,
      educationBackground,
      reason,
    } = req.body;

    let targetCourseId = courseId;

    if (!targetCourseId && courseTitle) {
      const course = await Course.findOne({
        courseTitle: { $regex: new RegExp(`^${courseTitle.trim()}$`, "i") },
      });
      if (course) {
        targetCourseId = course._id;
      }
    }

    if (!targetCourseId) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid course identification (courseId or courseTitle required)",
      });
    }

    const application = await createApplication({
      studentName: studentName || "Google Form Student",
      email,
      phone: phone || "",
      courseId: targetCourseId,
      educationBackground: educationBackground || "",
      reason: reason || "",
    });

    return res.status(201).json({
      success: true,
      message: "Google Form application processed successfully.",
      application,
    });
  } catch (error) {
    console.error("Google Form webhook error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to process Google Form submission",
    });
  }
};

export const getCourseEnrollmentStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    let userId = req.id;
    let userEmail = "";

    if (userId) {
      const user = await User.findById(userId);
      if (user) userEmail = user.email;
    } else if (req.cookies?.token) {
      try {
        const decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        if (decode?.userId) {
          const user = await User.findById(decode.userId);
          if (user) {
            userId = user._id;
            userEmail = user.email;
          }
        }
      } catch (e) {
        // Guest user
      }
    }

    if (!userId && !userEmail) {
      return res.status(200).json({
        success: true,
        status: "unauthenticated",
      });
    }

    const status = await getStudentCourseStatus(userId, userEmail, courseId);

    return res.status(200).json({
      success: true,
      status,
    });
  } catch (error) {
    console.error("Get course enrollment status error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to check enrollment status",
    });
  }
};

export const adminManualEnroll = async (req, res) => {
  try {
    const { studentEmail, courseId, studentName, adminNote } = req.body;

    const enrollment = await manualAdminEnroll({
      studentEmail,
      courseId,
      adminId: req.id,
      studentName,
      adminNote,
    });

    return res.status(200).json({
      success: true,
      message: "Student manually enrolled successfully.",
      enrollment,
    });
  } catch (error) {
    console.error("Admin manual enroll error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to manually enroll student",
    });
  }
};

export const adminApproveApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body || {};

    const result = await approveApplication({
      applicationId: id,
      adminId: req.id,
      adminNote,
    });

    return res.status(200).json({
      success: true,
      message: "Application approved and course enrollment activated.",
      ...result,
    });
  } catch (error) {
    console.error("Admin approve application error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to approve application",
    });
  }
};

export const adminRejectApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminNote } = req.body || {};

    const application = await rejectApplication({
      applicationId: id,
      adminId: req.id,
      adminNote,
    });

    return res.status(200).json({
      success: true,
      message: "Application rejected.",
      application,
    });
  } catch (error) {
    console.error("Admin reject application error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to reject application",
    });
  }
};

export const adminGetApplications = async (req, res) => {
  try {
    const { status, courseId, email } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    if (email) filter.email = normalizeEmail(email);

    const applications = await EnrollmentApplication.find(filter)
      .populate("courseId", "courseTitle coursePrice category")
      .populate("reviewedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Admin get applications error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
};

export const adminGetApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await EnrollmentApplication.findById(id)
      .populate("courseId")
      .populate("reviewedBy", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Enrollment application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Admin get application by id error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch application details",
    });
  }
};
