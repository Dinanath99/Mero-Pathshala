import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Roadmap, RoadmapAdvisorInput } from "../../types/roadmap.types";

export const roadmapApi = createApi({
  reducerPath: "roadmapApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/roadmaps",
    credentials: "include",
  }),
  tagTypes: ["Roadmap", "Bookmark", "Progress"],
  endpoints: (builder) => ({
    getRoadmaps: builder.query<{ success: boolean; roadmaps: Roadmap[] }, Record<string, any> | void>({
      query: (params) => ({
        url: "/",
        params: params || {},
      }),
      providesTags: ["Roadmap"],
    }),
    getRoadmapBySlug: builder.query<{ success: boolean; roadmap: Roadmap }, string>({
      query: (slug) => `/slug/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Roadmap", id: slug }],
    }),
    getRoadmapAdvisor: builder.mutation<{ success: boolean; recommendation: any }, RoadmapAdvisorInput>({
      query: (data) => ({
        url: "/advisor",
        method: "POST",
        body: data,
      }),
    }),
    toggleRoadmapBookmark: builder.mutation<{ success: boolean; bookmarked: boolean }, string>({
      query: (roadmapId) => ({
        url: `/${roadmapId}/bookmark`,
        method: "POST",
      }),
      invalidatesTags: ["Bookmark", "Roadmap"],
    }),
    getUserRoadmapBookmarks: builder.query<{ success: boolean; bookmarks: Roadmap[] }, void>({
      query: () => "/user/bookmarks",
      providesTags: ["Bookmark"],
    }),
    updateRoadmapProgress: builder.mutation<{ success: boolean; progress: any }, { roadmapId: string; completedModules: number[]; lastAccessedModule?: number }>({
      query: ({ roadmapId, completedModules, lastAccessedModule }) => ({
        url: `/${roadmapId}/progress`,
        method: "POST",
        body: { completedModules, lastAccessedModule },
      }),
      invalidatesTags: ["Progress"],
    }),
    getUserRoadmapProgress: builder.query<{ success: boolean; progress: any }, string>({
      query: (roadmapId) => `/${roadmapId}/progress`,
      providesTags: (_result, _error, id) => [{ type: "Progress", id }],
    }),

    createRoadmap: builder.mutation<{ success: boolean; roadmap: Roadmap; message: string }, FormData | Record<string, any>>({
      query: (roadmapData) => ({
        url: "/",
        method: "POST",
        body: roadmapData,
      }),
      invalidatesTags: ["Roadmap"],
    }),
    updateRoadmap: builder.mutation<{ success: boolean; roadmap: Roadmap; message: string }, { id: string; [key: string]: any }>({
      query: ({ id, ...roadmapData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: roadmapData,
      }),
      invalidatesTags: ["Roadmap"],
    }),
    deleteRoadmap: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roadmap"],
    }),
    togglePublishRoadmap: builder.mutation<{ success: boolean; published: boolean; message: string }, string>({
      query: (id) => ({
        url: `/${id}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Roadmap"],
    }),
  }),
});

export const {
  useGetRoadmapsQuery,
  useGetRoadmapBySlugQuery,
  useGetRoadmapAdvisorMutation,
  useToggleRoadmapBookmarkMutation,
  useGetUserRoadmapBookmarksQuery,
  useUpdateRoadmapProgressMutation,
  useGetUserRoadmapProgressQuery,
  useCreateRoadmapMutation,
  useUpdateRoadmapMutation,
  useDeleteRoadmapMutation,
  useTogglePublishRoadmapMutation,
} = roadmapApi;
