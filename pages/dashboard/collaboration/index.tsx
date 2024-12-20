import { GetServerSideProps } from "next";
import { authFetch } from "@/lib/fetch";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import CollaborationForm from "@/components/dashbord-forms/CollaborationForm";
import { MdPhoneAndroid } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IoTimeOutline } from "react-icons/io5";
const CollaborationPage = ({ partners }: any) => {
  const handleEditClick = (id: number | null) => {
    console.log(id);
  };
  const handleDeleteClick = (id: number | null) => {
    console.log(id);
  };
  return (
    <DashboardLayout title="合作夥伴">
      <CollaborationForm />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partners.map(
          ({
            id,
            name,
            city,
            address,
            phone,
            email,
            weekStart,
            weekEnd,
            openingTime,
            closingTime,
          }: any) => {
            return (
              <div
                key={id}
                className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-4"
              >
                <h5 className="font-bold text-lg">{name}</h5>
                <div className="text-sm">
                  {city} {address}
                </div>
                <div className="text-sm flex flex-col gap-1">
                  <div className="flex flex-row gap-2 items-center">
                    <IoTimeOutline />
                    <div className="flex flex-row gap-2">
                      <div className="">
                        {weekStart} 至 {weekEnd}
                      </div>
                      <div className="">
                        {openingTime}~{closingTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdPhoneAndroid />
                    <a
                      href={`tel:${phone}`}
                      className="hover:underline hover:underline-offset-2"
                    >
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <HiOutlineMailOpen />
                    <a
                      href={`mailto:${email}`}
                      className="hover:underline hover:underline-offset-2"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleDeleteClick(id)}
                    className="bg-taro text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md"
                  >
                    刪除
                  </button>
                  <button
                    onClick={() => handleEditClick(id)}
                    className="bg-skin text-dark w-full px-4 py-1.5 rounded-lg hover:shadow-md"
                  >
                    修改
                  </button>
                </div>
              </div>
            );
          }
        )}
      </div>
    </DashboardLayout>
  );
};

export default CollaborationPage;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const response = await authFetch(context, "/admin/partners", "GET");

    if (!response.success) {
      return {
        props: {
          partners: [],
        },
      };
    }

    const converTime = (time: string) => {
      const date = new Date(`1970-01-01T${time}Z`);
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      return `${hours}:${minutes}`;
    };

    const partners = response.data.map((partner: any) => ({
      ...partner,
      openingTime: converTime(partner.openingTime),
      closingTime: converTime(partner.closingTime),
    }));

    return {
      props: {
        partners,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        partners: [],
      },
    };
  }
};
