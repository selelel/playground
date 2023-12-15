import ReactDOM from "react-dom";
import { ReactNode, useEffect } from "react";

type prop = {
  children: ReactNode;
  actionBar: ReactNode;
  onClose?: () => void;
};

function Modal({ onClose, children, actionBar }: prop) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  });

  const modalRoot = document.querySelector(".modal-root") as HTMLElement;

  if (!modalRoot) {
    throw new Error("Modal element with class 'modal' not found");
  }

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={() => {
          onClose && onClose();
        }}
        className="fixed inset-0 backdrop-blur-sm cursor-pointer"
      ></div>

      <div className="fixed inset-0 w-5/12 border border-black h-[30rem] overflow-auto scrollbar-hide bg-white m-3 mt-10 min-w-[20rem] mx-auto rounded-xl shadow-2xl">
        <div className="absolute right-2 top-0 text-red-500">{actionBar}</div>
        <div className="p-10 h-full">{children}</div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
