/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { ExamResults } from "../../models/types";
export type ExamResultsResponse = ExamResults[];

interface ExamResultArgs{
  userId: string | undefined,
  examTestId: string | undefined
}

export const examResultsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllResultsByExamTest: build.query<ExamResultsResponse, string>({
      query: (examTestId) => ({
        url: `api/ExamResults/GetAllResultsByExamTest/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examResults", id } as const)),
        { type: "examResults" as const, id: "LIST" },
      ],
    }),
    getAllResultsByExamTestDetail: build.query<ExamResultsResponse, string>({
      query: (examTestId) => ({
        url: `api/ExamResults/GetAllResultsByExamTestDetail/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examResults", id } as const)),
        { type: "examResults" as const, id: "LIST" },
      ],
    }),
    getTop3ResultsByUser: build.query<ExamResultsResponse, ExamResultArgs>({
      query: (args) => {
        const { userId, examTestId } = args;
        return {
          url: `api/ExamResults/GetTop3ResultsByUser/${userId}/${examTestId}`,
        };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examResults", id } as const)),
        { type: "examResults" as const, id: "LIST" },
      ],
    }),
    getAllResultsByUser: build.query<ExamResultsResponse, string>({
      query: (userid) => ({
        url: `api/ExamResults/GetAllResultByUser/${userid}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examResults", id } as const)),
        { type: "examResults" as const, id: "LIST" },
      ],
    }),
    getExamResult: build.query<ExamResults, string>({
      query: (id) => `api/ExamResults/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "examResults", id: result?.id }],
    }),
    addExamResult: build.mutation<ExamResults, Partial<ExamResults>>({
      query: (body) => ({
        url: "api/ExamResults/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "examResults", id: "LIST" }],
    }),
    updateExamResult: build.mutation<ExamResults, Partial<ExamResults>>({
      query(body) {
        return {
          url: `api/ExamResults/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (examResults) => [
        { type: "examResults", id: examResults?.id },
      ],
    }),
    deleteExamResult: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/ExamResults/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (examResults) => [
        { type: "examResults", id: examResults?.id },
      ],
    }),
  }),
});

export const {
  useGetAllResultsByExamTestQuery,
  useGetAllResultsByExamTestDetailQuery,
  useGetAllResultsByUserQuery,
  useGetExamResultQuery,
  useAddExamResultMutation,
  useUpdateExamResultMutation,
  useDeleteExamResultMutation,
  useGetTop3ResultsByUserQuery,
} = examResultsApi;
