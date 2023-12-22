/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { customer_info } from "../types/slicesTypes";
import { TfiReload } from "react-icons/tfi";
import { useEffect } from "react";
import { fetchInfo } from "../store/thunks/CustomerPage/INSERT";
import Table from "../ui/Table";

function Customer() {
  const dispatch = useDispatch();
  let content;
  const { data, isLoading, error } = useSelector(
    (state: customer_info) => state.customer_info
  );
  console.log(data);
  useEffect(() => {
    dispatch(fetchInfo() as any);
  }, []);
  const config = [
    {
      label: "ID",
      render: (element: { customer_id: number }) => element.customer_id,
    },
    {
      label: "Customer Name",
      render: (element: { customer_name: string }) => element.customer_name,
    },
    {
      label: "Address",
      render: (element: { address: string }) => element.address,
    },
    {
      label: "Contact Primary",
      render: (element: { contact_primary: number }) => element.contact_primary,
    },
    {
      label: "Contact Secondary",
      render: (element: { contact_secondary: number }) =>
        element.contact_secondary,
    },
    {
      label: "Vehicle ID",
      render: (element: { vehicle_id: number }) => element.vehicle_id,
    },
    {
      label: "Loyalty Sticker",
      render: (element: { loyalty_sticker: boolean }) =>
        element.loyalty_sticker.toString().toUpperCase(),
    },
  ];

  if (!isLoading) {
    content = <TfiReload className="animate-bounce" />;
  } else if (error) {
    content = <>{error}</>;
  } else {
    content = <Table data={data} config={config} />;
  }

  return <>{content}</>;
}

export default Customer;
