import { configureStore } from "@reduxjs/toolkit";
import { local_DB } from "./slices/ImportData";
import { export_DB } from "./slices/ExportData";

export type RootState = {
  lcl_db: ReturnType<typeof local_DB>;
  expt_db: ReturnType<typeof export_DB>;
};

const store = configureStore({
  reducer: {
    lcl_db: local_DB,
    expt_db: export_DB,
  },
});

export { store };
