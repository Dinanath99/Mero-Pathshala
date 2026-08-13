import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserCourseInteractionDocument extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  enrolled: boolean;
  liked?: boolean;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

const userCourseInteractionSchema = new Schema<IUserCourseInteractionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolled: { type: Boolean, default: false },
    liked: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

userCourseInteractionSchema.index({ userId: 1, courseId: 1 }, { unique: true });
userCourseInteractionSchema.index({ userId: 1 });

export const UserCourseInteraction: Model<IUserCourseInteractionDocument> =
  mongoose.models.UserCourseInteraction ||
  mongoose.model<IUserCourseInteractionDocument>(
    "UserCourseInteraction",
    userCourseInteractionSchema
  );
