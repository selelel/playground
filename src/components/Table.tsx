import { Fragment } from "react";

type data = {
  service_name: string;
  cycle_time: number;
  description: string;
  price: number;
  vehicle_size: string;
};

type prop = {
  data: data[];
  config: { label: string; render: (element: data) => string | number }[];
};

function Table({ data, config }: prop) {
  const header = config?.map(({ label }, index) => {
    return (
      <Fragment key={index}>
        <td className="w-max px-3 border-black border py-1">{label}</td>
      </Fragment>
    );
  });

  const values = data?.map((element: data) => {
    const renderRow = config.map(({ render }, colIndex) => (
      <td className="text-left p-1 border-black border-r " key={colIndex}>
        {render(element)}
      </td>
    ));
    return <tr key={element?.service_name}>{renderRow}</tr>;
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
