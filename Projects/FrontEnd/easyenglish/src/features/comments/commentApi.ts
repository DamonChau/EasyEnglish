/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Comments } from "../../models/types";
export type CommentsResponse = Comments[]

export const commentsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCommentsByExam: build.query<CommentsResponse, string | undefined>({
      query: (examTestId) => ({
        url: `api/Comments/GetAllCommentsByExam/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "comments", id } as const)),
        { type: "comments" as const, id: "LIST" },
      ],
    }),
    getAllCommentsByUser: build.query<CommentsResponse, string>({
      query: (userId) => ({
        url: `api/Comments/GetAllCommentsByUser/${userId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "comments", id } as const)),
        { type: "comments" as const, id: "LIST" },
      ],
    }),
    getComment: build.query<Comments, string>({
      query: (id) => `api/Comments/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "comments", id: result?.id }],
    }),
    addComment: build.mutation<Comments, Partial<Comments>>({
      query: (body) => ({
        url: "api/Comments/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "comments", id: "LIST" }],
    }),
    updateComment: build.mutation<Comments, Partial<Comments>>({
      query(body) {
        return {
          url: `api/Comments/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (comments) => [
        { type: "comments", id: comments?.id },
      ],
    }),
    deleteComment: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Comments/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (comments) => [
        { type: "comments", id: comments?.id },
      ],
    }),
  }),
});

export const {
  useGetAllCommentsByExamQuery,
  useGetAllCommentsByUserQuery,
  useGetCommentQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
