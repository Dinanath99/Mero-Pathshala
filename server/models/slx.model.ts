import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILearningNoteDocument extends Document {
  userId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  lectureId: string;
  lectureTitle: string;
  timestamp: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBookmarkDocument extends Document {
  userId: mongoose.Types.ObjectId;
  itemType: "Course" | "Lesson" | "Blog" | "Tool" | "Prompt" | "News";
  itemId: string;
  title: string;
  subtitle: string;
  link: string;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILearningActivityDocument extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: string;
  title: string;
  description: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAchievementDocument extends Document {
  userId: mongoose.Types.ObjectId;
  badgeKey: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface INotificationDocument extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "System" | "Course" | "News" | "Announcement" | "Streak";
  read: boolean;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const learningNoteSchema = new Schema<ILearningNoteDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    lectureId: { type: String, default: "" },
    lectureTitle: { type: String, default: "" },
    timestamp: { type: String, default: "00:00" },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const bookmarkSchema = new Schema<IBookmarkDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemType: {
      type: String,
      enum: ["Course", "Lesson", "Blog", "Tool", "Prompt", "News"],
      required: true,
    },
    itemId: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: "" },
    link: { type: String, required: true },
    thumbnail: { type: String, default: "" },
  },
  { timestamps: true }
);

const learningActivitySchema = new Schema<ILearningActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activityType: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

const achievementSchema = new Schema<IAchievementDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    badgeKey: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Award" },
    unlockedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const notificationSchema = new Schema<INotificationDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ["System", "Course", "News", "Announcement", "Streak"], default: "System" },
    read: { type: Boolean, default: false },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

learningNoteSchema.index({ userId: 1, createdAt: -1 });
bookmarkSchema.index({ userId: 1, itemType: 1, itemId: 1 }, { unique: true });
bookmarkSchema.index({ userId: 1, createdAt: -1 });
learningActivitySchema.index({ userId: 1, createdAt: -1 });
achievementSchema.index({ userId: 1, badgeKey: 1 });
notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export const LearningNote: Model<ILearningNoteDocument> =
  mongoose.models.LearningNote || mongoose.model<ILearningNoteDocument>("LearningNote", learningNoteSchema);

export const Bookmark: Model<IBookmarkDocument> =
  mongoose.models.Bookmark || mongoose.model<IBookmarkDocument>("Bookmark", bookmarkSchema);

export const LearningActivity: Model<ILearningActivityDocument> =
  mongoose.models.LearningActivity || mongoose.model<ILearningActivityDocument>("LearningActivity", learningActivitySchema);

export const Achievement: Model<IAchievementDocument> =
  mongoose.models.Achievement || mongoose.model<IAchievementDocument>("Achievement", achievementSchema);

export const Notification: Model<INotificationDocument> =
  mongoose.models.Notification || mongoose.model<INotificationDocument>("Notification", notificationSchema);
