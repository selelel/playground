import { createSlice } from "@reduxjs/toolkit";

const Interact = createSlice({
  name: "interact/comp",
  initialState: {
    on_delete: false,
    on_update: false,
    on_open: false,
  },
  reducers: {
    onDelete(state, action) {
      console.log(state.on_delete, action.payload);
    },
    onUpdate(state, action) {
      console.log(state.on_update, action.payload);
    },
    onOpen(state, action) {
      console.log(state.on_open, action.payload);
    },
  },
});

export const interact = Interact.reducer;
export const { onDelete, onUpdate, onOpen } = Interact.actions;
