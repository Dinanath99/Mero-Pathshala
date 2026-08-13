import { Request, Response } from "express";
import { Tool } from "../models/tool.model.js";
import { ToolCategory } from "../models/toolCategory.model.js";
import { uploadMedia } from "../utils/cloudinary.js";
import slugify from "slugify";

const parseArrayField = (val: any): any[] => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      if (val.startsWith("[") || val.startsWith("{")) {
        return JSON.parse(val);
      }
      return val.split(",").map((item) => item.trim()).filter(Boolean);
    } catch (e) {
      return val.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }
  return [];
};

const parseObjectField = (val: any): any => {
  if (!val) return null;
  if (typeof val === "object" && !Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const createTool = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      tagline,
      description,
      descriptionNe,
      websiteUrl,
      category,
      pricingType,
      pricingDetails,
      features,
      platforms,
      bestFor,
      faq,
      status,
      featured,
      seoTitle,
      seoDescription,
      relatedBlogs,
      relatedCourses,
      learningObjectives,
      tutorialSteps,
      useCases,
      practiceExercises,
      videoUrl,
      bestPractices,
      commonMistakes,
      advantages,
      limitations,
      pricingTiers,
      quiz,
      summary,
    } = req.body;

    const userId = req.id;

    if (!name || !description || !websiteUrl || !category) {
      return res.status(400).json({ success: false, message: "Missing required fields (name, description, websiteUrl, category)" });
    }

    let slug = slugify(name, { lower: true, strict: true });
    const existing = await Tool.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    let logoUrl = "";
    let coverImageUrl = "";
    const screenshotUrls: string[] = [];

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    if (files) {
      if (files.logo && files.logo[0]) {
        const cloudRes = await uploadMedia(files.logo[0].path);
        if (cloudRes?.secure_url) logoUrl = cloudRes.secure_url;
      }
      if (files.coverImage && files.coverImage[0]) {
        const cloudRes = await uploadMedia(files.coverImage[0].path);
        if (cloudRes?.secure_url) coverImageUrl = cloudRes.secure_url;
      }
      if (files.screenshots && files.screenshots.length > 0) {
        for (const file of files.screenshots) {
          const cloudRes = await uploadMedia(file.path);
          if (cloudRes?.secure_url) {
            screenshotUrls.push(cloudRes.secure_url);
          }
        }
      }
    }

    if (!logoUrl && req.body.logo) {
      logoUrl = req.body.logo;
    }
    if (!coverImageUrl && req.body.coverImage) {
      coverImageUrl = req.body.coverImage;
    }

    if (!logoUrl) {
      return res.status(400).json({ success: false, message: "Tool logo is required" });
    }

    const parsedFeatures = parseArrayField(features);
    const parsedPlatforms = parseArrayField(platforms);
    const parsedBestFor = parseArrayField(bestFor);
    const parsedFaq = parseArrayField(faq);
    const parsedRelatedBlogs = parseArrayField(relatedBlogs);
    const parsedRelatedCourses = parseArrayField(relatedCourses);
    const parsedScreenshots = screenshotUrls.length > 0 ? screenshotUrls : parseArrayField(req.body.screenshots);

    const parsedLearningObjectives = parseArrayField(learningObjectives);
    const parsedTutorialSteps = parseArrayField(tutorialSteps);
    const parsedUseCases = parseArrayField(useCases);
    const parsedPracticeExercises = parseArrayField(practiceExercises);
    const parsedBestPractices = parseObjectField(bestPractices) || { dos: [], donts: [], tips: [] };
    const parsedCommonMistakes = parseArrayField(commonMistakes);
    const parsedAdvantages = parseArrayField(advantages);
    const parsedLimitations = parseArrayField(limitations);
    const parsedPricingTiers = parseArrayField(pricingTiers);
    const parsedQuiz = parseArrayField(quiz);
    const parsedSummary = parseObjectField(summary) || { takeawaysEn: [], takeawaysNe: [] };

    const tool = await Tool.create({
      name,
      slug,
      tagline: tagline || "",
      description,
      descriptionNe: descriptionNe || "",
      logo: logoUrl,
      coverImage: coverImageUrl,
      websiteUrl,
      category,
      pricingType: pricingType || "Freemium",
      pricingDetails: pricingDetails || "",
      features: parsedFeatures,
      platforms: parsedPlatforms,
      screenshots: parsedScreenshots,
      bestFor: parsedBestFor,
      faq: parsedFaq,
      status: status || "Published",
      featured: featured === true || featured === "true",
      seoTitle: seoTitle || name,
      seoDescription: seoDescription || tagline || description.slice(0, 160),
      relatedBlogs: parsedRelatedBlogs,
      relatedCourses: parsedRelatedCourses,
      author: userId,
      learningObjectives: parsedLearningObjectives,
      tutorialSteps: parsedTutorialSteps,
      useCases: parsedUseCases,
      practiceExercises: parsedPracticeExercises,
      videoUrl: videoUrl || "",
      bestPractices: parsedBestPractices,
      commonMistakes: parsedCommonMistakes,
      advantages: parsedAdvantages,
      limitations: parsedLimitations,
      pricingTiers: parsedPricingTiers,
      quiz: parsedQuiz,
      summary: parsedSummary,
    });

    return res.status(201).json({ success: true, message: "AI Tool educational entry created successfully", tool });
  } catch (error) {
    console.error("Create tool error:", error);
    return res.status(500).json({ success: false, message: "Failed to create tool" });
  }
};

