import { configureStore } from "@reduxjs/toolkit";
// auth
import { authServiceApi } from "~/app/services/authService";
import authSlice from "~/app/slices/authSlice";
// user
import userSlice from "~/app/slices/userSlice";
import { userServiceApi } from "~/app/services/userService";
// wallet
import { generateWalletServiceApi } from "~/app/services/generateWalletService";
import generateWalletSlice from "~/app/slices/generateWalletSlice";
// transaction
import { transactionServiceApi } from "~/app/services/transactionService";
import transactionSlice from "~/app/slices/transactionSlice";
// transfer
import { transferServiceApi } from "~/app/services/transferService";
import transferSlice from "~/app/slices/transferSlice";
export const store = configureStore({
  reducer: {
    // auth
    auth: authSlice,
    [authServiceApi.reducerPath]: authServiceApi.reducer,

    // user
    user: userSlice,
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    // wallet
    wallet: generateWalletSlice,
    [generateWalletServiceApi.reducerPath]: generateWalletServiceApi.reducer,
    // transaction
    transaction: transactionSlice,
    [transactionServiceApi.reducerPath]: transactionServiceApi.reducer,
    // transfer
    transfer: transferSlice,
    [transferServiceApi.reducerPath]: transferServiceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authServiceApi.middleware)
      .concat(userServiceApi.middleware)
      .concat(generateWalletServiceApi.middleware)
      .concat(transactionServiceApi.middleware)
      .concat(transferServiceApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
