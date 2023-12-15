/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { supabase } from "../services/Supabase";
import InputUi from "../ui/Input";
import Button from "../ui/Button";

type prop = {
  update: (selected: any[] | null) => void | undefined;
};

type e = {
  target: { value: string };
};

function InsertData({ update }: prop) {
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [cycle, setCycle] = useState("");
  const [description, setDescription] = useState("");
  const handlerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error, status } = await supabase
      .from("services")
      .insert([
        {
          cycle_time: cycle,
          description: description,
          price: price,
          service_name: service,
          vehicle_size: size,
        },
      ])
      .select();
    console.log(error, status);
    update(data);
  };

  const listOption = [
    { label: "Small", value: "Small" },
    { label: "Medium", value: "Medium" },
    { label: "Large", value: "Large" },
    { label: "XLarge", value: "XLarge" },
    { label: "Humogous", value: "Humogous" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (selected: any) => {
    setSize(selected);
  };

  return (
    <div className="h-full">
      <form onSubmit={handlerSubmit} className="flex flex-col gap-1 ">
        <InputUi
          onChange={(e: e) => {
            setService(e.target.value);
          }}
          type="text"
          label="Service name"
          required
        />
        <InputUi
          type="dropdown"
          label="Size"
          itemOption={listOption}
          selectItem={size}
          onSelect={handleSelect}
          required
        />

        <InputUi
          onChange={(e: e) => {
            setPrice(e.target.value);
          }}
          type="number"
          label="Price"
          required
        />
        <InputUi
          onChange={(e: e) => {
            setCycle(e.target.value);
          }}
          label="Duration(minutes)"
          type="number"
        />

        <InputUi
          onChange={(e: e) => {
            setDescription(e.target.value);
          }}
          type="textarea"
          label="Description"
        />

        <Button className="w-fit my-4 mx-auto" primary type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default InsertData;
