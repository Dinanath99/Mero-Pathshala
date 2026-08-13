import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILectureDocument extends Document {
  lectureTitle: string;
  videoUrl?: string;
  publicId?: string;
  isPreviewFree?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const lectureSchema = new Schema<ILectureDocument>(
  {
    lectureTitle: {
      type: String,
      required: true,
    },
    videoUrl: { type: String },
    publicId: { type: String },
    isPreviewFree: { type: Boolean },
  },
  { timestamps: true }
);

export const Lecture: Model<ILectureDocument> = mongoose.models.Lecture || mongoose.model<ILectureDocument>("Lecture", lectureSchema);
