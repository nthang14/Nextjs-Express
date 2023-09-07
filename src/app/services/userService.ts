import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getUser: builder.query({
      // query: (params) => ({
      //   url: "/users",
      //   method: "GET",
      //   params: params,
      // }),
      queryFn: async () => {
        return {
          data: {
            pagination: {
              page: 1,
              total: 4,
            },
            list: [
              {
                key: "1",
                name: "John Brown",
                age: 32,
                address: "New York No. 1 Lake Park",
                tags: ["nice", "developer"],
              },
              {
                key: "2",
                name: "Jim Green",
                age: 42,
                address: "London No. 1 Lake Park",
                tags: ["loser"],
              },
              {
                key: "3",
                name: "Joe Black",
                age: 32,
                address: "Sidney No. 1 Lake Park",
                tags: ["cool", "teacher"],
              },
            ],
          },
        };
      },
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
      }),
    }),
    getUserByAddress: builder.query({
      query: (params) => ({
        url: "/users/address",
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetUserByAddressQuery } = userServiceApi;
