import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Course, Lecture } from "../../types/course.types";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation<{ success: boolean; course: Course; message: string }, { courseTitle: string; category: string }>({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getSearchCourse: builder.query<{ success: boolean; courses: Course[] }, { searchQuery?: string; categories?: string[]; sortByPrice?: string }>({
      query: ({ searchQuery = "", categories = [], sortByPrice = "" }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery)}`;
        if (categories && categories.length > 0) {
          const categoriesString = categories.map(encodeURIComponent).join(",");
          queryString += `&categories=${categoriesString}`;
        }
        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }
        return {
          url: queryString,
          method: "GET",
        };
      },
    }),
    getPublishedCourse: builder.query<{ success: boolean; courses: Course[] }, void>({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),
    getCreatorCourse: builder.query<{ success: boolean; courses: Course[] }, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),
    editCourse: builder.mutation<{ success: boolean; course: Course; message: string }, { formData: FormData | Record<string, any>; courseId: string }>({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),
    getCourseById: builder.query<{ success: boolean; course: Course }, string>({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation<{ success: boolean; lecture: Lecture; message: string }, { lectureTitle: string; courseId: string }>({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query<{ success: boolean; lectures: Lecture[] }, string>({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation<{ success: boolean; lecture: Lecture; message: string }, { lectureTitle: string; videoInfo?: any; isPreviewFree?: boolean; courseId: string; lectureId: string }>({
      query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
    }),
    removeLecture: builder.mutation<{ success: boolean; message: string }, string>({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query<{ success: boolean; lecture: Lecture }, string>({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
    publishCourse: builder.mutation<{ success: boolean; message: string }, { courseId: string; query: boolean | string }>({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),
    getRecommendedCourses: builder.query<{ success: boolean; courses: Course[] }, void>({
      query: () => ({
        url: "/recommend",
        method: "GET",
      }),
    }),
    getCollaborativeCourses: builder.query<{ success: boolean; courses: Course[] }, void>({
      query: () => ({
        url: "/collaborative",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetRecommendedCoursesQuery,
  useGetCollaborativeCoursesQuery,
} = courseApi;
