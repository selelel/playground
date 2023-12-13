import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  data: data[];
}

interface data {
  cycle_time: number;
  description: string;
  price: number;
  service_name: string;
  vehicle_size: string;
}

const localDB = createSlice({
  name: "local_database",

  initialState: {
    data: [] as data[],
  } as initialState,

  reducers: {
    addData(state, actions) {
      state.data = [...actions.payload];
    },
    deleteData(state) {
      console.log(state);
    },
  },
});

export const { addData, deleteData } = localDB.actions;
export const local_DB = localDB.reducer;
