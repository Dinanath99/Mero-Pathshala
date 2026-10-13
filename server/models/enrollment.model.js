import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    studentEmail: {
      type: String,
      required: [true, "Student email is required"],
      trim: true,
      lowercase: true,
      index: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"],
      index: true,
    },
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EnrollmentApplication",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "cancelled"],
      default: "active",
      index: true,
    },
    source: {
      type: String,
      enum: ["google_form", "manual_admin", "legacy_purchase"],
      default: "google_form",
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
    cancelledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate active enrollments for email + courseId
enrollmentSchema.index({ studentEmail: 1, courseId: 1, status: 1 });

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
