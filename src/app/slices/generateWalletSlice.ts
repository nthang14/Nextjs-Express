import { createSlice } from "@reduxjs/toolkit";
export interface IWalletState {}
const initialState: IWalletState = {};
export const generateWalletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {},
});

export const {} = generateWalletSlice.actions;
export default generateWalletSlice.reducer;
