"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export const dashboardNavlinks = [
  {
    id: "profile",
    title: "Profile",
    href: "/dashboard",
    icon: "/icons/admin/profile.png",
    icon_active: "/icons/admin/profile_active.png",
  },
  {
    id: "find-volunteers",
    title: "Find Volunteers",
    href: "/dashboard/find-volunteers",
    icon: "/icons/admin/volunteer.png",
    icon_active: "/icons/admin/volunteer_active.png",
  },
  {
    id: "find-supplies",
    title: "Find Supplies",
    href: "/dashboard/find-supplies",
    icon: "/icons/admin/supplies.png",
    icon_active: "/icons/admin/supplies_active.png",
  },
  {
    id: "collaborate",
    title: "Collaborate",
    href: "/dashboard/collaborate",
    icon: "/icons/admin/collaborate.png",
    icon_active: "/icons/admin/collaborate_active.png",
  },
  {
    id: "donate-record",
    title: "Donate Record",
    href: "/dashboard/donate-record",
    icon: "/icons/admin/donate.png",
    icon_active: "/icons/admin/donate_active.png",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed top-0 left-0 w-full h-full min-h-screen md:w-1/5 lg:w-1/6 flex flex-col justify-between">
      <div className="flex flex-col gap-16">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-white flex md:justify-center lg:justify-start gap-1 items-center h-[60px] leading-[60px] pt-12 lg:px-4 xl:px-6 pb-4"
        >
          <Image
            src="/icons/logo_white.png"
            alt="Pethouse Logo"
            width={90}
            height={80}
            className="w-8 md:w-10"
          ></Image>
          <div className="font-nunito font-extrabold text-2xl md:text-3xl md:hidden lg:block">
            PetHouse
          </div>
        </Link>
        {/* Nav Links */}
        <div className="flex flex-col">
          {dashboardNavlinks.map(({ id, title, href, icon, icon_active }) => {
            return (
              <Link href={href} className={`text-white xl:text-xl`} key={id}>
                <div
                  className={`flex gap-2 items-center md:justify-center lg:justify-start py-6 px-4 ${
                    pathname === href ? "bg-wine font-bold" : ""
                  }`}
                  title={title}
                >
                  <Image
                    src={pathname === href ? icon_active : icon}
                    alt="title"
                    width={30}
                    height={30}
                  ></Image>
                  <div className={`md:hidden lg:block`}>{title}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <button className="flex md:justify-center lg:justify-start gap-2 text-white text-xl font-medium hover:font-bold px-6 py-4 mb-8">
        <Image
          src="/icons/admin/signout.png"
          alt="signout"
          width={30}
          height={30}
        ></Image>
        <div className="md:hidden lg:block">Sign Out</div>
      </button>
    </div>
  );
};

export default Sidebar;
