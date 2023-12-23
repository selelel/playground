import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiArrowLeftSFill, RiArrowDownSFill } from "react-icons/ri";

type InputUiProps = {
  placeholder?: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "dropdown";
  className?: string;
  itemOption?: { label: string; value: string }[];
  selectItem?: string;
  onSelect?: (selected: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

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
    itemOption?.map((element, index) => (
      <div
        className="cursor-pointer p-1 hover:bg-sky-100  "
        key={index}
        onClick={() => handleSelect(element.value)}
      >
        {element.label}
      </div>
    ));

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
