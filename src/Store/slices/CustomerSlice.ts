import { createSlice } from "@reduxjs/toolkit";
import { SuperbaseState } from "../../types/slicesTypes";
import { fetchInfo } from "../thunks/CustomerPage/INSERT";

const customerInfo = createSlice({
  name: "customer_info",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  } as SuperbaseState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchInfo.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
    });
  },
});

export const customer_info = customerInfo.reducer;
