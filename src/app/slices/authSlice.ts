import { createSlice } from "@reduxjs/toolkit";
import { saveAccessToken, saveRefreshToken } from "~/utils/storage";
import { authServiceApi } from "~/app/services/authService";
import { saveNonce, saveSignature } from "~/utils/storage";
import { getSignatureWithEncrypted } from "~/app/ethers/index";
// Type for our state
export interface AuthState {
  mnemonic_encrypted?: string;
  otp?: string;
}

// Initial state
const initialState: AuthState = {
  otp: "",
  mnemonic_encrypted: "",
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      if (!!action.payload.mnemonic_encrypted) {
        state.mnemonic_encrypted = action.payload.mnemonic_encrypted;
      }
    },
    logout(state) {},
    setNonce(state, action) {
      saveNonce(action.payload);
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
    builder.addMatcher(
      authServiceApi.endpoints.authLogin.matchFulfilled,
      (state, { payload }) => {
        if (payload.accessToken) {
          saveAccessToken(payload.token);
          saveRefreshToken(payload.refresh_token);
        }
        return {
          ...state,
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
        };
      }
      // eslint-disable-next-line no-sequences
    );
    // builder.addMatcher(
    //   authServiceApi.endpoints.getProfile.matchFulfilled,
    //   (state, { payload }) => {
    //     return { ...state, user: payload };
    //   }
    // );
  },
});

export const { setAuthState, logout, setNonce } = authSlice.actions;

export default authSlice.reducer;
