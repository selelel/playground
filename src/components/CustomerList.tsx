/* eslint-disable @typescript-eslint/no-explicit-any */
import TableCustomerList from "../ui/TableCustomerList";

function CustomerList({ data, isToDelete, isToUpdate }: any) {
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
        element.loyalty_sticker?.toString().toUpperCase(),
      toDelete: () => {
        console.log(isToDelete);
      },
      toUpdate: () => {
        console.log("To Update");
      },
    },
  ];

  return <TableCustomerList data={data} config={config} />;
}

export default CustomerList;
