import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomepageConfigDocument extends Document {
  heroBanner: {
    title: string;
    subtitle: string;
    badgeText: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    bannerImage: string;
  };
  promoBanner: {
    isActive: boolean;
    text: string;
    linkText: string;
    linkUrl: string;
    bgColor: string;
  };
  statistics: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    photo: string;
    text: string;
    rating: number;
    location: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
    category: string;
  }>;
  todaysPick: {
    courseId?: mongoose.Types.ObjectId;
    toolId?: mongoose.Types.ObjectId;
    promptId?: mongoose.Types.ObjectId;
    blogId?: mongoose.Types.ObjectId;
    newsId?: mongoose.Types.ObjectId;
  };
  sections: Array<{
    sectionKey: string;
    title: string;
    subtitle: string;
    isVisible: boolean;
    order: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const sectionConfigSchema = new Schema({
  sectionKey: { type: String, required: true },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
});

const statisticSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, default: "Sparkles" },
});

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, default: "Student / Developer" },
  photo: { type: String, default: "" },
  text: { type: String, required: true },
  rating: { type: Number, default: 5 },
  location: { type: String, default: "Kathmandu, Nepal" },
});

const faqSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, default: "General" },
});

const homepageConfigSchema = new Schema<IHomepageConfigDocument>(
  {
    heroBanner: {
      title: { type: String, default: "Learn Artificial Intelligence in Nepali & English" },
      subtitle: { type: String, default: "Master AI with structured courses, practical tutorials, AI tools, prompt libraries, blogs, and the latest AI news—all in one platform." },
      badgeText: { type: String, default: "🔥 Nepal's #1 AI Education Platform" },
      ctaText: { type: String, default: "Start Learning Free" },
      ctaLink: { type: String, default: "/course/search" },
      secondaryCtaText: { type: String, default: "Explore Courses" },
      secondaryCtaLink: { type: String, default: "/course/search" },
      bannerImage: { type: String, default: "" },
    },
    promoBanner: {
      isActive: { type: Boolean, default: true },
      text: { type: String, default: "🚀 New AI Prompt Engineering Masterclass Released!" },
      linkText: { type: String, default: "Claim Free Access" },
      linkUrl: { type: String, default: "/prompts" },
      bgColor: { type: String, default: "from-orange-500 to-pink-600" },
    },
    statistics: [statisticSchema],
    testimonials: [testimonialSchema],
    faqs: [faqSchema],
    todaysPick: {
      courseId: { type: Schema.Types.ObjectId, ref: "Course" },
      toolId: { type: Schema.Types.ObjectId, ref: "Tool" },
      promptId: { type: Schema.Types.ObjectId, ref: "Prompt" },
      blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
      newsId: { type: Schema.Types.ObjectId, ref: "News" },
    },
    sections: [sectionConfigSchema],
  },
  { timestamps: true }
);

export const HomepageConfig: Model<IHomepageConfigDocument> =
  mongoose.models.HomepageConfig ||
  mongoose.model<IHomepageConfigDocument>("HomepageConfig", homepageConfigSchema);
