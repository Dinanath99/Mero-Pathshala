import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogCategoryDocument extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  coverImage?: string;
  displayOrder: number;
  color: string;
  isActive: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogCategorySchema = new Schema<IBlogCategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    icon: { type: String },
    coverImage: { type: String },
    displayOrder: { type: Number, default: 0 },
    color: { type: String, default: "#f97316" },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const BlogCategory: Model<IBlogCategoryDocument> =
  mongoose.models.BlogCategory ||
  mongoose.model<IBlogCategoryDocument>("BlogCategory", blogCategorySchema);
