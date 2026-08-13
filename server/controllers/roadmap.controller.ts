import { Request, Response } from "express";
import { Roadmap } from "../models/roadmap.model.js";
import { RoadmapProgress } from "../models/roadmapProgress.model.js";
import { RoadmapBookmark } from "../models/roadmapBookmark.model.js";

let roadmapsSeeded = false;

const seedDefaultRoadmapsIfEmpty = async () => {
  if (roadmapsSeeded) return;
  const count = await Roadmap.countDocuments();
  if (count > 0) {
    roadmapsSeeded = true;
    return;
  }

  const defaultRoadmaps = [
    {
      title: "AI Basics for Beginners",
      titleNp: "शुरुवातकर्ताहरूका लागि AI का आधारभूत कुराहरू",
      slug: "ai-basics-for-beginners",
      description: "Master foundational artificial intelligence concepts, everyday applications, and essential tools from scratch.",
      descriptionNp: "शून्यबाटै कृत्रिम बुद्धिमत्ताका आधारभूत सिद्धान्तहरू र प्रयोगहरू सिक्नुहोस्।",
      category: "AI Basics",
      difficulty: "Beginner",
      estimatedDuration: "2 Hours",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
      icon: "Rocket",
      isFeatured: true,
      isFree: true,
      isPublished: true,
      skills: ["AI Fundamentals", "Machine Learning Intro", "ChatGPT Basics", "Daily AI Productivity"],
      learningOutcomes: [
        "Understand core AI concepts in simple language",
        "Identify real-world AI applications in Nepal",
        "Use ChatGPT for daily learning and work",
      ],
      prerequisites: ["No prior coding or technical knowledge required"],
      targetAudience: ["Students", "Teachers", "Beginners", "Non-tech professionals"],
      modules: [
        {
          title: "Introduction to Artificial Intelligence",
          titleNp: "कृत्रिम बुद्धिमत्ता (AI) को परिचय",
          description: "Learn what AI is, how it works, and its impact on modern life.",
          descriptionNp: "AI भनेको के हो र यसले कसरी काम गर्छ भन्ने बुझ्नुहोस्।",
          estimatedTime: "30 mins",
          difficulty: "Beginner",
          practiceTask: "Ask ChatGPT to explain AI in simple terms in Nepali.",
          miniProject: "Identify 3 AI applications you use daily.",
        },
        {
          title: "ChatGPT & Conversational AI Basics",
          titleNp: "ChatGPT र सम्भाषण AI का आधारहरू",
          description: "Master prompt writing to generate summaries, answers, and study notes.",
          descriptionNp: "सारांश र नोटहरू बनाउन प्रम्प्ट लेख्न सिक्नुहोस्।",
          estimatedTime: "45 mins",
          difficulty: "Beginner",
          practiceTask: "Generate a 5-bullet summary of a study topic using ChatGPT.",
          miniProject: "Create a 5-day study plan with AI assistance.",
        },
        {
          title: "Everyday AI Tools Directory",
          titleNp: "दैनिक AI टुलहरूको प्रयोग",
          description: "Explore search, image, and note-taking AI tools for productivity.",
          descriptionNp: "उत्पादकत्व बढाउने AI टुलहरू प्रयोग गर्नुहोस्।",
          estimatedTime: "45 mins",
          difficulty: "Beginner",
          practiceTask: "Use Perplexity AI for cited web research.",
          miniProject: "Build your personal AI toolkit list.",
        },
      ],
    },
    {
      title: "ChatGPT & Prompt Engineering Mastery",
      titleNp: "ChatGPT र प्रम्प्ट इन्जिनियरिङ ज्ञान",
      description: "Learn advanced prompting frameworks, zero-shot/few-shot prompting, and tone customization.",
      descriptionNp: "आधुनिक प्रम्प्टिङ विधिहरू र ChatGPT का उन्नत शैलीहरू सिक्नुहोस्।",
      category: "AI Basics",
      difficulty: "Intermediate",
      estimatedDuration: "3.5 Hours",
      coverImage: "https://images.unsplash.com/photo-1684369175833-2a832c3f81e6?w=800&auto=format&fit=crop&q=80",
      icon: "MessageSquare",
      isFeatured: true,
      isFree: true,
      isPublished: true,
      skills: ["Prompt Engineering", "Role Prompting", "Few-Shot Examples", "AI Output Tuning"],
      learningOutcomes: [
        "Craft precise prompts for complex tasks",
        "Instruct AI to write, analyze, and format code or documents",
        "Avoid hallucinations with structured constraints",
      ],
      prerequisites: ["Basic understanding of ChatGPT"],
      targetAudience: ["Content Creators", "Marketers", "Students", "Professionals"],
      modules: [
        {
          title: "Prompt Engineering Frameworks",
          titleNp: "प्रम्प्ट इन्जिनियरिङका ढाँचाहरू",
          description: "Master the Role-Task-Context-Format (RTCF) prompting method.",
          descriptionNp: "RTCF प्रम्प्टिङ ढाँचा प्रयोग गरी उत्कृष्ट नतिजा निकाल्नुहोस्।",
          estimatedTime: "60 mins",
          difficulty: "Intermediate",
          practiceTask: "Write a structured prompt using the RTCF framework.",
          miniProject: "Create an AI prompt template library for your work.",
        },
        {
          title: "Few-Shot & Chain-of-Thought Prompting",
          titleNp: "फ्यु-सट र चेन-अफ-थट प्रम्प्टिङ",
          description: "Teach AI complex reasoning by providing examples and step-by-step logic.",
          descriptionNp: "उदाहरणहरू दिएर AI लाई जटिल तार्किक विश्लेषण सिकाउनुहोस्।",
          estimatedTime: "60 mins",
          difficulty: "Intermediate",
          practiceTask: "Build a chain-of-thought prompt for math problem solving.",
          miniProject: "Develop an automated resume reviewing prompt.",
        },
      ],
    },
    {
      title: "AI Development & API Integration",
      titleNp: "AI विकास र API इन्टिग्रेसन",
      description: "Build full-stack AI applications with OpenAI API, LangChain, and RAG vector databases.",
      descriptionNp: "OpenAI API र RAG प्रयोग गरी आधुनिक AI एपहरू निर्माण गर्नुहोस्।",
      category: "Development",
      difficulty: "Advanced",
      estimatedDuration: "5 Hours",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      icon: "Code",
      isFeatured: true,
      isFree: false,
      isPublished: true,
      skills: ["OpenAI API", "Node.js Integration", "RAG Architecture", "Vector Databases"],
      learningOutcomes: [
        "Call LLM APIs from Node.js and React",
        "Build custom AI chatbots with company data",
        "Deploy production-ready AI full-stack applications",
      ],
      prerequisites: ["Basic JavaScript / Node.js knowledge"],
      targetAudience: ["Developers", "Software Engineers", "Tech Students"],
      modules: [
        {
          title: "OpenAI Node.js SDK Setup",
          titleNp: "OpenAI Node.js SDK सेटअप",
          description: "Connect Express backend to OpenAI API with environment key security.",
          descriptionNp: "Express ब्याकएन्डमा OpenAI API सुरक्षित रूपमा जोड्नुहोस्।",
          estimatedTime: "90 mins",
          difficulty: "Advanced",
          practiceTask: "Write a `/api/chat` route in Node.js.",
          miniProject: "Build an AI text generator web app.",
        },
        {
          title: "RAG & Vector Search",
          titleNp: "RAG र भेक्टर सर्च आर्किटेक्चर",
          description: "Store text embeddings and retrieve context for custom document chatbots.",
          descriptionNp: "आफ्ना कागजातहरूमा खोज्न भेक्टर सर्च प्रयोग गर्नुहोस्।",
          estimatedTime: "120 mins",
          difficulty: "Advanced",
          practiceTask: "Generate embeddings for sample PDF documents.",
          miniProject: "Build a PDF Question-Answering bot.",
        },
      ],
    },
    {
      title: "AI Automation for Business & Marketing",
      titleNp: "व्यापार र मार्केटिङको लागि AI अटोमेसन",
      description: "Automate sales outreach, social media copy, customer support, and business workflows using AI.",
      descriptionNp: "AI मार्फत व्यापारिक अटोमेसन र मार्केटिङ बढाउनुहोस्।",
      category: "Business",
      difficulty: "Intermediate",
      estimatedDuration: "4 Hours",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      icon: "Building",
      isFeatured: false,
      isFree: true,
      isPublished: true,
      skills: ["AI Marketing", "Copywriting", "Support Chatbots", "Workflow Automation"],
      learningOutcomes: [
        "Generate Facebook & Instagram ad copy in seconds",
        "Set up AI customer support auto-responders",
        "Automate repetitive office and business tasks",
      ],
      prerequisites: ["None"],
      targetAudience: ["Business Owners", "Marketers", "Freelancers", "Entrepreneurs"],
      modules: [
        {
          title: "AI Copywriting & Content Creation",
          titleNp: "AI कपीराइटिङ र सामग्री सिर्जना",
          description: "Write high-converting ads, email campaigns, and social media captions.",
          descriptionNp: "विज्ञापन र इमेलहरू AI बाट छिटो लेख्नुहोस्।",
          estimatedTime: "60 mins",
          difficulty: "Intermediate",
          practiceTask: "Draft 3 Facebook ad variations for a brand.",
          miniProject: "Create a 30-day social media content calendar.",
        },
      ],
    },
  ];

  await Roadmap.insertMany(defaultRoadmaps);
};

