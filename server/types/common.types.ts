export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: PaginationMeta;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  stack?: string;
}
