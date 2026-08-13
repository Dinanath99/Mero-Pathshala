import { User } from "./user.types";
import { Lecture } from "./lecture.types";
export type { Lecture };

export type CourseLevel = "Beginner" | "Medium" | "Advance" | "All Levels";

export interface Course {
  _id: string;
  courseTitle: string;
  subTitle?: string;
  description?: string;
  category: string;
  courseLevel?: CourseLevel;
  coursePrice?: number;
  courseThumbnail?: string;
  lectures: Lecture[];
  creator: User | string;
  isPublished: boolean;
  learningOutcomes?: string[];
  requirements?: string[];
  tags?: string[];
  rating?: number;
  totalRatings?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseInput {
  courseTitle: string;
  subTitle?: string;
  description?: string;
  category: string;
  courseLevel?: CourseLevel;
  coursePrice?: number;
  isPublished?: boolean;
}

export interface SearchCoursesQuery {
  query?: string;
  categories?: string[];
  sortByPrice?: string;
  page?: number;
  limit?: number;
}

export interface CourseSearchResponse {
  courses: Course[];
  total: number;
  page: number;
  pages: number;
}
