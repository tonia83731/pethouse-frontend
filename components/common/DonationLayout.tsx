import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import FrontLayout from "./FrontLayout";
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
      <div className="w-4/12 mx-auto grid grid-cols-2 gap-4">
        {donation_nav.map(({ id, href, title }) => {
          return (
            <Link
              href={href}
              key={id}
              className={`${
                href === pathname
                  ? "bg-dark text-white font-bold"
                  : "bg-white text-dark border border-dark font-medium"
              } rounded-full py-1 text-center`}
            >
              {title}
            </Link>
          );
        })}
      </div>
      <div className="">{children}</div>
    </FrontLayout>
  );
};

export default DonationLayout;
