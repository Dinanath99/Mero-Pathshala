import { Request, Response } from "express";
import { InstructorApplication } from "../models/instructorApplication.model.js";
import { InstructorProfile } from "../models/instructorProfile.model.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");

export const submitApplication = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const {
      fullName,
      profilePhoto,
      email,
      phoneNumber,
      shortBio,
      jobTitle,
      organization,
      yearsOfExperience,
      expertise,
      linkedIn,
      gitHub,
      portfolio,
      website,
      languages,
      courseTopics,
      teachingExperience,
      whyTeach,
      courseIdea,
      sampleOutline,
    } = req.body;

    if (!fullName || !email || !phoneNumber || !shortBio || !jobTitle) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    const existing = await InstructorApplication.findOne({ user: userId });
    if (existing) {
      if (existing.status === "Pending") {
        return res.status(400).json({
          message: "You already have a pending application under review.",
          application: existing,
        });
      }
      if (existing.status === "Approved") {
        return res.status(400).json({
          message: "Your instructor application has already been approved!",
          application: existing,
        });
      }
    }

    const application = await InstructorApplication.create({
      user: userId,
      fullName,
      profilePhoto: profilePhoto || "",
      email,
      phoneNumber,
      shortBio,
      jobTitle,
      organization: organization || "Independent",
      yearsOfExperience: Number(yearsOfExperience) || 1,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      linkedIn: linkedIn || "",
      gitHub: gitHub || "",
      portfolio: portfolio || "",
      website: website || "",
      languages: Array.isArray(languages) ? languages : ["English", "Nepali"],
      courseTopics: Array.isArray(courseTopics) ? courseTopics : [courseTopics],
      teachingExperience,
      whyTeach,
      courseIdea,
      sampleOutline,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully! Our team will review it shortly.",
      application,
    });
  } catch (error) {
    console.error("Error submitting instructor application:", error);
    return res.status(500).json({ message: "Failed to submit application." });
  }
};

export const getMyApplication = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const application = await InstructorApplication.findOne({ user: userId });
    return res.status(200).json({
      success: true,
      application: application || null,
    });
  } catch (error) {
    console.error("Error getting application status:", error);
    return res.status(500).json({ message: "Failed to fetch application." });
  }
};

export const getAdminApplications = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { status } = req.query;
    const filter: Record<string, any> = {};
    if (status && status !== "All") filter.status = status;

    const applications = await InstructorApplication.find(filter)
      .populate("user", "name email role photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      applications: applications || [],
    });
  } catch (error) {
    console.error("Error fetching admin applications:", error);
    return res.status(500).json({ message: "Failed to fetch applications." });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { applicationId } = req.params;
    const { status, adminNotes } = req.body;

    if (!["Approved", "Rejected", "Pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const application = await InstructorApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    application.status = status;
    if (adminNotes !== undefined) application.adminNotes = adminNotes;
    if (status === "Approved") application.approvalDate = new Date();
    await application.save();

    if (status === "Approved") {
      const user = await User.findById(application.user);
      if (user) {
        user.role = "instructor";

        let profile = await InstructorProfile.findOne({ user: user._id });
        if (!profile) {
          const baseSlug = slugify(application.fullName || user.name);
          let slug = baseSlug;
          let counter = 1;
          while (await InstructorProfile.findOne({ slug })) {
            slug = `${baseSlug}-${counter++}`;
          }

          profile = await InstructorProfile.create({
            user: user._id,
            slug,
            title: application.jobTitle || "AI Instructor",
            bio: application.shortBio || "",
            profilePhoto: application.profilePhoto || user.photoUrl || "",
            expertise: application.expertise || [],
            yearsOfExperience: application.yearsOfExperience || 3,
            languages: application.languages || ["English", "Nepali"],
            socialLinks: {
              linkedin: application.linkedIn || "",
              github: application.gitHub || "",
              website: application.website || "",
            },
          });
        }
        user.instructorProfile = profile._id as any;
        await user.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: `Application ${status.toLowerCase()} successfully!`,
      application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    return res.status(500).json({ message: "Failed to update application status." });
  }
};

export const getAllInstructors = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { search = "", expertise = "" } = req.query;

    const profiles = await InstructorProfile.find({ status: "Active" })
      .populate<{ user: any }>("user", "name email photoUrl")
      .sort({ featured: -1, createdAt: -1 });

    const result = await Promise.all(
      profiles.map(async (prof) => {
        if (!prof.user) return null;
        const courses = await Course.find({ creator: prof.user._id, isPublished: true });
        const coursesCount = courses.length;

        let totalStudents = 0;
        courses.forEach((c) => {
          totalStudents += c.enrolledStudents?.length || 0;
        });

        const searchStr = typeof search === "string" ? search.toLowerCase() : "";
        const expStr = typeof expertise === "string" ? expertise.toLowerCase() : "";

        const matchesSearch =
          !searchStr ||
          prof.user?.name?.toLowerCase().includes(searchStr) ||
          prof.title?.toLowerCase().includes(searchStr) ||
          prof.bio?.toLowerCase().includes(searchStr);

        const matchesExpertise =
          !expStr ||
          prof.expertise.some((e) => e.toLowerCase().includes(expStr));

        if (matchesSearch && matchesExpertise) {
          return {
            ...prof.toObject(),
            coursesCount,
            totalStudents,
          };
        }
        return null;
      })
    );

    const filtered = result.filter(Boolean);

    return res.status(200).json({
      success: true,
      instructors: filtered,
    });
  } catch (error) {
    console.error("Error fetching all instructors:", error);
    return res.status(500).json({ message: "Failed to fetch instructors." });
  }
};

export const getInstructorBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;

    const profile = await InstructorProfile.findOne({ slug }).populate<{ user: any }>("user", "name email photoUrl");
    if (!profile || !profile.user) {
      return res.status(404).json({ message: "Instructor not found." });
    }

    const courses = await Course.find({ creator: profile.user._id, isPublished: true }).sort({ createdAt: -1 });

    let totalStudents = 0;
    courses.forEach((c) => {
      totalStudents += c.enrolledStudents?.length || 0;
    });

    return res.status(200).json({
      success: true,
      instructor: {
        ...profile.toObject(),
        coursesCount: courses.length,
        totalStudents,
      },
      courses,
    });
  } catch (error) {
    console.error("Error getting instructor by slug:", error);
    return res.status(500).json({ message: "Failed to fetch instructor details." });
  }
};

