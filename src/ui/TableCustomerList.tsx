/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { interact } from "../types/slicesTypes";

type prop = {
  data: any;
  config: {
    label: string;
    render: (element: any) => string | number;
    toUpdate?: (element: any) => any;
    toDelete?: (element: number) => any;
  }[];
};

function Table({ data, config }: prop) {
  const { on_update, on_delete } = useSelector(
    (state: { interact: interact }) => state.interact
  );
  const header = config?.map(({ label }, index) => {
    return (
      <Fragment key={index}>
        <td className="w-max px-3 border-black border py-1 truncate ">
          {label}
        </td>
      </Fragment>
    );
  });

  const values = data?.map((element: any, index: number) => {
    const renderRow = config.map(({ render, toUpdate, toDelete }, colIndex) => (
      <td className="text-left p-2 border-black border-r" key={colIndex}>
        <div className="flex justify-between">
          {render(element)}
          {on_update && toUpdate ? toUpdate(element) : ""}
          {on_delete && toDelete ? toDelete(element.customer_id) : ""}
        </div>
      </td>
    ));
    return <tr key={index}>{renderRow}</tr>;
  });

  return (
    <div className="flex justify-center mt-10 text-sm">
      <table className="border-black border">
        <thead>
          <tr className="">{header}</tr>
        </thead>

        <tbody>{values}</tbody>
      </table>
    </div>
  );
}

export default Table;
