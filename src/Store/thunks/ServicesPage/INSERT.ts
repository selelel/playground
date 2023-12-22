import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { supabase } from "../../../services/Supabase";
import { Services } from "../../../types/slicesTypes";

type prop = {
  newData: Services;
};

export const addData = createAsyncThunk(
  "superbase/addData",
  async ({ newData }: prop) => {
    const { data, error } = await supabase
      .from("services")
      .insert([newData])
      .select();

    if (error) {
      throw error.message;
    }

    return data[0];
  }
);
