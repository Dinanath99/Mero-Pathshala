import { Request, Response } from "express";
import { Blog } from "../models/blog.model.js";
import { BlogCategory } from "../models/blogCategory.model.js";
import { BlogComment } from "../models/blogComment.model.js";
import { uploadMedia } from "../utils/cloudinary.js";
import slugify from "slugify";

// ---------------- BLOG CATEGORIES ---------------- //
export const createCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, description, icon, displayOrder, color, isActive, seoTitle, seoDescription } = req.body;
    const userId = req.id;
    const file = req.file;

    if (!name) return res.status(400).json({ success: false, message: "Name is required" });

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await BlogCategory.findOne({ slug });
    if (existing) return res.status(400).json({ success: false, message: "Category already exists" });

    let coverImage = "";
    if (file) {
      const cloudRes = await uploadMedia(file.path);
      coverImage = cloudRes?.secure_url || "";
    }

    const category = await BlogCategory.create({
      name,
      slug,
      description,
      icon,
      coverImage,
      displayOrder,
      color,
      isActive,
      seoTitle,
      seoDescription,
      createdBy: userId,
    });
    return res.status(201).json({ success: true, category });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create category" });
  }
};

export const getCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const categories = await BlogCategory.find({ isActive: true }).sort({ displayOrder: 1, name: 1 });
    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch categories" });
  }
};

export const getAdminCategories = async (_: Request, res: Response): Promise<Response> => {
  try {
    const categories = await BlogCategory.aggregate([
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "category",
          as: "blogs",
        },
      },
      {
        $addFields: {
          blogCount: { $size: "$blogs" },
        },
      },
      {
        $project: {
          blogs: 0,
        },
      },
      {
        $sort: { displayOrder: 1, createdAt: -1 },
      },
    ]);

    return res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin categories" });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, description, icon, displayOrder, color, isActive, seoTitle, seoDescription } = req.body;
    const file = req.file;

    const category = await BlogCategory.findById(id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    let slug = category.slug;
    if (name && name !== category.name) {
      slug = slugify(name, { lower: true, strict: true });
      const existing = await BlogCategory.findOne({ slug, _id: { $ne: id } });
      if (existing) return res.status(400).json({ success: false, message: "Category with this name already exists" });
    }

    let coverImage = category.coverImage;
    if (file) {
      const cloudRes = await uploadMedia(file.path);
      if (cloudRes?.secure_url) {
        coverImage = cloudRes.secure_url;
      }
    }

    const updatedCategory = await BlogCategory.findByIdAndUpdate(
      id,
      {
        name: name || category.name,
        slug,
        description: description !== undefined ? description : category.description,
        icon: icon !== undefined ? icon : category.icon,
        coverImage,
        displayOrder: displayOrder !== undefined ? displayOrder : category.displayOrder,
        color: color || category.color,
        isActive: isActive !== undefined ? isActive : category.isActive,
        seoTitle: seoTitle !== undefined ? seoTitle : category.seoTitle,
        seoDescription: seoDescription !== undefined ? seoDescription : category.seoDescription,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, category: updatedCategory, message: "Category updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to update category" });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const blogCount = await Blog.countDocuments({ category: id });
    if (blogCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It is associated with ${blogCount} blogs.`,
      });
    }

    const category = await BlogCategory.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    return res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete category" });
  }
};

// ---------------- BLOGS ---------------- //
export const createBlog = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, excerpt, content, category, tags, status, seoTitle, seoDescription, readingTime } = req.body;
    const userId = req.id;
    const file = req.file;

    if (!title || !excerpt || !content || !category) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    let featuredImage = "";
    if (file) {
      const cloudRes = await uploadMedia(file.path);
      featuredImage = cloudRes?.secure_url || "";
    } else {
      return res.status(400).json({ success: false, message: "Featured image is required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const existing = await Blog.findOne({ slug });
    if (existing) {
      return res.status(400).json({ success: false, message: "Blog with this title already exists" });
    }

    let parsedTags: string[] = [];
    if (tags) {
      try {
        parsedTags = typeof tags === "string" && (tags.startsWith("[") || tags.startsWith("{"))
          ? JSON.parse(tags)
          : (typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : tags);
      } catch (e) {
        parsedTags = typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [];
      }
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author: userId,
      category,
      tags: parsedTags,
      status: status || "Draft",
      seoTitle,
      seoDescription,
      readingTime: readingTime || 5,
      publishedAt: status === "Published" ? new Date() : null,
    });

    return res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create blog" });
  }
};

export const getBlogs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { category, search, status, page = 1, limit = 12 } = req.query;
    const query: Record<string, any> = {};

    if (category) query.category = category;
    if (status) query.status = status;
    else query.status = "Published";

    if (search && typeof search === "string") {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .select("-content")
        .populate("author", "name photoUrl")
        .populate("category", "name slug")
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Blog.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
};

export const getAdminBlogs = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.id;
    const { page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [blogs, total] = await Promise.all([
      Blog.find({ author: userId })
        .select("-content")
        .populate("author", "name photoUrl")
        .populate("category", "name slug")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Blog.countDocuments({ author: userId }),
    ]);

    return res.status(200).json({
      success: true,
      blogs,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum) || 1,
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch admin blogs" });
  }
};

export const getBlogBySlug = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: "Published" })
      .populate("author", "name photoUrl")
      .populate("category", "name slug");

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.views += 1;
    await blog.save();

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("category", "name _id");
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, category, tags, status, seoTitle, seoDescription, readingTime } = req.body;
    const file = req.file;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    let featuredImage = blog.featuredImage;
    if (file) {
      const cloudRes = await uploadMedia(file.path);
      if (cloudRes?.secure_url) {
        featuredImage = cloudRes.secure_url;
      }
    }

    let parsedTags = blog.tags;
    if (tags) {
      try {
        parsedTags = typeof tags === "string" && (tags.startsWith("[") || tags.startsWith("{"))
          ? JSON.parse(tags)
          : (typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : tags);
      } catch (e) {
        parsedTags = typeof tags === "string" ? tags.split(",").map((t: string) => t.trim()) : [];
      }
    }

    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = slugify(title, { lower: true, strict: true });
      const existing = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existing) return res.status(400).json({ success: false, message: "Blog with this title already exists" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title: title || blog.title,
        slug,
        excerpt: excerpt || blog.excerpt,
        content: content || blog.content,
        featuredImage,
        category: category || blog.category,
        tags: parsedTags,
        status: status || blog.status,
        seoTitle,
        seoDescription,
        readingTime: readingTime || blog.readingTime,
        publishedAt: status === "Published" && blog.status !== "Published" ? new Date() : blog.publishedAt,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to update blog" });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    await BlogComment.deleteMany({ blog: id });
    return res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
};

// ---------------- BLOG COMMENTS ---------------- //
export const addComment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { blogId } = req.params;
    const { content, parentComment } = req.body;
    const userId = req.id;

    if (!content) return res.status(400).json({ success: false, message: "Content is required" });

    const comment = await BlogComment.create({
      blog: blogId,
      user: userId,
      parentComment: parentComment || null,
      content,
    });

    await comment.populate("user", "name photoUrl");

    return res.status(201).json({ success: true, message: "Comment added", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

export const getCommentsByBlog = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { blogId } = req.params;
    const comments = await BlogComment.find({ blog: blogId })
      .populate("user", "name photoUrl")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const comment = await BlogComment.findById(id);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    await BlogComment.findByIdAndDelete(id);
    await BlogComment.deleteMany({ parentComment: id });

    return res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to delete comment" });
  }
};
