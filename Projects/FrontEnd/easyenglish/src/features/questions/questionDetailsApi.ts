/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { QuestionDetails } from "../../interfaces/interfaces";
export type QuestionDetailsResponse = QuestionDetails[];

export const questionDetailsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestionDetails: build.query<QuestionDetailsResponse, string>({
      query: (questionId) => ({
        url: `api/QuestionDetails/GetAllByQuestions/${questionId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "questionDetails", id } as const)),
        { type: "questionDetails" as const, id: "LIST" },
      ],
    }),
    getQuestionDetail: build.query<QuestionDetails, string>({
      query: (id) => `api/QuestionDetails/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "questionDetails", id: result?.id },
      ],
    }),
    addQuestionDetail: build.mutation<
      QuestionDetails,
      Partial<QuestionDetails>
    >({
      query: (body) => ({
        url: "api/QuestionDetails/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "questionDetails", id: "LIST" }],
    }),
    updateQuestionDetail: build.mutation<
      QuestionDetails,
      Partial<QuestionDetails>
    >({
      query(body) {
        return {
          url: `api/QuestionDetails/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (questionDetails) => [
        { type: "questionDetails", id: questionDetails?.id },
      ],
    }),
    deleteQuestionDetail: build.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id) {
        return {
          url: `api/QuestionDetails/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (questionDetails) => [
        { type: "questionDetails", id: questionDetails?.id },
      ],
    }),
  }),
});

export const {
  useGetQuestionDetailsQuery,
  useGetQuestionDetailQuery,
  useAddQuestionDetailMutation,
  useUpdateQuestionDetailMutation,
  useDeleteQuestionDetailMutation,
} = questionDetailsApi;
