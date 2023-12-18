import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { supabase } from "../../services/Supabase";
import { Services } from "../slices/ImportData";

type prop = {
  newData: Services;
};

export const addData = createAsyncThunk(
  "superbase/addData",
  async ({ newData }: prop) => {
    const { data, error } = await supabase.from("services").insert([newData]);

    if (error) {
      throw error.message;
    }
    return data;
  }
);
