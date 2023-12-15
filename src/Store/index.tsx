import { configureStore } from "@reduxjs/toolkit";
import { local_DB } from "./slices/ImportData";

export type RootState = {
  lcl_db: ReturnType<typeof local_DB>;
};

const store = configureStore({
  reducer: {
    lcl_db: local_DB,
  },
});

export { store };
