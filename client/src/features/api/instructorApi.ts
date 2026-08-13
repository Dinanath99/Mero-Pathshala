import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { InstructorApplication, InstructorApplicationInput, InstructorStats } from "../../types/instructor.types";

export const instructorApi = createApi({
  reducerPath: "instructorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/instructors",
    credentials: "include",
  }),
  tagTypes: [
    "InstructorApplication",
    "InstructorProfile",
    "InstructorStats",
    "InstructorStudents",
  ],
  endpoints: (builder) => ({
    submitInstructorApplication: builder.mutation<{ success: boolean; message: string; application: InstructorApplication }, InstructorApplicationInput | FormData>({
      query: (formData) => ({
        url: "/apply",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["InstructorApplication"],
    }),
    getMyApplicationStatus: builder.query<{ success: boolean; application: InstructorApplication | null }, void>({
      query: () => "/my-application",
      providesTags: ["InstructorApplication"],
    }),
    getAdminInstructorApplications: builder.query<{ success: boolean; applications: InstructorApplication[] }, string | void>({
      query: (status = "All") => `/admin/applications?status=${status}`,
      providesTags: ["InstructorApplication"],
    }),
    updateApplicationStatus: builder.mutation<{ success: boolean; message: string }, { applicationId: string; status: "approved" | "rejected"; adminNotes?: string }>({
      query: ({ applicationId, status, adminNotes }) => ({
        url: `/admin/applications/${applicationId}`,
        method: "PUT",
        body: { status, adminNotes },
      }),
      invalidatesTags: ["InstructorApplication", "InstructorProfile"],
    }),
    getInstructors: builder.query<{ success: boolean; instructors: any[] }, { search?: string; expertise?: string } | void>({
      query: (params) => {
        const search = params?.search || "";
        const expertise = params?.expertise || "";
        return `/all?search=${encodeURIComponent(search)}&expertise=${encodeURIComponent(expertise)}`;
      },
      providesTags: ["InstructorProfile"],
    }),
    getInstructorBySlug: builder.query<{ success: boolean; instructor: any }, string>({
      query: (slug) => `/p/${slug}`,
      providesTags: (_result, _error, slug) => [
        { type: "InstructorProfile", id: slug },
      ],
    }),
    getInstructorDashboardStats: builder.query<{ success: boolean; stats: InstructorStats }, void>({
      query: () => "/dashboard/stats",
      providesTags: ["InstructorStats"],
    }),
    getInstructorStudents: builder.query<{ success: boolean; students: any[] }, void>({
      query: () => "/dashboard/students",
      providesTags: ["InstructorStudents"],
    }),
    updateInstructorProfile: builder.mutation<{ success: boolean; message: string }, FormData | Record<string, any>>({
      query: (profileData) => ({
        url: "/profile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["InstructorProfile", "InstructorStats"],
    }),
  }),
});

export const {
  useSubmitInstructorApplicationMutation,
  useGetMyApplicationStatusQuery,
  useGetAdminInstructorApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useGetInstructorsQuery,
  useGetInstructorBySlugQuery,
  useGetInstructorDashboardStatsQuery,
  useGetInstructorStudentsQuery,
  useUpdateInstructorProfileMutation,
} = instructorApi;
