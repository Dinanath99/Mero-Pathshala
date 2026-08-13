import { Types } from "mongoose";
import { IUser } from "./user.types.js";

export interface IBlogCategory {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IBlogComment {
  _id: Types.ObjectId | string;
  blogId: Types.ObjectId | string;
  user: Types.ObjectId | IUser | string;
  content: string;
  parentCommentId?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IBlog {
  _id: Types.ObjectId | string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: Types.ObjectId | IUser | string;
  category: Types.ObjectId | IBlogCategory | string;
  tags?: string[];
  isPublished: boolean;
  views?: number;
  likes?: (Types.ObjectId | string)[];
  commentsCount?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
