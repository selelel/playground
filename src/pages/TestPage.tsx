/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../store/slices/import_db";
import { RootState } from "../store";
import Modal from "../components/Modal";
import Table from "../components/Table";
import InsertData from "../components/InsertData";
import Button from "../components/Button";

function Page() {
  const [isOpen, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(null);
  const dispatch = useDispatch();

  const { data, status, error } = useSelector(
    (state: RootState) => state.lcl_db
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(fetchData() as any);
  }, [dispatch, refresh]);

  console.log(status, data);
  !error || console.error(error);

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
          <InsertData
            update={(e: any) => {
              setRefresh(e);
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Page;
