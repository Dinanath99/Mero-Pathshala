import { Course } from "./course.types";

export interface RecommendationScore {
  courseId: string;
  score: number;
  reasonEn?: string;
  reasonNe?: string;
}

export interface RecommendationResponse {
  success: boolean;
  courses: Course[];
  scores?: RecommendationScore[];
  recommendations?: Course[];
}
