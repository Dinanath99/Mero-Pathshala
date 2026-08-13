import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILectureProgressItem {
  lectureId?: string;
  viewed?: boolean;
}

export interface ICourseProgressDocument extends Document {
  userId: string;
  courseId: string;
  completed: boolean;
  lectureProgress: ILectureProgressItem[];
}

const lectureProgressSchema = new Schema<ILectureProgressItem>({
  lectureId: { type: String },
  viewed: { type: Boolean },
});

const courseProgressSchema = new Schema<ICourseProgressDocument>(
  {
    userId: { type: String, required: true },
    courseId: { type: String, required: true },
    completed: { type: Boolean, default: false },
    lectureProgress: [lectureProgressSchema],
  },
  { timestamps: true }
);

courseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });
courseProgressSchema.index({ userId: 1, updatedAt: -1 });

export const CourseProgress: Model<ICourseProgressDocument> =
  mongoose.models.CourseProgress ||
  mongoose.model<ICourseProgressDocument>("CourseProgress", courseProgressSchema);
