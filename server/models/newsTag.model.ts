import mongoose, { Schema, Document, Model } from "mongoose";

export interface INewsTagDocument extends Document {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const newsTagSchema = new Schema<INewsTagDocument>(
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
  },
  { timestamps: true }
);

export const NewsTag: Model<INewsTagDocument> =
  mongoose.models.NewsTag || mongoose.model<INewsTagDocument>("NewsTag", newsTagSchema);
