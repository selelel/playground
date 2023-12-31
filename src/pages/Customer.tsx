/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { customer_info, interact } from "../types/slicesTypes";
import { TfiReload } from "react-icons/tfi";
import { FormEvent, useEffect, useState } from "react";
import { fetchInfo } from "../store/thunks/CustomerPage/GET";
import CustomerList from "../components/CustomerList";
import Search from "../ui/Search";
import FormCustomer from "../components/FormCustomer";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Modify from "../components/Modify";
import { onModalCustomer } from "../store/slices/InteractSlice";

function Customer() {
  const [searchItem, setSearchItem] = useState(undefined);
  const [list, setList] = useState(undefined);
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    (state: customer_info) => state.customer_info
  );

  const {
    on_open: { modal_customer },
  } = useSelector((state: { interact: interact }) => state.interact);

  useEffect(() => {
    dispatch(fetchInfo() as any);
  }, [dispatch]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    setSelected(selected);
    const search = data.slice().filter((element: { customer_name: any }) => {
      return element.customer_name
        .toLowerCase()
        .includes(selected.toLowerCase());
    });
    setSearchItem(search);
  };

  const searchHandle = (e: { target: { value: string } }) => {
    const search = data.slice().filter((element: { customer_name: string }) => {
      return element.customer_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    const listItems = () => {
      if (!e.target.value) return;

      return search.map((list: { customer_name: string }) => {
        return { label: list.customer_name, value: list.customer_name };
      });
    };

    setSearchItem(!e.target.value ? search : undefined);
    setList(listItems());
    setSelected(e.target.value);
  };

  const content = isLoading ? (
    <TfiReload className="animate-spin" />
  ) : error ? (
    <>{error}</>
  ) : (
    <CustomerList data={searchItem || data} />
  );

  return (
    <div>
      <Modify />
      {modal_customer && (
        <Modal
          onClose={() => {
            dispatch(onModalCustomer(false));
          }}
          actionBar={
            <Button
              onClick={() => {
                dispatch(onModalCustomer(false));
              }}
            >
              close
            </Button>
          }
        >
          <p className="mb-3 text-3xl font-semibold">Customer</p>
          <FormCustomer
            onUpdate={() => {
              dispatch(onModalCustomer(false));
            }}
          />
        </Modal>
      )}
      <div>
        <div>
          <form onSubmit={submitSearch}>
            <Search
              onChange={searchHandle}
              className="w-48"
              itemOption={list}
              onSelect={(e: any) => {
                setSelected(e);
              }}
              value={selected}
            />
          </form>
        </div>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default Customer;
