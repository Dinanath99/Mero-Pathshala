import { Request, Response } from "express";
import { NewsCategory } from "../models/newsCategory.model.js";
import { NewsTag } from "../models/newsTag.model.js";

const DEFAULT_CATEGORIES = [
  { name: "ChatGPT", slug: "chatgpt", description: "Latest announcements, updates, and models from OpenAI ChatGPT.", icon: "Sparkles", color: "emerald" },
  { name: "Google Gemini", slug: "google-gemini", description: "Breakthroughs in Google Gemini, Gemma, and DeepMind AI models.", icon: "Globe", color: "blue" },
  { name: "Claude", slug: "claude", description: "Anthropic Claude releases, Constitutional AI, and enterprise updates.", icon: "Bot", color: "purple" },
  { name: "AI Tools", slug: "ai-tools", description: "Trending generative AI tools, productivity apps, and software.", icon: "Wrench", color: "orange" },
  { name: "AI Research", slug: "ai-research", description: "Academic papers, model benchmarks, reasoning advancements, and LLM architecture.", icon: "BookOpen", color: "indigo" },
  { name: "AI Business", slug: "ai-business", description: "Market trends, corporate AI adoption, investments, and monetization.", icon: "Briefcase", color: "teal" },
  { name: "AI Education", slug: "ai-education", description: "EdTech transformation, AI learning pathways, and campus integrations.", icon: "GraduationCap", color: "cyan" },
  { name: "Robotics", slug: "robotics", description: "Humanoid robots, autonomous systems, spatial intelligence, and hardware.", icon: "Cpu", color: "amber" },
  { name: "AI Startups", slug: "ai-startups", description: "Venture funding, breakout startups, and founder stories in AI.", icon: "Rocket", color: "pink" },
  { name: "Nepal AI", slug: "nepal-ai", description: "Local AI developments, Nepali NLP models, tech community news, and policies in Nepal.", icon: "Flag", color: "red" },
  { name: "AI Policy", slug: "ai-policy", description: "Global AI safety regulations, governance, copyright laws, and ethics.", icon: "Shield", color: "rose" },
  { name: "Open Source AI", slug: "open-source-ai", description: "Llama, Mistral, Hugging Face, fine-tuning, and open-weights models.", icon: "Code", color: "violet" },
];

const DEFAULT_TAGS = [
  { name: "GPT-5", slug: "gpt-5" },
  { name: "OpenAI", slug: "openai" },
  { name: "Google", slug: "google" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "Meta", slug: "meta" },
  { name: "DeepMind", slug: "deepmind" },
  { name: "Automation", slug: "automation" },
  { name: "Education", slug: "education" },
  { name: "Healthcare", slug: "healthcare" },
];

export const seedCategoriesAndTags = async (_: Request, res: Response): Promise<Response> => {
  try {
    const seededCats = [];
    for (const cat of DEFAULT_CATEGORIES) {
      const existing = await NewsCategory.findOne({ slug: cat.slug });
      if (!existing) {
        const newCat = await NewsCategory.create(cat);
        seededCats.push(newCat);
      }
    }

    const seededTags = [];
    for (const tag of DEFAULT_TAGS) {
      const existing = await NewsTag.findOne({ slug: tag.slug });
      if (!existing) {
        const newTag = await NewsTag.create(tag);
        seededTags.push(newTag);
      }
    }

    return res.status(200).json({
      success: true,
      message: `Seeded ${seededCats.length} categories & ${seededTags.length} tags successfully.`,
    });
  } catch (error: any) {
    console.error("Error seeding categories/tags:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, icon, color } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const existing = await NewsCategory.findOne({ $or: [{ name }, { slug }] });

    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const category = await NewsCategory.create({
      name,
      slug,
      description,
      icon: icon || "Newspaper",
      color: color || "blue",
    });

    return res.status(201).json({
      success: true,
      message: "News category created successfully",
      category,
    });
  } catch (error: any) {
    console.error("Error creating news category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const count = await NewsCategory.countDocuments();
    if (count === 0) {
      await NewsCategory.insertMany(DEFAULT_CATEGORIES);
    }

    const categories = await NewsCategory.find({ active: true }).sort({ name: 1 });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error("Error fetching news categories:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, active } = req.body;

    const category = await NewsCategory.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    if (name) {
      category.name = name;
      category.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }
    if (description !== undefined) category.description = description;
    if (icon) category.icon = icon;
    if (color) category.color = color;
    if (active !== undefined) category.active = active;

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error: any) {
    console.error("Error updating news category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await NewsCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting news category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllTags = async (_: Request, res: Response): Promise<Response> => {
  try {
    const count = await NewsTag.countDocuments();
    if (count === 0) {
      await NewsTag.insertMany(DEFAULT_TAGS);
    }
    const tags = await NewsTag.find().sort({ name: 1 });
    return res.status(200).json({ success: true, tags });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ success: false, message: "Tag name required" });

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const tag = await NewsTag.create({ name, slug });
    return res.status(201).json({ success: true, message: "Tag created", tag });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTag = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    await NewsTag.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Tag deleted" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
