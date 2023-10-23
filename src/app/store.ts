import { configureStore } from "@reduxjs/toolkit";
// auth
import { authServiceApi } from "~/app/services/authService";
import authSlice from "~/app/slices/authSlice";

import {userServiceApi} from "~/app/services/userService"
import userSlice from "~/app/slices/userSlice";
export const store = configureStore({
  reducer: {
    // auth
    auth: authSlice,
    [authServiceApi.reducerPath]: authServiceApi.reducer,
    user: userSlice,
    [userServiceApi.reducerPath]: userServiceApi.reducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authServiceApi.middleware).concat(userServiceApi.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
