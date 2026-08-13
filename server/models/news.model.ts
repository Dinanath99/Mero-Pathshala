import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsDocument extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  coverImage: string;
  content: string;
  keyTakeaways: string[];
  whyItMattersEn: string;
  whyItMattersNe: string;
  nepalPerspective: {
    students: string;
    developers: string;
    businesses: string;
    teachers: string;
    startups: string;
    government: string;
    general: string;
  };
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  readingTime: string;
  breakingNews: boolean;
  featured: boolean;
  status: "Published" | "Draft" | "Scheduled";
  category: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  relatedTools: mongoose.Types.ObjectId[];
  relatedBlogs: mongoose.Types.ObjectId[];
  relatedCourses: mongoose.Types.ObjectId[];
  faq: Array<{ question?: string; answer?: string }>;
  views: number;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const newsSchema = new Schema<INewsDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    keyTakeaways: [
      {
        type: String,
      },
    ],
    whyItMattersEn: {
      type: String,
      default: "",
    },
    whyItMattersNe: {
      type: String,
      default: "",
    },
    nepalPerspective: {
      students: { type: String, default: "" },
      developers: { type: String, default: "" },
      businesses: { type: String, default: "" },
      teachers: { type: String, default: "" },
      startups: { type: String, default: "" },
      government: { type: String, default: "" },
      general: { type: String, default: "" },
    },
    author: {
      name: { type: String, default: "AI Guru Nepal Editorial Team" },
      avatar: { type: String, default: "https://github.com/shadcn.png" },
      role: { type: String, default: "AI Research Desk" },
    },
    readingTime: {
      type: String,
      default: "4 min read",
    },
    breakingNews: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Published", "Draft", "Scheduled"],
      default: "Published",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "NewsCategory",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewsTag",
      },
    ],
    relatedTools: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tool",
      },
    ],
    relatedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    relatedCourses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    faq: [
      {
        question: String,
        answer: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      default: "",
    },
    seoDescription: {
      type: String,
      default: "",
    },
    seoKeywords: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

newsSchema.index({ title: "text", content: "text", whyItMattersEn: "text" });
newsSchema.index({ status: 1, createdAt: -1 });
newsSchema.index({ status: 1, breakingNews: 1, createdAt: -1 });
newsSchema.index({ status: 1, featured: 1, createdAt: -1 });
newsSchema.index({ status: 1, category: 1, createdAt: -1 });

export const News: Model<INewsDocument> =
  mongoose.models.News || mongoose.model<INewsDocument>("News", newsSchema);
