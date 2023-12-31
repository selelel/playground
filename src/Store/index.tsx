import { configureStore } from "@reduxjs/toolkit";
import { local_DB } from "./slices/ServicesSlice";
import { customer_info } from "./slices/CustomerSlice";
import { deleteInfo, updateInfo } from "./slices/CustomerSlice";
import {
  onAdding,
  onDelete,
  onModalCustomer,
  onUpdate,
  interact,
} from "./slices/InteractSlice";

const store = configureStore({
  reducer: {
    local_DB,
    customer_info,
    interact,
  },
});

export {
  store,
  deleteInfo,
  updateInfo,
  onDelete,
  onModalCustomer,
  onUpdate,
  onAdding,
};
