export type UserRole = "student" | "instructor" | "admin";
export type InstructorStatus = "none" | "pending" | "approved" | "rejected";

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  enrolledCourses?: string[] | any[];
  photoUrl?: string;
  bio?: string;
  title?: string;
  skills?: string[];
  socialLinks?: SocialLinks;
  interests?: string[];
  bookmarks?: string[];
  wishlist?: string[];
  isInstructor?: boolean;
  instructorStatus?: InstructorStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileResponse {
  success: boolean;
  user: User;
  message?: string;
}
