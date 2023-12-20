import { configureStore } from "@reduxjs/toolkit";
import { local_DB } from "./slices/ImportData";

export type RootState = {
  local_DB: ReturnType<typeof local_DB>;
};

const store = configureStore({
  reducer: {
    local_DB: local_DB,
  },
});

export { store };
