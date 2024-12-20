import { ReactNode, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
const ModalLayout = ({
  children,
  title,
  isOpen,
  customClass = "h-[calc(100vh-60px)] mt-[60px]",
  onClose,
}: {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  customClass?: string;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div
      className={`fixed top-0 left-0 z-[200] bg-dark-40 w-full ${customClass} flex justify-center items-center`}
    >
      <div
        ref={modalRef}
        className="bg-white w-11/12 md:w-2/3 mx-auto rounded-md px-4 md:max-w-[800px]"
      >
        <header className="flex justify-between">
          <h2 className="text-xl h-9 leading-9 font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl text-wine">
            <RxCross2 />
          </button>
        </header>
        <div className="flex flex-col gap-8 h-full max-h-[50vh] p-4 overflow-y-auto overflow-x-hidden scrolled">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
