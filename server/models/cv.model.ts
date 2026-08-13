import mongoose, { Schema, Model } from "mongoose";
import { ICVDocument } from "../types/cv.types.js";

const experienceSchema = new Schema(
  {
    id: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance", "Remote"],
      default: "Full-time",
    },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String, default: "" },
    achievements: [{ type: String }],
  },
  { _id: false }
);

const educationSchema = new Schema(
  {
    id: { type: String, required: true },
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    gpa: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const skillSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Technical Skills", "Soft Skills", "Tools & Technologies", "Languages", "General"],
      default: "Technical Skills",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Intermediate",
    },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    projectUrl: { type: String },
    githubUrl: { type: String },
    startDate: { type: String },
    endDate: { type: String },
  },
  { _id: false }
);

const certificationSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    organization: { type: String, required: true },
    issueDate: { type: String, required: true },
    expiryDate: { type: String },
    credentialId: { type: String },
    credentialUrl: { type: String },
  },
  { _id: false }
);

const languageSchema = new Schema(
  {
    id: { type: String, required: true },
    language: { type: String, required: true },
    proficiency: {
      type: String,
      enum: ["Native", "Fluent", "Professional", "Intermediate", "Basic"],
      default: "Professional",
    },
  },
  { _id: false }
);

const achievementSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    organization: { type: String },
    date: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const customItemSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    date: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const customSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    items: [customItemSchema],
  },
  { _id: false }
);

const cvSchema = new Schema<ICVDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "My Professional CV",
      trim: true,
    },
    template: {
      type: String,
      enum: ["classic", "modern", "developer", "graduate", "executive"],
      default: "modern",
    },
    personalInfo: {
      fullName: { type: String, default: "" },
      professionalTitle: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      website: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      portfolio: { type: String, default: "" },
      photoUrl: { type: String, default: "" },
      showPhoto: { type: Boolean, default: true },
    },
    summary: { type: String, default: "" },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: [skillSchema],
    projects: [projectSchema],
    certifications: [certificationSchema],
    languages: [languageSchema],
    achievements: [achievementSchema],
    customSections: [customSectionSchema],
    sectionOrder: {
      type: [String],
      default: [
        "personalInfo",
        "summary",
        "experience",
        "education",
        "skills",
        "projects",
        "certifications",
        "languages",
        "achievements",
      ],
    },
    hiddenSections: {
      type: [String],
      default: [],
    },
    settings: {
      fontFamily: {
        type: String,
        enum: ["inter", "roboto", "merriweather", "outfit", "playfair", "geist"],
        default: "inter",
      },
      fontSize: {
        type: String,
        enum: ["small", "medium", "large"],
        default: "medium",
      },
      spacing: {
        type: String,
        enum: ["compact", "normal", "spacious"],
        default: "normal",
      },
      primaryColor: {
        type: String,
        default: "#ea580c",
      },
      margins: {
        type: String,
        enum: ["compact", "normal", "spacious"],
        default: "normal",
      },
      showSectionIcons: {
        type: Boolean,
        default: true,
      },
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

cvSchema.index({ userId: 1, updatedAt: -1 });

export const CV: Model<ICVDocument> =
  mongoose.models.CV || mongoose.model<ICVDocument>("CV", cvSchema);
