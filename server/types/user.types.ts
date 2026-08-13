import { Types } from "mongoose";

export type UserRole = "student" | "instructor" | "admin";
export type InstructorStatus = "none" | "pending" | "approved" | "rejected";

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface IUser {
  _id: Types.ObjectId | string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  enrolledCourses: Types.ObjectId[] | string[];
  photoUrl?: string;
  bio?: string;
  title?: string;
  socialLinks?: SocialLinks;
  interests?: string[];
  bookmarks?: Types.ObjectId[] | string[];
  isInstructor?: boolean;
  instructorStatus?: InstructorStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledCourses: string[];
  photoUrl?: string;
  bio?: string;
  title?: string;
  socialLinks?: SocialLinks;
  interests?: string[];
  bookmarks?: string[];
  isInstructor?: boolean;
  instructorStatus?: InstructorStatus;
  createdAt?: string;
  updatedAt?: string;
}
