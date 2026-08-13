import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRoadmapBookmarkDocument extends Document {
  userId: mongoose.Types.ObjectId;
  roadmapId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const roadmapBookmarkSchema = new Schema<IRoadmapBookmarkDocument>(
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
  },
  { timestamps: true }
);

roadmapBookmarkSchema.index({ userId: 1, roadmapId: 1 }, { unique: true });

export const RoadmapBookmark: Model<IRoadmapBookmarkDocument> =
  mongoose.models.RoadmapBookmark ||
  mongoose.model<IRoadmapBookmarkDocument>("RoadmapBookmark", roadmapBookmarkSchema);
