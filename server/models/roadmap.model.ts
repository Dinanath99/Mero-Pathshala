import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoadmapModule {
  title: string;
  titleNp?: string;
  description?: string;
  descriptionNp?: string;
  estimatedTime?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  courses?: mongoose.Types.ObjectId[];
  blogs?: mongoose.Types.ObjectId[];
  tools?: mongoose.Types.ObjectId[];
  prompts?: mongoose.Types.ObjectId[];
  news?: mongoose.Types.ObjectId[];
  practiceTask?: string;
  miniProject?: string;
}

export interface IRoadmapDocument extends Document {
  title: string;
  titleNp?: string;
  slug: string;
  description: string;
  descriptionNp?: string;
  category: "AI Basics" | "Development" | "Business" | "Education" | "Content Creation" | "Career";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedDuration: string;
  coverImage: string;
  icon: string;
  isFeatured: boolean;
  isFree: boolean;
  isPublished: boolean;
  skills: string[];
  learningOutcomes: string[];
  prerequisites: string[];
  targetAudience: string[];
  modules: IRoadmapModule[];
  createdUser?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const roadmapModuleSchema = new Schema<IRoadmapModule>({
  title: {
    type: String,
    required: true,
  },
  titleNp: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  descriptionNp: {
    type: String,
    default: "",
  },
  estimatedTime: {
    type: String,
    default: "30 mins",
  },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course",
  }],
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: "Blog",
  }],
  tools: [{
    type: Schema.Types.ObjectId,
    ref: "Tool",
  }],
  prompts: [{
    type: Schema.Types.ObjectId,
    ref: "Prompt",
  }],
  news: [{
    type: Schema.Types.ObjectId,
    ref: "News",
  }],
  practiceTask: {
    type: String,
    default: "",
  },
  miniProject: {
    type: String,
    default: "",
  },
});

const roadmapSchema = new Schema<IRoadmapDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleNp: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    descriptionNp: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["AI Basics", "Development", "Business", "Education", "Content Creation", "Career"],
      default: "AI Basics",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    estimatedDuration: {
      type: String,
      default: "2 Hours",
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    },
    icon: {
      type: String,
      default: "Rocket",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    skills: [{
      type: String,
    }],
    learningOutcomes: [{
      type: String,
    }],
    prerequisites: [{
      type: String,
    }],
    targetAudience: [{
      type: String,
    }],
    modules: [roadmapModuleSchema],
    createdUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

roadmapSchema.index({ title: "text", description: "text", skills: "text" });
roadmapSchema.index({ isPublished: 1, category: 1 });
roadmapSchema.index({ isPublished: 1, isFeatured: 1, createdAt: -1 });

export const Roadmap: Model<IRoadmapDocument> =
  mongoose.models.Roadmap || mongoose.model<IRoadmapDocument>("Roadmap", roadmapSchema);
