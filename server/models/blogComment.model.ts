import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlogCommentDocument extends Document {
  blog: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId | null;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const blogCommentSchema = new Schema<IBlogCommentDocument>(
  {
    blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "BlogComment", default: null },
    content: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

blogCommentSchema.index({ blog: 1, createdAt: 1 });

export const BlogComment: Model<IBlogCommentDocument> =
  mongoose.models.BlogComment ||
  mongoose.model<IBlogCommentDocument>("BlogComment", blogCommentSchema);
