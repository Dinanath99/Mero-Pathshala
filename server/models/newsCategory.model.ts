import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const newsCategorySchema = new Schema<INewsCategoryDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "Newspaper",
    },
    color: {
      type: String,
      default: "blue",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const NewsCategory: Model<INewsCategoryDocument> =
  mongoose.models.NewsCategory ||
  mongoose.model<INewsCategoryDocument>("NewsCategory", newsCategorySchema);
