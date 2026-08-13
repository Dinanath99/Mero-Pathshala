import { Request, Response } from "express";
import OpenAI from "openai";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";

const apiKey = process.env.OPENROUTER_API_KEY || "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";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey,
});

export const chatHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Valid message is required" });
    }

    let responseData: Record<string, any> = {};
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("how many courses")) {
      const courseCount = await Course.countDocuments({ isPublished: true });
      responseData = { type: "course_count", count: courseCount };
    } else if (lowerMessage.includes("recommend") || lowerMessage.includes("suggest")) {
      let recommendedCourses = [];
      const userId = req.id;
      if (userId) {
        const user = await User.findById(userId).select("skills interests");
        const userSkills = user?.skills || [];
        const userInterests = user?.interests || [];

        recommendedCourses = await Course.find({
          isPublished: true,
          $or: [
            { tags: { $in: userSkills } },
            { tags: { $in: userInterests } },
            { category: { $in: userInterests } },
          ],
        })
          .select("courseTitle subTitle coursePrice courseLevel")
          .limit(5);
      } else {
        recommendedCourses = await Course.find({ isPublished: true })
          .select("courseTitle subTitle coursePrice courseLevel")
          .limit(5);
      }
      responseData = { type: "recommendations", courses: recommendedCourses };
    } else if (
      lowerMessage.includes("beginner") ||
      lowerMessage.includes("medium") ||
      lowerMessage.includes("advance")
    ) {
      const levelMap: Record<string, "Beginner" | "Medium" | "Advance"> = {
        beginner: "Beginner",
        medium: "Medium",
        advance: "Advance",
      };
      const levelKey = Object.keys(levelMap).find((key) => lowerMessage.includes(key));
      if (levelKey) {
        const targetLevel = levelMap[levelKey];
        const courses = await Course.find({ isPublished: true, courseLevel: targetLevel })
          .select("courseTitle subTitle coursePrice")
          .limit(5);
        responseData = { type: "level_courses", level: targetLevel, courses };
      }
    } else if (lowerMessage.includes("my courses") && req.id) {
      const userId = req.id;
      const user = await User.findById(userId).populate({
        path: "enrolledCourses",
        select: "courseTitle subTitle coursePrice",
      });
      responseData = { type: "enrolled_courses", courses: user?.enrolledCourses || [] };
    } else if (lowerMessage.includes("progress") && req.id) {
      const userId = req.id;
      const progress = await CourseProgress.find({ userId }).populate({
        path: "courseId",
        select: "courseTitle",
      });
      responseData = { type: "course_progress", progress };
    } else if (lowerMessage.includes("course") && (lowerMessage.includes("detail") || lowerMessage.includes("about"))) {
      const courseTitle = message.match(/"([^"]+)"/)?.[1] || lowerMessage.split("about ")[1]?.split(" ")[0];
      if (courseTitle) {
        const course = await Course.findOne({
          isPublished: true,
          courseTitle: { $regex: courseTitle, $options: "i" },
        }).select("courseTitle subTitle coursePrice courseLevel category tags");
        responseData = { type: "course_details", course };
      }
    }

    const courses = await Course.find({ isPublished: true })
      .select("courseTitle subTitle coursePrice courseLevel category tags")
      .limit(10);
    const courseContext = courses.map((course) => ({
      id: course._id.toString(),
      title: course.courseTitle,
      subtitle: course.subTitle,
      price: course.coursePrice,
      level: course.courseLevel,
      category: course.category,
      tags: course.tags,
    }));

    let userContext = "";
    const currentUserId = req.id;
    if (currentUserId) {
      const user = await User.findById(currentUserId).select("name skills interests enrolledCourses");
      if (user) {
        userContext = `User: ${user.name}, Skills: ${user.skills.join(", ")}, Interests: ${user.interests.join(", ")}, Enrolled Courses: ${user.enrolledCourses.length}`;
      }
    }

    const systemPrompt = `
      You are a helpful learning assistant for AI Guru Nepal, an online course platform.
      Answer user queries concisely and accurately based on the provided data and context.
      Use this course data: ${JSON.stringify(courseContext, null, 2)}
      ${currentUserId ? `User context: ${userContext}` : "User is not authenticated."}
      Response data: ${JSON.stringify(responseData, null, 2)}
      If the response data contains specific information (e.g., course_count, recommendations), use it to craft your response.
      For general queries, provide helpful learning advice.
      Keep responses friendly, professional, and under 150 words.
      Do not disclose sensitive information like API keys.
    `;

    const completion = await openai.chat.completions.create({
      model: "google/gemma-4-26b-a4b-it:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    const botResponse = completion.choices[0]?.message?.content?.trim() || "No response generated.";

    return res.status(200).json({ message: botResponse });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};
