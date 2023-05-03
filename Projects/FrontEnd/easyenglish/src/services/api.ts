import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { config } from "../helpers/contants";
import { RootState } from "../services";

const baseQuery = fetchBaseQuery({
  baseUrl: config.url.API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authentication", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "users",
    "examTests",
    "questions",
    "questionDetails",
    "userAnswers",
    "examResults",
    "userNotes",
    "comments",
  ],
  endpoints: () => ({}),
});
