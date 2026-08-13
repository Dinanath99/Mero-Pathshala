import mongoose, { Schema, Model } from "mongoose";
import { ICVAnalysisDocument } from "../types/cv.types.js";

const recommendationSchema = new Schema(
  {
    id: { type: String, required: true },
    section: {
      type: String,
      enum: ["summary", "experience", "skills", "education", "general", "formatting"],
      required: true,
    },
    type: {
      type: String,
      enum: ["warning", "improvement", "grammar", "action_verb", "missing_keyword", "success"],
      default: "improvement",
    },
    issue: { type: String, required: true },
    originalText: { type: String },
    suggestedText: { type: String },
    explanation: { type: String, required: true },
    applied: { type: Boolean, default: false },
  },
  { _id: false }
);

const jobMatchSchema = new Schema(
  {
    matchPercentage: { type: Number, default: 0 },
    matchedSkills: [{ type: String }],
    missingSkills: [{ type: String }],
    roleSuitability: { type: String },
    tailoredAdvice: [{ type: String }],
  },
  { _id: false }
);

const cvAnalysisSchema = new Schema<ICVAnalysisDocument>(
  {
    cvId: {
      type: Schema.Types.ObjectId,
      ref: "CV",
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    overallScore: { type: Number, required: true, min: 0, max: 100 },
    scores: {
      atsScore: { type: Number, required: true, min: 0, max: 100 },
      contentQuality: { type: Number, required: true, min: 0, max: 100 },
      skillsScore: { type: Number, required: true, min: 0, max: 100 },
      experienceScore: { type: Number, required: true, min: 0, max: 100 },
      educationScore: { type: Number, required: true, min: 0, max: 100 },
      formattingScore: { type: Number, required: true, min: 0, max: 100 },
      readabilityScore: { type: Number, required: true, min: 0, max: 100 },
    },
    breakdown: {
      atsFeedback: { type: String, default: "" },
      contentFeedback: { type: String, default: "" },
      skillsFeedback: { type: String, default: "" },
      experienceFeedback: { type: String, default: "" },
      formattingFeedback: { type: String, default: "" },
    },
    recommendations: [recommendationSchema],
    targetRole: { type: String },
    jobDescription: { type: String },
    jobMatch: jobMatchSchema,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CVAnalysis: Model<ICVAnalysisDocument> =
  mongoose.models.CVAnalysis || mongoose.model<ICVAnalysisDocument>("CVAnalysis", cvAnalysisSchema);
