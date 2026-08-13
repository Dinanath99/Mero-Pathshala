import { Types } from "mongoose";

export interface ILectureProgress {
  lectureId: string;
  viewed: boolean;
}

export interface ICourseProgress {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  completed: boolean;
  lectureProgress: ILectureProgress[];
  lastViewedLectureId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ICoursePurchase {
  _id: Types.ObjectId | string;
  courseId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  amount: number;
  status: "pending" | "completed" | "failed";
  paymentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
