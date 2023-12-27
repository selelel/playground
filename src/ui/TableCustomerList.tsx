/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";

type prop = {
  data: any;
  config: { label: string; render: (element: any) => string | number }[];
  isToDelete: boolean;
};

function Table({ data, config, isToDelete }: prop) {
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
    const renderRow = config.map(({ render, style }: any, colIndex) => (
      <td className="text-left p-2 border-black border-r" key={colIndex}>
        <div className="flex justify-between">
          {render(element)}
          {style && isToDelete ? style(element.customer_id) : ""}
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
