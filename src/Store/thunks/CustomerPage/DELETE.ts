import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/Supabase";

export const removeInfo = createAsyncThunk(
  "info/Delete",
  async (id: number) => {
    const { error, data } = await supabase
      .from("customer_info")
      .delete()
      .eq("customer_id", id)
      .select("customer_id");

    if (error) throw error;

    return data[0];
  }
);
