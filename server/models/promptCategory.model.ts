import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPromptCategoryDocument extends Document {
  name: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const promptCategorySchema = new Schema<IPromptCategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
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
      trim: true,
    },
    icon: {
      type: String,
      default: "Sparkles",
    },
    color: {
      type: String,
      default: "orange",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const PromptCategory: Model<IPromptCategoryDocument> =
  mongoose.models.PromptCategory ||
  mongoose.model<IPromptCategoryDocument>("PromptCategory", promptCategorySchema);
