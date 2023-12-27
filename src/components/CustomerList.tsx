/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDelete } from "react-icons/md";
import TableCustomerList from "../ui/TableCustomerList";
import { useDispatch } from "react-redux";
import { removeInfo } from "../store/thunks/CustomerPage/DELETE";

function CustomerList({ data, isToDelete, doneDelete }: any) {
  const dispatch = useDispatch();
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
      style: (customer_id: number) => {
        const deleteInfo = () => {
          dispatch(removeInfo(customer_id) as any);
          doneDelete(false);
        };
        return (
          <div onClick={deleteInfo}>
            <MdDelete className="text-red-600 cursor-pointer" />
          </div>
        );
      },
    },
  ];

  return (
    <TableCustomerList data={data} config={config} isToDelete={isToDelete} />
  );
}

export default CustomerList;
