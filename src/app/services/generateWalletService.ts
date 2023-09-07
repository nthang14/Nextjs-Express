import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "~/app/config/baseQuery";

export const generateWalletServiceApi = createApi({
  reducerPath: "generateWalletApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createWallet: builder.mutation({
      query: (payload) => ({
        url: "/auth/submit-mnemonic-admin",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateWalletMutation } = generateWalletServiceApi;