export const getTools = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { category, search, pricingType, featured, sort, page = 1, limit = 12 } = req.query;

    const query: Record<string, any> = { status: "Published" };

    if (category && typeof category === "string") {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        query.category = category;
      } else {
        const catDoc = await ToolCategory.findOne({ slug: category });
        if (catDoc) query.category = catDoc._id;
      }
    }

    if (pricingType && pricingType !== "All") {
      query.pricingType = pricingType;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (search && typeof search === "string") {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { tagline: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { descriptionNe: { $regex: search, $options: "i" } },
        { bestFor: { $regex: search, $options: "i" } },
      ];
    }

    let sortOptions: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === "popular") sortOptions = { views: -1, createdAt: -1 };
    if (sort === "name") sortOptions = { name: 1 };
    if (sort === "featured") sortOptions = { featured: -1, createdAt: -1 };

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [tools, total] = await Promise.all([
      Tool.find(query)
        .select("name slug tagline logo coverImage websiteUrl category pricingType pricingDetails views featured bestFor platforms createdAt")
        .populate("category", "name slug icon")
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Tool.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      tools,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error("Get tools error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch tools" });
  }
};

export const getFeaturedTools = async (_: Request, res: Response): Promise<Response> => {
  try {
    const tools = await Tool.find({ status: "Published", featured: true })
      .select("name slug tagline logo coverImage category pricingType views featured bestFor")
      .populate("category", "name slug icon")
      .sort({ views: -1, createdAt: -1 })
      .limit(6)
      .lean();

    return res.status(200).json({ success: true, tools });
  } catch (error) {
    console.error("Get featured tools error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch featured tools" });
  }
};

