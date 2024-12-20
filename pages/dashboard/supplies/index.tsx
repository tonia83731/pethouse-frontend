import { FormEvent, useState } from "react";
import { GetServerSideProps } from "next";
import { authFetch, clientFetch } from "@/lib/fetch";
import { SuppliesProps } from "@/pages/donation/supplies";
import { PartnerProps } from "@/components/home-section/PartnerSection";
import { OptionType } from "@/components/common/input/DefaultSelect";
import DashboardLayout from "@/components/common/layout/DashboardLayout";
import SuppliesForm from "@/components/dashbord-forms/SuppliesForm";
import SuppliesTable from "@/components/dashboard-table/SuppliesTable";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

export type SuppliesInput = {
  id: number | null;
  name: string;
  number: number;
  intro: string;
  location: OptionType;
};

const SuppliesPage = ({
  supplies,
  partners,
}: {
  supplies: SuppliesProps[];
  partners: OptionType[];
}) => {
  // console.log(supplies);
  const token = getCookie("staffToken");
  const [supplyData, setSupplyData] = useState(supplies);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<SuppliesInput>({
    id: null,
    name: "",
    number: 1,
    intro: "",
    location: {
      label: "",
      value: null,
    },
  });
  const [type, setType] = useState<"create" | "edit" | null>(null);
  const [isError, setIsError] = useState({
    status: false,
    message: "",
  });
  const initializedData = () => {
    setInputValue({
      id: null,
      name: "",
      number: 1,
      intro: "",
      location: {
        label: "",
        value: null,
      },
    });
    setType(null);
    setIsError({
      status: false,
      message: "",
    });
  };

  const handleEditClick = (id: number) => {
    const supply = supplyData.find((item: SuppliesProps) => item.id === id);
    if (!supply) return;

    const location = partners.find(
      (partner: OptionType) => partner.value === supply?.partnerId
    );
    setInputValue({
      id,
      name: supply?.supplyName,
      number: supply?.number,
      intro: supply?.introduction,
      location: location || {
        label: "",
        value: null,
      },
    });
    setIsShowed(true);
    setType("edit");
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError({
      status: false,
      message: "",
    });

    const { name, number, intro, location } = inputValue;
    if (!name || !intro) {
      setIsError({
        status: true,
        message: "請輸入所需物資名稱與簡介",
      });
      return;
    }
    if (number <= 0) {
      setIsError({
        status: true,
        message: "所需數量需大於0",
      });
      return;
    }
    if (!location.value) {
      setIsError({
        status: true,
        message: "請選擇所需夥伴",
      });
      return;
    }

    const body = {
      partnerId: location?.value,
      supplyName: name,
      number,
      introduction: intro,
    };
    const url =
      type === "create"
        ? "/admin/supplies"
        : `/admin/supplies/${inputValue?.id}`;
    const method = type === "create" ? "POST" : "PUT";

    try {
      const response = await clientFetch(url, {
        method,
        body,
        token,
      });

      if (!response.success) {
        toast.error(`${type === "create" ? "新增" : "修改"}所需物資失敗!`);
        return;
      }
      if (response.success) {
        const success_data = response.data;
        const partner = partners.find(
          (partner) => partner.value === success_data.partnerId
        );
        if (type === "create") {
          const new_supply = {
            ...success_data,
            partnerName: partner && partner.label.split(" ")[1],
          };
          setSupplyData([...supplyData, new_supply]);
        } else {
          const updated_supply = {
            ...success_data,
            partnerName: partner && partner.label.split(" ")[1],
          };
          setSupplyData((prev) =>
            prev.map((supply) =>
              supply.id === inputValue.id ? updated_supply : supply
            )
          );
        }
        toast.success(`${type === "create" ? "新增" : "修改"}所需物資成功!`);
        initializedData();
        setIsShowed(false);
      }
    } catch (error) {
      setIsError({
        status: true,
        message: `${error}`,
      });
    }
  };
  const handleDeleteClick = async (id: number) => {
    // console.log(id);
    try {
      const response = await clientFetch(`/admin/supplies/${id}`, {
        method: "DELETE",
        token,
      });

      if (response.success) {
        const updated_supplies = supplyData.filter((item) => item.id !== id);
        setSupplyData(updated_supplies);
        toast.success("所需物資刪除成功!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout title="尋找物資">
      <SuppliesForm
        partners={partners}
        type={type}
        isShowed={isShowed}
        isError={isError}
        inputValue={inputValue}
        onShowClick={() => {
          if (isShowed) {
            initializedData();
          } else {
            setType("create");
          }
          setIsShowed(!isShowed);
        }}
        onFormCancel={() => {
          setIsShowed(false);
          initializedData();
        }}
        onInputChange={(e) =>
          setInputValue((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        onSelectChange={(option) => {
          setInputValue((prev) => ({ ...prev, location: option }));
        }}
        onFormSubmit={handleFormSubmit}
      />
      <SuppliesTable
        tableData={supplyData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </DashboardLayout>
  );
};

export default SuppliesPage;
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [supplies_res, partner_res] = await Promise.all([
      authFetch(context, "/admin/supplies", "GET"),
      authFetch(context, "/admin/partners", "GET"),
    ]);

    if (!supplies_res.success || !partner_res.success) {
      return {
        props: {
          supplies: [],
          partners: [],
        },
      };
    }

    const partners = partner_res.data.map((partner: PartnerProps) => ({
      label: partner.name,
      value: partner.id,
    }));

    const supplies = supplies_res.data.map((supply: SuppliesProps) => {
      const partnerName = supply.partnerName.split(" ")[1];
      return {
        ...supply,
        partnerName,
      };
    });

    return {
      props: {
        supplies,
        partners,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        supplies: [],
      },
    };
  }
};
