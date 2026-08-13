import { Request, Response } from "express";
import { ToolCategory } from "../models/toolCategory.model.js";
import { Tool } from "../models/tool.model.js";
import slugify from "slugify";

const DEFAULT_CATEGORIES = [
  { name: "AI Chatbots", description: "Conversational AI assistants and chatbots", icon: "MessageSquare" },
  { name: "Image Generation", description: "AI tools for image creation, editing, and art", icon: "Image" },
  { name: "Video Generation", description: "AI video creation, editing, and avatar tools", icon: "Video" },
  { name: "Voice AI", description: "Text to speech, voice cloning, and audio AI", icon: "Mic" },
  { name: "Coding Assistants", description: "Code completion, debugging, and programming AI", icon: "Code" },
  { name: "Writing", description: "Copywriting, article generation, and text editing", icon: "PenTool" },
  { name: "Productivity", description: "Task management, note taking, and workflow AI", icon: "Zap" },
  { name: "Research", description: "Literature review, paper summary, and search AI", icon: "Search" },
  { name: "Automation", description: "Workflow automation and agentic AI systems", icon: "Cpu" },
  { name: "Education", description: "Learning assistants, tutoring, and course builders", icon: "GraduationCap" },
  { name: "Marketing", description: "SEO, ad copy, and social media AI tools", icon: "TrendingUp" },
  { name: "Business", description: "CRM, analytics, and business strategy AI", icon: "Briefcase" },
];

export const seedDefaultCategories = async (): Promise<void> => {
  try {
    for (const cat of DEFAULT_CATEGORIES) {
      const slug = slugify(cat.name, { lower: true, strict: true });
      const existing = await ToolCategory.findOne({ slug });
      if (!existing) {
        await ToolCategory.create({
          name: cat.name,
          slug,
          description: cat.description,
          icon: cat.icon,
        });
      }
    }
  } catch (error) {
    console.error("Error seeding default categories:", error);
  }
};

export const getCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const count = await ToolCategory.countDocuments();
    if (count === 0) {
      await seedDefaultCategories();
    }

    const categories = await ToolCategory.find().sort({ name: 1 });
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};

export const getAdminCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const categories = await ToolCategory.aggregate([
      {
        $lookup: {
          from: "tools",
          localField: "_id",
          foreignField: "category",
          as: "tools",
        },
      },
      {
        $addFields: {
          toolCount: { $size: "$tools" },
        },
      },
      {
        $project: {
          tools: 0,
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin categories" });
  }
};

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, icon } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Category name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });
    const existing = await ToolCategory.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Category with this name already exists" });
    }

    const category = await ToolCategory.create({
      name,
      slug,
      description: description || "",
      icon: icon || "Bot",
    });

    return res.status(201).json({ success: true, message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create category" });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    const category = await ToolCategory.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    let slug = category.slug;
    if (name && name !== category.name) {
      slug = slugify(name, { lower: true, strict: true });
      const existing = await ToolCategory.findOne({ slug, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ success: false, message: "Category with this name already exists" });
      }
    }

    const updatedCategory = await ToolCategory.findByIdAndUpdate(
      id,
      {
        name: name || category.name,
        slug,
        description: description !== undefined ? description : category.description,
        icon: icon || category.icon,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const toolCount = await Tool.countDocuments({ category: id });
    if (toolCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It is associated with ${toolCount} tools.`,
      });
    }

    const category = await ToolCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};
