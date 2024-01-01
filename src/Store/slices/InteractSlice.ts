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
      modal_update_customer: false,
    },
    prev_data: {
      data: "",
    },
  } as Prop,
  reducers: {
    onAdding(state, action) {
      state.on_add = action.payload;
    },
    onDelete(state, action) {
      if (state.on_update) state.on_update = false;
      state.on_delete = action.payload;
    },
    onUpdate(state, action) {
      if (state.on_delete) state.on_delete = false;
      state.on_update = action.payload;
    },
    updatePrev(state, action) {
      state.prev_data.data = action.payload;
    },
    onModalCustomer(state, action) {
      state.on_open.modal_customer = action.payload;
    },
    onModalUpdateCustomer(state, action) {
      state.on_open.modal_update_customer = action.payload;
    },
  },
});

export const interact = Interact.reducer;
export const {
  onAdding,
  onDelete,
  onUpdate,
  updatePrev,
  onModalCustomer,
  onModalUpdateCustomer,
} = Interact.actions;
