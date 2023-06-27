/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { UserNotes } from "../../models/types";
export type UserNotesResponse = UserNotes[];

export const userNotesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUserNotesByExamResult: build.query<UserNotesResponse, string>({
      query: (examTestId) => ({
        url: `api/UserNotes/GetAllUserNotesByExamResult/${examTestId}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userNotes", id } as const)),
        { type: "userNotes" as const, id: "LIST" },
      ],
    }),
    getAllUserNotesByUser: build.query<UserNotesResponse, string>({
      query: (userid) => ({
        url: `api/UserNotes/GetAllUserNotesByUser/${userid}`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userNotes", id } as const)),
        { type: "userNotes" as const, id: "LIST" },
      ],
    }),
    getUserNote: build.query<UserNotes, string>({
      query: (id) => `api/UserNotes/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "userNotes", id: result?.id }],
    }),
    addUserNote: build.mutation<UserNotes, Partial<UserNotes>>({
      query: (body) => ({
        url: "api/UserNotes/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "userNotes", id: "LIST" }],
    }),
    updateUserNote: build.mutation<UserNotes, Partial<UserNotes>>({
      query(body) {
        return {
          url: `api/UserNotes/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (userNotes) => [
        { type: "userNotes", id: userNotes?.id },
      ],
    }),
    deleteUserNote: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/UserNotes/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (userNotes) => [
        { type: "userNotes", id: userNotes?.id },
      ],
    }),
  }),
});

export const {
  useGetAllUserNotesByExamResultQuery,
  useGetAllUserNotesByUserQuery,
  useGetUserNoteQuery,
  useAddUserNoteMutation,
  useUpdateUserNoteMutation,
  useDeleteUserNoteMutation,
} = userNotesApi;
