/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Lessons } from "../../models/types";
export type LessonsResponse = Lessons[];

export const lessonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllLessons: build.query<LessonsResponse, void>({
      query: () => ({
        url: `api/Lesson/GetAllLessons/`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "lessons", id } as const)),
        { type: "lessons" as const, id: "LIST" },
      ],
    }),
    getAllLessonsByType: build.query<LessonsResponse, string>({
        query: (lessonType) => ({
          url: `api/Lesson/GetAllLessonByType/${lessonType}`,
        }),
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: "lessons", id } as const)),
          { type: "lessons" as const, id: "LIST" },
        ],
      }),

    getLesson: build.query<Lessons, string>({
      query: (id) => `api/Lesson/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "lessons", id: result?.id },
      ],
    }),
    addLesson: build.mutation<Lessons, Partial<Lessons>>({
      query: (body) => ({
        url: "api/Lesson/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "lessons", id: "LIST" }],
    }),
    updateLesson: build.mutation<Lessons, Partial<Lessons>>({
      query(body) {
        return {
          url: `api/Lesson/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (lesson) => [{ type: "lessons", id: lesson?.id }],
    }),
    deleteLesson: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Lesson/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (lesson) => [{ type: "lessons", id: lesson?.id }],
    }),
  }),
});

export const {
    useAddLessonMutation,
    useDeleteLessonMutation,
    useGetAllLessonsByTypeQuery,
    useGetAllLessonsQuery,
    useGetLessonQuery,
    useUpdateLessonMutation
} = lessonApi;
