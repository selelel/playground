/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { customer_info } from "../types/slicesTypes";
import { TfiReload } from "react-icons/tfi";
import { FormEvent, useEffect, useState } from "react";
import { fetchInfo } from "../store/thunks/CustomerPage/INSERT";
import CustomerList from "../components/CustomerList";
import Input from "../ui/Input";

function Customer() {
  const [list, setList] = useState(undefined);
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  let content;
  const { data, isLoading, error } = useSelector(
    (state: customer_info) => state.customer_info
  );
  useEffect(() => {
    dispatch(fetchInfo() as any);
  }, []);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    setSelected(selected);
  };

  const searchHandle = (e: { target: { value: any } }) => {
    const search = data.slice().filter((element: { customer_name: any }) => {
      return element.customer_name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    const listItems = e.target.value
      ? search.map((list: any) => {
          return { label: list.customer_name, value: list.customer_name };
        })
      : "";

    setList(listItems);
    setSelected(e.target.value);
  };

  if (isLoading) {
    content = <TfiReload className="animate-spin" />;
  } else if (error) {
    content = <>{error}</>;
  } else {
    content = <CustomerList data={data} />;
  }

  return (
    <div>
      <div>
        <div>
          <form onSubmit={submitSearch}>
            <Input
              onChange={searchHandle}
              className="w-48"
              type="input.dropdown"
              itemOption={list}
              value={selected}
              onSelect={(e: any) => {
                setSelected(e);
                console.log(e);
              }}
            ></Input>
          </form>
        </div>
      </div>

      <div>{content}</div>
    </div>
  );
}

export default Customer;
