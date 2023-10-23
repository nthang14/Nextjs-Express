import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: params,
      }),
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userServiceApi;
