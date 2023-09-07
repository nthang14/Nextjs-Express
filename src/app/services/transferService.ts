import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";
export const transferServiceApi = createApi({
  reducerPath: "transferServiceApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    verifyPassword: builder.mutation({
      query: (payload) => ({
        url: "/transfer-verify",
        method: "POST",
        body: payload,
      }),
    }),
    createTransfer: builder.mutation({
      query: (payload) => ({
        url: "/transfer",
        method: "POST",
        body: payload,
      }),
    }),
    getNFTOwn: builder.query({
      query: (params) => ({
        url: "/nft/own",
        method: "GET",
        params: params,
      }),
    }),
  }),
});
export const {
  useVerifyPasswordMutation,
  useCreateTransferMutation,
  useGetNFTOwnQuery,
} = transferServiceApi;