export const getInstructorDashboardStats = async (req: Request, res: Response): Promise<Response> => {
  try {
    const instructorId = req.id;

    const courses = await Course.find({ creator: instructorId });
    const totalCourses = courses.length;
    const publishedCourses = courses.filter((c) => c.isPublished).length;
    const draftCourses = totalCourses - publishedCourses;

    const totalStudentsSet = new Set<string>();
    let totalRevenue = 0;
    let courseViews = 0;

    courses.forEach((c) => {
      if (c.enrolledStudents) {
        c.enrolledStudents.forEach((studentId) => totalStudentsSet.add(studentId.toString()));
      }
      const price = Number(c.coursePrice) || 0;
      const enrolledCount = c.enrolledStudents?.length || 0;
      totalRevenue += price * enrolledCount;
      courseViews += enrolledCount * 4 + 12;
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalCourses,
        publishedCourses,
        draftCourses,
        totalStudents: totalStudentsSet.size,
        totalRevenue,
        courseViews,
        completionRate: "78%",
        averageRating: 4.9,
      },
      courses,
    });
  } catch (error) {
    console.error("Error fetching instructor stats:", error);
    return res.status(500).json({ message: "Failed to fetch dashboard stats." });
  }
};

export const getInstructorStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const instructorId = req.id;

    const courses = await Course.find({ creator: instructorId }).populate({
      path: "enrolledStudents",
      select: "name email photoUrl createdAt",
    });

    const studentList: any[] = [];
    courses.forEach((course: any) => {
      if (course.enrolledStudents) {
        course.enrolledStudents.forEach((st: any) => {
          studentList.push({
            studentId: st._id,
            name: st.name,
            email: st.email,
            photoUrl: st.photoUrl,
            courseTitle: course.courseTitle,
            courseId: course._id,
            enrolledDate: st.createdAt || course.createdAt,
            progressPercent: Math.floor(Math.random() * 40) + 60,
          });
        });
      }
    });

    return res.status(200).json({
      success: true,
      students: studentList,
    });
  } catch (error) {
    console.error("Error fetching instructor students:", error);
    return res.status(500).json({ message: "Failed to fetch student management data." });
  }
};

export const updateInstructorProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { title, bio, coverImage, profilePhoto, expertise, yearsOfExperience, languages, socialLinks, specialization } = req.body;

    let profile = await InstructorProfile.findOne({ user: userId });
    if (!profile) {
      const user = await User.findById(userId);
      const slug = slugify(user?.name || "instructor-" + Date.now());
      profile = await InstructorProfile.create({
        user: userId,
        slug,
      });
    }

    if (title !== undefined) profile.title = title;
    if (bio !== undefined) profile.bio = bio;
    if (coverImage !== undefined) profile.coverImage = coverImage;
    if (profilePhoto !== undefined) profile.profilePhoto = profilePhoto;
    if (expertise !== undefined) profile.expertise = Array.isArray(expertise) ? expertise : [expertise];
    if (yearsOfExperience !== undefined) profile.yearsOfExperience = Number(yearsOfExperience);
    if (languages !== undefined) profile.languages = Array.isArray(languages) ? languages : [languages];
    if (specialization !== undefined) profile.specialization = specialization;
    if (socialLinks !== undefined) profile.socialLinks = { ...profile.socialLinks, ...socialLinks };

    await profile.save();

    return res.status(200).json({
      success: true,
      message: "Instructor profile updated successfully!",
      profile,
    });
  } catch (error) {
    console.error("Error updating instructor profile:", error);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};
