import { Request, Response } from "express";
import { HomepageConfig } from "../models/homepageConfig.model.js";
import { HomepageAnalytics } from "../models/homepageAnalytics.model.js";
import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.js";
import { Tool } from "../models/tool.model.js";
import { Prompt } from "../models/prompt.model.js";
import { Blog } from "../models/blog.model.js";
import { News } from "../models/news.model.js";
import { User } from "../models/user.model.js";
import { InstructorProfile } from "../models/instructorProfile.model.js";
import { InstructorApplication } from "../models/instructorApplication.model.js";
import { UserCourseInteraction } from "../models/UserCourseInteraction.model.js";

const getOrCreateDefaultConfig = async () => {
  let config = await HomepageConfig.findOne()
    .populate("todaysPick.courseId")
    .populate("todaysPick.toolId")
    .populate("todaysPick.promptId")
    .populate("todaysPick.blogId")
    .populate("todaysPick.newsId");

  if (!config) {
    const defaultSections = [
      { sectionKey: "hero", title: "Hero Banner", isVisible: true, order: 1 },
      { sectionKey: "trust_stats", title: "Trust & Platform Statistics", isVisible: true, order: 2 },
      { sectionKey: "learning_paths", title: "Choose Your Learning Path", isVisible: true, order: 3 },
      { sectionKey: "featured_courses", title: "Featured Courses", isVisible: true, order: 4 },
      { sectionKey: "free_resources", title: "Learn AI for Free", isVisible: true, order: 5 },
      { sectionKey: "popular_tools", title: "Popular AI Tools", isVisible: true, order: 6 },
      { sectionKey: "trending_prompts", title: "Trending Prompt Library", isVisible: true, order: 7 },
      { sectionKey: "latest_news", title: "Latest AI News", isVisible: true, order: 8 },
      { sectionKey: "latest_blogs", title: "Latest Blog Articles", isVisible: true, order: 9 },
      { sectionKey: "instructors", title: "Meet Our Faculty", isVisible: true, order: 10 },
      { sectionKey: "testimonials", title: "Student Testimonials", isVisible: true, order: 11 },
      { sectionKey: "become_instructor", title: "Become an Instructor CTA", isVisible: true, order: 12 },
      { sectionKey: "faqs", title: "Frequently Asked Questions", isVisible: true, order: 13 },
    ];

    const defaultStats = [
      { label: "Students Enrolled", value: "10,000+", icon: "Users" },
      { label: "AI Lessons", value: "100+", icon: "BookOpen" },
      { label: "AI Tools Directory", value: "50+", icon: "Wrench" },
      { label: "Prompt Templates", value: "500+", icon: "Sparkles" },
      { label: "Editorial Blogs", value: "100+", icon: "FileText" },
      { label: "Masterclasses", value: "20+", icon: "Award" },
    ];

    const defaultTestimonials = [
      {
        name: "Aashish Shrestha",
        role: "Frontend Developer",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        text: "AI Guru Nepal transformed how I use AI daily. The prompt engineering masterclass helped me automate 40% of my coding tasks!",
        rating: 5,
        location: "Kathmandu",
      },
      {
        name: "Pooja Sharma",
        role: "Digital Marketer",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        text: "Finding high quality bilingual tutorials in Nepali was tough until I discovered AI Guru. The AI Tools directory is a goldmine.",
        rating: 5,
        location: "Pokhara",
      },
      {
        name: "Rohan Gurung",
        role: "CS Student",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        text: "The interactive prompt library and learning streak feature keep me motivated every single day. Highly recommended!",
        rating: 5,
        location: "Lalitpur",
      },
    ];

    const defaultFaqs = [
      {
        question: "Is AI Guru Nepal free to join?",
        answer: "Yes! Creating an account, accessing free tutorials, prompt libraries, and AI news hub is 100% free.",
        category: "General",
      },
      {
        question: "In what languages are the courses taught?",
        answer: "Courses are bilingual, available in both English and clear Nepali explanations tailored for students and professionals across Nepal.",
        category: "Courses",
      },
      {
        question: "How do I apply to become an AI Instructor?",
        answer: "You can submit an application via '/become-an-instructor'. Once approved by our team, you can build and publish courses.",
        category: "Instructors",
      },
      {
        question: "Do I get certificates after completing a course?",
        answer: "Yes, verified certificates of completion are issued upon finishing all lectures and course quizzes.",
        category: "Certificates",
      },
    ];

    config = await HomepageConfig.create({
      sections: defaultSections,
      statistics: defaultStats,
      testimonials: defaultTestimonials,
      faqs: defaultFaqs,
    });
  }
  return config;
};

