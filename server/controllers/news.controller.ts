import { Request, Response } from "express";
import { News } from "../models/news.model.js";
import { NewsCategory } from "../models/newsCategory.model.js";
import { NewsTag } from "../models/newsTag.model.js";

const SEED_NEWS_ARTICLES = [
  {
    title: "OpenAI Announces Next-Gen Reasoning Model Capabilities & Global Expansion",
    slug: "openai-announces-next-gen-reasoning-model-capabilities",
    subtitle: "New breakthrough models deliver enhanced multi-step logic, code execution, and autonomous problem-solving for developers globally.",
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&q=80",
    content: `OpenAI has unveiled its latest generation of advanced AI reasoning models, setting new industry benchmarks in mathematical proofs, complex coding, and multi-step logic.

The new model architecture incorporates continuous chain-of-thought processing before generating output, resulting in significantly fewer hallucinations and near-perfect execution on complex technical prompts.

### Key Architectural Improvements
- **Deep System Reasoning**: The model takes additional processing seconds to self-correct logic before printing final answers.
- **Enhanced Coding Execution**: Integrated sandbox testing allows automatic bug detection before returning code.
- **Multimodal Perception**: Native understanding of charts, engineering schematics, and UI mockups.

Industry leaders predict this release will accelerate enterprise automation and personalized tutoring platforms across Asia and developing tech hubs.`,
    keyTakeaways: [
      "New chain-of-thought reasoning reduces hallucinations by over 60%.",
      "Developers can run multi-step code execution directly in API calls.",
      "Enhanced support for non-English languages including Nepali and South Asian scripts."
    ],
    whyItMattersEn: "This release shifts AI from simple text generation to true autonomous problem solving, making complex software engineering and research accessible to everyone.",
    whyItMattersNe: "यस प्रविधिले साधारण टेक्स्ट जनरेसनलाई स्वायत्त समस्या समाधानमा बदलेको छ, जसले गर्दा जटिल सफ्टवेयर कोडिङ र अनुसन्धान सबैका लागि सहज हुनेछ।",
    nepalPerspective: {
      students: "Students can use AI as a 24/7 personal STEM tutor that breaks down complex math and programming problems step-by-step.",
      developers: "Nepali developers can build advanced agentic workflows and automate code reviews for international client projects.",
      businesses: "Local tech startups can deploy smarter customer support and automated workflow bots at a fraction of previous costs.",
      teachers: "Educators can auto-generate tailored assignments, lesson guides, and exam solutions formatted to local curricula."
    },
    readingTime: "4 min read",
    breakingNews: true,
    featured: true,
    status: "Published",
  },
  {
    title: "Google Gemini 2.5 Introduces Real-Time Voice & Spatial Multimodal Intelligence",
    slug: "google-gemini-2-5-real-time-voice-spatial-intelligence",
    subtitle: "Google expands Gemini's capabilities with sub-100ms latency voice interaction and live camera understanding.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    content: `Google DeepMind has officially rolled out Gemini 2.5, featuring ultra-low latency voice responses and real-time spatial video processing.

With live camera vision, users can point their smartphone camera at hardware components, math equations, or handwritten diagrams and receive instantaneous audio feedback.

### Features Highlight
- **Sub-100ms Audio Latency**: Natural conversational interruptions and tone modulation.
- **Live Video Parsing**: Understands real-time physical space and object manipulation.
- **Long Context Window**: 2 Million token context support for processing full codebases or textbooks.`,
    keyTakeaways: [
      "Real-time audio-visual interaction directly through mobile smartphones.",
      "2 Million token context window supports analyzing entire books or video lectures.",
      "Seamless integration with Google Workspace tools."
    ],
    whyItMattersEn: "Real-time visual and audio AI turns smartphones into interactive tutors and field assistants for technical work.",
    whyItMattersNe: "लाइभ क्यामेरा र भ्वाइस एआईले स्मार्टफोनलाई प्राविधिक काम र पढाइको लागि प्रत्यक्ष व्यक्तिगत सहायकमा परिणत गर्दछ।",
    nepalPerspective: {
      students: "Enables instant visual homework help by aiming the phone camera at textbook exercises.",
      developers: "Empowers mobile developers in Nepal to create futuristic voice-activated AI apps."
    },
    readingTime: "3 min read",
    breakingNews: false,
    featured: true,
    status: "Published",
  },
  {
    title: "Nepal's Tech Ecosystem Embraces Generative AI in Higher Education & Software Exports",
    slug: "nepal-tech-ecosystem-embraces-generative-ai",
    subtitle: "Kathmandu tech hubs and universities integrate AI prompt engineering and machine learning into computer science curricula.",
    coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
    content: `Tech companies and universities in Nepal are rapidly adopting generative AI tools to boost developer productivity and prepare students for global remote careers.

Local software firms report a 40% increase in sprint velocity by integrating AI coding assistants, while universities are introducing specialized AI ethics and prompt engineering courses.

### Impact Across Sectors
- **IT Exports**: IT outsourcing companies in Kathmandu are delivering software solutions faster to clients in Europe and North America.
- **Educational Reform**: Colleges are shifting from memorization to prompt-driven problem solving and critical evaluation.`,
    keyTakeaways: [
      "Nepal's IT industry is capitalizing on AI tools to increase software export efficiency.",
      "Academic institutions are revising curricula to focus on hands-on AI skillsets.",
      "Growing demand for bilingual Nepali prompt engineers and AI trainers."
    ],
    whyItMattersEn: "Adopting modern AI tooling allows Nepal's growing IT workforce to compete globally without geographical constraints.",
    whyItMattersNe: "आधुनिक एआई प्रविधिको प्रयोगले नेपालका विकासकर्ताहरूलाई विश्वव्यापी बजारमा प्रतिस्पर्धा गर्न ठूलो अवसर प्रदान गर्दछ।",
    nepalPerspective: {
      students: "Gives Nepali graduates competitive skills for international remote engineering positions.",
      businesses: "Enables IT service providers to deliver projects faster with higher profit margins."
    },
    readingTime: "5 min read",
    breakingNews: false,
    featured: true,
    status: "Published",
  },
];

let newsSeeded = false;

const autoSeedNews = async () => {
  if (newsSeeded) return;
  try {
    const count = await News.countDocuments();
    if (count === 0) {
      let defaultCat = await NewsCategory.findOne();
      if (!defaultCat) {
        defaultCat = await NewsCategory.create({ name: "AI Research", slug: "ai-research" });
      }

      for (const item of SEED_NEWS_ARTICLES) {
        await News.create({
          ...item,
          category: defaultCat._id,
        });
      }
      console.log("Auto-seeded initial AI news articles.");
    }
    newsSeeded = true;
  } catch (err) {
    console.error("Error auto-seeding news:", err);
  }
};

export const createNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      title,
      subtitle,
      coverImage,
      content,
      keyTakeaways,
      whyItMattersEn,
      whyItMattersNe,
      nepalPerspective,
      author,
      readingTime,
      breakingNews,
      featured,
      status,
      category,
      tags,
      relatedTools,
      relatedBlogs,
      relatedCourses,
      faq,
      seoTitle,
      seoDescription,
      seoKeywords,
    } = req.body;

    if (!title || !content || !coverImage || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, Content, Cover Image, and Category are required.",
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existingNews = await News.findOne({ slug });
    if (existingNews) {
      return res.status(400).json({
        success: false,
        message: "An article with this title or slug already exists.",
      });
    }

    const newsItem = await News.create({
      title,
      slug,
      subtitle,
      coverImage,
      content,
      keyTakeaways: typeof keyTakeaways === "string" ? JSON.parse(keyTakeaways) : keyTakeaways || [],
      whyItMattersEn,
      whyItMattersNe,
      nepalPerspective: typeof nepalPerspective === "string" ? JSON.parse(nepalPerspective) : nepalPerspective || {},
      author: typeof author === "string" ? JSON.parse(author) : author || {},
      readingTime: readingTime || "4 min read",
      breakingNews: breakingNews === true || breakingNews === "true",
      featured: featured === true || featured === "true",
      status: status || "Published",
      category,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags || [],
      relatedTools: typeof relatedTools === "string" ? JSON.parse(relatedTools) : relatedTools || [],
      relatedBlogs: typeof relatedBlogs === "string" ? JSON.parse(relatedBlogs) : relatedBlogs || [],
      relatedCourses: typeof relatedCourses === "string" ? JSON.parse(relatedCourses) : relatedCourses || [],
      faq: typeof faq === "string" ? JSON.parse(faq) : faq || [],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || subtitle,
      seoKeywords: typeof seoKeywords === "string" ? JSON.parse(seoKeywords) : seoKeywords || [],
      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "News article created successfully",
      news: newsItem,
    });
  } catch (error: any) {
    console.error("Error creating news article:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    await autoSeedNews();

    const {
      category,
      tag,
      search,
      breaking,
      featured,
      sort = "newest",
      page = 1,
      limit = 12,
    } = req.query;

    const query: Record<string, any> = { status: "Published" };

    if (category && typeof category === "string") {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const catObj = await NewsCategory.findOne({ slug: category });
        if (catObj) query.category = catObj._id;
      }
    }

    if (tag && typeof tag === "string") {
      if (tag.match(/^[0-9a-fA-F]{24}$/)) {
        query.tags = tag;
      } else {
        const tagObj = await NewsTag.findOne({ slug: tag });
        if (tagObj) query.tags = tagObj._id;
      }
    }

    if (breaking === "true") {
      query.breakingNews = true;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search && typeof search === "string") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { whyItMattersEn: { $regex: search, $options: "i" } },
      ];
    }

    let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "popular") sortOptions = { views: -1, createdAt: -1 };
    if (sort === "oldest") sortOptions = { createdAt: 1 };

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(50, Math.max(1, Number(limit) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [news, total, breakingNewsList] = await Promise.all([
      News.find(query)
        .select("-content")
        .populate("category", "name slug icon color")
        .populate("tags", "name slug")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      News.countDocuments(query),
      News.find({ status: "Published", breakingNews: true })
        .select("title slug createdAt")
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return res.status(200).json({
      success: true,
      news,
      breakingNewsList,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLatestNews = async (_: Request, res: Response): Promise<Response> => {
  try {
    await autoSeedNews();

    const news = await News.find({ status: "Published" })
      .select("-content")
      .populate("category", "name slug icon color")
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();

    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error: any) {
    console.error("Error fetching latest news:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getNewsBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;

    const article = await News.findOne({ slug })
      .populate<{ category: any }>("category", "name slug icon color description")
      .populate("tags", "name slug")
      .populate("relatedTools", "name slug logo websiteUrl pricingType tagline")
      .populate("relatedBlogs", "title slug thumbnail summary category")
      .populate("relatedCourses", "courseTitle courseThumbnail coursePrice level");

    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }

    article.views = (article.views || 0) + 1;
    await article.save();

    const similarNews = await News.find({
      category: article.category?._id,
      _id: { $ne: article._id },
      status: "Published",
    })
      .populate("category", "name slug")
      .limit(4);

    return res.status(200).json({
      success: true,
      article,
      similarNews,
    });
  } catch (error: any) {
    console.error("Error fetching news by slug:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminNews = async (_: Request, res: Response): Promise<Response> => {
  try {
    const news = await News.find()
      .populate("category", "name slug")
      .populate("tags", "name slug")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      news,
    });
  } catch (error: any) {
    console.error("Error fetching admin news:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const article = await News.findById(id);

    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }

    const fieldsToUpdate = [
      "title",
      "subtitle",
      "coverImage",
      "content",
      "whyItMattersEn",
      "whyItMattersNe",
      "readingTime",
      "breakingNews",
      "featured",
      "status",
      "category",
      "seoTitle",
      "seoDescription",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        (article as any)[field] = req.body[field];
      }
    });

    if (req.body.title && req.body.title !== article.title) {
      article.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    if (req.body.keyTakeaways) {
      article.keyTakeaways = typeof req.body.keyTakeaways === "string" ? JSON.parse(req.body.keyTakeaways) : req.body.keyTakeaways;
    }
    if (req.body.nepalPerspective) {
      article.nepalPerspective = typeof req.body.nepalPerspective === "string" ? JSON.parse(req.body.nepalPerspective) : req.body.nepalPerspective;
    }
    if (req.body.author) {
      article.author = typeof req.body.author === "string" ? JSON.parse(req.body.author) : req.body.author;
    }
    if (req.body.tags) {
      article.tags = typeof req.body.tags === "string" ? JSON.parse(req.body.tags) : req.body.tags;
    }
    if (req.body.relatedTools) {
      article.relatedTools = typeof req.body.relatedTools === "string" ? JSON.parse(req.body.relatedTools) : req.body.relatedTools;
    }
    if (req.body.relatedBlogs) {
      article.relatedBlogs = typeof req.body.relatedBlogs === "string" ? JSON.parse(req.body.relatedBlogs) : req.body.relatedBlogs;
    }
    if (req.body.relatedCourses) {
      article.relatedCourses = typeof req.body.relatedCourses === "string" ? JSON.parse(req.body.relatedCourses) : req.body.relatedCourses;
    }
    if (req.body.faq) {
      article.faq = typeof req.body.faq === "string" ? JSON.parse(req.body.faq) : req.body.faq;
    }
    if (req.body.seoKeywords) {
      article.seoKeywords = typeof req.body.seoKeywords === "string" ? JSON.parse(req.body.seoKeywords) : req.body.seoKeywords;
    }

    await article.save();

    return res.status(200).json({
      success: true,
      message: "Article updated successfully",
      news: article,
    });
  } catch (error: any) {
    console.error("Error updating news article:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const article = await News.findByIdAndDelete(id);
    if (!article) {
      return res.status(404).json({ success: false, message: "Article not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting news article:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
