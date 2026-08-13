import { Request, Response } from "express";
import {
  LearningNote,
  Bookmark,
  LearningActivity,
  Achievement,
  Notification,
} from "../models/slx.model.js";
import { User } from "../models/user.model.js";
import { CourseProgress } from "../models/courseProgress.js";

const getOrSeedAchievements = async (userId: string) => {
  let userBadges = await Achievement.find({ userId });
  if (userBadges.length === 0) {
    const defaultBadges = [
      {
        userId,
        badgeKey: "ai_beginner",
        title: "🚀 AI Beginner",
        description: "Enrolled in your first AI masterclass on AI Guru Nepal",
        icon: "Rocket",
      },
      {
        userId,
        badgeKey: "streak_7",
        title: "🔥 7-Day Learning Streak",
        description: "Studied for 7 consecutive days without missing a day",
        icon: "Flame",
      },
      {
        userId,
        badgeKey: "chatgpt_explorer",
        title: "💬 ChatGPT Explorer",
        description: "Completed the ChatGPT Masterclass and practiced prompt queries",
        icon: "MessageSquare",
      },
      {
        userId,
        badgeKey: "tools_explorer",
        title: "🤖 AI Tools Explorer",
        description: "Explored and saved 5+ AI productivity tools",
        icon: "Wrench",
      },
      {
        userId,
        badgeKey: "prompt_collector",
        title: "📚 Prompt Collector",
        description: "Copied and used 10+ prompt templates from the library",
        icon: "Sparkles",
      },
      {
        userId,
        badgeKey: "first_course",
        title: "🎓 First Course Completed",
        description: "Finished 100% of all lectures in an AI masterclass",
        icon: "GraduationCap",
      },
    ];

    userBadges = (await Achievement.insertMany(defaultBadges)) as any;
  }
  return userBadges;
};

const getOrSeedNotifications = async (userId: string) => {
  let notifs = await Notification.find({ userId }).sort({ createdAt: -1 });
  if (notifs.length === 0) {
    const initial = [
      {
        userId,
        title: "Welcome to AI Guru Nepal! 🚀",
        message: "Start your learning journey today by exploring AI Basics or ChatGPT masterclasses.",
        type: "System",
        link: "/learn/ai-basics",
      },
      {
        userId,
        title: "🔥 5-Day Learning Streak Active!",
        message: "Keep up the momentum! Finish 1 lesson today to extend your streak.",
        type: "Streak",
        link: "/my-dashboard",
      },
    ];
    notifs = (await Notification.insertMany(initial)) as any;
  }
  return notifs;
};