export const getPersonalizedHomepage = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const userPromise = userId ? User.findById(userId).select("-password").lean() : Promise.resolve(null);
    const configPromise = getOrCreateDefaultConfig();

    const featuredCoursesPromise = Course.find({ isPublished: true })
      .select("courseTitle subTitle category courseLevel coursePrice courseThumbnail creator enrolledStudents lectures createdAt")
      .populate("creator", "name photoUrl")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const featuredToolsPromise = Tool.find({ status: "Published", featured: true })
      .select("name slug tagline logo coverImage websiteUrl category pricingType views featured bestFor")
      .populate("category", "name slug icon")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    const trendingPromptsPromise = Prompt.find({ status: "Published", featured: true })
      .select("title slug englishDescription nepaliDescription promptContent difficulty bestFor tags category aiTools featured copiesCount views")
      .populate("category", "name slug icon")
      .sort({ views: -1 })
      .limit(6)
      .lean();

    const latestNewsPromise = News.find({ status: "Published" })
      .select("title subtitle coverImage readingTime category tags createdAt")
      .populate("category", "name slug icon color")
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();

    const latestBlogsPromise = Blog.find({ status: "Published" })
      .select("title slug excerpt featuredImage author category readingTime publishedAt createdAt")
      .populate("author", "name photoUrl")
      .populate("category", "name slug")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(4)
      .lean();

    const instructorsPromise = InstructorProfile.find({ status: "Active" })
      .populate("user", "name photoUrl email")
      .limit(3)
      .lean();

    const [
      user,
      config,
      featuredCourses,
      featuredTools,
      trendingPrompts,
      latestNews,
      latestBlogs,
      instructors,
    ] = await Promise.all([
      userPromise,
      configPromise,
      featuredCoursesPromise,
      featuredToolsPromise,
      trendingPromptsPromise,
      latestNewsPromise,
      latestBlogsPromise,
      instructorsPromise,
    ]);

    const role = user ? (user as any).role : "guest";

    const todaysPickData = {
      course: config.todaysPick?.courseId || featuredCourses[0] || null,
      tool: config.todaysPick?.toolId || featuredTools[0] || null,
      prompt: config.todaysPick?.promptId || trendingPrompts[0] || null,
      blog: config.todaysPick?.blogId || latestBlogs[0] || null,
      news: config.todaysPick?.newsId || latestNews[0] || null,
    };

    let studentData: Record<string, any> | null = null;
    let instructorData: Record<string, any> | null = null;
    let adminData: Record<string, any> | null = null;

    if (user) {
      const u = user as any;
      const [recentProgress, userInteractions] = await Promise.all([
        CourseProgress.find({ userId: u._id })
          .populate<{ courseId: any }>({
            path: "courseId",
            populate: { path: "lectures" },
          })
          .sort({ updatedAt: -1 })
          .limit(3)
          .lean(),
        UserCourseInteraction.find({ userId: u._id }).lean(),
      ]);

      const continueLearningItems = recentProgress.map((prog: any) => {
        const totalLectures = prog.courseId?.lectures?.length || 1;
        const completedCount = prog.lectureProgress?.filter((l: any) => l.viewed)?.length || 0;
        const percent = Math.min(100, Math.round((completedCount / totalLectures) * 100));

        const currentLecture = prog.courseId?.lectures?.[completedCount] || prog.courseId?.lectures?.[0];

        return {
          courseId: prog.courseId?._id,
          courseTitle: prog.courseId?.courseTitle,
          courseThumbnail: prog.courseId?.courseThumbnail,
          category: prog.courseId?.category,
          progressPercent: percent,
          completedLectures: completedCount,
          totalLectures,
          lastLectureTitle: currentLecture?.lectureTitle || "Introduction",
          lastLectureId: currentLecture?._id,
          estimatedTimeRemaining: `${Math.max(1, totalLectures - completedCount) * 10} mins`,
          isCompleted: prog.completed,
        };
      });

      const interactedCourseIds = userInteractions.map((i: any) => i.courseId);

      const recommendedCourses = await Course.find({
        isPublished: true,
        _id: { $nin: interactedCourseIds },
      })
        .select("courseTitle subTitle category courseLevel coursePrice courseThumbnail creator enrolledStudents lectures createdAt")
        .populate("creator", "name photoUrl")
        .limit(4)
        .lean();

      studentData = {
        continueLearning: continueLearningItems,
        recommendedCourses: recommendedCourses.length > 0 ? recommendedCourses : featuredCourses.slice(0, 4),
        recommendedTools: featuredTools.slice(0, 4),
        recommendedPrompts: trendingPrompts.slice(0, 4),
        recommendedNews: latestNews.slice(0, 4),
        learningProgressSummary: {
          enrolledCount: u.enrolledCourses?.length || 0,
          inProgressCount: continueLearningItems.filter((i) => !i.isCompleted).length,
          completedCount: continueLearningItems.filter((i) => i.isCompleted).length,
          streakDays: 5,
        },
      };
    }

    if (role === "instructor" && user) {
      const instructorCourses = await Course.find({ creator: user._id });
      let totalStudents = 0;
      let totalRevenue = 0;

      instructorCourses.forEach((c) => {
        const count = c.enrolledStudents?.length || 0;
        totalStudents += count;
        totalRevenue += (c.coursePrice || 0) * count;
      });

      instructorData = {
        totalCourses: instructorCourses.length,
        totalStudents,
        totalRevenue,
        courseViews: totalStudents * 5 + 24,
        myCourses: instructorCourses.slice(0, 4),
      };
    }

    if (role === "admin") {
      const totalUsers = await User.countDocuments();
      const pendingApps = await InstructorApplication.countDocuments({ status: "Pending" });
      const totalCoursesCount = await Course.countDocuments();
      const totalToolsCount = await Tool.countDocuments();

      adminData = {
        totalUsers,
        pendingApplications: pendingApps,
        totalCourses: totalCoursesCount,
        totalTools: totalToolsCount,
      };
    }

    return res.status(200).json({
      success: true,
      role,
      user: user
        ? {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            photoUrl: user.photoUrl,
          }
        : null,
      config,
      todaysPick: todaysPickData,
      featuredCourses,
      featuredTools,
      trendingPrompts,
      latestNews,
      latestBlogs,
      instructors,
      studentData,
      instructorData,
      adminData,
    });
  } catch (error) {
    console.error("Error building personalized homepage:", error);
    return res.status(500).json({ message: "Failed to generate personalized homepage." });
  }
};

