import { createSlice } from "@reduxjs/toolkit";
export interface ITransfer {
  listNFT: any[];
}
const initialState: ITransfer = {
  listNFT: [],
};
export const transferSlice = createSlice({
  name: "transfer",
  initialState,
  reducers: {
    setListNFT(state, action) {
      state.listNFT = action.payload;
    },
  },
});

export const { setListNFT } = transferSlice.actions;
export default transferSlice.reducer;
