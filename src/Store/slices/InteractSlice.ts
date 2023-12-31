import { createSlice } from "@reduxjs/toolkit";
import { Interact as Prop } from "../../types/slicesTypes";

const Interact = createSlice({
  name: "interact/comp",
  initialState: {
    on_add: false,
    on_delete: false,
    on_update: false,
    on_open: {
      modal_customer: false,
    },
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
    onModalCustomer(state, action) {
      state.on_open.modal_customer = action.payload;
      console.log(state.on_open.modal_customer);
    },
  },
});

export const interact = Interact.reducer;
export const { onDelete, onUpdate, onModalCustomer, onAdding } =
  Interact.actions;
