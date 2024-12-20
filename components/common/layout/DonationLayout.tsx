import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import FrontLayout from "./FrontLayout";

import Donation1 from "@/public/images/donation/donation-1.jpg";
import Donation2 from "@/public/images/donation/donation-2.jpg";
import Donation3 from "@/public/images/donation/donation-3.jpg";
import Donation4 from "@/public/images/donation/donation-4.jpg";

const donation_nav = [
  {
    id: "supplies",
    href: "/donation/supplies",
    title: "捐贈物資",
  },
  {
    id: "money",
    href: "/donation/money",
    title: "捐贈資金",
  },
];
const DonationLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <FrontLayout
      includeTitle={true}
      title="愛心捐贈"
      description="您的愛心捐贈可以支持我們為流浪動物提供必要的資源，例如食物、醫療照護和避難所。小小的捐助可以帶來巨大的改變，讓更多動物得到幫助與關愛。立即加入我們的行列，用行動傳遞溫暖，拯救更多生命！"
    >
      <div className="w-1/2 md:w-4/12 mx-auto grid grid-cols-2 gap-4">
        {donation_nav.map(({ id, href, title }) => {
          return (
            <Link
              href={href}
              key={id}
              className={`${
                href === pathname
                  ? "bg-dark text-white font-bold"
                  : "bg-white text-dark border border-dark font-medium"
              } rounded-full py-1 px-2 text-center`}
            >
              {title}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col gap-[40px] md:gap-[80px]">
        <div className="">{children}</div>
        <div className="grid grid-rows-[1fr_0.5fr_0.5fr] grid-cols-2 gap-4 md:grid-rows-2 md:grid-cols-4">
          <Image
            src={Donation1}
            width={1920}
            height={2560}
            className="w-full h-full object-cover col-span-2 md:row-span-2 md:col-start-1"
            alt="donation-1"
          ></Image>
          <Image
            src={Donation2}
            width={450}
            height={300}
            className="w-full h-full object-cover row-start-2 col-start-1 md:row-start-1 md:col-start-3"
            alt="donation-2"
          ></Image>
          <Image
            src={Donation3}
            width={450}
            height={300}
            className="w-full h-full object-cover row-start-3 col-start-1 md:row-start-2 md:col-start-3"
            alt="donation-3"
          ></Image>
          <Image
            src={Donation4}
            width={1920}
            height={2560}
            className="w-full h-full object-cover col-start-2 row-start-2 row-span-2 md:row-start-1 md:col-start-4"
            alt="donation-4"
          ></Image>
        </div>
      </div>
    </FrontLayout>
  );
};

export default DonationLayout;
