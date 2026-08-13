import mongoose, { Schema, Document, Model } from "mongoose";

export interface IToolDocument extends Document {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  descriptionNe: string;
  logo: string;
  coverImage: string;
  websiteUrl: string;
  category: mongoose.Types.ObjectId;
  pricingType: "Free" | "Freemium" | "Paid" | "Free Trial";
  pricingDetails: string;
  features: string[];
  platforms: string[];
  screenshots: string[];
  bestFor: string[];
  faq: Array<{ question: string; answer: string; questionNe?: string; answerNe?: string }>;
  status: "Draft" | "Published";
  featured: boolean;
  views: number;
  seoTitle: string;
  seoDescription: string;
  relatedBlogs: mongoose.Types.ObjectId[];
  relatedCourses: mongoose.Types.ObjectId[];
  author?: mongoose.Types.ObjectId;
  learningObjectives?: Array<{ en: string; ne?: string }>;
  tutorialSteps?: Array<{ stepNumber: number; titleEn: string; titleNe?: string; descEn: string; descNe?: string; image?: string }>;
  useCases?: Array<{ role: string; titleEn: string; titleNe?: string; exampleEn: string; exampleNe?: string }>;
  practiceExercises?: Array<{ titleEn: string; titleNe?: string; promptTemplate: string; instructionsEn: string; instructionsNe?: string }>;
  videoUrl: string;
  bestPractices?: {
    dos?: Array<{ en: string; ne?: string }>;
    donts?: Array<{ en: string; ne?: string }>;
    tips?: Array<{ en: string; ne?: string }>;
  };
  commonMistakes?: Array<{ mistakeEn: string; mistakeNe?: string; solutionEn: string; solutionNe?: string }>;
  advantages?: Array<{ titleEn: string; titleNe?: string; descEn: string; descNe?: string }>;
  limitations?: Array<{ titleEn: string; titleNe?: string; descEn: string; descNe?: string }>;
  pricingTiers?: Array<{ tierName: string; price?: string; featuresEn?: string[]; featuresNe?: string[] }>;
  quiz?: Array<{ questionEn: string; questionNe?: string; options?: Array<{ textEn: string; textNe?: string; isCorrect?: boolean }>; explanationEn?: string; explanationNe?: string }>;
  summary?: { takeawaysEn?: string[]; takeawaysNe?: string[] };
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    questionNe: { type: String, default: "" },
    answerNe: { type: String, default: "" },
  },
  { _id: false }
);

const learningObjectiveSchema = new Schema(
  {
    en: { type: String, required: true },
    ne: { type: String, default: "" },
  },
  { _id: false }
);

const tutorialStepSchema = new Schema(
  {
    stepNumber: { type: Number, required: true },
    titleEn: { type: String, required: true },
    titleNe: { type: String, default: "" },
    descEn: { type: String, required: true },
    descNe: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const useCaseSchema = new Schema(
  {
    role: { type: String, required: true },
    titleEn: { type: String, required: true },
    titleNe: { type: String, default: "" },
    exampleEn: { type: String, required: true },
    exampleNe: { type: String, default: "" },
  },
  { _id: false }
);

const practiceExerciseSchema = new Schema(
  {
    titleEn: { type: String, required: true },
    titleNe: { type: String, default: "" },
    promptTemplate: { type: String, required: true },
    instructionsEn: { type: String, required: true },
    instructionsNe: { type: String, default: "" },
  },
  { _id: false }
);

const itemBilingualSchema = new Schema(
  {
    en: { type: String, required: true },
    ne: { type: String, default: "" },
  },
  { _id: false }
);

const commonMistakeSchema = new Schema(
  {
    mistakeEn: { type: String, required: true },
    mistakeNe: { type: String, default: "" },
    solutionEn: { type: String, required: true },
    solutionNe: { type: String, default: "" },
  },
  { _id: false }
);

const featureAdvantageSchema = new Schema(
  {
    titleEn: { type: String, required: true },
    titleNe: { type: String, default: "" },
    descEn: { type: String, required: true },
    descNe: { type: String, default: "" },
  },
  { _id: false }
);

const pricingTierSchema = new Schema(
  {
    tierName: { type: String, required: true },
    price: { type: String, default: "Free" },
    featuresEn: [{ type: String }],
    featuresNe: [{ type: String }],
  },
  { _id: false }
);

const quizOptionSchema = new Schema(
  {
    textEn: { type: String, required: true },
    textNe: { type: String, default: "" },
    isCorrect: { type: Boolean, default: false },
  },
  { _id: false }
);

const quizQuestionSchema = new Schema(
  {
    questionEn: { type: String, required: true },
    questionNe: { type: String, default: "" },
    options: [quizOptionSchema],
    explanationEn: { type: String, default: "" },
    explanationNe: { type: String, default: "" },
  },
  { _id: false }
);

const toolSchema = new Schema<IToolDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    tagline: { type: String, default: "" },
    description: { type: String, required: true },
    descriptionNe: { type: String, default: "" },
    logo: { type: String, required: true },
    coverImage: { type: String, default: "" },
    websiteUrl: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ToolCategory",
      required: true,
      index: true,
    },
    pricingType: {
      type: String,
      enum: ["Free", "Freemium", "Paid", "Free Trial"],
      default: "Freemium",
      index: true,
    },
    pricingDetails: { type: String, default: "" },
    features: [{ type: String }],
    platforms: [{ type: String }],
    screenshots: [{ type: String }],
    bestFor: [{ type: String }],
    faq: [faqSchema],
    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Published",
      index: true,
    },
    featured: { type: Boolean, default: false, index: true },
    views: { type: Number, default: 0 },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    relatedBlogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
    relatedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },

    learningObjectives: [learningObjectiveSchema],
    tutorialSteps: [tutorialStepSchema],
    useCases: [useCaseSchema],
    practiceExercises: [practiceExerciseSchema],
    videoUrl: { type: String, default: "" },
    bestPractices: {
      dos: [itemBilingualSchema],
      donts: [itemBilingualSchema],
      tips: [itemBilingualSchema],
    },
    commonMistakes: [commonMistakeSchema],
    advantages: [featureAdvantageSchema],
    limitations: [featureAdvantageSchema],
    pricingTiers: [pricingTierSchema],
    quiz: [quizQuestionSchema],
    summary: {
      takeawaysEn: [{ type: String }],
      takeawaysNe: [{ type: String }],
    },
  },
  { timestamps: true }
);

toolSchema.index({ status: 1, featured: 1, createdAt: -1 });
toolSchema.index({ status: 1, category: 1, views: -1 });
toolSchema.index({ status: 1, pricingType: 1 });
toolSchema.index({ status: 1, views: -1 });
toolSchema.index({ name: "text", tagline: "text", description: "text", bestFor: "text" });

export const Tool: Model<IToolDocument> =
  mongoose.models.Tool || mongoose.model<IToolDocument>("Tool", toolSchema);
