import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../services/Supabase";

export const fetchData = createAsyncThunk("superbase/fetchData", async () => {
  const { data, error } = await supabase.from("services").select("*");
  if (error) {
    throw error;
  }
  return data;
});
