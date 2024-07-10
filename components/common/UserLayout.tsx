import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
const UserLayout = ({
  children,
  extraClass = "mb-[100px] md:mb-[120px]",
}: {
  children: ReactNode;
  extraClass?: string;
}) => {
  return (
    <>
      <Header />
      <main className={extraClass}>{children}</main>
      <Footer />
    </>
  );
};
export default UserLayout;
