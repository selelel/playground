import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/Supabase";

export const fetchInfo = createAsyncThunk("info/Fetch", async () => {
  const { data, error } = await supabase
    .from("customer_info")
    .select()
    .order("customer_id", { ascending: true });

  if (error) throw error;
  return data;
});
