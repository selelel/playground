import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/Supabase";

export const addUser = createAsyncThunk("info/Add", async (params) => {
  const { data, error } = await supabase
    .from("customer_info")
    .insert([params])
    .select();

  if (error) throw error;

  return data;
});
