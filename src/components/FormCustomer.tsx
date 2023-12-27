/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/thunks/CustomerPage/INSERT";
import { add_info } from "../types/slicesTypes";

type prop = {
  onUpdate: () => void;
};

function FormCustomer({ onUpdate }: prop) {
  const [loyalty, setLoyalty] = useState(false);
  const dispatch = useDispatch();
  const customerId = useSelector(
    (state: { customer_info: any }) => state.customer_info.data
  );
  // Create refs for each input
  const customerNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const contactPrimaryRef = useRef<HTMLInputElement>(null);
  const contactSecondaryRef = useRef<HTMLInputElement>(null);
  const vehicleIdRef = useRef<HTMLInputElement>(null);

  const submitInfo = (e: FormEvent) => {
    e.preventDefault();
    // Access the values using the current property of the ref objects
    onUpdate();
    const customerName = customerNameRef.current?.value;
    const address = addressRef.current?.value;
    const contactPrimary = contactPrimaryRef.current?.value;
    const contactSecondary = contactSecondaryRef.current?.value;
    const vehicleId = vehicleIdRef.current?.value;
    const insertInfo = {
      customer_name: customerName,
      address: address,
      contact_primary: contactPrimary,
      contact_secondary: contactSecondary,
      vehicle_id: vehicleId,
      loyalty_sticker: loyalty,
      customer_id: customerId.slice().pop().customer_id + 1,
    };
    dispatch(addUser(insertInfo as add_info) as any);
  };

  const listOption = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const selectLoyalty = (e: any) => setLoyalty(e);

  return (
    <form className="flex-col flex gap-2" onSubmit={submitInfo}>
      <Input ref={customerNameRef} type="text" label="Customer Name..." />
      <Input ref={addressRef} type="text" label="Address..." />
      <Input ref={contactPrimaryRef} type="number" label="Contact Primary..." />
      <Input
        ref={contactSecondaryRef}
        type="number"
        label="Contact Secondary..."
      />
      <Input ref={vehicleIdRef} type="number" label="Vehicle ID..." />
      <Input
        type="dropdown"
        itemOption={listOption}
        onSelect={selectLoyalty}
        selectItem={loyalty.toString().toUpperCase()}
        label="Loyalty Sticker"
      />
      <Button className="w-fit mx-auto" primary type="submit">
        Submit
      </Button>
    </form>
  );
}

export default FormCustomer;
