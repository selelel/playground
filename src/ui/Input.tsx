/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ForwardedRef,
  InputHTMLAttributes,
  RefObject,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { RiArrowLeftSFill, RiArrowDownSFill } from "react-icons/ri";

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
    | "input.dropdown";
  className?: string;
  itemOption?:
    | {
        label: string;
        value: string | boolean;
      }[]
    | undefined;
  selectItem?: string;
  onSelect?: ((selected: string|boolean) => void) | undefined;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

const Input = forwardRef(
  (
    {
      label,
      type,
      placeholder,
      className,
      itemOption,
      selectItem,
      onSelect,
      ...rest
    }: InputUiProps,
    ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          onClick={() => handleSelect(element.value.toString())}
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
            className="border-2 h-10 p-2 border-black "
            type={type}
            placeholder={placeholder}
            ref={ref as RefObject<HTMLInputElement>}
          />
        )}
      </label>
    );
  }
);

export default Input;
