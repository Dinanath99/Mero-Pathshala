import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/api";

const COURSE_PURCHASE_API = `${API_BASE_URL}/purchase`;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_PURCHASE_API,
    credentials: "include",
  }),
  tagTypes: ["CourseDetail", "PurchasedCourses", "PaymentStatus"],
  endpoints: (builder) => ({
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET",
      }),
      providesTags: (result, error, courseId) => [
        { type: "CourseDetail", id: courseId },
      ],
    }),
    getPurchasedCourses: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      providesTags: ["PurchasedCourses"],
    }),
    initiateCoursePayment: builder.mutation({
      query: ({ courseId }) => ({
        url: "/esewa/initiate",
        method: "POST",
        body: { courseId },
      }),
    }),
    verifyEsewaPayment: builder.mutation({
      query: ({ data }) => ({
        url: "/esewa/verify",
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["CourseDetail", "PurchasedCourses", "PaymentStatus"],
    }),
    getPaymentStatus: builder.query({
      query: (transactionUuid) => ({
        url: `/status/${transactionUuid}`,
        method: "GET",
      }),
      providesTags: ["PaymentStatus"],
    }),
    recordPaymentFailure: builder.mutation({
      query: ({ transactionUuid }) => ({
        url: "/esewa/fail",
        method: "POST",
        body: { transactionUuid },
      }),
    }),
  }),
});

export const {
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery,
  useInitiateCoursePaymentMutation,
  useVerifyEsewaPaymentMutation,
  useGetPaymentStatusQuery,
  useRecordPaymentFailureMutation,
} = purchaseApi;
