import { Types } from "mongoose";

export interface INewsCategory {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface INewsTag {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface INews {
  _id: Types.ObjectId | string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  imageUrl?: string;
  category: Types.ObjectId | INewsCategory | string;
  tags?: (Types.ObjectId | INewsTag | string)[];
  sourceName?: string;
  sourceUrl?: string;
  isFeatured?: boolean;
  publishedAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
