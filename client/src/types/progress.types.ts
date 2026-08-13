import { Course } from "./course.types";

export interface LectureProgress {
  lectureId: string;
  viewed: boolean;
}

export interface CourseProgress {
  _id?: string;
  userId: string;
  courseId: string | Course;
  completed: boolean;
  lectureProgress: LectureProgress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseProgressResponse {
  data: {
    courseDetails: Course;
    progress: LectureProgress[];
    completed: boolean;
  };
}
