"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
const animalLink = [
  {
    id: "adopt",
    title: "今日認養",
    href: "/adopt",
  },
  {
    id: "animal",
    title: "Company Animals",
    href: "/animals",
  },
  {
    id: "tw-animal",
    title: "Taiwan Animals",
    href: "/animals/tw-animals",
  },
];
const AdoptionBtn = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div className="flex justify-center items-center gap-2 flex-wrap">
      <Link
        href="/adopt"
        className={`text-white text-large px-4 py-2 rounded-full bg-heart`}
      >
        今日認養
      </Link>
    </div>
  );
};
export default AdoptionBtn;
