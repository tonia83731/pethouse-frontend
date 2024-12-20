import { GetServerSideProps } from "next";
import { FormEvent, useState } from "react";
import { getCookie } from "cookies-next";
import { authFetch, clientFetch } from "@/lib/fetch";
import { OptionType } from "@/components/common/input/DefaultSelect";
import { FurkidProps } from "@/pages/adoption";
import { PartnerProps } from "@/components/home-section/PartnerSection";

import DashboardLayout from "@/components/common/layout/DashboardLayout";
import FurkidForm, {
  AdoptionInput,
} from "@/components/dashbord-forms/FurkidForm";
import FurkidTable from "@/components/dashboard-table/FurkidTable";
import { toast } from "react-toastify";

type DashboardFurkidProps = FurkidProps & {
  adoptionNumber: number;
};

const FurkidDashboardPage = ({
  furkids,
  partners,
}: {
  furkids: DashboardFurkidProps[];
  partners: OptionType[];
}) => {
  const token = getCookie("staffToken");

  const [furkidData, setFurkidData] = useState(furkids);
  const [isShowed, setIsShowed] = useState(false);
  const [inputValue, setInputValue] = useState<AdoptionInput>({
    id: null,
    name: "",
    gender: null,
    animal: "Dog",
    size: "S",
    age: "Child",
    isNeutered: false,
    isVaccinated: false,
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
      gender: null,
      animal: "Dog",
      size: "S",
      age: "Child",
      isNeutered: false,
      isVaccinated: false,
      location: {
        label: "",
        value: null,
      },
    });
    setType(null);
  };
  const handleEditClick = (id: number) => {
    const furkid = furkidData.find(
      (item: DashboardFurkidProps) => item.id === id
    );
    if (!furkid) return;
    const location = partners.find(
      (partner: OptionType) => partner.value === furkid?.partnerId
    );
    setInputValue({
      id,
      name: furkid?.name,
      gender: furkid?.name,
      animal: furkid?.animal,
      size: furkid?.size,
      age: furkid?.age,
      isNeutered: furkid?.isNeutured,
      isVaccinated: furkid?.isVaccinated,
      location: location || {
        label: "",
        value: null,
      },
    });
    setIsShowed(true);
    setType("edit");
  };
  const handleDeleteClick = async (id: number) => {
    console.log(id);
  };
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError({
      status: false,
      message: "",
    });

    const {
      id,
      name,
      gender,
      animal,
      size,
      age,
      isNeutered,
      isVaccinated,
      location,
    } = inputValue;

    if (!name) {
      setIsError({
        status: true,
        message: "請輸入毛孩名稱",
      });
      return;
    }
    if (!location.value) {
      setIsError({
        status: true,
        message: "請選擇毛孩所在地",
      });
      return;
    }

    const body = {
      name,
      gender,
      animal,
      size,
      age,
      partnerId: location.value,
      isNeutered,
      isVaccinated,
    };

    const method = type === "create" ? "POST" : "PUT";
    const url = type === "create" ? "/admin/furkids" : `/admmin/furkids/${id}`;
    console.log(body);
    try {
      const response = await clientFetch(url, {
        method,
        body,
        token,
      });
      if (!response.success) {
        toast.error(`${type === "create" ? "新增" : "修改"}毛孩資料失敗!`);
        return;
      }
      if (response.success) {
        const success_data = response.data;
        const partner = partners.find(
          (partner) => partner.value === success_data.partnerId
        );
        if (type === "create") {
          const new_furkid = {
            ...success_data,
            partnerName: partner && partner.label.split(" ")[1],
            adoptionNumber: 0,
          };
          setFurkidData([...furkidData, new_furkid]);
        } else {
          const updated_furkid = {
            ...success_data,
            partnerName: partner && partner.label.split(" ")[1],
          };
          setFurkidData((prev) =>
            prev.map((furkid) => (furkid.id === id ? updated_furkid : furkid))
          );
        }
        toast.success(`${type === "create" ? "新增" : "修改"}毛孩資料成功!`);
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

  return (
    <DashboardLayout title="毛孩列表">
      <FurkidForm
        partners={partners}
        type={type}
        inputValue={inputValue}
        isShowed={isShowed}
        isError={isError}
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
        onCheckboxChange={(e, type) => {
          setInputValue((prev: any) => ({
            ...prev,
            [type]: e.target.checked,
          }));
        }}
        onRadioChange={(name, option) => {
          setInputValue((prev: any) => ({
            ...prev,
            [name]: option,
          }));
        }}
        onSelectChange={(option) => {
          setInputValue((prev) => ({ ...prev, location: option }));
        }}
        onFormSubmit={handleFormSubmit}
      />
      <FurkidTable
        tableData={furkidData}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </DashboardLayout>
  );
};

export default FurkidDashboardPage;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const [furkid_res, partner_res] = await Promise.all([
      authFetch(context, "/admin/furkids", "GET"),
      authFetch(context, "/admin/partners", "GET"),
    ]);

    if (!furkid_res.success || !partner_res.success) {
      return {
        props: {
          furkids: [],
          partners: [],
        },
      };
    }

    // console.log(furkid_res);

    const partners = partner_res.data.map((partner: PartnerProps) => ({
      label: partner.name,
      value: partner.id,
    }));

    return {
      props: {
        furkids: furkid_res.data,
        partners,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        furkids: [],
        partners: [],
      },
    };
  }
};
