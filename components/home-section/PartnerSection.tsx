import { convertMinToTime } from "@/helpers/time-helpers";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdPhoneAndroid } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
export interface PartnerProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  weekStart: number;
  weekEnd: number;
  openingTime: number;
  closingTime: number;
  address: string;
}

const daysOfWeek = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];

interface PartnerSectionInterface {
  partners: PartnerProps[];
}
const PartnerSection = ({ partners }: PartnerSectionInterface) => {
  return (
    <section
      className="bg-partner-mobile md:bg-partner-desktop bg-no-repeat py-8 h-[560px] bg-cover bg-bottom"
      id="partner"
    >
      <div className="w-10/12 mx-auto flex flex-col gap-6">
        <h1 className="font-bold text-2xl md:text-4xl">毛孩夥伴</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 h-[380px] overflow-y-auto overflow-x-hidden scrolled pr-4">
          {partners.map(
            ({
              id,
              name,
              email,
              phone,
              weekStart,
              weekEnd,
              openingTime,
              closingTime,
              address,
            }: PartnerProps) => {
              const opening = convertMinToTime(openingTime);
              const closing = convertMinToTime(closingTime);
              return (
                <div
                  className="border border-dark-40 rounded-lg bg-white-40 p-4 flex flex-col gap-6"
                  key={id}
                >
                  <h5 className="text-lg font-bold">{name}</h5>
                  <div className="text-sm flex flex-col gap-1 text-dark-60">
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-2 hover:underline hover:underline-offset-2"
                    >
                      <MdPhoneAndroid />
                      <p className="">{phone}</p>
                    </a>
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 hover:underline hover:underline-offset-2"
                    >
                      <HiOutlineMailOpen />
                      <p className="">{email}</p>
                    </a>
                    <div className="flex items-center gap-2">
                      <GrLocation />
                      <p className="">{address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <IoIosTimer />
                      <p className="">
                        {daysOfWeek[weekStart]}至{daysOfWeek[weekEnd]} {opening}
                        ~{closing}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
// https://www.pinterest.com/pin/534169205821091323/
