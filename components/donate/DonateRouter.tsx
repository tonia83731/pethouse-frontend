"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
const DonateRouter = () => {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 justify-center md:justify-start">
      <Link
        href="/donate/money"
        className={`border-2 border-dark px-2 py-1.5 rounded-full font-nunito md:text-xl ${
          pathname.includes("money") ? "bg-dark text-white" : "text-dark"
        }`}
      >
        捐款
      </Link>
      <Link
        href="/donate/supplies"
        className={`border-2 border-dark px-2 py-1.5 rounded-full font-nunito md:text-xl ${
          pathname.includes("supplies") ? "bg-dark text-white" : "text-dark"
        }`}
      >
        捐贈物資
      </Link>
    </div>
  );
};
export default DonateRouter;