export const getAllRoadmaps = async (req: Request, res: Response): Promise<Response> => {
  try {
    await seedDefaultRoadmapsIfEmpty();

    const { search, category, difficulty, isFree, isFeatured, sort } = req.query;
    const query: Record<string, any> = { isPublished: true };

    if (search && typeof search === "string") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { titleNp: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (difficulty && difficulty !== "All") {
      query.difficulty = difficulty;
    }

    if (isFree === "true") {
      query.isFree = true;
    } else if (isFree === "false") {
      query.isFree = false;
    }

    if (isFeatured === "true") {
      query.isFeatured = true;
    }

    let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "popular") {
      sortOptions = { isFeatured: -1, createdAt: -1 };
    } else if (sort === "duration") {
      sortOptions = { estimatedDuration: 1 };
    }

    const pageNum = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limitParam = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
    const limitNum = limitParam ? Math.min(50, Math.max(1, limitParam)) : 20;
    const skip = (pageNum - 1) * limitNum;

    const [roadmaps, total] = await Promise.all([
      Roadmap.find(query)
        .select("title titleNp slug description descriptionNp category difficulty estimatedDuration coverImage icon isFeatured isFree isPublished skills createdAt")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Roadmap.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Error fetching roadmaps:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmaps",
    });
  }
};

