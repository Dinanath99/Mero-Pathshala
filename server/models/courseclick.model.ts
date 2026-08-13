import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourseClickDocument extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  clickedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const courseClickSchema = new Schema<ICourseClickDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    clickedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const CourseClick: Model<ICourseClickDocument> =
  mongoose.models.CourseClick ||
  mongoose.model<ICourseClickDocument>("CourseClick", courseClickSchema);

export default CourseClick;
