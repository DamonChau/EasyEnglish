/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Questions } from "../../interfaces/interfaces";
export type QuestionsResponse = Questions[];

export const questionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<QuestionsResponse, string>({
      query: (examTestId) => ({
        url: `api/Questions/GetAllExamTest/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "questions", id } as const)),
        { type: "questions" as const, id: "LIST" },
      ],
    }),
    getQuestionsWithQD: build.query<QuestionsResponse, string>({
      query: (examTestId) => ({
        url: `api/Questions/GetAllExamTestWithQD/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "questions", id } as const)),
        { type: "questions" as const, id: "LIST" },
      ],
    }),
    getQuestion: build.query<Questions, string>({
      query: (id) => `api/Questions/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "questions", id: arg }],
    }),
    addQuestion: build.mutation<Questions, Partial<Questions>>({
      query: (body) => ({
        url: "api/Questions/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "questions", id: "LIST" }],
    }),
    updateQuestion: build.mutation<Questions, Partial<Questions>>({
      query(body) {
        return {
          url: `api/Questions/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (examTests) => [
        { type: "questions", id: examTests?.id },
      ],
    }),
    deleteQuestion: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Questions/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (examTests) => [
        { type: "questions", id: examTests?.id },
      ],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useGetQuestionsWithQDQuery,
  useGetQuestionQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi;
