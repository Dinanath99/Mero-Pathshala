import { Request, Response } from "express";
import { PromptCategory } from "../models/promptCategory.model.js";

const DEFAULT_CATEGORIES = [
  { name: "Students", slug: "students", description: "Prompts for study, note generation, exam prep, and research.", icon: "GraduationCap", color: "blue" },
  { name: "Developers", slug: "developers", description: "Prompts for coding, debugging, code refactoring, and API docs.", icon: "Code", color: "emerald" },
  { name: "Teachers", slug: "teachers", description: "Prompts for lesson planning, quiz creation, and tutoring.", icon: "BookOpen", color: "purple" },
  { name: "Business", slug: "business", description: "Prompts for strategy, emails, meetings, and business plans.", icon: "Briefcase", color: "amber" },
  { name: "Marketing", slug: "marketing", description: "Prompts for copywriting, SEO, ad campaigns, and sales funnels.", icon: "Megaphone", color: "pink" },
  { name: "Content Creation", slug: "content-creation", description: "Prompts for YouTube scripts, blogs, social media posts, and podcasts.", icon: "Video", color: "red" },
  { name: "Programming", slug: "programming", description: "Prompts for algorithms, system architecture, and SQL queries.", icon: "Terminal", color: "indigo" },
  { name: "Resume & Career", slug: "resume-career", description: "Prompts for resume tailoring, interview prep, and cover letters.", icon: "FileText", color: "cyan" },
  { name: "Office Productivity", slug: "office-productivity", description: "Prompts for email drafting, report summaries, and task automation.", icon: "CheckSquare", color: "teal" },
  { name: "Image Generation", slug: "image-generation", description: "Prompts for Midjourney, DALL-E, Stable Diffusion, and Leonardo AI.", icon: "Image", color: "violet" },
  { name: "Video Generation", slug: "video-generation", description: "Prompts for Runway, Sora, Pika, and HeyGen video generation.", icon: "Film", color: "rose" },
  { name: "Research", slug: "research", description: "Prompts for literature reviews, paper synthesis, and data analysis.", icon: "Search", color: "sky" },
  { name: "Prompt Engineering", slug: "prompt-engineering", description: "Meta-prompts to generate, optimize, and evaluate AI prompts.", icon: "Sparkles", color: "orange" },
];

export const seedCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const created = [];
    for (const cat of DEFAULT_CATEGORIES) {
      const existing = await PromptCategory.findOne({ slug: cat.slug });
      if (!existing) {
        const newCat = await PromptCategory.create(cat);
        created.push(newCat);
      }
    }
    return res.status(200).json({
      success: true,
      message: `Seeded ${created.length} default prompt categories successfully.`,
      categories: created,
    });
  } catch (error: any) {
    console.error("Error seeding categories:", error);
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
    const existing = await PromptCategory.findOne({ $or: [{ name }, { slug }] });

    if (existing) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }

    const category = await PromptCategory.create({
      name,
      slug,
      description,
      icon: icon || "Sparkles",
      color: color || "orange",
    });

    return res.status(201).json({
      success: true,
      message: "Prompt category created successfully",
      category,
    });
  } catch (error: any) {
    console.error("Error creating prompt category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const count = await PromptCategory.countDocuments();
    if (count === 0) {
      await PromptCategory.insertMany(DEFAULT_CATEGORIES);
    }

    const categories = await PromptCategory.find({ active: true }).sort({ name: 1 });
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error: any) {
    console.error("Error fetching prompt categories:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, active } = req.body;

    const category = await PromptCategory.findById(id);
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
    console.error("Error updating prompt category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const category = await PromptCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Prompt category deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting prompt category:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
