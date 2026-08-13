import { Types } from "mongoose";

export interface IPromptCategory {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IPrompt {
  _id: Types.ObjectId | string;
  title: string;
  slug: string;
  promptText: string;
  category: Types.ObjectId | IPromptCategory | string;
  targetModel?: string;
  description?: string;
  author?: Types.ObjectId | string;
  tags?: string[];
  copyCount?: number;
  likesCount?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
