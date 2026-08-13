import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHomepageAnalyticsDocument extends Document {
  userId?: mongoose.Types.ObjectId | null;
  eventType: "section_click" | "recommendation_click" | "resume_learning_click" | "todays_pick_click" | "banner_click";
  sectionKey: string;
  itemType: "Course" | "Tool" | "Prompt" | "Blog" | "News" | "CTA" | "Other";
  itemId: string;
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const homepageAnalyticsSchema = new Schema<IHomepageAnalyticsDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    eventType: {
      type: String,
      enum: ["section_click", "recommendation_click", "resume_learning_click", "todays_pick_click", "banner_click"],
      required: true,
    },
    sectionKey: { type: String, default: "" },
    itemType: { type: String, enum: ["Course", "Tool", "Prompt", "Blog", "News", "CTA", "Other"], default: "Other" },
    itemId: { type: String, default: "" },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

export const HomepageAnalytics: Model<IHomepageAnalyticsDocument> =
  mongoose.models.HomepageAnalytics ||
  mongoose.model<IHomepageAnalyticsDocument>("HomepageAnalytics", homepageAnalyticsSchema);
