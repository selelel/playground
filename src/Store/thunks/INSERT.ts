import { supabase } from "../../services/Supabase";
import { Services } from "../slices/ImportData";

type prop = {
  newData: Services;
};

export const addData = async ({ newData }: prop) => {
  const { data, error } = await supabase.from("services").insert([newData]);

  if (error) {
    console.error(error.message);
  }
  console.log(data);

  return data;
};
