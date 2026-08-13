import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourseDocument extends Document {
  courseTitle: string;
  subTitle?: string;
  description?: string;
  category: string;
  courseLevel?: "Beginner" | "Medium" | "Advance";
  coursePrice?: number;
  courseThumbnail?: string;
  enrolledStudents: mongoose.Types.ObjectId[];
  lectures: mongoose.Types.ObjectId[];
  creator: mongoose.Types.ObjectId;
  isPublished: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourseDocument>(
  {
    courseTitle: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String },
    category: { type: String, required: true },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Medium", "Advance"],
    },
    coursePrice: { type: Number },
    courseThumbnail: { type: String },
    enrolledStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

courseSchema.index({ isPublished: 1, createdAt: -1 });
courseSchema.index({ category: 1, isPublished: 1 });
courseSchema.index({ creator: 1, createdAt: -1 });
courseSchema.index({ courseTitle: "text", subTitle: "text", category: "text" });

export const Course: Model<ICourseDocument> = mongoose.models.Course || mongoose.model<ICourseDocument>("Course", courseSchema);
