import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import Button from "./Button";
import { IoMdSearch } from "react-icons/io";

type InputUiProps = {
  className?: string;
  itemOption?: { label: string; value: string }[];
  onSelect?: (selected: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

function Search({ onSelect, itemOption, ...rest }: InputUiProps) {
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

  const handleSelect = (selected: string) => {
    if (onSelect) {
      onSelect(selected);
    }
    setOpen(false);
  };

  const renderDropdownItems = () =>
    itemOption &&
    itemOption?.map((element, index) => (
      <Button
        key={index}
        className="text-left font-normal relative hover:bg-slate-100 w-full rounded-none"
        onClick={() => handleSelect(element.value)}
      >
        {element.label}
      </Button>
    ));
  return (
    <div className="relative w-fit">
      <div className="flex">
        <div
          className="flex items-center border-2 h-10 p-2 border-black overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <IoMdSearch className="text-xl" />
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className="outline-none indent-1"
            type="text"
          />
        </div>
      </div>
      <div
        className={`${
          isOpen ? "absolute" : "hidden"
        } bg-white w-full border-r border-l border-b border-black/25`}
        ref={divEl}
      >
        {renderDropdownItems()}
      </div>
    </div>
  );
}

export default Search;