export const getToolBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;

    const tool = await Tool.findOne({ slug, status: "Published" })
      .populate<{ category: any }>("category", "name slug icon description")
      .populate("relatedBlogs", "title slug excerpt featuredImage publishedAt readingTime")
      .populate("relatedCourses", "courseTitle coursePrice courseThumbnail subTitle");

    if (!tool) {
      return res.status(404).json({ success: false, message: "AI Tool learning module not found" });
    }

    tool.views += 1;
    await tool.save();

    const relatedTools = await Tool.find({
      category: tool.category._id,
      _id: { $ne: tool._id },
      status: "Published",
    })
      .populate("category", "name slug")
      .limit(4);

    const toolObj = tool.toObject();

    if (!toolObj.descriptionNe) {
      toolObj.descriptionNe = `${tool.name} एक शक्तिशाली AI उपकरण हो जसले प्रयोगकर्ताहरूलाई द्रुत, सहज र प्रभावकारी ढङ्गले कार्यहरू सम्पन्न गर्न मद्दत गर्दछ।`;
    }

    if (!toolObj.learningObjectives || toolObj.learningObjectives.length === 0) {
      toolObj.learningObjectives = [
        { en: `Understand the core capabilities of ${tool.name}.`, ne: `${tool.name} को मुख्य क्षमताहरू बुझ्नुहोस्।` },
        { en: "Learn how to formulate effective prompts and workflows.", ne: "प्रभावकारी प्रम्प्टहरू र कार्यप्रवाह तयार गर्ने तरिका सिक्नुहोस्।" },
        { en: "Identify real-world use cases in Nepal for productivity and learning.", ne: "उत्पादकत्व र सिकाइका लागि नेपालमा व्यावहारिक प्रयोगहरू पहिचान गर्नुहोस्।" },
        { en: "Recognize limitations, best practices, and ethical guidelines.", ne: "सीमाहरू, उत्कृष्ट अभ्यासहरू, र नैतिक दिशानिर्देशहरू पहिचान गर्नुहोस्।" },
      ];
    }

    if (!toolObj.tutorialSteps || toolObj.tutorialSteps.length === 0) {
      toolObj.tutorialSteps = [
        {
          stepNumber: 1,
          titleEn: `Visit Official Website & Sign Up`,
          titleNe: `आधिकारिक वेबसाइटमा जानुहोस् र दर्ता गर्नुहोस्`,
          descEn: `Go to ${tool.websiteUrl} and create a free account using Google or Email.`,
          descNe: `${tool.websiteUrl} मा जानुहोस् र गुगल वा इमेल प्रयोग गरेर निःशुल्क खाता बनाउनुहोस्।`,
        },
        {
          stepNumber: 2,
          titleEn: `Explore the User Interface`,
          titleNe: `उपयोगकर्ता इन्टरफेस बुझ्नुहोस्`,
          descEn: `Locate the main input field, model selector, sidebar history, and workspace settings.`,
          descNe: `मुख्य इनपुट बक्स, मोडल चयन, इतिहास र सेटिङहरू पहिचान गर्नुहोस्।`,
        },
        {
          stepNumber: 3,
          titleEn: `Write Your First Prompt`,
          titleNe: `आफ्नो पहिलो प्रम्प्ट लेख्नुहोस्`,
          descEn: `Type a clear prompt explaining context, instructions, and desired format.`,
          descNe: `सन्दर्भ, निर्देशन र चाहेको ढाँचा स्पष्ट खुलाई आफ्नो पहिलो प्रम्प्ट टाइप गर्नुहोस्।`,
        },
        {
          stepNumber: 4,
          titleEn: `Evaluate & Refine Output`,
          titleNe: `नतिजाको मूल्याङ्कन र परिमार्जन गर्नुहोस्`,
          descEn: `Review generated output, give follow-up prompts to polish tone, detail, or accuracy.`,
          descNe: `प्राप्त नतिजा जाँच्नुहोस् र सुधारका लागि पुनः थप निर्देशन (Follow-up) दिनुहोस्।`,
        },
        {
          stepNumber: 5,
          titleEn: `Export & Integrate into Workflows`,
          titleNe: `नतिजा सेभ र प्रयोग गर्नुहोस्`,
          descEn: `Copy results, save to documents, or share with teammates for maximum productivity.`,
          descNe: `नतिजा प्रतिलिपि गर्नुहोस्, कागजातमा सेभ गर्नुहोस् वा टोलीसँग सेयर गर्नुहोस्।`,
        },
      ];
    }

    if (!toolObj.useCases || toolObj.useCases.length === 0) {
      toolObj.useCases = [
        {
          role: "Students",
          titleEn: "Exam Prep & Concept Explanation",
          titleNe: "परीक्षा तयारी र अवधारणा बुझ्न",
          exampleEn: `Ask ${tool.name} to explain complex topics like quantum physics or Nepali history in simple terms.`,
          exampleNe: `${tool.name} लाई जटिल विषयहरू सरल नेपाली वा अंग्रेजी भाषामा सम्झाउन लगाउनुहोस्।`,
        },
        {
          role: "Developers",
          titleEn: "Code Generation & Debugging",
          titleNe: "कोडिङ र बगहरू सच्याउन",
          exampleEn: `Use ${tool.name} to write boilerplate React components, debug async functions, or explain SQL queries.`,
          exampleNe: `React कम्पोनेन्टहरू लेख्न, बगहरू पत्ता लगाउन र SQL कोइरी बुझ्न प्रयोग गर्नुहोस्।`,
        },
        {
          role: "Teachers & Educators",
          titleEn: "Lesson Planning & Quiz Creation",
          titleNe: "पाठ योजना र प्रश्नोत्तरी तयार गर्न",
          exampleEn: `Generate customized lesson plans, homework sheets, and multiple choice quizzes in seconds.`,
          exampleNe: `केही सेकेन्डमै पाठ योजना, गृहकार्य र बहुवैकल्पिक प्रश्नहरू तयार गर्नुहोस्।`,
        },
        {
          role: "Freelancers & Business Owners",
          titleEn: "Client Emails & Proposal Writing",
          titleNe: "इमेल र प्रस्तावना (Proposals) लेख्न",
          exampleEn: `Draft professional client proposals, marketing copys, and social media captions efficiently.`,
          exampleNe: `व्यावसायिक ग्राहक प्रस्तावना, मार्केनिङ सामग्री र सोसल मिडिया पोस्टहरू लेख्नुहोस्।`,
        },
      ];
    }

    if (!toolObj.practiceExercises || toolObj.practiceExercises.length === 0) {
      toolObj.practiceExercises = [
        {
          titleEn: "Summarize a Complex Topic",
          titleNe: "जटिल विषयको सारांश बनाउने",
          promptTemplate: `Act as an expert educator. Summarize [Insert Topic Name] into 5 key bullet points understandable by a 12-year-old.`,
          instructionsEn: `Copy the prompt template above into ${tool.name} and replace [Insert Topic Name] with any study topic!`,
          instructionsNe: `माथिको प्रम्प्ट प्रतिलिपि गरी ${tool.name} मा राख्नुहोस् र [Insert Topic Name] को ठाउँमा आफ्नो विषय लेख्नुहोस्।`,
        },
        {
          titleEn: "Draft a Professional Communication Email",
          titleNe: "व्यावसायिक इमेल तयार पार्ने",
          promptTemplate: `Write a polite and persuasive email requesting [Insert Purpose] with clear timeline and call to action.`,
          instructionsEn: `Practice creating formal emails for jobs, client proposals, or course enrollments.`,
          instructionsNe: `जागिर, ग्राहक प्रस्ताव वा निवेदनका लागि औपचारिक इमेल लेख्ने अभ्यास गर्नुहोस्।`,
        },
      ];
    }

    if (!toolObj.bestPractices || !toolObj.bestPractices.dos || toolObj.bestPractices.dos.length === 0) {
      toolObj.bestPractices = {
        dos: [
          { en: "Provide clear context, role, and output format in your prompts.", ne: "आफ्नो प्रम्प्टमा स्पष्ट सन्दर्भ, भूमिका र ढाँचा प्रदान गर्नुहोस्।" },
          { en: "Verify critical facts, dates, and mathematical calculations.", ne: "महत्वपूर्ण तथ्यहरू, मितिहरू र गणितीय हिसाबहरू पुनर्पुष्टि गर्नुहोस्।" },
          { en: "Iterate with follow-up prompts to refine responses.", ne: "नतिजा राम्रो बनाउन थप निर्देशनहरू (Follow-up) दिनुहोस्।" },
        ],
        donts: [
          { en: "Do not paste sensitive private passwords or financial credentials.", ne: "संवेदनशील गोपनीयता, पासवर्ड वा वित्तीय विवरणहरू अपलोड नगर्नुहोस्।" },
          { en: "Do not accept AI outputs blindly without factual cross-verification.", ne: "AI को नतिजालाई नजाँचीकन आँखा चिम्लेर स्वीकार नगर्नुहोस्।" },
        ],
        tips: [
          { en: "Use system instructions or custom instructions to save time.", ne: "समय बचाउन कस्टम निर्देशनहरू (Custom Instructions) प्रयोग गर्नुहोस्।" },
          { en: "Specify constraints such as 'Keep under 150 words' or 'Use bullet points'.", ne: "'१५० शब्दभित्र' वा 'बुँदागत रूपमा' जस्ता सीमाहरू तोक्नुहोस्।" },
        ],
      };
    }

    if (!toolObj.commonMistakes || toolObj.commonMistakes.length === 0) {
      toolObj.commonMistakes = [
        {
          mistakeEn: "Vague, One-Word Prompts",
          mistakeNe: "अस्पष्ट र एक-शब्दको प्रम्प्ट दिनु",
          solutionEn: "Use the Persona + Task + Context + Constraints prompt formula.",
          solutionNe: "भूमिका + कार्य + सन्दर्भ + सीमा ढाँचा प्रयोग गर्नुहोस्।",
        },
        {
          mistakeEn: "Assuming AI has Access to Private Real-time Data",
          mistakeNe: "AI सँग निजी र ताजा डेटा छ भनी ठान्नु",
          solutionEn: "Provide the relevant background text or data in your prompt directly.",
          solutionNe: "आफ्नो प्रम्प्टभित्रै सान्दर्भिक पृष्ठभूमि वा पाठ उपलब्ध गराउनुहोस्।",
        },
      ];
    }

    if (!toolObj.advantages || toolObj.advantages.length === 0) {
      toolObj.advantages = [
        { titleEn: "Massive Productivity Boost", titleNe: "उच्च उत्पादकत्व वृद्धि", descEn: "Saves hours on repetitive writing, coding, and brainstorming tasks.", descNe: "पुनरावृत्ति भइरहने लेखन र कोडिङका काममा घन्टाउँ समय बचाउँछ।" },
        { titleEn: "24/7 Learning Tutor", titleNe: "२४सै घण्टा उपलब्ध शिक्षक", descEn: "Provides instant explanations, translations, and answers to any query.", descNe: "कुनै पनि जिज्ञासाको तत्काल स्पष्टीकरण र उत्तर प्रदान गर्दछ।" },
        { titleEn: "Multi-Language Capabilities", titleNe: "बहुभाषी क्षमता", descEn: "Supports English, Nepali, Hindi, and 50+ world languages fluently.", descNe: "नेपाली, अंग्रेजी लगायत ५० भन्दा बढी भाषा सहजै बुझ्छ।" },
      ];
    }

    if (!toolObj.limitations || toolObj.limitations.length === 0) {
      toolObj.limitations = [
        { titleEn: "Risk of Hallucinations", titleNe: "गलत वा काल्पनिक सूचना दिने जोखिम", descEn: "May generate confident-sounding but incorrect factual claims.", descNe: "कहिलेकाहीँ गलत तथ्यहरूलाई पनि साँचो जस्तै गरी प्रस्तुत गर्न सक्छ।" },
        { titleEn: "Lack of True Human Emotion", titleNe: "मानवीय संवेदनाको कमी", descEn: "Cannot fully replace nuanced human judgment and emotional intelligence.", descNe: "मानवीय निर्णय र संवेदनालाई पूर्ण रूपमा प्रतिस्थापन गर्न सक्दैन।" },
      ];
    }

    if (!toolObj.pricingTiers || toolObj.pricingTiers.length === 0) {
      toolObj.pricingTiers = [
        { tierName: "Free Tier", price: "Free ($0/mo)", featuresEn: ["Basic Model Access", "Standard Response Speed", "Community Support"], featuresNe: ["आधारभूत मोडल पहुँच", "सामान्य नतिजा गति", "सामुदायिक सहयोग"] },
        { tierName: "Pro / Plus Tier", price: "$20 / month", featuresEn: ["Advanced AI Models", "Faster Speed & Priority Access", "Custom Assistants & Plugins"], featuresNe: ["उन्नत AI मोडलहरू", "द्रुत गति र प्राथमिकता", "कस्टम सहायक र प्लगइन"] },
      ];
    }

    if (!toolObj.quiz || toolObj.quiz.length === 0) {
      toolObj.quiz = [
        {
          questionEn: `What is the primary function of ${tool.name}?`,
          questionNe: `${tool.name} को मुख्य कार्य के हो?`,
          options: [
            { textEn: "Automate human tasks and assist in intelligent workflows", textNe: "मानवीय कार्य सहज बनाउन र बौद्धिक कार्यप्रवाहमा सहयोग गर्न", isCorrect: true },
            { textEn: "Physically build computer hardware", textNe: "कम्प्युटर हार्डवेयर भौतिक रूपमा निर्माण गर्न", isCorrect: false },
            { textEn: "Replace human internet connections", textNe: "इन्टरनेट कनेक्सन प्रतिस्थापन गर्न", isCorrect: false },
          ],
          explanationEn: `${tool.name} is designed as an AI software tool to assist users in completing digital tasks efficiently.`,
          explanationNe: `${tool.name} डिजिटल कार्यहरू सहज बनाउन निर्मित AI सफ्टवेयर हो।`,
        },
        {
          questionEn: "Why is prompt clarity important when using AI tools?",
          questionNe: "AI उपकरणहरू प्रयोग गर्दा प्रम्प्टको स्पष्टता किन महत्त्वपूर्ण छ?",
          options: [
            { textEn: "Because clear prompts yield more accurate and relevant responses", textNe: "किनभने स्पष्ट प्रम्प्टले बढी सटीक र सान्दर्भिक नतिजा दिन्छ", isCorrect: true },
            { textEn: "Clear prompts use more internet data", textNe: "स्पष्ट प्रम्प्टले बढी डेटा खपत गर्छ", isCorrect: false },
            { textEn: "It is required to unlock hardware acceleration", textNe: "यो हार्डवेयर अनलक गर्न आवश्यक छ", isCorrect: false },
          ],
          explanationEn: "Specific context and instructions allow AI models to tailor outputs precisely to your needs.",
          explanationNe: "विशिष्ट सन्दर्भ र निर्देशनले AI मोडललाई सही नतिजा दिन मद्दत गर्छ।",
        },
        {
          questionEn: "What should you always do after receiving output from an AI tool?",
          questionNe: "AI उपकरणबाट नतिजा पाएपछि सधैं के गर्नुपर्छ?",
          options: [
            { textEn: "Verify and cross-check key facts and details", textNe: "महत्वपूर्ण तथ्य र विवरणहरू परीक्षण वा पुनर्पुष्टि गर्नुहोस्", isCorrect: true },
            { textEn: "Publish it directly without reading", textNe: "नपढीकन सिधै प्रकाशन गर्नुहोस्", isCorrect: false },
            { textEn: "Delete your user account", textNe: "आफ्नो युजर एकाउन्ट बन्द गर्नुहोस्", isCorrect: false },
          ],
          explanationEn: "Cross-verification prevents errors caused by AI hallucinations or outdated references.",
          explanationNe: "पुनर्पुष्टिले काल्पनिक वा गलत नतिजाको त्रुटिबाट बचाउँछ।",
        },
      ];
    }

    if (!toolObj.summary || !toolObj.summary.takeawaysEn || toolObj.summary.takeawaysEn.length === 0) {
      toolObj.summary = {
        takeawaysEn: [
          `${tool.name} is a versatile AI tool designed to boost personal and professional productivity.`,
          "Writing specific, structured prompts ensures higher quality responses.",
          "Combine AI automation with human oversight for optimal accuracy and results.",
        ],
        takeawaysNe: [
          `${tool.name} व्यक्तिगत र व्यावसायिक उत्पादकत्व बढाउने एक उत्कृष्ट AI औजार हो।`,
          "स्पष्ट र संरचनात्मक प्रम्प्ट लेख्दा उच्च गुणस्तरीय नतिजा प्राप्त हुन्छ।",
          "उत्कृष्ट नतिजाका लागि AI को सहयोगका साथै मानवीय निरीक्षण पनि आवश्यक हुन्छ।",
        ],
      };
    }

    return res.status(200).json({ success: true, tool: toolObj, relatedTools });
  } catch (error) {
    console.error("Get tool by slug error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch tool details" });
  }
};

