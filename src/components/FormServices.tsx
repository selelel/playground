/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import InputUi from "../ui/Input";
import Button from "../ui/Button";
import { addData } from "../store/thunks/INSERT";
import { useDispatch } from "react-redux";

type InsertDataProps = {
  onUpdate: () => void;
};

type EventTargetValue = {
  target: { value: any };
};

function FormServices({ onUpdate }: InsertDataProps) {
  const dispatch = useDispatch();
  const [service, setService] = useState("");
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [cycle, setCycle] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newData = {
      cycle_time: cycle,
      description: description,
      price: price,
      service_name: service,
      vehicle_size: size,
    };
    await dispatch(addData({ newData }) as any);
    onUpdate();
  };

  const listOption = [
    { label: "Small", value: "Small" },
    { label: "Medium", value: "Medium" },
    { label: "Large", value: "Large" },
    { label: "XLarge", value: "XLarge" },
    { label: "Humongous", value: "Humongous" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect = (selected: any) => {
    setSize(selected);
  };

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <InputUi
          onChange={(e: EventTargetValue) => {
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
          onChange={(e: EventTargetValue) => {
            setPrice(e.target.value);
          }}
          type="number"
          label="Price"
          required
        />
        <InputUi
          onChange={(e: EventTargetValue) => {
            setCycle(Number(e.target.value));
          }}
          label="Duration(minutes)"
          type="number"
        />
        <InputUi
          onChange={(e: EventTargetValue) => {
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

export default FormServices;
