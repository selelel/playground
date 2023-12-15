import { configureStore } from "@reduxjs/toolkit";
import { addData, deleteData, local_DB } from "./slices/import_db";

export type RootState = {
  lcl_db: ReturnType<typeof local_DB>;
};

const store = configureStore({
  reducer: {
    lcl_db: local_DB,
  },
});

export { store, addData, deleteData };
