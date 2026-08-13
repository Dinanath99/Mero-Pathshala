import { Types } from "mongoose";

export interface INotification {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  title: string;
  message: string;
  isRead: boolean;
  type?: "info" | "success" | "warning" | "error";
  link?: string;
  createdAt?: Date | string;
}
