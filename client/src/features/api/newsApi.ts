import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsArticle, NewsCategory, NewsTag } from "../../types/news.types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/content/news",
    credentials: "include",
  }),
  tagTypes: ["News", "NewsCategory", "NewsTag"],
  endpoints: (builder) => ({
    getNews: builder.query<{ success: boolean; news: NewsArticle[]; total?: number; page?: number; pages?: number }, Record<string, any> | void>({
      query: (params) => ({
        url: "/",
        params: params || {},
      }),
      providesTags: ["News"],
    }),
    getLatestNews: builder.query<{ success: boolean; news: NewsArticle[] }, void>({
      query: () => "/latest",
      providesTags: ["News"],
    }),
    getNewsBySlug: builder.query<{ success: boolean; news: NewsArticle; relatedNews?: NewsArticle[] }, string>({
      query: (slug) => `/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "News", id: slug }],
    }),
    getNewsCategories: builder.query<{ success: boolean; categories: NewsCategory[] }, void>({
      query: () => "/categories",
      providesTags: ["NewsCategory"],
    }),
    getNewsTags: builder.query<{ success: boolean; tags: NewsTag[] }, void>({
      query: () => "/tags",
      providesTags: ["NewsTag"],
    }),
    getAdminNews: builder.query<{ success: boolean; news: NewsArticle[] }, void>({
      query: () => "/admin/all",
      providesTags: ["News"],
    }),
    createNews: builder.mutation<{ success: boolean; news: NewsArticle; message: string }, FormData | Record<string, any>>({
      query: (newsData) => ({
        url: "/",
        method: "POST",
        body: newsData,
      }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation<{ success: boolean; news: NewsArticle; message: string }, { id: string; newsData: FormData | Record<string, any> }>({
      query: ({ id, newsData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: newsData,
      }),
      invalidatesTags: ["News"],
    }),
    deleteNews: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
    createNewsCategory: builder.mutation<{ success: boolean; category: NewsCategory }, Record<string, any>>({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["NewsCategory"],
    }),
    updateNewsCategory: builder.mutation<{ success: boolean; category: NewsCategory }, { id: string; categoryData: Record<string, any> }>({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: ["NewsCategory"],
    }),
    deleteNewsCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsCategory"],
    }),
    createNewsTag: builder.mutation<{ success: boolean; tag: NewsTag }, Record<string, any>>({
      query: (tagData) => ({
        url: "/tags",
        method: "POST",
        body: tagData,
      }),
      invalidatesTags: ["NewsTag"],
    }),
    deleteNewsTag: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NewsTag"],
    }),
    seedNewsCategories: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/categories/seed",
        method: "POST",
      }),
      invalidatesTags: ["NewsCategory", "NewsTag"],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetLatestNewsQuery,
  useGetNewsBySlugQuery,
  useGetNewsCategoriesQuery,
  useGetNewsTagsQuery,
  useGetAdminNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useCreateNewsCategoryMutation,
  useUpdateNewsCategoryMutation,
  useDeleteNewsCategoryMutation,
  useCreateNewsTagMutation,
  useDeleteNewsTagMutation,
  useSeedNewsCategoriesMutation,
} = newsApi;
