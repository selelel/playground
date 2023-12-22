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
  type?:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "dropdown"
    | "input.dropdown";
  rest?: () => void;
  className?: string;
  itemOption?:
    | {
        label: string;
        value: string;
      }[]
    | undefined;
  selectItem?: string;
  onSelect?: ((selected: string) => void) | undefined;
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

  const listItem =
    itemOption &&
    itemOption?.map((element, index) => {
      return (
        <div
          key={index}
          className="hover:bg-slate-100 p-1 "
          onClick={() => handleSelect(element.value)}
        >
          {element.label}
        </div>
      );
    });

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
        <>
          <div
            className="border-2 h-10 p-2 border-black flex justify-between align-middle"
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            {selectItem || "Select..."}
            <div className="text-xl cursor-pointer">
              {isOpen ? <RiArrowDownSFill /> : <RiArrowLeftSFill />}
            </div>
          </div>

          <div className="p-1">
            {isOpen && (
              <div className="p-1" ref={divEl}>
                {listItem}
              </div>
            )}
          </div>
        </>
      ) : type === "input.dropdown" ? (
        <>
          <div
            onClick={() => {
              setOpen(true);
            }}
          >
            <input
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
              className="border-2 h-10 p-2 border-black "
              type="text"
              placeholder={placeholder}
            />
          </div>

          <div className="p-1">
            <div className="p-1 absolute" ref={divEl}>
              {isOpen && listItem}
            </div>
          </div>
        </>
      ) : (
        <input
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          className="border-2 h-10 p-2 border-black "
          type={type}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

export default Input;
