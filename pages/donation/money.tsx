import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedFormInput } from "@/slices/moneySlice";
import DonationLayout from "@/components/common/layout/DonationLayout";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultCheckbox from "@/components/common/input/DefaultCheckbox";

const MoneyPage = () => {
  const dispatch = useDispatch();
  const { donateValue } = useSelector((state: RootState) => state.money);

  const handleInputChange = (name: string, value: any) => {
    dispatch(updatedFormInput({ name, value }));
  };

  return (
    <DonationLayout>
      <form className="flex flex-col gap-4">
        <DefaultInput
          label="姓名"
          id="name"
          name="name"
          placeholder="請輸入姓名"
          inputValue={donateValue.name}
          onInputChange={handleInputChange}
        />
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            label="電話"
            type="tel"
            id="phone"
            name="phone"
            placeholder="請輸入電話"
            inputValue={donateValue.phone}
            onInputChange={handleInputChange}
          />
          <DefaultInput
            label="電子郵件"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入電子郵件"
            inputValue={donateValue.email}
            onInputChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            label="捐贈金額"
            type="number"
            id="amount"
            name="amount"
            placeholder="請輸入捐贈金額"
            inputValue={donateValue.amount}
            onInputChange={handleInputChange}
          />
          <DefaultInput
            label="統一編號"
            id="idNumber"
            name="idNumber"
            placeholder="請輸入統一編號"
            inputValue={donateValue.idNumber}
            onInputChange={handleInputChange}
          />
        </div>
        <DefaultCheckbox
          id="invoice"
          name="invoice"
          inputValue={donateValue.invoice}
          label="是否需要統一發票?"
          onCheckboxChange={handleInputChange}
        />
        <div className="w-full flex justify-end">
          <button className="font-medium py-1 px-6 bg-wine text-white rounded-lg hover:drop-shadow-lg">
            前往付款
          </button>
        </div>
      </form>
    </DonationLayout>
  );
};

export default MoneyPage;
