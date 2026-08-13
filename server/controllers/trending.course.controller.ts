import { Request, Response } from "express";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Course } from "../models/course.model.js";

export const getTrendingCourses = async (_: Request, res: Response): Promise<Response> => {
  try {
    const purchasedCourses = await CoursePurchase.aggregate([
      { $match: { status: "completed" } },
      {
        $group: {
          _id: "$courseId",
          purchaseCount: { $sum: 1 },
        },
      },
      { $match: { purchaseCount: { $gte: 2 } } },
      { $sort: { purchaseCount: -1 } },
      { $limit: 10 },
    ]);

    const courseIds = purchasedCourses.map((c) => c._id);

    const courses = await Course.find({
      _id: { $in: courseIds },
      isPublished: true,
    }).lean();

    const coursesWithCount = courses.map((course) => {
      const purchaseInfo = purchasedCourses.find(
        (c) => c._id.toString() === course._id.toString()
      );
      return {
        ...course,
        purchaseCount: purchaseInfo ? purchaseInfo.purchaseCount : 0,
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
