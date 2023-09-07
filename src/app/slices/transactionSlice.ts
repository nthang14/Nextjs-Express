import { createSlice } from "@reduxjs/toolkit";
export interface ITransactionState {
  list: any[];
}
const initialState: ITransactionState = {
  list: [],
};
export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionHistory: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {} = transactionSlice.actions;
export default transactionSlice.reducer;
