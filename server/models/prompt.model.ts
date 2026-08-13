import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPromptDocument extends Document {
  title: string;
  slug: string;
  englishDescription: string;
  nepaliDescription?: string;
  promptContent: string;
  promptBreakdown: Array<{
    sectionTitle: string;
    explanationEn: string;
    explanationNe?: string;
  }>;
  expectedOutputEn?: string;
  expectedOutputNe?: string;
  customizationTipsEn: string[];
  customizationTipsNe: string[];
  practiceChallengeEn?: string;
  practiceChallengeNe?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  bestFor: string[];
  tags: string[];
  category: mongoose.Types.ObjectId;
  aiTools: mongoose.Types.ObjectId[];
  relatedBlogs: mongoose.Types.ObjectId[];
  relatedCourses: mongoose.Types.ObjectId[];
  featuredImage: string;
  faq: Array<{ question: string; answer: string }>;
  featured: boolean;
  status: "Published" | "Draft";
  views: number;
  copiesCount: number;
  seoTitle?: string;
  seoDescription?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const promptBreakdownSchema = new Schema({
  sectionTitle: { type: String, required: true },
  explanationEn: { type: String, required: true },
  explanationNe: { type: String },
});

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const promptSchema = new Schema<IPromptDocument>(
  {
    title: {
      type: String,
      required: [true, "Prompt title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    englishDescription: {
      type: String,
      required: [true, "English description is required"],
      trim: true,
    },
    nepaliDescription: {
      type: String,
      trim: true,
    },
    promptContent: {
      type: String,
      required: [true, "Prompt content is required"],
    },
    promptBreakdown: [promptBreakdownSchema],
    expectedOutputEn: {
      type: String,
      trim: true,
    },
    expectedOutputNe: {
      type: String,
      trim: true,
    },
    customizationTipsEn: [{ type: String }],
    customizationTipsNe: [{ type: String }],
    practiceChallengeEn: {
      type: String,
      trim: true,
    },
    practiceChallengeNe: {
      type: String,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    bestFor: [
      {
        type: String,
        enum: ["Students", "Developers", "Teachers", "Freelancers", "Business Owners", "Content Creators"],
      },
    ],
    tags: [{ type: String, trim: true }],
    category: {
      type: Schema.Types.ObjectId,
      ref: "PromptCategory",
      required: true,
    },
    aiTools: [
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
    featuredImage: {
      type: String,
      default: "",
    },
    faq: [faqSchema],
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
    views: {
      type: Number,
      default: 0,
    },
    copiesCount: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

promptSchema.index({ title: "text", englishDescription: "text", promptContent: "text", tags: "text" });
promptSchema.index({ status: 1, copiesCount: -1, views: -1 });
promptSchema.index({ status: 1, category: 1, copiesCount: -1 });
promptSchema.index({ status: 1, featured: 1, copiesCount: -1 });
promptSchema.index({ status: 1, difficulty: 1 });

export const Prompt: Model<IPromptDocument> =
  mongoose.models.Prompt || mongoose.model<IPromptDocument>("Prompt", promptSchema);
