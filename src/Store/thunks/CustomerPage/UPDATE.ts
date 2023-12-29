import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/Supabase";
import { add_info } from "../../../types/slicesTypes";

export const updateInfo = createAsyncThunk(
  "info/add",
  async (info: add_info) => {
    const { data, error } = await supabase
      .from("customer_info")
      .update(info)
      .eq("customer_id", info.customer_id);

    if (error) throw error;
    console.log(data);
    return data;
  }
);