export const getRoadmapBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;
    const roadmap = await Roadmap.findOne({ slug, isPublished: true })
      .populate("modules.courses", "courseTitle coursePrice courseThumbnail category")
      .populate("modules.blogs", "title titleNe slug coverImage readTime")
      .populate("modules.tools", "name slug icon pricingType tagline")
      .populate("modules.prompts", "title slug category pricing")
      .populate("modules.news", "title slug coverImage category");

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Error fetching roadmap by slug:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch roadmap details",
    });
  }
};

export const getRoadmapAdvisorRecommendation = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { role, experience, goal } = req.body;
    await seedDefaultRoadmapsIfEmpty();

    let categoryMatch = "AI Basics";
    if (role === "Developer" || goal === "Build AI Apps") categoryMatch = "Development";
    else if (role === "Business Owner" || goal === "Automate Tasks") categoryMatch = "Business";
    else if (role === "Content Creator" || goal === "Create Content") categoryMatch = "Content Creation";

    let diffMatch = "Beginner";
    if (experience === "Intermediate") diffMatch = "Intermediate";
    else if (experience === "Advanced") diffMatch = "Advanced";

    let roadmaps = await Roadmap.find({
      isPublished: true,
      $or: [{ category: categoryMatch }, { difficulty: diffMatch }],
    }).limit(3);

    if (!roadmaps || roadmaps.length === 0) {
      roadmaps = await Roadmap.find({ isPublished: true }).limit(3);
    }

    return res.status(200).json({
      success: true,
      recommendedCategory: categoryMatch,
      recommendedDifficulty: diffMatch,
      roadmaps,
    });
  } catch (error) {
    console.error("Error running roadmap advisor:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate recommendation",
    });
  }
};

