import { User } from "./user.types";

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface BlogComment {
  _id: string;
  blogId: string;
  user: User;
  content: string;
  parentCommentId?: string;
  createdAt?: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: User;
  category: BlogCategory;
  tags?: string[];
  isPublished: boolean;
  featured?: boolean;
  views?: number;
  likes?: string[];
  commentsCount?: number;
  readingTime?: string;
  createdAt?: string;
  updatedAt?: string;
}