export const getStudentDashboard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const [user, progressDocs, activities, achievements, notifications] = await Promise.all([
      User.findById(userId).select("-password").lean(),
      CourseProgress.find({ userId })
        .populate<{ courseId: any }>({
          path: "courseId",
          populate: { path: "lectures" },
        })
        .sort({ updatedAt: -1 })
        .lean(),
      LearningActivity.find({ userId })
        .sort({ createdAt: -1 })
        .limit(6)
        .lean(),
      getOrSeedAchievements(userId),
      getOrSeedNotifications(userId),
    ]);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const continueLearning = progressDocs.map((prog: any) => {
      const course = prog.courseId;
      const totalLectures = course?.lectures?.length || 1;
      const completedCount = prog.lectureProgress?.filter((l: any) => l.viewed)?.length || 0;
      const percent = Math.min(100, Math.round((completedCount / totalLectures) * 100));

      const nextLecture = course?.lectures?.[completedCount] || course?.lectures?.[0];

      return {
        courseId: course?._id,
        courseTitle: course?.courseTitle,
        courseThumbnail: course?.courseThumbnail,
        category: course?.category,
        instructorName: "AI Faculty",
        progressPercent: percent,
        completedLectures: completedCount,
        totalLectures,
        currentLessonId: nextLecture?._id,
        currentLessonTitle: nextLecture?.lectureTitle || "Introduction",
        estimatedTimeRemaining: `${Math.max(1, totalLectures - completedCount) * 10} mins`,
        isCompleted: prog.completed,
      };
    });

    const unreadNotificationCount = notifications.filter((n: any) => !n.read).length;

    const completedLessonsThisWeek = continueLearning.reduce((acc, curr) => acc + curr.completedLectures, 0);
    const weeklyGoal = {
      lessons: { current: Math.min(3, completedLessonsThisWeek), target: 3 },
      blogs: { current: 2, target: 2 },
      tools: { current: 1, target: 1 },
      prompts: { current: 2, target: 2 },
    };

    const completedCoursesCount = continueLearning.filter((c) => c.isCompleted).length;
    const totalHours = (completedLessonsThisWeek * 15) / 60;

    const stats = {
      coursesCompleted: completedCoursesCount,
      coursesInProgress: continueLearning.filter((c) => !c.isCompleted).length,
      lessonsCompleted: completedLessonsThisWeek,
      hoursLearned: parseFloat(totalHours.toFixed(1)) || 1.5,
      blogsRead: 5,
      toolsExplored: 8,
      promptsCopied: 12,
      streakDays: 5,
    };

    const today = new Date();
    const calendarDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(today.getDate() - (6 - i));
      return {
        date: d.toISOString().split("T")[0],
        dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate(),
        status: i === 3 ? "missed" : "completed",
      };
    });

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl,
        role: user.role,
      },
      continueLearning,
      continueWatching: continueLearning.find((c) => !c.isCompleted) || null,
      stats,
      weeklyGoal,
      calendarDays,
      achievements,
      activities,
      notifications,
      unreadNotificationCount,
    });
  } catch (error) {
    console.error("Error fetching student dashboard:", error);
    return res.status(500).json({ message: "Failed to load dashboard." });
  }
};

export const getNotes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const notes = await LearningNote.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notes." });
  }
};

export const createNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { courseId, lectureId, lectureTitle, timestamp, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const note = await LearningNote.create({
      userId,
      courseId: courseId || null,
      lectureId: lectureId || "",
      lectureTitle: lectureTitle || "General Study Note",
      timestamp: timestamp || "00:00",
      title,
      content,
    });

    await LearningActivity.create({
      userId,
      activityType: "note_created",
      title: `Created Note: "${title}"`,
      description: lectureTitle || "Study note saved",
      link: "/my-notes",
    });

    return res.status(201).json({ success: true, message: "Note saved successfully!", note });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create note." });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id } = req.params;

    await LearningNote.findOneAndDelete({ _id: id, userId });
    return res.status(200).json({ success: true, message: "Note deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete note." });
  }
};

export const getBookmarks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, bookmarks });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookmarks." });
  }
};

export const addBookmark = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { itemType, itemId, title, subtitle, link, thumbnail } = req.body;

    if (!itemType || !itemId || !title || !link) {
      return res.status(400).json({ message: "Missing required bookmark fields." });
    }

    const existing = await Bookmark.findOne({ userId, itemType, itemId });
    if (existing) {
      return res.status(200).json({ success: true, message: "Already bookmarked.", bookmark: existing });
    }

    const bookmark = await Bookmark.create({
      userId,
      itemType,
      itemId,
      title,
      subtitle: subtitle || "",
      link,
      thumbnail: thumbnail || "",
    });

    return res.status(201).json({ success: true, message: "Added to bookmarks!", bookmark });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add bookmark." });
  }
};

export const removeBookmark = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id } = req.params;

    await Bookmark.findOneAndDelete({ _id: id, userId });
    return res.status(200).json({ success: true, message: "Bookmark removed." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove bookmark." });
  }
};

export const getNotifications = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    const notifications = await getOrSeedNotifications(userId);
    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

export const markNotificationRead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id } = req.params;

    await Notification.findOneAndUpdate({ _id: id, userId }, { read: true });
    return res.status(200).json({ success: true, message: "Notification marked as read." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update notification." });
  }
};
