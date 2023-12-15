import { useEffect, useState, useRef } from "react";
import { AiOutlineDown, AiOutlineLeft } from "react-icons/ai";

type prop = {
  itemOption: {
    id: number;
    label: string;
    value: string;
  }[];
  selectItem: null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelect: (selected: any) => void;
};

function DropDown({ itemOption, selectItem, onSelect }: prop) {
  const [isOpen, setOpen] = useState(false);
  const divEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (divEl.current && !divEl.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const listItem = itemOption.map((element) => (
    <div key={element.id}>
      <div
        className="hover:bg-sky-100 p-1"
        onClick={() => {
          onSelect(element.label);
          setOpen(false);
        }}
      >
        {element.label}
      </div>
    </div>
  ));

  return (
    <div className="cursor-pointer border">
      <div
        className=" rounded text-xl flex justify-between items-center pr-2"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {selectItem || "select..."}{" "}
        {isOpen ? <AiOutlineDown /> : <AiOutlineLeft />}
      </div>
      <div className="p-1">
        {isOpen && (
          <div className="p-1" ref={divEl}>
            {listItem}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDown;
