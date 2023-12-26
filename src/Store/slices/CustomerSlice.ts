import { createSlice } from "@reduxjs/toolkit";
import { SuperbaseState } from "../../types/slicesTypes";
import { fetchInfo } from "../thunks/CustomerPage/GET";
import { addUser } from "../thunks/CustomerPage/INSERT";

const customerInfo = createSlice({
  name: "customer_info",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  } as SuperbaseState,
  reducers: {},
  extraReducers: (builder) => {
    //track user fetch
    builder.addCase(fetchInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    //track user info
    builder.addCase(addUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = [...state.data, action.payload];
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const customer_info = customerInfo.reducer;