export const getAdminTools = async (_: Request, res: Response): Promise<Response> => {
  try {
    const tools = await Tool.find()
      .populate("category", "name slug")
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, tools });
  } catch (error) {
    console.error("Get admin tools error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin tools" });
  }
};

export const getToolById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await Tool.findById(id)
      .populate("category", "name _id")
      .populate("relatedBlogs", "title _id")
      .populate("relatedCourses", "courseTitle _id");

    if (!tool) {
      return res.status(404).json({ success: false, message: "Tool not found" });
    }

    return res.status(200).json({ success: true, tool });
  } catch (error) {
    console.error("Get tool by id error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch tool" });
  }
};

export const updateTool = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await Tool.findById(id);

    if (!tool) {
      return res.status(404).json({ success: false, message: "Tool not found" });
    }

    const {
      name,
      tagline,
      description,
      descriptionNe,
      websiteUrl,
      category,
      pricingType,
      pricingDetails,
      features,
      platforms,
      bestFor,
      faq,
      status,
      featured,
      seoTitle,
      seoDescription,
      relatedBlogs,
      relatedCourses,
      learningObjectives,
      tutorialSteps,
      useCases,
      practiceExercises,
      videoUrl,
      bestPractices,
      commonMistakes,
      advantages,
      limitations,
      pricingTiers,
      quiz,
      summary,
    } = req.body;

    let slug = tool.slug;
    if (name && name !== tool.name) {
      slug = slugify(name, { lower: true, strict: true });
      const existing = await Tool.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    let logoUrl = tool.logo;
    let coverImageUrl = tool.coverImage;
    let screenshotUrls = tool.screenshots || [];

    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    if (files) {
      if (files.logo && files.logo[0]) {
        const cloudRes = await uploadMedia(files.logo[0].path);
        if (cloudRes?.secure_url) logoUrl = cloudRes.secure_url;
      }
      if (files.coverImage && files.coverImage[0]) {
        const cloudRes = await uploadMedia(files.coverImage[0].path);
        if (cloudRes?.secure_url) coverImageUrl = cloudRes.secure_url;
      }
      if (files.screenshots && files.screenshots.length > 0) {
        const newScreenshots: string[] = [];
        for (const file of files.screenshots) {
          const cloudRes = await uploadMedia(file.path);
          if (cloudRes?.secure_url) {
            newScreenshots.push(cloudRes.secure_url);
          }
        }
        if (newScreenshots.length > 0) {
          screenshotUrls = newScreenshots;
        }
      }
    }

    if (req.body.logo && typeof req.body.logo === "string") logoUrl = req.body.logo;
    if (req.body.coverImage && typeof req.body.coverImage === "string") coverImageUrl = req.body.coverImage;

    const parsedFeatures = features !== undefined ? parseArrayField(features) : tool.features;
    const parsedPlatforms = platforms !== undefined ? parseArrayField(platforms) : tool.platforms;
    const parsedBestFor = bestFor !== undefined ? parseArrayField(bestFor) : tool.bestFor;
    const parsedFaq = faq !== undefined ? parseArrayField(faq) : tool.faq;
    const parsedRelatedBlogs = relatedBlogs !== undefined ? parseArrayField(relatedBlogs) : tool.relatedBlogs;
    const parsedRelatedCourses = relatedCourses !== undefined ? parseArrayField(relatedCourses) : tool.relatedCourses;

    const parsedLearningObjectives = learningObjectives !== undefined ? parseArrayField(learningObjectives) : tool.learningObjectives;
    const parsedTutorialSteps = tutorialSteps !== undefined ? parseArrayField(tutorialSteps) : tool.tutorialSteps;
    const parsedUseCases = useCases !== undefined ? parseArrayField(useCases) : tool.useCases;
    const parsedPracticeExercises = practiceExercises !== undefined ? parseArrayField(practiceExercises) : tool.practiceExercises;
    const parsedBestPractices = bestPractices !== undefined ? (parseObjectField(bestPractices) || tool.bestPractices) : tool.bestPractices;
    const parsedCommonMistakes = commonMistakes !== undefined ? parseArrayField(commonMistakes) : tool.commonMistakes;
    const parsedAdvantages = advantages !== undefined ? parseArrayField(advantages) : tool.advantages;
    const parsedLimitations = limitations !== undefined ? parseArrayField(limitations) : tool.limitations;
    const parsedPricingTiers = pricingTiers !== undefined ? parseArrayField(pricingTiers) : tool.pricingTiers;
    const parsedQuiz = quiz !== undefined ? parseArrayField(quiz) : tool.quiz;
    const parsedSummary = summary !== undefined ? (parseObjectField(summary) || tool.summary) : tool.summary;

    const updatedTool = await Tool.findByIdAndUpdate(
      id,
      {
        name: name || tool.name,
        slug,
        tagline: tagline !== undefined ? tagline : tool.tagline,
        description: description || tool.description,
        descriptionNe: descriptionNe !== undefined ? descriptionNe : tool.descriptionNe,
        logo: logoUrl,
        coverImage: coverImageUrl,
        websiteUrl: websiteUrl || tool.websiteUrl,
        category: category || tool.category,
        pricingType: pricingType || tool.pricingType,
        pricingDetails: pricingDetails !== undefined ? pricingDetails : tool.pricingDetails,
        features: parsedFeatures,
        platforms: parsedPlatforms,
        screenshots: screenshotUrls,
        bestFor: parsedBestFor,
        faq: parsedFaq,
        status: status || tool.status,
        featured: featured !== undefined ? (featured === true || featured === "true") : tool.featured,
        seoTitle: seoTitle !== undefined ? seoTitle : tool.seoTitle,
        seoDescription: seoDescription !== undefined ? seoDescription : tool.seoDescription,
        relatedBlogs: parsedRelatedBlogs,
        relatedCourses: parsedRelatedCourses,
        learningObjectives: parsedLearningObjectives,
        tutorialSteps: parsedTutorialSteps,
        useCases: parsedUseCases,
        practiceExercises: parsedPracticeExercises,
        videoUrl: videoUrl !== undefined ? videoUrl : tool.videoUrl,
        bestPractices: parsedBestPractices,
        commonMistakes: parsedCommonMistakes,
        advantages: parsedAdvantages,
        limitations: parsedLimitations,
        pricingTiers: parsedPricingTiers,
        quiz: parsedQuiz,
        summary: parsedSummary,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "AI Tool updated successfully", tool: updatedTool });
  } catch (error) {
    console.error("Update tool error:", error);
    return res.status(500).json({ success: false, message: "Failed to update tool" });
  }
};

