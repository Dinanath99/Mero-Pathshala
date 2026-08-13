import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoadmapProgressDocument extends Document {
  userId: mongoose.Types.ObjectId;
  roadmapId: mongoose.Types.ObjectId;
  completedModules: string[];
  lastAccessedModule: string;
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const roadmapProgressSchema = new Schema<IRoadmapProgressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roadmapId: {
      type: Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },
    completedModules: [{
      type: String,
    }],
    lastAccessedModule: {
      type: String,
      default: "",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

roadmapProgressSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

export const RoadmapProgress: Model<IRoadmapProgressDocument> =
  mongoose.models.RoadmapProgress ||
  mongoose.model<IRoadmapProgressDocument>("RoadmapProgress", roadmapProgressSchema);
