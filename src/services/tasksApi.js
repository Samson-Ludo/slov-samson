import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "https://stage.api.sloovi.com";
const LEAD_ID = "lead_465c14d0e99e4972b6b21ffecf3dd691";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginResults: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    tasks: builder.query({
      query: ({ company_id, headers }) => ({
        url: `/task/${LEAD_ID}?company_id=${company_id}`,
        headers,
      }),
    }),
    addTask: builder.mutation({
      query: ({ company_id, headers, task }) => ({
        url: `/task/${LEAD_ID}?company_id=${company_id}`,
        method: "POST",
        headers,
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: ({ company_id, headers, task_id }) => ({
        url: `/task/${LEAD_ID}/${task_id}?company_id=${company_id}`,
        method: "DELETE",
        headers,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ company_id, headers, task_id, task }) => ({
        url: `/task/${LEAD_ID}/${task_id}?company_id=${company_id}`,
        method: "PUT",
        headers,
        body: task,
      }),
    }),
  }),
});

export const { useLoginResultsMutation, useTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi;
