import { createSlice } from "@reduxjs/toolkit";

const localDB = createSlice({
  name: "local_database",
  initialState: {
    data: "",
  },
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    },
    deleteData(state) {
      state.data = "";
    },
  },
});

export const { addData, deleteData } = localDB.actions;
export const local_DB = localDB.reducer;
