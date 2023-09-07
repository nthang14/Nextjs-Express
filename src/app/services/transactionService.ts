import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const transactionServiceApi = createApi({
  reducerPath: "transactionServiceApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTransactionHistory: builder.query({
      query: (params) => ({
        url: "/transaction/history",
        method: "GET",
        params: params,
      }),
    }),
  }),
});
export const { useGetTransactionHistoryQuery } = transactionServiceApi;
