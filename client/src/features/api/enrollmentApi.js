import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/api";

const ENROLLMENT_API = `${API_BASE_URL}/enrollment`;

export const enrollmentApi = createApi({
  reducerPath: "enrollmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ENROLLMENT_API,
    credentials: "include",
  }),
  tagTypes: ["EnrollmentStatus", "EnrollmentApplications"],
  endpoints: (builder) => ({
    getCourseEnrollmentStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/status`,
        method: "GET",
      }),
      providesTags: (result, error, courseId) => [
        { type: "EnrollmentStatus", id: courseId },
      ],
    }),
    applyForEnrollment: builder.mutation({
      query: (applicationData) => ({
        url: "/apply",
        method: "POST",
        body: applicationData,
      }),
      invalidatesTags: (result, error, { courseId }) => [
        { type: "EnrollmentStatus", id: courseId },
        "EnrollmentApplications",
      ],
    }),
    adminGetApplications: builder.query({
      query: (params) => ({
        url: "/admin/applications",
        method: "GET",
        params,
      }),
      providesTags: ["EnrollmentApplications"],
    }),
    adminGetApplicationById: builder.query({
      query: (id) => ({
        url: `/admin/applications/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "EnrollmentApplications", id }],
    }),
    adminApproveApplication: builder.mutation({
      query: ({ id, adminNote }) => ({
        url: `/admin/applications/${id}/approve`,
        method: "PATCH",
        body: { adminNote },
      }),
      invalidatesTags: ["EnrollmentApplications", "EnrollmentStatus"],
    }),
    adminRejectApplication: builder.mutation({
      query: ({ id, adminNote }) => ({
        url: `/admin/applications/${id}/reject`,
        method: "PATCH",
        body: { adminNote },
      }),
      invalidatesTags: ["EnrollmentApplications", "EnrollmentStatus"],
    }),
    adminManualEnroll: builder.mutation({
      query: (manualData) => ({
        url: "/admin/manual",
        method: "POST",
        body: manualData,
      }),
      invalidatesTags: ["EnrollmentApplications", "EnrollmentStatus"],
    }),
  }),
});

export const {
  useGetCourseEnrollmentStatusQuery,
  useApplyForEnrollmentMutation,
  useAdminGetApplicationsQuery,
  useAdminGetApplicationByIdQuery,
  useAdminApproveApplicationMutation,
  useAdminRejectApplicationMutation,
  useAdminManualEnrollMutation,
} = enrollmentApi;
