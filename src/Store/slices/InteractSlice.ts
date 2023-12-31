import { createSlice } from "@reduxjs/toolkit";
import { Interact as Prop } from "../../types/slicesTypes";

const Interact = createSlice({
  name: "interact/comp",
  initialState: {
    on_add: false,
    on_delete: false,
    on_update: false,
    on_open: false,
  } as Prop,
  reducers: {
    onAdding(state, action) {
      state.on_add = action.payload;
      console.log(state.on_add);
    },
    onDelete(state, action) {
      state.on_delete = action.payload;
      console.log(state.on_delete);
    },
    onUpdate(state, action) {
      state.on_update = action.payload;
      console.log(state.on_update);
    },
    onOpen(state, action) {
      state.on_open = action.payload;
      console.log(state.on_open);
    },
  },
});

export const interact = Interact.reducer;
export const { onDelete, onUpdate, onOpen, onAdding } = Interact.actions;