export const updateHomepageConfig = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { heroBanner, promoBanner, todaysPick, sections, statistics, testimonials, faqs } = req.body;

    let config = await HomepageConfig.findOne();
    if (!config) {
      config = new HomepageConfig();
    }

    if (heroBanner) config.heroBanner = { ...config.heroBanner, ...heroBanner };
    if (promoBanner) config.promoBanner = { ...config.promoBanner, ...promoBanner };
    if (todaysPick) config.todaysPick = { ...config.todaysPick, ...todaysPick };
    if (sections && Array.isArray(sections)) config.sections = sections;
    if (statistics && Array.isArray(statistics)) config.statistics = statistics;
    if (testimonials && Array.isArray(testimonials)) config.testimonials = testimonials;
    if (faqs && Array.isArray(faqs)) config.faqs = faqs;

    await config.save();

    return res.status(200).json({
      success: true,
      message: "Homepage CMS configuration updated successfully!",
      config,
    });
  } catch (error) {
    console.error("Error updating homepage config:", error);
    return res.status(500).json({ message: "Failed to update homepage configuration." });
  }
};

export const logHomepageAnalytics = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id || null;
    const { eventType, sectionKey, itemType, itemId, metadata } = req.body;

    if (!eventType) {
      return res.status(400).json({ message: "eventType is required." });
    }

    await HomepageAnalytics.create({
      userId,
      eventType,
      sectionKey: sectionKey || "",
      itemType: itemType || "Other",
      itemId: itemId || "",
      metadata: metadata || {},
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("Error logging homepage analytics:", error);
    return res.status(500).json({ message: "Failed to log event." });
  }
};

export const getHomepageAnalytics = async (_: Request, res: Response): Promise<Response> => {
  try {
    const totalEvents = await HomepageAnalytics.countDocuments();
    const resumeClicks = await HomepageAnalytics.countDocuments({ eventType: "resume_learning_click" });
    const recommendationClicks = await HomepageAnalytics.countDocuments({ eventType: "recommendation_click" });
    const todaysPickClicks = await HomepageAnalytics.countDocuments({ eventType: "todays_pick_click" });

    const sectionEngagements = await HomepageAnalytics.aggregate([
      { $group: { _id: "$sectionKey", clicks: { $sum: 1 } } },
      { $sort: { clicks: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      analytics: {
        totalEvents,
        resumeClicks,
        recommendationClicks,
        todaysPickClicks,
        sectionEngagements,
      },
    });
  } catch (error) {
    console.error("Error fetching homepage analytics:", error);
    return res.status(500).json({ message: "Failed to fetch analytics." });
  }
};
