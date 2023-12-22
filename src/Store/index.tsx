import { configureStore } from "@reduxjs/toolkit";
import { local_DB } from "./slices/ServicesSlice";
import { customer_info } from "./slices/CustomerSlice";

const store = configureStore({
  reducer: {
    local_DB,
    customer_info,
  },
});

export { store };
