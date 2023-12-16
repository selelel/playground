import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../thunks/GET";

interface SuperbaseState {
  data: Services[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  insertStatus: "idle" | "loading" | "succeeded" | "failed";
}

export type Services = {
  cycle_time: number;
  description: string;
  price: number;
  service_name: string;
  vehicle_size: string;
};

const localDB = createSlice({
  name: "local_database",
  initialState: {
    data: [],
    error: null,
    status: "idle",
    insertStatus: "idle",
  } as SuperbaseState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
});

export const local_DB = localDB.reducer;
