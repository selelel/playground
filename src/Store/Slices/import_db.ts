import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../services/Supabase";

interface SuperbaseState {
  data: data[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

interface data {
  cycle_time: number;
  description: string;
  price: number;
  service_name: string;
  vehicle_size: string;
}

export const fetchData = createAsyncThunk("superbase/fetchData", async () => {
  const { data, error } = await supabase.from("services").select("*");
  if (error) {
    throw error;
  }
  return data;
});

export const initialState: SuperbaseState = {
  data: [],
  error: null,
  status: "idle",
};

const localDB = createSlice({
  name: "local_database",
  initialState,
  reducers: {
    addData(state, action) {
      console.log(state.data, action);
    },
    deleteData(state) {
      console.log(state);
    },
  },
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

export const { addData, deleteData } = localDB.actions;
export const local_DB = localDB.reducer;
