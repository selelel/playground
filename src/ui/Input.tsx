import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiArrowLeftSFill, RiArrowDownSFill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import Button from "./Button";

type InputUiProps = {
  placeholder?: string;
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "dropdown"
    | "search";
  className?: string;
  itemOption?: { label: string; value: string }[];
  selectItem?: string;
  onSelect?: (selected: string) => void;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

function Input({
  label,
  type,
  placeholder,
  className,
  itemOption,
  selectItem,
  onSelect,
  ...rest
}: InputUiProps) {
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
    itemOption?.map((element, index) =>
      type === "dropdown" ? (
        <div key={index} onClick={() => handleSelect(element.value)}>
          {element.label}
        </div>
      ) : (
        <Button
          key={index}
          className="text-left font-normal"
          onClick={() => handleSelect(element.value)}
        >
          {element.label}
        </Button>
      )
    );

  const renderDropdown = () => (
    <>
      <div
        className="border-2 h-10 p-2 border-black flex justify-between align-middle"
        onClick={() => setOpen(!isOpen)}
      >
        {selectItem || "Select..."}
        <div className="text-xl cursor-pointer">
          {isOpen ? <RiArrowDownSFill /> : <RiArrowLeftSFill />}
        </div>
      </div>

      <div className={`p-1 ${isOpen ? "block" : "hidden"}`} ref={divEl}>
        {renderDropdownItems()}
      </div>
    </>
  );

  const renderInputDropdown = () => (
    <>
      <div className="flex w-fit">
        <div
          className="flex items-center border-2 h-10 p-2 border-black overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <IoMdSearch className="text-xl" />
          <input
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            className="outline-none indent-1"
            type="text"
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`} ref={divEl}>
        {renderDropdownItems()}
      </div>
    </>
  );

  return (
    <label className={`flex-col flex ${className}`}>
      {label}
      {type === "textarea" ? (
        <textarea
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className="border-2 h-[10rem] p-2 border-black resize-none"
          placeholder={placeholder}
        />
      ) : type === "dropdown" ? (
        renderDropdown()
      ) : type === "search" ? (
        renderInputDropdown()
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className="border-2 h-10 p-2 border-black"
          type={type}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

export default Input;
