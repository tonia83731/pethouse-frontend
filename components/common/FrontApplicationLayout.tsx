import { ReactNode } from "react";
import FrontHeader from "./header/FrontHeader";

const FrontApplicationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <FrontHeader />
      <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[400px_2fr]">
        {children}
      </div>
    </>
  );
};

export default FrontApplicationLayout;
