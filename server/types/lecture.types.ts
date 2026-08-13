import { Types } from "mongoose";

export interface ILecture {
  _id: Types.ObjectId | string;
  lectureTitle: string;
  videoUrl?: string;
  publicId?: string;
  isPreviewFree?: boolean;
  duration?: number;
  notes?: string;
  codeSnippet?: string;
  resources?: string[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
