import mongoose, { Schema, Document, Model } from "mongoose";

export interface IToolCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const toolCategorySchema = new Schema<IToolCategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "Bot" },
  },
  { timestamps: true }
);

export const ToolCategory: Model<IToolCategoryDocument> =
  mongoose.models.ToolCategory ||
  mongoose.model<IToolCategoryDocument>("ToolCategory", toolCategorySchema);
