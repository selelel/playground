/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdDelete } from "react-icons/md";
import TableCustomerList from "../ui/TableCustomerList";
import { useDispatch } from "react-redux";
import { removeInfo } from "../store/thunks/CustomerPage/DELETE";
import { GoPencil } from "react-icons/go";

function CustomerList({
  data,
  isToDelete,
  isToUpdate,
  doneDelete,
  doneUpdate,
}: any) {
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
      toDelete: (customer_id: number) => {
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
      toUpdate: (info: any) => {
        const updateInfo = () => {
          doneUpdate(false);
          console.log(info);
        };
        return (
          <div className="cursor-pointer" onClick={updateInfo}>
            <GoPencil />
          </div>
        );
      },
    },
  ];

  return (
    <TableCustomerList
      data={data}
      config={config}
      isToDelete={isToDelete}
      isToUpdate={isToUpdate}
    />
  );
}

export default CustomerList;
