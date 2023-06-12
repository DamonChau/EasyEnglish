/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { UserAnswers } from "../../interfaces/interfaces";
export type UserAnswerResponse = UserAnswers[];

export interface FileDownload {
  filename: string;
}

export const userAnswersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserAnswers: build.query<UserAnswerResponse, void>({
      query: () => ({ url: "api/UserAnswers/GetAll" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userAnswers", id } as const)),
        { type: "userAnswers" as const, id: "LIST" },
      ],
    }),
    getAllByExam: build.query<UserAnswerResponse, string>({
      query: (examResultId) => ({ url: `api/UserAnswers/GetAllByExam/${examResultId}` }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userAnswers", id } as const)),
        { type: "userAnswers" as const, id: "LIST" },
      ],
    }),
    getUserAnswer: build.query<UserAnswers, string>({
      query: (id) => `api/UserAnswers/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "userAnswers", id: result?.id }],
    }),
    addUserAnswer: build.mutation<UserAnswers, Partial<UserAnswers>>({
      query: (body) => ({
        url: "api/UserAnswers/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "userAnswers", id: "LIST" }],
    }),
    updateUserAnswer: build.mutation<UserAnswers, Partial<UserAnswers>>({
      query(body) {
        return {
          url: `api/UserAnswers/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (userAnswers) => [
        { type: "userAnswers", id: userAnswers?.id },
      ],
    }),
    deleteUserAnswer: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/UserAnswers/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (userAnswers) => [
        { type: "userAnswers", id: userAnswers?.id },
      ],
    }),
    uploadFiles: build.mutation({
      query: (body) => ({
        url: "api/FilesUpload/upload",
        method: "POST",
        body,
      }),
    }),
    downloadFiles: build.mutation<any, FileDownload>({
      query(body) {
        return {
          url: `api/FilesUpload/download`,
          method: "POST",
          body,
          responseHandler: async (response) =>
            window.URL.createObjectURL(await response.blob()),
          cache: "no-cache",
        };
      },
    }),
  }),
});

export const {
  useGetUserAnswersQuery,
  useGetUserAnswerQuery,
  useAddUserAnswerMutation,
  useUpdateUserAnswerMutation,
  useDeleteUserAnswerMutation,
  useUploadFilesMutation,
  useDownloadFilesMutation,
  useGetAllByExamQuery,
} = userAnswersApi;
