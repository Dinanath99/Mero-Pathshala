import { Types } from "mongoose";

export interface ICourseClick {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  clickCount: number;
  lastClickedAt: Date | string;
}

export interface IUserCourseInteraction {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  interactionType: "view" | "click" | "enroll" | "progress" | "complete";
  weight: number;
  createdAt?: Date | string;
}
