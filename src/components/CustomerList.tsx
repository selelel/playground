/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import TableCustomerList from "../ui/TableCustomerList";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import {
  onDelete,
  onModalUpdateCustomer,
  onUpdate,
  updatePrev,
} from "../store";
import { removeInfo } from "../store/thunks/CustomerPage/DELETE";

function CustomerList({ data }: any) {
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
      toDelete: (element: number) => {
        const onRemoveHandler = () => {
          dispatch(removeInfo(element) as any);
          dispatch(onDelete(true));
        };
        return (
          <div onClick={onRemoveHandler}>
            <FaRegTrashAlt className="text-red-500 cursor-pointer" />
          </div>
        );
      },
      toUpdate: (element: any) => {
        const onUpdateHandler = () => {
          dispatch(onUpdate(false));
          dispatch(onModalUpdateCustomer(true));
          dispatch(updatePrev(element));
        };
        return (
          <div onClick={onUpdateHandler}>
            <FaPen className="text-blue-500 cursor-pointer" />
          </div>
        );
      },
    },
  ];

  return <TableCustomerList data={data} config={config} />;
}

export default CustomerList;
