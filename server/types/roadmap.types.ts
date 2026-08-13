import { Types } from "mongoose";

export interface IRoadmapNode {
  id: string;
  title: string;
  description?: string;
  resources?: string[];
  order?: number;
}

export interface IRoadmap {
  _id: Types.ObjectId | string;
  title: string;
  slug: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  estimatedHours?: number;
  nodes: IRoadmapNode[];
  isPublished: boolean;
  creator?: Types.ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IRoadmapBookmark {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  roadmapId: Types.ObjectId | string;
  createdAt?: Date | string;
}

export interface IRoadmapProgress {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  roadmapId: Types.ObjectId | string;
  completedNodes: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
