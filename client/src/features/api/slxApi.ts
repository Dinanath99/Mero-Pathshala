import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookmarkItem, LearningNote, NotificationItem } from "../../types/notification.types";

export const slxApi = createApi({
  reducerPath: "slxApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/slx",
    credentials: "include",
  }),
  tagTypes: ["Dashboard", "Notes", "Bookmarks", "Notifications"],
  endpoints: (builder) => ({
    getStudentDashboard: builder.query<{ success: boolean; user: any; continueLearning: any[]; stats: any; weeklyGoal: any; calendarDays: any[]; achievements: any[]; activities: any[]; notifications: any[]; unreadNotificationCount: number }, void>({
      query: () => "/dashboard",
      providesTags: ["Dashboard"],
    }),

    getNotes: builder.query<{ success: boolean; notes: LearningNote[] }, void>({
      query: () => "/notes",
      providesTags: ["Notes"],
    }),
    createNote: builder.mutation<{ success: boolean; note: LearningNote; message: string }, { courseId?: string; lectureId?: string; lectureTitle?: string; timestamp?: string; title: string; content: string }>({
      query: (body) => ({
        url: "/notes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notes", "Dashboard"],
    }),
    deleteNote: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),

    getBookmarks: builder.query<{ success: boolean; bookmarks: BookmarkItem[] }, void>({
      query: () => "/bookmarks",
      providesTags: ["Bookmarks"],
    }),
    addBookmark: builder.mutation<{ success: boolean; bookmark: BookmarkItem; message: string }, { itemType: string; itemId: string; title: string; subtitle?: string; link: string; thumbnail?: string }>({
      query: (body) => ({
        url: "/bookmarks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bookmarks", "Dashboard"],
    }),
    removeBookmark: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/bookmarks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    getNotifications: builder.query<{ success: boolean; notifications: NotificationItem[] }, void>({
      query: () => "/notifications",
      providesTags: ["Notifications"],
    }),
    markNotificationRead: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications", "Dashboard"],
    }),
  }),
});

export const {
  useGetStudentDashboardQuery,
  useGetNotesQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetBookmarksQuery,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useGetNotificationsQuery,
  useMarkNotificationReadMutation,
} = slxApi;
