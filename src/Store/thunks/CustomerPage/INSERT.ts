import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../services/Supabase";
import { add_info } from "../../../types/slicesTypes";

export const addUser = createAsyncThunk(
  "info/Add",
  async (insert: add_info) => {
    const { error } = await supabase.from("customer_info").insert([insert]);
    console.log(insert);
    if (error) throw error;

    return insert;
  }
);
