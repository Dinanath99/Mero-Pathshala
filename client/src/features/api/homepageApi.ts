import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homepageApi = createApi({
  reducerPath: "homepageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/homepage",
    credentials: "include",
  }),
  tagTypes: ["Homepage"],
  endpoints: (builder) => ({
    getPersonalizedHomepage: builder.query<any, void>({
      query: () => "/",
      providesTags: ["Homepage"],
    }),
    updateHomepageConfig: builder.mutation<{ success: boolean; message: string; config: any }, Record<string, any>>({
      query: (data) => ({
        url: "/config",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Homepage"],
    }),
    logHomepageAnalytics: builder.mutation<{ success: boolean }, Record<string, any>>({
      query: (eventData) => ({
        url: "/analytics",
        method: "POST",
        body: eventData,
      }),
    }),
    getHomepageAnalyticsStats: builder.query<any, void>({
      query: () => "/analytics-stats",
    }),
  }),
});

export const {
  useGetPersonalizedHomepageQuery,
  useUpdateHomepageConfigMutation,
  useLogHomepageAnalyticsMutation,
  useGetHomepageAnalyticsStatsQuery,
} = homepageApi;
