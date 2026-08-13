import { Request, Response } from "express";
import { Prompt } from "../models/prompt.model.js";
import { PromptCategory } from "../models/promptCategory.model.js";

const SEED_PROMPTS = [
  {
    title: "AI Study Notes & Summary Generator",
    slug: "ai-study-notes-summary-generator",
    englishDescription: "Transform any complex article, textbook chapter, or lecture transcript into structured, bulleted study notes with key terms and recall quizzes.",
    nepaliDescription: "कुनै पनि जटिल लेख वा पाठ्यपुस्तकको अध्यायलाई मुख्य शब्दहरू र क्विजसहित विस्तृत नोटमा रूपान्तरण गर्नुहोस्।",
    promptContent: `Act as an expert Academic Educator and Study Assistant. I am providing you with the following study text:

[INSERT TEXT OR TOPIC HERE]

Please structure your response into:
1. Executive Summary (3-4 clear sentences)
2. Key Concepts & Definitions (Bulleted with bold keywords)
3. Step-by-Step Breakdown of important principles
4. 5 Active Recall Quiz Questions with answers hidden below
5. Nepal/Real-World Context Applications (where relevant)

Tone: Academic yet approachable, formatted with clean Markdown headers and bullet points.`,
    promptBreakdown: [
      { sectionTitle: "Role", explanationEn: "Defines AI as an Academic Educator to tailor tone & precision.", explanationNe: "एआईलाई शैक्षिक शिक्षकको भूमिका दिएर स्पष्ट र प्रामाणिक उत्तर प्राप्त गरिन्छ।" },
      { sectionTitle: "Task", explanationEn: "Directs AI to condense raw text into 5 specific learning sections.", explanationNe: "कच्चा सामग्रीलाई ५ वटा मुख्य सिकाइ भागमा विभाजन गर्न निर्देशन दिइन्छ।" },
      { sectionTitle: "Constraints", explanationEn: "Enforces Markdown formatting and bold keywords for active memory retention.", explanationNe: "मार्कडाउन ढाँचा र बोल्ड शब्दहरूको प्रयोग गरी पढ्न सजिलो बनाइन्छ।" },
    ],
    expectedOutputEn: "A beautifully structured study guide featuring executive summary, bold key definitions, recall questions, and practical applications.",
    expectedOutputNe: "मुख्य परिभाषाहरू, सारांश, र ५ वटा क्विज प्रश्नहरूसहित व्यवस्थित अध्ययन गाइड।",
    customizationTipsEn: [
      "Replace '[INSERT TEXT OR TOPIC HERE]' with your lecture notes, PDF content, or web article.",
      "Add 'Explain for a 10th-grade student' to simplify difficult medical or engineering jargon.",
      "Change output language to Nepali by specifying 'Provide definitions in English & Nepali'."
    ],
    customizationTipsNe: [
      "[INSERT TEXT OR TOPIC HERE] को ठाउँमा आफ्नो नोट वा टपिक राख्नुहोस्।",
      "कठिन विषय भएमा '१० कक्षाका विद्यार्थीले बुझ्ने गरी व्याख्या गर' थप्नुहोस्।"
    ],
    practiceChallengeEn: "Try modifying this prompt to generate a 1-page cheat sheet for a computer science or economics exam.",
    practiceChallengeNe: "यो प्रम्प्टलाई परिमार्जन गरी अर्थशास्त्र वा कम्प्युटर परीक्षाको लागि १ पेजको चिट सिट बनाउनुहोस्।",
    difficulty: "Beginner",
    bestFor: ["Students", "Teachers", "Research"],
    tags: ["study", "education", "notes", "summary", "exam-prep"],
    featured: true,
    status: "Published",
  },
  {
    title: "Production-Grade Code Debugger & Refactorer",
    slug: "code-debugger-refactorer",
    englishDescription: "Analyze code snippets for bugs, memory leaks, performance bottlenecks, and security vulnerabilities, complete with corrected code and explanations.",
    nepaliDescription: "कोडमा भएका बगहरू, सेक्युरिटी कमजोरीहरू र पर्फर्मेन्स समस्याहरू पत्ता लगाई सच्याइएको कोड प्राप्त गर्नुहोस्।",
    promptContent: `You are a Principal Software Architect and Senior Code Reviewer. Review the following code snippet:

\`\`\`[LANGUAGE]
// PASTE CODE HERE
\`\`\`

Perform a comprehensive analysis covering:
1. Root Cause Analysis of any bug or issue
2. Fixed & Refactored Code (Clean code principles, modern ES6+/Python/Go standard)
3. Performance & Time Complexity Optimization (Big O notation comparison)
4. Security & Edge Case Vulnerability check
5. Best Practice Unit Test Case suggestion

Format output with clean code blocks and line-by-line annotations.`,
    promptBreakdown: [
      { sectionTitle: "Role", explanationEn: "Establishes senior reviewer perspective to enforce industry standards.", explanationNe: "वरिष्ठ विकासकर्ताको परिप्रेक्ष्यबाट कोड समीक्षा गराइन्छ।" },
      { sectionTitle: "Output Format", explanationEn: "Demands Big-O analysis, unit tests, and security audits alongside code.", explanationNe: "सच्याइएको कोडसँगै सेक्युरिटी र पर्फर्मेन्स रिपोर्ट माग गरिन्छ।" },
    ],
    expectedOutputEn: "Fixed production-ready code with Big-O time complexity improvements and unit tests.",
    expectedOutputNe: "सच्याइएको कोड र पर्फर्मेन्स तुलनात्मक रिपोर्ट।",
    customizationTipsEn: [
      "Specify your framework (e.g. React, Node.js, Django, FastAPI) for framework-specific idioms.",
      "Ask for inline comments in Nepali for beginner team members."
    ],
    customizationTipsNe: [
      "रियाक्ट (React) वा नोड (Node.js) जस्ता फ्रेमवर्क स्पष्ट उल्लेख गर्नुहोस्।"
    ],
    practiceChallengeEn: "Use this prompt to find a memory leak in a async JavaScript loop or Python database query.",
    practiceChallengeNe: "असिंक जाभास्क्रिप्ट वा पाइथन क्वेरीमा बग पत्ता लगाउन यो प्रम्प्ट प्रयोग गर्नुहोस्।",
    difficulty: "Intermediate",
    bestFor: ["Developers", "Programming"],
    tags: ["coding", "debugging", "javascript", "python", "react"],
    featured: true,
    status: "Published",
  },
  {
    title: "Interactive Socratic AI Tutor",
    slug: "interactive-socratic-ai-tutor",
    englishDescription: "Learn any subject through guided questions rather than passive reading. The AI acts like a 1-on-1 tutor that tests your understanding step-by-step.",
    nepaliDescription: "प्रश्न सोधेर चरणबद्ध रूपमा सिकाउने व्यक्तिगत एआई शिक्षक।",
    promptContent: `Act as a patient Socratic Tutor specializing in [SUBJECT/TOPIC]. 

Do NOT give me direct answers immediately. Instead:
1. Briefly introduce the fundamental concept in 2 simple sentences.
2. Ask me ONE targeted question to test my foundational understanding.
3. Wait for my response before giving feedback and asking the next question.
4. If I answer incorrectly, guide me gently with a real-life analogy instead of criticizing.

Begin by introducing the topic and asking your first question.`,
    promptBreakdown: [
      { sectionTitle: "Interactive Protocol", explanationEn: "Prevents AI from dumping massive text blocks; turns interaction into a dialogue.", explanationNe: "एआईलाई एकैचोटि धेरै टेक्स्ट दिनबाट रोकेर संवादमा आधारित बनाउँछ।" },
    ],
    expectedOutputEn: "An engaging, question-driven tutoring session tailored to your learning speed.",
    expectedOutputNe: "व्यक्तिगत संवादमा आधारित प्रभावकारी सिकाइ प्रणाली।",
    customizationTipsEn: [
      "Set your current skill level (e.g. absolute beginner, intermediate student).",
      "Request explanations using Nepali everyday analogies (e.g. tea shop economics, local bus routing)."
    ],
    customizationTipsNe: [
      "नेपाली दैनिक उदाहरणहरू प्रयोग गरेर सम्झाउन भन्नुहोस्।"
    ],
    practiceChallengeEn: "Try learning Quantum Computing or Machine Learning basics using this interactive prompt.",
    practiceChallengeNe: "मेसिन लर्निङ वा क्वान्टम कम्प्युटिङको आधारभूत कुराहरू यसबाट सिक्नुहोस्।",
    difficulty: "Beginner",
    bestFor: ["Students", "Teachers"],
    tags: ["tutor", "socratic", "learning", "education"],
    featured: true,
    status: "Published",
  },
  {
    title: "High-Converting Resume & CV Tailoring Specialist",
    slug: "high-converting-resume-cv-tailoring-specialist",
    englishDescription: "Tailor your resume for ATS screening and specific job descriptions to maximize interview shortlists.",
    nepaliDescription: "आफ्नो बायोडाटा (Resume) लाई ATS र जब डिस्क्रिप्सन अनुसार आकर्षक बनाउनुहोस्।",
    promptContent: `You are an Executive Tech Recruiter and Resume Writing Coach. I am applying for the position of [JOB TITLE] at [COMPANY NAME / INDUSTRY].

Here is the Job Description:
[PASTE JOB DESCRIPTION]

Here is my current Resume:
[PASTE YOUR RESUME]

Please provide:
1. ATS Compatibility Score (0-100%) with missing keywords.
2. Rewritten Professional Summary highlighting matching achievements.
3. Bullet Point Revisions using Action Verbs + Metrics (X-Y-Z formula: Accomplished [X], as measured by [Y], by doing [Z]).
4. Tailored Cover Letter draft in professional tone.`,
    promptBreakdown: [
      { sectionTitle: "Formula", explanationEn: "Uses Google's X-Y-Z formula for impactful resume bullet points.", explanationNe: "गुगलको प्रसिद्ध X-Y-Z फर्मुला अनुसार रेजुमे बनाउँछ।" },
    ],
    expectedOutputEn: "An ATS-optimized resume summary, metrics-driven bullet points, and tailored cover letter.",
    expectedOutputNe: "ATS योग्य बायोडाटा र कभर लेटर।",
    customizationTipsEn: [
      "Add target country/region (e.g. Remote Jobs, Nepal IT Market, Australia/USA job market)."
    ],
    customizationTipsNe: [
      "नेपाल वा विदेश (USA/Australia) को जब मार्केट अनुसार परिमार्जन गर्नुहोस्।"
    ],
    practiceChallengeEn: "Use this prompt to tailor your CV for a Remote Frontend Developer or Content Writer position.",
    practiceChallengeNe: "आफ्नो सीभीलाई रिमोट डेभलपर पदको लागि अद्यावधिक गर्नुहोस्।",
    difficulty: "Intermediate",
    bestFor: ["Resume & Career", "Freelancers"],
    tags: ["resume", "cv", "career", "jobs", "interview"],
    featured: true,
    status: "Published",
  },
  {
    title: "YouTube Script Writer & Hook Specialist",
    slug: "youtube-script-writer-hook-specialist",
    englishDescription: "Create viral YouTube video scripts complete with high-retention hooks, visual cues, and call-to-actions.",
    nepaliDescription: "युट्युब भिडियोको लागि भाइरल स्क्रिप्ट, दृश्य सङ्केत (Visual Cues) र हुक तयार गर्नुहोस्।",
    promptContent: `Act as a Top 1% YouTube Content Strategist and Scriptwriter. 

Topic: [INSERT TOPIC]
Target Audience: [TARGET AUDIENCE]
Target Duration: [e.g. 8-10 minutes]

Generate a complete script structure:
1. 3 Alternative Attention-Grabbing Hooks (0-30 seconds) designed to eliminate drop-off.
2. Intro & Value Proposition.
3. Main Body divided into 3 distinct Chapters with Visual & B-Roll cues [In Brackets].
4. Engagement Trigger (Ask audience a specific comment question).
5. Seamless Outro with Next Video Call-to-Action.`,
    promptBreakdown: [
      { sectionTitle: "Structure", explanationEn: "Ensures maximum viewer retention by pacing hooks, B-Roll, and CTA.", explanationNe: "दर्शकसँगको जोडाइ (Retention) बढाउने गरी स्क्रिप्ट तयार गरिन्छ।" },
    ],
    expectedOutputEn: "Full YouTube script with retention hooks, timing timestamps, and B-Roll cues.",
    expectedOutputNe: "युट्युब भिडियोको पूर्ण संवाद र दृश्य निर्देशनसहितको स्क्रिप्ट।",
    customizationTipsEn: [
      "Specify video tone (e.g. Energetic, Storytelling, Analytical, Educational)."
    ],
    customizationTipsNe: [
      "भिडियोको शैली (उत्साहजनक वा शैक्षिक) उल्लेख गर्नुहोस्।"
    ],
    practiceChallengeEn: "Write a script for a 5-minute video explaining 'How AI will change jobs in 2026'.",
    practiceChallengeNe: "'२०२६ मा एआईले रोजगारी कसरी बदल्छ' विषयमा स्क्रिप्ट बनाउनुहोस्।",
    difficulty: "Beginner",
    bestFor: ["Content Creation", "Video Generation"],
    tags: ["youtube", "script", "video", "content-creator"],
    featured: true,
    status: "Published",
  },
];

