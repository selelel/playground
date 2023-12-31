import { createSlice } from "@reduxjs/toolkit";
import { SuperbaseState } from "../../types/slicesTypes";
import { fetchInfo } from "../thunks/CustomerPage/GET";
import { addUser } from "../thunks/CustomerPage/INSERT";
import { removeInfo } from "../thunks/CustomerPage/DELETE";
import { updateCustomer } from "../thunks/CustomerPage/UPDATE";

const customerInfo = createSlice({
  name: "customer_info",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
    onDelete: false,
    onUpdate: false,
  } as SuperbaseState,
  reducers: {
    deleteInfo({ onDelete }, action) {
      console.log(onDelete, action.payload);
    },
    updateInfo({ onUpdate }, action) {
      console.log(onUpdate, action.payload);
    },
  },
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

    builder.addCase(removeInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = state.data.filter(
        (data: { customer_id: number }) =>
          data.customer_id !== action.payload.customer_id
      );
    });

    builder.addCase(removeInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    builder.addCase(updateCustomer.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.isLoading = false;

      const index = state.data.findIndex(
        (element: { customer_id: number }) =>
          element.customer_id === action.payload.customer_id
      );

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...action.payload,
        };
      }
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.isLoading = false;
      console.error(action.error.message);
    });
  },
});

export const customer_info = customerInfo.reducer;
export const { deleteInfo, updateInfo } = customerInfo.actions;
