import { Types } from "mongoose";
import { ILecture } from "./lecture.types.js";
import { IUser } from "./user.types.js";

export type CourseLevel = "Beginner" | "Medium" | "Advance" | "All Levels";

export interface ICourse {
  _id: Types.ObjectId | string;
  courseTitle: string;
  subTitle?: string;
  description?: string;
  category: string;
  courseLevel?: CourseLevel;
  coursePrice?: number;
  courseThumbnail?: string;
  lectures: (Types.ObjectId | ILecture | string)[];
  creator: Types.ObjectId | IUser | string;
  isPublished: boolean;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
  rating?: number;
  totalRatings?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface CreateCourseInput {
  courseTitle: string;
  category: string;
}

export interface EditCourseInput {
  courseTitle?: string;
  subTitle?: string;
  description?: string;
  category?: string;
  courseLevel?: CourseLevel;
  coursePrice?: number;
  courseThumbnail?: string;
  isPublished?: boolean;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
}
