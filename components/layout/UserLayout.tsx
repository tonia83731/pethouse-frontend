import { ReactNode } from "react";
import Header from "../common/navbar/Header";
import Footer from "../common/Footer";
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
