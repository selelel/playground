/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TfiReload } from "react-icons/tfi";
import Modal from "../ui/Modal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import { fetchData } from "../store/thunks/ServicesPage/GET";
import FormServices from "../components/FormServices";
import { local_DB } from "../types/slicesTypes";

function Page() {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const { data, isLoading } = useSelector((state: local_DB) => state.local_DB);

  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch]);

  const config = [
    {
      label: "Service name",
      render: (element: { service_name: string }) => element.service_name,
    },
    {
      label: "Size",
      render: (element: { vehicle_size: string }) => element.vehicle_size,
    },
    {
      label: "Price",
      render: (element: { price: number }) => element.price,
    },
    {
      label: "Duration",
      render: (element: { cycle_time: number }) => element.cycle_time,
    },
    {
      label: "Description",
      render: (element: { description: string }) => element.description,
    },
  ];

  return (
    <div>
      {!isLoading ? (
        <Table data={data} config={config} />
      ) : (
        <TfiReload className="animate-spin" />
      )}

      <Button
        secondary
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Value
      </Button>

      {isOpen && (
        <Modal
          onClose={() => {
            setOpen(false);
          }}
          actionBar={
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              close
            </Button>
          }
        >
          <p className="mb-3 text-3xl font-semibold">Services</p>
          <FormServices
            onUpdate={() => {
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Page;
