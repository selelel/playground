import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/ServicesPage/GET";
import { addData } from "../thunks/ServicesPage/INSERT";
import { SuperbaseState } from "../../types/slicesTypes";

const localDB = createSlice({
  name: "local_database",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  } as SuperbaseState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });

    builder.addCase(addData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data.push(action.payload);
    });
    builder.addCase(addData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const local_DB = localDB.reducer;
