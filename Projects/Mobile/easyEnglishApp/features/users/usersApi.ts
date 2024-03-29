/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Users } from "../../models/types";
export type UsersResponse = Users[];

export interface FileDownload {
  filename: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { token: string; refreshToken: string; user: Users },
      any
    >({
      query: (credentials: any) => {
        return {
          url: "api/Users/login",
          method: "POST",
          body: credentials,
        };
      },
    }),
    isUserNameExists: build.query<boolean, string>({
      query: (username) => {
        return `/api/Users/IsUserNameExists/${username}`;
      },
    }),
    getUsers: build.query<UsersResponse, void>({
      query: () => ({ url: "api/Users/GetAll" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "users", id } as const)),
        { type: "users" as const, id: "LIST" },
      ],
    }),
    getAllTeachers: build.query<UsersResponse, string>({
      query: (userId) => ({ url: `api/Users/GetAllTeachers/${userId}` }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "users", id } as const)),
        { type: "users" as const, id: "LIST" },
      ],
    }),
    getUser: build.query<Users, string>({
      query: (id) => `api/Users/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "users", id: result?.id }],
    }),
    addUser: build.mutation<Users, Partial<Users>>({
      query: (body) => ({
        url: "api/Users/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "users", id: "LIST" }],
    }),
    updateUserProfile: build.mutation<Users, Partial<Users>>({
      query(body) {
        return {
          url: `api/Users/UpdateUserProfile`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (users) => [{ type: "users", id: users?.id }],
    }),
    updateUser: build.mutation<Users, Partial<Users>>({
      query(body) {
        return {
          url: `api/Users/UpdateUser`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (users) => [{ type: "users", id: users?.id }],
    }),
    deleteUser: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Users/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (users) => [{ type: "users", id: users?.id }],
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
          responseHandler: async (response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok.");
            }
            return await response.blob();
          },
          cache: "no-cache",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserQuery,
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useIsUserNameExistsQuery,
  useGetAllTeachersQuery,
  useUploadFilesMutation,
  useDownloadFilesMutation,
} = usersApi;
