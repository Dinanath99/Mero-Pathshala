import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PromptCategory, PromptItem } from "../../types/prompt.types";

const PROMPT_API_URL = "http://localhost:8080/api/v1/content/prompts";

export const promptApi = createApi({
  reducerPath: "promptApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROMPT_API_URL,
    credentials: "include",
  }),
  tagTypes: ["Prompt", "PromptCategory"],
  endpoints: (builder) => ({
    getPrompts: builder.query<{ success: boolean; prompts: PromptItem[]; total?: number; page?: number; pages?: number }, Record<string, any> | void>({
      query: (params) => ({
        url: "/",
        params: params || {},
      }),
      providesTags: ["Prompt"],
    }),
    getFeaturedPrompts: builder.query<{ success: boolean; prompts: PromptItem[] }, void>({
      query: () => "/featured",
      providesTags: ["Prompt"],
    }),
    getPromptBySlug: builder.query<{ success: boolean; prompt: PromptItem; relatedPrompts?: PromptItem[] }, string>({
      query: (slug) => `/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Prompt", id: slug }],
    }),
    getCategories: builder.query<{ success: boolean; categories: PromptCategory[] }, void>({
      query: () => "/categories",
      providesTags: ["PromptCategory"],
    }),

    incrementPromptCopy: builder.mutation<{ success: boolean; copiesCount: number }, string>({
      query: (id) => ({
        url: `/${id}/copy`,
        method: "POST",
      }),
      invalidatesTags: ["Prompt"],
    }),

    getAdminPrompts: builder.query<{ success: boolean; prompts: PromptItem[] }, void>({
      query: () => "/admin/all",
      providesTags: ["Prompt"],
    }),
    createPrompt: builder.mutation<{ success: boolean; prompt: PromptItem; message: string }, FormData | Record<string, any>>({
      query: (promptData) => ({
        url: "/",
        method: "POST",
        body: promptData,
      }),
      invalidatesTags: ["Prompt"],
    }),
    updatePrompt: builder.mutation<{ success: boolean; prompt: PromptItem; message: string }, { id: string; promptData: FormData | Record<string, any> }>({
      query: ({ id, promptData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: promptData,
      }),
      invalidatesTags: ["Prompt"],
    }),
    deletePrompt: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prompt"],
    }),

    seedCategories: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/categories/seed",
        method: "POST",
      }),
      invalidatesTags: ["PromptCategory"],
    }),
    createCategory: builder.mutation<{ success: boolean; category: PromptCategory }, Record<string, any>>({
      query: (categoryData) => ({
        url: "/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["PromptCategory"],
    }),
    updateCategory: builder.mutation<{ success: boolean; category: PromptCategory }, { id: string; categoryData: Record<string, any> }>({
      query: ({ id, categoryData }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: categoryData,
      }),
      invalidatesTags: ["PromptCategory"],
    }),
    deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PromptCategory"],
    }),
  }),
});

export const {
  useGetPromptsQuery,
  useGetFeaturedPromptsQuery,
  useGetPromptBySlugQuery,
  useGetCategoriesQuery,
  useIncrementPromptCopyMutation,
  useGetAdminPromptsQuery,
  useCreatePromptMutation,
  useUpdatePromptMutation,
  useDeletePromptMutation,
  useSeedCategoriesMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = promptApi;
