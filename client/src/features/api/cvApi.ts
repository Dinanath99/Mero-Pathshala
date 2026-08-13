import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICVData, ICVAnalysis, ICVJobMatch } from "../../types/cv.types";

const CV_API = "http://localhost:8080/api/v1/cv/";

export const cvApi = createApi({
  reducerPath: "cvApi",
  baseQuery: fetchBaseQuery({
    baseUrl: CV_API,
    credentials: "include",
  }),
  tagTypes: ["CVs", "CV", "CVAnalysis"],
  endpoints: (builder) => ({
    getUserCVs: builder.query<{ success: boolean; cvs: ICVData[] }, void>({
      query: () => "user",
      providesTags: ["CVs"],
    }),
    getCVById: builder.query<{ success: boolean; cv: ICVData }, string>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, id) => [{ type: "CV", id }],
    }),
    createCV: builder.mutation<{ success: boolean; message: string; cv: ICVData }, Partial<ICVData>>({
      query: (cvData) => ({
        url: "",
        method: "POST",
        body: cvData,
      }),
      invalidatesTags: ["CVs"],
    }),
    updateCV: builder.mutation<{ success: boolean; message: string; cv: ICVData }, { id: string; cvData: Partial<ICVData> }>({
      query: ({ id, cvData }) => ({
        url: `${id}`,
        method: "PUT",
        body: cvData,
      }),
      invalidatesTags: (_result, _error, { id }) => ["CVs", { type: "CV", id }],
    }),
    deleteCV: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CVs"],
    }),
    duplicateCV: builder.mutation<{ success: boolean; message: string; cv: ICVData }, string>({
      query: (id) => ({
        url: `${id}/duplicate`,
        method: "POST",
      }),
      invalidatesTags: ["CVs"],
    }),
    improveSummaryAI: builder.mutation<
      { success: boolean; improvedSummary: string },
      { personalInfo: any; currentSummary: string; experience: any[]; skills: any[]; targetRole?: string }
    >({
      query: (payload) => ({
        url: "ai/improve-summary",
        method: "POST",
        body: payload,
      }),
    }),
    improveBulletAI: builder.mutation<
      { success: boolean; improvedBullet: string },
      { bulletText: string; context?: any; goal?: string }
    >({
      query: (payload) => ({
        url: "ai/improve-bullet",
        method: "POST",
        body: payload,
      }),
    }),
    analyzeCVAI: builder.mutation<{ success: boolean; analysis: ICVAnalysis }, { cvData: ICVData; cvId?: string; targetRole?: string }>({
      query: (payload) => ({
        url: "ai/analyze",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["CVAnalysis"],
    }),
    matchJobDescriptionAI: builder.mutation<
      { success: boolean; jobMatch: ICVJobMatch },
      { cvData: ICVData; jobDescription: string; targetRole?: string }
    >({
      query: (payload) => ({
        url: "ai/match-job",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetUserCVsQuery,
  useGetCVByIdQuery,
  useCreateCVMutation,
  useUpdateCVMutation,
  useDeleteCVMutation,
  useDuplicateCVMutation,
  useImproveSummaryAIMutation,
  useImproveBulletAIMutation,
  useAnalyzeCVAIMutation,
  useMatchJobDescriptionAIMutation,
} = cvApi;
