import mongoose from "mongoose";

const coursePurchaseSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      index: true,
    },
    paymentId: {
      type: String,
      required: true,
      index: true,
    },
    transactionUuid: {
      type: String,
      sparse: true,
      index: true,
    },
    paymentMethod: {
      type: String,
      default: "esewa",
    },
    refId: {
      type: String,
      default: null,
    },
    rawVerificationResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

coursePurchaseSchema.index({ userId: 1, courseId: 1, status: 1 });

export const CoursePurchase = mongoose.model(
  "CoursePurchase",
  coursePurchaseSchema
);