import { configureStore } from "@reduxjs/toolkit";
import { addData, deleteData, local_DB } from "./Slices/import_db";

const store = configureStore({
  reducer: {
    lcl_db: local_DB,
  },
});

export { store, addData, deleteData };
