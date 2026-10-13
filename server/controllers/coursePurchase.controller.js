import jwt from "jsonwebtoken";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { User } from "../models/user.model.js";
import { hasActiveEnrollment } from "../services/enrollment.service.js";

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    let userId = req.id;
    let userEmail = "";

    if (!userId && req.cookies?.token) {
      try {
        const decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        userId = decode?.userId;
      } catch (e) {
        // Guest or expired token
      }
    }

    if (userId) {
      const user = await User.findById(userId);
      if (user) userEmail = user.email;
    }

    const course = await Course.findById(courseId)
      .populate({ path: "creator", select: "name photoUrl jobTitle" })
      .populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const purchased = await hasActiveEnrollment(userId, userEmail, courseId);

    return res.status(200).json({
      course,
      purchased,
    });
  } catch (error) {
    console.error("Get course detail error:", error);
    return res.status(500).json({ message: "Failed to fetch course detail" });
  }
};

export const getAllPurchasedCourse = async (_, res) => {
  try {
    const purchasedCourse = await CoursePurchase.find({
      status: "completed",
    }).populate("courseId");
    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.error("Get all purchased courses error:", error);
    return res.status(500).json({ message: "Failed to fetch purchased courses" });
  }
};
