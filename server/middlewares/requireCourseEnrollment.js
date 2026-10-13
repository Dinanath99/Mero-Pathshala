import { User } from "../models/user.model.js";
import { hasActiveEnrollment } from "../services/enrollment.service.js";

export const requireCourseEnrollment = async (req, res, next) => {
  try {
    const courseId = req.params.courseId || req.body.courseId;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const user = req.user || (await User.findById(userId));
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User account not found",
      });
    }

    // Admins bypass enrollment check for administrative inspection
    if (user.role === "admin") {
      req.user = user;
      return next();
    }

    const isEnrolled = await hasActiveEnrollment(user._id, user.email, courseId);
    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You do not have an active enrollment for this course.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Course enrollment authorization error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error checking course enrollment permission",
    });
  }
};
