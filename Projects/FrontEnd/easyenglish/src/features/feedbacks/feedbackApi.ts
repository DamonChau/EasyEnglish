/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../../services/api";
import { Feedbacks } from "../../interfaces/interfaces";
export type FeedbacksResponse = Feedbacks[];

export const feedbacksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getFeedbacksByExam: build.query<Feedbacks, string>({
      query: (examResultId) =>
        `api/Feedback/GetFeedbackByExamResult/${examResultId}`,
      providesTags: (result, error, arg) => {
        return [
          { type: "feedbacks", id: result?.id }, // for updateFeedbacks
          { type: "feedbacks", id: "LIST" },//for addFeedbacks
        ];
      },
    }),

    getFeedback: build.query<Feedbacks, string>({
      query: (id) => `api/Feedback/Details/${id}`,
      providesTags: (result, error, arg) => [
        { type: "feedbacks", id: result?.id },
      ],
    }),
    addFeedbacks: build.mutation<Feedbacks, Partial<Feedbacks>>({
      query: (body) => ({
        url: "api/Feedback/Create",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "feedbacks", id: "LIST" }],
    }),
    updateFeedbacks: build.mutation<Feedbacks, Partial<Feedbacks>>({
      query(body) {
        return {
          url: `api/Feedback/Edit`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (feedbacks) => {
        return [{ type: "feedbacks", id: feedbacks?.id }];
      },
    }),
    deleteFeedbacks: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `api/Feedback/Delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (feedbacks) => [
        { type: "feedbacks", id: feedbacks?.id },
      ],
    }),
  }),
});

export const {
  useAddFeedbacksMutation,
  useDeleteFeedbacksMutation,
  useGetFeedbacksByExamQuery,
  useGetFeedbackQuery,
  useUpdateFeedbacksMutation,
} = feedbacksApi;
