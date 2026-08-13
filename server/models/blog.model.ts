import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  tags?: string[];
  status: "Draft" | "Published";
  featured: boolean;
  views: number;
  readingTime: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "BlogCategory", required: true, index: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["Draft", "Published"], default: "Draft", index: true },
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    readingTime: { type: Number, default: 5 },
    seoTitle: { type: String },
    seoDescription: { type: String },
    publishedAt: { type: Date, index: true },
  },
  { timestamps: true }
);

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ status: 1, category: 1, publishedAt: -1 });
blogSchema.index({ status: 1, featured: 1, publishedAt: -1 });
blogSchema.index({ author: 1, createdAt: -1 });
blogSchema.index({ title: "text", excerpt: "text", tags: "text" });

export const Blog: Model<IBlogDocument> =
  mongoose.models.Blog || mongoose.model<IBlogDocument>("Blog", blogSchema);
