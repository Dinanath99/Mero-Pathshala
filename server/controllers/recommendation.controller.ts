import { Request, Response } from "express";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import CourseClick from "../models/courseclick.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";

const normalize = (str?: string): string => (str || "").trim().toLowerCase();

export const recommendCollaborativeCourses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const currentUserId = req.id;

    const allPurchases = await CoursePurchase.find({
      status: "completed",
    }).select("userId courseId");

    const userPurchasedSet = new Set(
      allPurchases
        .filter((p) => p.userId.toString() === currentUserId)
        .map((p) => p.courseId.toString())
    );

    const purchaseCountMap = new Map<string, number>();
    allPurchases.forEach((p) => {
      const courseId = p.courseId.toString();
      if (!userPurchasedSet.has(courseId)) {
        purchaseCountMap.set(courseId, (purchaseCountMap.get(courseId) || 0) + 1);
      }
    });

    const allClicks = await CourseClick.find({
      userId: { $ne: currentUserId },
    }).select("courseId");

    const clickCountMap = new Map<string, number>();
    allClicks.forEach((c) => {
      const courseId = c.courseId.toString();
      if (!userPurchasedSet.has(courseId)) {
        clickCountMap.set(courseId, (clickCountMap.get(courseId) || 0) + 1);
      }
    });

    const scoreMap = new Map<string, number>();

    const allCourseIds = new Set([
      ...purchaseCountMap.keys(),
      ...clickCountMap.keys(),
    ]);

    allCourseIds.forEach((courseId) => {
      const purchaseScore = purchaseCountMap.get(courseId) || 0;
      const clickScore = clickCountMap.get(courseId) || 0;

      const totalScore = clickScore * 2 + purchaseScore;
      scoreMap.set(courseId, totalScore);
    });

    const recommendedCourseIds = Array.from(scoreMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([courseId]) => courseId);

    const courses = await Course.find({
      _id: { $in: recommendedCourseIds },
      isPublished: true,
    }).select("courseTitle courseThumbnail courseLevel coursePrice");

    const courseWithStats = courses.map((course) => {
      const courseId = course._id.toString();
      return {
        ...course.toObject(),
        totalPurchases: purchaseCountMap.get(courseId) || 0,
        totalClicks: clickCountMap.get(courseId) || 0,
        totalScore: scoreMap.get(courseId) || 0,
      };
    });

    courseWithStats.sort((a, b) => b.totalPurchases - a.totalPurchases);

    return res.status(200).json({
      message: "Recommended courses based on highest purchases",
      recommendedCourses: courseWithStats,
    });
  } catch (err) {
    console.error("Error in recommendCollaborativeCourses:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

export const recommendCourses = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const userSkills = (user.skills || []).map(normalize).filter(Boolean);
    const userEducationLevel = normalize(user.educationLevel);
    const enrolledIds = (user.enrolledCourses || []).map((id) => id.toString());

    const educationSynonyms: Record<string, string[]> = {
      "bachelor's degree": ["bachelor", "bachelor’s degree", "undergraduate"],
      "master's degree": ["master", "master’s degree", "graduate"],
      "doctorate degree": ["doctorate", "phd", "doctoral"],
      "less than high school diploma": ["less than high school", "no diploma"],
      "high school diploma": ["high school", "secondary education"],
      "some college": ["some college", "partial college"],
      "associate degree": ["associate", "associate degree"],
      "professional school degree": ["professional degree", "professional school"],
    };

    const allCourses = await Course.find({
      isPublished: true,
      _id: { $nin: enrolledIds },
    }).lean();

    const scoredCourses = allCourses
      .map((course) => {
        const title = normalize(course.courseTitle || "");
        const subTitle = normalize(course.subTitle || "");
        const tags = (course.tags || []).map((t) => normalize(t)).filter(Boolean);

        const skillSynonyms: Record<string, string[]> = {
          javascript: ["javascript", "js", "node.js", "react", "angular", "vue"],
          python: ["python", "py", "django", "flask"],
          android: ["android", "mobile development", "kotlin", "flutter"],
        };

        const skillMatches = userSkills.reduce((count, skill) => {
          const synonyms = skillSynonyms[skill] || [skill];
          return (
            count +
            synonyms.reduce((synCount, syn) => {
              const regex = new RegExp(syn, "i");
              return (
                synCount +
                (regex.test(title) || regex.test(subTitle) || tags.some((tag) => regex.test(tag))
                  ? 1
                  : 0)
              );
            }, 0)
          );
        }, 0);
        const skillScore = userSkills.length ? skillMatches / userSkills.length : 0.1;

        const educationTerms = educationSynonyms[userEducationLevel] || [userEducationLevel];
        const educationBonus = educationTerms.some((term) =>
          new RegExp(term, "i").test(title) ||
          new RegExp(term, "i").test(subTitle) ||
          tags.some((tag) => new RegExp(term, "i").test(tag))
        )
          ? 0.2
          : 0;

        const totalScore =
          skillScore * 0.8 +
          educationBonus +
          0.1;

        return {
          ...course,
          score: totalScore,
        };
      })
      .filter((course) => course.score >= 0.2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    if (scoredCourses.length === 0) {
      const fallbackCourses = await Course.find({
        isPublished: true,
        _id: { $nin: enrolledIds },
        courseLevel: "Beginner",
      })
        .lean()
        .limit(5);
      return res.status(200).json({
        success: true,
        recommendedCourses: fallbackCourses.map((course) => ({ ...course, score: 0.2 })),
      });
    }

    return res.status(200).json({
      success: true,
      recommendedCourses: scoredCourses,
    });
  } catch (error) {
    console.error("Recommendation Error:", error);
    return res.status(500).json({ message: "Failed to get recommendations" });
  }
};