let promptsSeeded = false;

const autoSeedPrompts = async () => {
  if (promptsSeeded) return;
  try {
    const count = await Prompt.countDocuments();
    if (count === 0) {
      let defaultCat = await PromptCategory.findOne();
      if (!defaultCat) {
        defaultCat = await PromptCategory.create({ name: "Prompt Engineering", slug: "prompt-engineering" });
      }

      for (const sp of SEED_PROMPTS) {
        let cat = await PromptCategory.findOne({ name: sp.bestFor[0] });
        if (!cat) cat = defaultCat;

        await Prompt.create({
          ...sp,
          category: cat._id,
        });
      }
      console.log("Auto-seeded initial high-quality prompts.");
    }
    promptsSeeded = true;
  } catch (err) {
    console.error("Error auto-seeding prompts:", err);
  }
};

export const createPrompt = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      title,
      englishDescription,
      nepaliDescription,
      promptContent,
      promptBreakdown,
      expectedOutputEn,
      expectedOutputNe,
      customizationTipsEn,
      customizationTipsNe,
      practiceChallengeEn,
      practiceChallengeNe,
      difficulty,
      bestFor,
      tags,
      category,
      aiTools,
      relatedBlogs,
      relatedCourses,
      featuredImage,
      faq,
      featured,
      status,
      seoTitle,
      seoDescription,
    } = req.body;

    if (!title || !englishDescription || !promptContent || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, English Description, Prompt Content, and Category are required.",
      });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const existingPrompt = await Prompt.findOne({ slug });
    if (existingPrompt) {
      return res.status(400).json({
        success: false,
        message: "A prompt with this title or slug already exists.",
      });
    }

    const prompt = await Prompt.create({
      title,
      slug,
      englishDescription,
      nepaliDescription,
      promptContent,
      promptBreakdown: typeof promptBreakdown === "string" ? JSON.parse(promptBreakdown) : promptBreakdown || [],
      expectedOutputEn,
      expectedOutputNe,
      customizationTipsEn: typeof customizationTipsEn === "string" ? JSON.parse(customizationTipsEn) : customizationTipsEn || [],
      customizationTipsNe: typeof customizationTipsNe === "string" ? JSON.parse(customizationTipsNe) : customizationTipsNe || [],
      practiceChallengeEn,
      practiceChallengeNe,
      difficulty: difficulty || "Beginner",
      bestFor: typeof bestFor === "string" ? JSON.parse(bestFor) : bestFor || [],
      tags: typeof tags === "string" ? JSON.parse(tags) : tags || [],
      category,
      aiTools: typeof aiTools === "string" ? JSON.parse(aiTools) : aiTools || [],
      relatedBlogs: typeof relatedBlogs === "string" ? JSON.parse(relatedBlogs) : relatedBlogs || [],
      relatedCourses: typeof relatedCourses === "string" ? JSON.parse(relatedCourses) : relatedCourses || [],
      featuredImage: featuredImage || "",
      faq: typeof faq === "string" ? JSON.parse(faq) : faq || [],
      featured: featured === true || featured === "true",
      status: status || "Published",
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || englishDescription,
      createdBy: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Prompt created successfully",
      prompt,
    });
  } catch (error: any) {
    console.error("Error creating prompt:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPrompts = async (req: Request, res: Response): Promise<Response> => {
  try {
    await autoSeedPrompts();

    const {
      category,
      aiTool,
      difficulty,
      search,
      featured,
      sort = "popular",
      page = 1,
      limit = 12,
    } = req.query;

    const query: Record<string, any> = { status: "Published" };

    if (category && typeof category === "string") {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const catObj = await PromptCategory.findOne({ slug: category });
        if (catObj) query.category = catObj._id;
      }
    }

    if (aiTool) {
      query.aiTools = aiTool;
    }

    if (difficulty && difficulty !== "All") {
      query.difficulty = difficulty;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search && typeof search === "string") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { englishDescription: { $regex: search, $options: "i" } },
        { promptContent: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "popular") sortOptions = { copiesCount: -1, views: -1 };
    if (sort === "name") sortOptions = { title: 1 };
    if (sort === "featured") sortOptions = { featured: -1, createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [prompts, total] = await Promise.all([
      Prompt.find(query)
        .select("title slug englishDescription nepaliDescription promptContent difficulty bestFor tags category aiTools featured copiesCount views createdAt")
        .populate("category", "name slug icon color")
        .populate("aiTools", "name slug logo pricingType")
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Prompt.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      prompts,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / Number(limit)) || 1,
        limit: Number(limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching prompts:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedPrompts = async (_: Request, res: Response): Promise<Response> => {
  try {
    await autoSeedPrompts();

    const prompts = await Prompt.find({ status: "Published", featured: true })
      .select("title slug englishDescription nepaliDescription promptContent difficulty bestFor tags category aiTools featured copiesCount views createdAt")
      .populate("category", "name slug icon color")
      .populate("aiTools", "name slug logo")
      .sort({ copiesCount: -1, createdAt: -1 })
      .limit(6)
      .lean();

    return res.status(200).json({
      success: true,
      prompts,
    });
  } catch (error: any) {
    console.error("Error fetching featured prompts:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPromptBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;

    const prompt = await Prompt.findOne({ slug })
      .populate<{ category: any }>("category", "name slug icon color description")
      .populate("aiTools", "name slug logo websiteUrl pricingType tagline")
      .populate("relatedBlogs", "title slug thumbnail summary category")
      .populate("relatedCourses", "courseTitle courseThumbnail coursePrice level");

    if (!prompt) {
      return res.status(404).json({ success: false, message: "Prompt not found" });
    }

    prompt.views = (prompt.views || 0) + 1;
    await prompt.save();

    const similarPrompts = await Prompt.find({
      category: prompt.category?._id,
      _id: { $ne: prompt._id },
      status: "Published",
    })
      .populate("category", "name slug")
      .populate("aiTools", "name logo")
      .limit(4);

    return res.status(200).json({
      success: true,
      prompt,
      similarPrompts,
    });
  } catch (error: any) {
    console.error("Error fetching prompt by slug:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const incrementCopyCount = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findByIdAndUpdate(id, { $inc: { copiesCount: 1 } }, { new: true });
    return res.status(200).json({
      success: true,
      copiesCount: prompt?.copiesCount || 0,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAdminPrompts = async (_: Request, res: Response): Promise<Response> => {
  try {
    const prompts = await Prompt.find()
      .populate("category", "name slug")
      .populate("aiTools", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      prompts,
    });
  } catch (error: any) {
    console.error("Error fetching admin prompts:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePrompt = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findById(id);

    if (!prompt) {
      return res.status(404).json({ success: false, message: "Prompt not found" });
    }

    const fieldsToUpdate = [
      "title",
      "englishDescription",
      "nepaliDescription",
      "promptContent",
      "expectedOutputEn",
      "expectedOutputNe",
      "practiceChallengeEn",
      "practiceChallengeNe",
      "difficulty",
      "category",
      "featuredImage",
      "featured",
      "status",
      "seoTitle",
      "seoDescription",
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        (prompt as any)[field] = req.body[field];
      }
    });

    if (req.body.title && req.body.title !== prompt.title) {
      prompt.slug = req.body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    if (req.body.promptBreakdown) {
      prompt.promptBreakdown = typeof req.body.promptBreakdown === "string" ? JSON.parse(req.body.promptBreakdown) : req.body.promptBreakdown;
    }
    if (req.body.customizationTipsEn) {
      prompt.customizationTipsEn = typeof req.body.customizationTipsEn === "string" ? JSON.parse(req.body.customizationTipsEn) : req.body.customizationTipsEn;
    }
    if (req.body.customizationTipsNe) {
      prompt.customizationTipsNe = typeof req.body.customizationTipsNe === "string" ? JSON.parse(req.body.customizationTipsNe) : req.body.customizationTipsNe;
    }
    if (req.body.bestFor) {
      prompt.bestFor = typeof req.body.bestFor === "string" ? JSON.parse(req.body.bestFor) : req.body.bestFor;
    }
    if (req.body.tags) {
      prompt.tags = typeof req.body.tags === "string" ? JSON.parse(req.body.tags) : req.body.tags;
    }
    if (req.body.aiTools) {
      prompt.aiTools = typeof req.body.aiTools === "string" ? JSON.parse(req.body.aiTools) : req.body.aiTools;
    }
    if (req.body.relatedBlogs) {
      prompt.relatedBlogs = typeof req.body.relatedBlogs === "string" ? JSON.parse(req.body.relatedBlogs) : req.body.relatedBlogs;
    }
    if (req.body.relatedCourses) {
      prompt.relatedCourses = typeof req.body.relatedCourses === "string" ? JSON.parse(req.body.relatedCourses) : req.body.relatedCourses;
    }
    if (req.body.faq) {
      prompt.faq = typeof req.body.faq === "string" ? JSON.parse(req.body.faq) : req.body.faq;
    }

    await prompt.save();

    return res.status(200).json({
      success: true,
      message: "Prompt updated successfully",
      prompt,
    });
  } catch (error: any) {
    console.error("Error updating prompt:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePrompt = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.findByIdAndDelete(id);
    if (!prompt) {
      return res.status(404).json({ success: false, message: "Prompt not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Prompt deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting prompt:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
