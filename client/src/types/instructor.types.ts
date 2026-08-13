import { User } from "./user.types";

export interface InstructorApplication {
  _id: string;
  userId: User;
  bio: string;
  expertise: string[];
  experienceYears: number;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  sampleCourseIdea?: string;
  status: "pending" | "approved" | "rejected";
  reviewNotes?: string;
  appliedAt?: string;
}

export interface InstructorApplicationInput {
  bio: string;
  expertise: string[] | string;
  experienceYears: number;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  sampleCourseIdea?: string;
}

export interface InstructorStats {
  totalCourses: number;
  totalStudents: number;
  totalRevenue: number;
  averageRating: number;
}
