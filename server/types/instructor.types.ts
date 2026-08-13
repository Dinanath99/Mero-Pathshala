import { Types } from "mongoose";
import { IUser } from "./user.types.js";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface IInstructorApplication {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | IUser | string;
  bio: string;
  expertise: string[];
  experienceYears: number;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  sampleCourseIdea?: string;
  status: ApplicationStatus;
  reviewNotes?: string;
  appliedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IInstructorProfile {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | IUser | string;
  bio?: string;
  headline?: string;
  expertise?: string[];
  experienceYears?: number;
  totalStudents?: number;
  totalCourses?: number;
  averageRating?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
