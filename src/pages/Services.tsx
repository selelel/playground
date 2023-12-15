/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Modal from "../ui/Modal";
import Table from "../ui/Table";
import Button from "../ui/Button";
import { fetchData } from "../store/thunks/GET";
import FormServices from "../components/FormServices";

function Page() {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const { data, status } = useSelector((state: RootState) => state.lcl_db);
  useEffect(() => {
    dispatch(fetchData() as any);
  }, [dispatch, refresh]);

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
      {status === "succeeded" ? (
        <Table data={data} config={config} />
      ) : (
        "Loading"
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
              setRefresh((prevRefresh) => prevRefresh + 1);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Page;
