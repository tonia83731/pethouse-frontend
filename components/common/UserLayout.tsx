import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mb-[100px] md:mb-[120px]">{children}</main>
      <Footer />
    </>
  );
};
export default UserLayout;
