import { createSlice } from "@reduxjs/toolkit";
import { SuperbaseState } from "./ImportData";
import { addData } from "../thunks/INSERT";

export type Services = {
  cycle_time: number;
  description: string;
  price: number;
  service_name: string;
  vehicle_size: string;
};

const exportDB = createSlice({
  name: "export_database",
  initialState: {
    status: "idle",
  } as SuperbaseState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const export_DB = exportDB.reducer;
