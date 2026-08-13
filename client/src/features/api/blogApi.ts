import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Blog, BlogCategory, BlogComment } from "../../types/blog.types";

const BLOG_API = "http://localhost:8080/api/v1/content/blogs/";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BLOG_API,
    credentials: "include",
  }),
  tagTypes: ["Blogs", "Blog", "Categories", "Comments"],
  endpoints: (builder) => ({
    getBlogs: builder.query<{ success: boolean; blogs: Blog[] }, { category?: string; search?: string; status?: string } | void>({
      query: (params) => {
        let queryString = "?";
        if (params?.category) queryString += `category=${params.category}&`;
        if (params?.search) queryString += `search=${params.search}&`;
        if (params?.status) queryString += `status=${params.status}&`;
        return queryString;
      },
      providesTags: ["Blogs"],
    }),
    getBlogBySlug: builder.query<{ success: boolean; blog: Blog; relatedBlogs?: Blog[] }, string>({
      query: (slug) => `${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Blog", id: slug }],
    }),
    getAdminBlogs: builder.query<{ success: boolean; blogs: Blog[] }, void>({
      query: () => "admin/all",
      providesTags: ["Blogs"],
    }),
    getBlogById: builder.query<{ success: boolean; blog: Blog }, string>({
      query: (id) => `admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blog", id }],
    }),
    createBlog: builder.mutation<{ success: boolean; message: string; blog: Blog }, FormData | Record<string, any>>({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation<{ success: boolean; message: string; blog: Blog }, { id: string; formData: FormData | Record<string, any> }>({
      query: ({ id, formData }) => ({
        url: `admin/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Blogs",
        { type: "Blog", id },
      ],
    }),
    deleteBlog: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
    getCategories: builder.query<{ success: boolean; categories: BlogCategory[] }, void>({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    getAdminCategories: builder.query<{ success: boolean; categories: BlogCategory[] }, void>({
      query: () => "admin/categories",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<{ success: boolean; category: BlogCategory }, Record<string, any>>({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<{ success: boolean; category: BlogCategory }, { id: string; formData: Record<string, any> }>({
      query: ({ id, formData }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories", "Blogs"],
    }),
    getComments: builder.query<{ success: boolean; comments: BlogComment[] }, string>({
      query: (blogId) => `${blogId}/comments`,
      providesTags: (_result, _error, blogId) => [
        { type: "Comments", id: blogId },
      ],
    }),
    addComment: builder.mutation<{ success: boolean; comment: BlogComment }, { blogId: string; content: string; parentCommentId?: string }>({
      query: ({ blogId, ...data }) => ({
        url: `${blogId}/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { blogId }) => [
        { type: "Comments", id: blogId },
      ],
    }),
    deleteComment: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogBySlugQuery,
  useGetAdminBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useGetCategoriesQuery,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = blogApi;