export const deleteTool = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await Tool.findByIdAndDelete(id);

    if (!tool) {
      return res.status(404).json({ success: false, message: "Tool not found" });
    }

    return res.status(200).json({ success: true, message: "AI Tool deleted successfully" });
  } catch (error) {
    console.error("Delete tool error:", error);
    return res.status(500).json({ success: false, message: "Failed to delete tool" });
  }
};

export const toggleFeatureTool = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await Tool.findById(id);

    if (!tool) {
      return res.status(404).json({ success: false, message: "Tool not found" });
    }

    tool.featured = !tool.featured;
    await tool.save();

    return res.status(200).json({
      success: true,
      message: `Tool ${tool.featured ? "marked as featured" : "unfeatured"}`,
      featured: tool.featured,
    });
  } catch (error) {
    console.error("Toggle feature tool error:", error);
    return res.status(500).json({ success: false, message: "Failed to toggle featured status" });
  }
};

export const togglePublishTool = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const tool = await Tool.findById(id);

    if (!tool) {
      return res.status(404).json({ success: false, message: "Tool not found" });
    }

    tool.status = tool.status === "Published" ? "Draft" : "Published";
    await tool.save();

    return res.status(200).json({
      success: true,
      message: `Tool status changed to ${tool.status}`,
      status: tool.status,
    });
  } catch (error) {
    console.error("Toggle publish tool error:", error);
    return res.status(500).json({ success: false, message: "Failed to toggle publish status" });
  }
};
