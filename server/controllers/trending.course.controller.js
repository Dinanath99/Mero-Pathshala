import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Enrollment } from "../models/enrollment.model.js";
import { Course } from "../models/course.model.js";

export const getTrendingCourses = async (req, res) => {
  try {
    const activeEnrollments = await Enrollment.aggregate([
      { $match: { status: "active" } },
      {
        $group: {
          _id: "$courseId",
          count: { $sum: 1 },
        },
      },
    ]);

    const legacyPurchases = await CoursePurchase.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$courseId",
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map();
    activeEnrollments.forEach((item) => {
      if (item._id) {
        const idStr = item._id.toString();
        countMap.set(idStr, (countMap.get(idStr) || 0) + item.count);
      }
    });

    legacyPurchases.forEach((item) => {
      if (item._id) {
        const idStr = item._id.toString();
        countMap.set(idStr, (countMap.get(idStr) || 0) + item.count);
      }
    });

    let topCourseIds = Array.from(countMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id]) => id);

    let courses = [];
    if (topCourseIds.length > 0) {
      courses = await Course.find({
        _id: { $in: topCourseIds },
        isPublished: true,
      }).lean();
    }

    // Fallback: If no enrollments exist yet, return top published courses
    if (courses.length === 0) {
      courses = await Course.find({ isPublished: true }).limit(6).lean();
    }

    const coursesWithCount = courses.map((course) => {
      const cId = course._id.toString();
      return {
        ...course,
        purchaseCount: countMap.get(cId) || (course.enrolledStudents ? course.enrolledStudents.length : 0),
      };
    });

    coursesWithCount.sort((a, b) => b.purchaseCount - a.purchaseCount);

    return res.status(200).json({
      success: true,
      trendingCourses: coursesWithCount,
    });
  } catch (error) {
    console.error("Error fetching trending courses:", error);
    return res.status(500).json({
      message: "Failed to fetch trending courses",
    });
  }
};
