/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { add_info, interact } from "../types/slicesTypes";
import { updateCustomer } from "../store/thunks/CustomerPage/UPDATE";

type prop = {
  onUpdate: () => void;
};

function UpdateCustomer({ onUpdate }: prop) {
  const prevData = useSelector(
    (state: { interact: interact }) => state.interact.prev_data.data
  );

  const [loyalty, setLoyalty] = useState(prevData.loyalty_sticker);
  const [previousName, setPreviousName] = useState(
    prevData.customer_name || ""
  );
  const [previousAddress, setPreviousAddress] = useState(
    prevData.address || ""
  );
  const [previousContactP, setPreviousContactP] = useState(
    prevData.contact_primary || 0
  );
  const [previousContactS, setPreviousContactS] = useState(
    prevData.contact_secondary || 0
  );
  const [previousVehicle, setPreviousVehicle] = useState(
    prevData.vehicle_id || 0
  );
  const dispatch = useDispatch();

  const submitInfo = (e: FormEvent) => {
    e.preventDefault();
    onUpdate();
    const insertInfo = {
      customer_name: previousName,
      address: previousAddress,
      contact_primary: previousContactP,
      contact_secondary: previousContactS,
      vehicle_id: previousVehicle,
      loyalty_sticker: loyalty,
      customer_id: prevData.customer_id,
    };
    dispatch(updateCustomer(insertInfo as add_info) as any);
  };

  const listOption = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const selectLoyalty = (e: any) => setLoyalty(e);

  const nameHandler = (e: any) => {
    setPreviousName(e.target.value);
  };

  const addressHandler = (e: any) => {
    setPreviousAddress(e.target.value);
  };

  const primaryHandler = (e: any) => {
    setPreviousContactP(e.target.value);
  };

  const secondaryHandler = (e: any) => {
    setPreviousContactS(e.target.value);
  };

  const vehicleHandler = (e: any) => {
    setPreviousVehicle(e.target.value);
  };

  return (
    <form className="flex-col flex gap-2" onSubmit={submitInfo}>
      <Input
        onChange={nameHandler}
        value={previousName}
        type="text"
        label="Customer Name..."
      />
      <Input
        onChange={addressHandler}
        value={previousAddress}
        type="text"
        label="Address..."
      />
      <Input
        onChange={primaryHandler}
        value={previousContactP}
        type="number"
        label="Contact Primary..."
      />
      <Input
        onChange={secondaryHandler}
        value={previousContactS}
        type="number"
        label="Contact Secondary..."
      />
      <Input
        onChange={vehicleHandler}
        value={previousVehicle}
        type="number"
        label="Vehicle ID..."
      />
      <Input
        type="dropdown"
        itemOption={listOption}
        onSelect={selectLoyalty}
        selectItem={loyalty.toString().toUpperCase()}
        label="Loyalty Sticker"
      />
      <Button className="w-fit mx-auto" primary type="submit">
        Update
      </Button>
    </form>
  );
}

export default UpdateCustomer;
