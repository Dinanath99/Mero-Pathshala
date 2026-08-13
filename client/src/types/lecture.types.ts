export interface Lecture {
  _id: string;
  lectureTitle: string;
  videoUrl?: string;
  publicId?: string;
  isPreviewFree?: boolean;
  duration?: number;
  notes?: string;
  codeSnippet?: string;
  resources?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LectureInput {
  lectureTitle: string;
  videoUrl?: string;
  isPreviewFree?: boolean;
}
