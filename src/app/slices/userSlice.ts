import { createSlice } from "@reduxjs/toolkit";
// Type for our state
export interface UserState {
  mnemonic_encrypted?: string;
  otp?: string;
}

// Initial state
const initialState: UserState = {
  otp: "",
  mnemonic_encrypted: "",
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the authentication status
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: (builder) => {
  },
});

export const { } = userSlice.actions;

export default userSlice.reducer;
