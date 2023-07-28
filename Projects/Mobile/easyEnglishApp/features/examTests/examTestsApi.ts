/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import {
  ExamTestSectionType,
  ExamTestType,
  ExamTests,
} from "../../models/types";
export type ExamTestsResponse = ExamTests[];

interface ExamTestArgs {
  testType: ExamTestType | undefined;
  sectionType: ExamTestSectionType | undefined;
}

export const examTestsApi = api.injectEndpoints({
  endpoints: (build) => ({
    //params: first is the respone - toke&user, sendcond one is the params - any
    getExamTests: build.query<ExamTestsResponse, void>({
      query: () => ({ url: "api/ExamTests/GetAll" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examTests", id } as const)),
        { type: "examTests" as const, id: "LIST" },
      ],
    }),
    getExamTestsBySection: build.query<ExamTestsResponse, ExamTestArgs>({
      query: (args) => {
        const { testType, sectionType } = args;
        return {
          url: `api/ExamTests/GetAllExamTestsBySection/${testType}/${sectionType}`,
        };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "examTests", id } as const)),
        { type: "examTests" as const, id: "LIST" },
      ],
    }),
    getExamTest: build.query<ExamTests, string>({
      query: (id) => `api/ExamTests/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "examTests", id: result?.id },
      ],
    }),
    addExamTest: build.mutation<ExamTests, Partial<ExamTests>>({
      query: (body) => ({
        url: "api/ExamTests/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "examTests", id: "LIST" }],
    }),
    updateExamTest: build.mutation<ExamTests, Partial<ExamTests>>({
      query(body) {
        return {
          url: `api/ExamTests/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (examTests) => [
        { type: "examTests", id: examTests?.id },
      ],
    }),
    deleteExamTest: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/ExamTests/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (examTests) => [
        { type: "examTests", id: examTests?.id },
      ],
    }),
  }),
});

export const {
  useGetExamTestsQuery,
  useGetExamTestQuery,
  useAddExamTestMutation,
  useUpdateExamTestMutation,
  useDeleteExamTestMutation,
  useGetExamTestsBySectionQuery,
} = examTestsApi;
