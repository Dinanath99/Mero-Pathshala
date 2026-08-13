import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICoursePurchaseDocument extends Document {
  courseId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

const coursePurchaseSchema = new Schema<ICoursePurchaseDocument>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

coursePurchaseSchema.index({ userId: 1, courseId: 1, status: 1 });
coursePurchaseSchema.index({ userId: 1, createdAt: -1 });
coursePurchaseSchema.index({ courseId: 1, status: 1 });

export const CoursePurchase: Model<ICoursePurchaseDocument> =
  mongoose.models.CoursePurchase ||
  mongoose.model<ICoursePurchaseDocument>("CoursePurchase", coursePurchaseSchema);
