import mongoose from "mongoose";
import dotenv from "dotenv";
import { BlogCategory } from "../models/blogCategory.model.js";
import slugify from "slugify";

dotenv.config();

const defaultCategories = [
  { name: "AI Basics", color: "#3b82f6" },
  { name: "ChatGPT", color: "#10b981" },
  { name: "Google Gemini", color: "#6366f1" },
  { name: "AI Tools", color: "#f59e0b" },
  { name: "Prompt Engineering", color: "#8b5cf6" },
  { name: "AI Automation", color: "#ec4899" },
  { name: "AI for Developers", color: "#14b8a6" },
  { name: "AI News", color: "#ef4444" },
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    for (let i = 0; i < defaultCategories.length; i++) {
      const cat = defaultCategories[i];
      const slug = slugify(cat.name, { lower: true, strict: true });
      
      const exists = await BlogCategory.findOne({ slug });
      if (!exists) {
        await BlogCategory.create({
          name: cat.name,
          slug,
          color: cat.color,
          displayOrder: i + 1,
          isActive: true
        });
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }
    
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedCategories();
