import { ReactNode } from "react";

const ModalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-dark-40 flex justify-center items-center">
      <div className="bg-white w-2/3 rounded-md md:w-1/2">{children}</div>
    </div>
  );
};

export default ModalLayout;