export const toggleBookmark = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id: roadmapId } = req.params;

    const existing = await RoadmapBookmark.findOne({ userId, roadmapId });
    if (existing) {
      await RoadmapBookmark.findByIdAndDelete(existing._id);
      return res.status(200).json({
        success: true,
        isBookmarked: false,
        message: "Removed from bookmarked roadmaps",
      });
    }

    await RoadmapBookmark.create({ userId, roadmapId });
    return res.status(200).json({
      success: true,
      isBookmarked: true,
      message: "Added to bookmarked roadmaps",
    });
  } catch (error) {
    console.error("Error toggling roadmap bookmark:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle bookmark",
    });
  }
};

export const getUserBookmarks = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const bookmarks = await RoadmapBookmark.find({ userId }).populate("roadmapId");
    const roadmaps = bookmarks.map((b) => b.roadmapId).filter(Boolean);

    return res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps,
    });
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarked roadmaps",
    });
  }
};

export const updateRoadmapProgress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id: roadmapId } = req.params;
    const { completedModules, lastAccessedModule } = req.body;

    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }

    const isCompleted = completedModules.length >= roadmap.modules.length;

    let progress = await RoadmapProgress.findOne({ userId, roadmapId });
    if (progress) {
      progress.completedModules = completedModules;
      progress.lastAccessedModule = lastAccessedModule || progress.lastAccessedModule;
      progress.isCompleted = isCompleted;
      if (isCompleted && !progress.completedAt) {
        progress.completedAt = new Date();
      }
      await progress.save();
    } else {
      progress = await RoadmapProgress.create({
        userId,
        roadmapId,
        completedModules,
        lastAccessedModule,
        isCompleted,
        completedAt: isCompleted ? new Date() : null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Progress updated",
      progress,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update progress",
    });
  }
};

export const getUserRoadmapProgress = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { id: roadmapId } = req.params;

    const progress = await RoadmapProgress.findOne({ userId, roadmapId });
    return res.status(200).json({
      success: true,
      progress: progress || { completedModules: [], isCompleted: false },
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch progress",
    });
  }
};

export const createRoadmap = async (req: Request, res: Response): Promise<Response> => {
  try {
    const roadmapData = req.body;
    if (!roadmapData.slug) {
      roadmapData.slug = roadmapData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    roadmapData.createdUser = req.id;

    const roadmap = await Roadmap.create(roadmapData);
    return res.status(201).json({
      success: true,
      message: "Roadmap created successfully",
      roadmap,
    });
  } catch (error: any) {
    console.error("Error creating roadmap:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create roadmap",
    });
  }
};

export const updateRoadmap = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const updated = await Roadmap.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json({
      success: true,
      message: "Roadmap updated successfully",
      roadmap: updated,
    });
  } catch (error) {
    console.error("Error updating roadmap:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update roadmap",
    });
  }
};

export const deleteRoadmap = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await Roadmap.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Roadmap deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete roadmap",
    });
  }
};

export const togglePublishRoadmap = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const roadmap = await Roadmap.findById(id);
    if (!roadmap) return res.status(404).json({ success: false, message: "Roadmap not found" });

    roadmap.isPublished = !roadmap.isPublished;
    await roadmap.save();

    return res.status(200).json({
      success: true,
      message: `Roadmap ${roadmap.isPublished ? "published" : "unpublished"}`,
      roadmap,
    });
  } catch (error) {
    console.error("Error toggling publish state:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to change publish status",
    });
  }
};
