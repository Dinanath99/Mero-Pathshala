import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tool, ToolCategory } from "../../types/ai-tool.types";

const TOOL_API = "http://localhost:8080/api/v1/content/tools/";

export const toolApi = createApi({
  reducerPath: "toolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: TOOL_API,
    credentials: "include",
  }),
  tagTypes: ["Tools", "Tool", "ToolCategories"],
  endpoints: (builder) => ({
    getTools: builder.query<{ success: boolean; tools: Tool[]; pagination?: any }, Record<string, any> | void>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.category) queryParams.append("category", params.category);
        if (params?.search) queryParams.append("search", params.search);
        if (params?.pricingType) queryParams.append("pricingType", params.pricingType);
        if (params?.featured) queryParams.append("featured", params.featured);
        if (params?.sort) queryParams.append("sort", params.sort);
        if (params?.page) queryParams.append("page", params.page);
        if (params?.limit) queryParams.append("limit", params.limit);
        return `?${queryParams.toString()}`;
      },
      providesTags: ["Tools"],
    }),
    getFeaturedTools: builder.query<{ success: boolean; tools: Tool[] }, void>({
      query: () => "featured",
      providesTags: ["Tools"],
    }),
    getToolBySlug: builder.query<{ success: boolean; tool: Tool; relatedTools?: Tool[] }, string>({
      query: (slug) => `slug/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Tool", id: slug }],
    }),
    getAdminTools: builder.query<{ success: boolean; tools: Tool[] }, void>({
      query: () => "admin/all",
      providesTags: ["Tools"],
    }),
    getToolById: builder.query<{ success: boolean; tool: Tool }, string>({
      query: (id) => `admin/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Tool", id }],
    }),
    createTool: builder.mutation<{ success: boolean; tool: Tool; message: string }, FormData | Record<string, any>>({
      query: (formData) => ({
        url: "",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Tools"],
    }),
    updateTool: builder.mutation<{ success: boolean; tool: Tool; message: string }, { id: string; formData: FormData | Record<string, any> }>({
      query: ({ id, formData }) => ({
        url: `admin/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Tools",
        { type: "Tool", id },
      ],
    }),
    deleteTool: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tools"],
    }),
    toggleFeatureTool: builder.mutation<{ success: boolean; featured: boolean; message: string }, string>({
      query: (id) => ({
        url: `admin/${id}/feature`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => ["Tools", { type: "Tool", id }],
    }),
    togglePublishTool: builder.mutation<{ success: boolean; status: string; message: string }, string>({
      query: (id) => ({
        url: `admin/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => ["Tools", { type: "Tool", id }],
    }),
    getCategories: builder.query<{ success: boolean; categories: ToolCategory[] }, void>({
      query: () => "categories",
      providesTags: ["ToolCategories"],
    }),
    getAdminCategories: builder.query<{ success: boolean; categories: ToolCategory[] }, void>({
      query: () => "admin/categories",
      providesTags: ["ToolCategories"],
    }),
    createCategory: builder.mutation<{ success: boolean; category: ToolCategory }, Record<string, any>>({
      query: (data) => ({
        url: "categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ToolCategories"],
    }),
    updateCategory: builder.mutation<{ success: boolean; category: ToolCategory }, { id: string; data: Record<string, any> }>({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ToolCategories"],
    }),
    deleteCategory: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ToolCategories", "Tools"],
    }),
  }),
});

export const {
  useGetToolsQuery,
  useGetFeaturedToolsQuery,
  useGetToolBySlugQuery,
  useGetAdminToolsQuery,
  useGetToolByIdQuery,
  useCreateToolMutation,
  useUpdateToolMutation,
  useDeleteToolMutation,
  useToggleFeatureToolMutation,
  useTogglePublishToolMutation,
  useGetCategoriesQuery,
  useGetAdminCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = toolApi;
