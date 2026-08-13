export interface NotificationItem {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type?: "System" | "Course" | "Achievement" | "Streak";
  read?: boolean;
  link?: string;
  createdAt?: string;
}

export interface LearningActivity {
  _id: string;
  userId: string;
  activityType: string;
  title: string;
  description?: string;
  link?: string;
  createdAt?: string;
}

export interface BookmarkItem {
  _id: string;
  userId: string;
  itemType: "Course" | "Tool" | "Prompt" | "Blog" | "News" | "Roadmap";
  itemId: string;
  title: string;
  subtitle?: string;
  link: string;
  thumbnail?: string;
  createdAt?: string;
}

export interface LearningNote {
  _id: string;
  userId: string;
  courseId?: string;
  lectureId?: string;
  lectureTitle?: string;
  timestamp?: string;
  title: string;
  content: string;
  createdAt?: string;
}
