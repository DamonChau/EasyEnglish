/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { AssignmentExams, ExamTests } from "../../interfaces/interfaces";
export type AssignmentExamsResponse = AssignmentExams[];
export type AssignmentExamsDetailResponse = AssignmentExamsDetail[];
export interface AssignmentExamsDetail extends AssignmentExams{
  examTest: ExamTests;
}

export const assignmentExamsApi = api.injectEndpoints({
  endpoints: (build) => ({
    //get & create AssignmentExams if not exists
    getByUsers: build.query<AssignmentExams, any>({
      query: (args) => {
        const { userId, examId } = args;
        return {
          url: `api/AssignmentExams/GetByUsers/${userId}/${examId}`,
        };
      },
      providesTags: (result, error, arg) => [
        { type: "assignmentExams", id: result?.id },
      ],
    }),
    //get only one without create
    getAssignmentExam: build.query<AssignmentExams, string>({
      query: (id) => `api/AssignmentExams/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "assignmentExams", id: result?.id },
      ],
    }),
    getAllByStatusWithDetail: build.query<AssignmentExamsDetailResponse, any>({
      query: (args) => {
        const { userId, status } = args;
        return {
          url: `api/AssignmentExams/GetAllByStatusWithDetail/${userId}/${status}`,
        };
      },
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "assignmentExams", id } as const)),
        { type: "assignmentExams" as const, id: "LIST" },
      ],
    }),
    addAssignmentExams: build.mutation<
      AssignmentExams,
      Partial<AssignmentExams>
    >({
      query: (body) => ({
        url: "api/AssignmentExams/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "assignmentExams", id: "LIST" }],
    }),
    updateStatusByUser: build.mutation<
      AssignmentExams,
      Partial<AssignmentExams>
    >({
      query(body) {
        return {
          url: `api/AssignmentExams/UpdateStatusByUser`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (assignment) => [
        { type: "assignmentExams", id: assignment?.id },
      ],
    }),
    updateAssignmentExams: build.mutation<
      AssignmentExams,
      Partial<AssignmentExams>
    >({
      query(body) {
        return {
          url: `api/AssignmentExams/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (assignment) => [
        { type: "assignmentExams", id: assignment?.id },
      ],
    }),
    deleteAssignmentExams: build.mutation<
      { success: boolean; id: string },
      string
    >({
      query(id) {
        return {
          url: `api/AssignmentExams/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (assignment) => [
        { type: "assignmentExams", id: assignment?.id },
      ],
    }),
  }),
});

export const {
  useGetByUsersQuery,
  useGetAssignmentExamQuery,
  useGetAllByStatusWithDetailQuery,
  useAddAssignmentExamsMutation,
  useUpdateAssignmentExamsMutation,
  useDeleteAssignmentExamsMutation,
  useUpdateStatusByUserMutation,
} = assignmentExamsApi;
