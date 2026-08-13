export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  user?: any;
  courses?: any;
  course?: any;
  lectures?: any;
  lecture?: any;
  blogs?: any;
  blog?: any;
  tools?: any;
  tool?: any;
  prompts?: any;
  prompt?: any;
  news?: any;
  roadmaps?: any;
  roadmap?: any;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
