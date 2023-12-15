import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/Supabase";
import { Services } from "../slices/ImportData";

type prop = {
  newData: Services;
};

export const addData = createAsyncThunk(
  "superbase/insertData",
  async ({ newData }: prop) => {
    const { data, error } = await supabase.from("services").insert([newData]);

    if (error) {
      throw error;
    }
    console.log(data);

    return data;
  }
);
