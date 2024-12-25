import { GetServerSideProps } from "next";
import { useState } from "react";
import Select from "react-select";
import { clientFetch, serverFetch } from "@/lib/fetch";
import { SELECTSTYLES } from "@/constants/select-style";
import { SelectOptionType } from "@/types/default";
import DonationLayout from "@/components/common/layout/DonationLayout";
import DonationTable from "@/components/donation-page/DonationTable";

export type SuppliesProps = {
  id: number;
  partnerId: number;
  supplyName: string;
  number: number;
  introduction: string;
  partner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
};

interface SuppliesPageProps {
  supplies: SuppliesProps[];
  partners: SelectOptionType[];
}

const SuppliesPage = ({ supplies, partners }: SuppliesPageProps) => {
  const [category, setCategory] = useState(partners[0]);
  const [supplyData, setSupplyData] = useState(supplies);
  return (
    <DonationLayout>
      <div className="flex flex-col gap-4">
        <div className="w-full md:w-1/3">
          <Select
            options={partners}
            defaultValue={category}
            styles={SELECTSTYLES}
            onChange={async (newValue) => {
              const userId = newValue?.value;
              if (category.value === userId) return;

              if (!userId) {
                setSupplyData(supplies);
                return;
              }

              try {
                const response = await clientFetch(
                  `/supplies?&userId=${userId}`
                );

                if (!response.success) {
                  setSupplyData([]);
                  return;
                }

                if (response.success) {
                  const data = response.data;
                  setSupplyData(data);
                  setCategory(newValue || partners[0]);
                }
              } catch (error) {
                console.log(error);
              }
            }}
          />
        </div>
        <DonationTable tableData={supplyData} />
      </div>
    </DonationLayout>
  );
};

export default SuppliesPage;
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // const response = await serverFetch("/supplies");
    const [supply_res, partner_res] = await Promise.all([
      serverFetch("/supplies"),
      serverFetch("/partners"),
    ]);

    if (!supply_res.success || !partner_res.success)
      return {
        props: {
          supplies: [],
          partners: [],
        },
      };
    const partners = partner_res?.data.map((item: any) => ({
      value: item.id,
      label: item.name.split(" ")[1],
    }));

    return {
      props: {
        supplies: supply_res.data,
        partners: [
          {
            value: null,
            label: "全部分店",
          },
          ...partners,
        ],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        supplies: [],
        partners: [],
      },
    };
  }
};
