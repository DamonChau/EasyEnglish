/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { UserRelationship } from "../../interfaces/interfaces";
export type UserRelationshipResponse = UserRelationship[];

export const userRelationshipApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllByUser: build.query<UserRelationshipResponse, string>({
      query: (userId) => ({ url: `api/UserRelationship/GetAllByUser/${userId}` }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userRelationship", id } as const)),
        { type: "userRelationship" as const, id: "LIST" },
      ],
    }),
    getAllTeachersByUser: build.query<UserRelationshipResponse, string>({
      query: (userId) => ({ url: `api/UserRelationship/GetAllTeachersByUser/${userId}` }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userRelationship", id } as const)),
        { type: "userRelationship" as const, id: "LIST" },
      ],
    }),
    getAllStudentsByUser: build.query<UserRelationshipResponse, string>({
      query: (userId) => ({ url: `api/UserRelationship/GetAllStudentsByUser/${userId}` }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "userRelationship", id } as const)),
        { type: "userRelationship" as const, id: "LIST" },
      ],
    }),
    getRelationship: build.query<UserRelationship, string>({
      query: (id) => `api/UserRelationship/Details/${id}`,
      providesTags: (result, error, arg) => [{ type: "userRelationship", id: result?.id }],
    }),
    addRelationship: build.mutation<UserRelationship, Partial<UserRelationship>>({
      query: (body) => ({
        url: "api/UserRelationship/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "userRelationship", id: "LIST" }],
    }),
    updateStatus: build.mutation<UserRelationship, Partial<UserRelationship>>({
      query(body) {
        return {
          url: `api/UserRelationship/UpdateStatus`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (users) => [{ type: "userRelationship", id: users?.id }],
    }),
    updateRelationship: build.mutation<UserRelationship, Partial<UserRelationship>>({
      query(body) {
        return {
          url: `api/UserRelationship/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (users) => [{ type: "userRelationship", id: users?.id }],
    }),
    deleteRelationship: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/UserRelationship/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (users) => [{ type: "userRelationship", id: users?.id }],
    }),
  }),
});

export const {
  useAddRelationshipMutation,
  useGetAllByUserQuery,
  useDeleteRelationshipMutation,
  useGetRelationshipQuery,
  useUpdateRelationshipMutation,
  useGetAllTeachersByUserQuery,
  useUpdateStatusMutation,
  useGetAllStudentsByUserQuery,
} = userRelationshipApi;
