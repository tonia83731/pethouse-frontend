import { useState, ChangeEvent } from "react";
import DonationLayout from "@/components/common/layout/DonationLayout";
import DefaultInput from "@/components/common/input/DefaultInput";

const MoneyPage = () => {
  const [donateForm, setDonateForm] = useState({
    name: "",
    phone: "",
    email: "",
    amount: 0,
    idNumber: "",
    invoice: false,
  });
  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDonateForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <DonationLayout>
      <form className="flex flex-col gap-4">
        <DefaultInput
          label="姓名"
          id="name"
          name="name"
          placeholder="請輸入姓名"
          inputValue={donateForm.name}
          onInputChange={handleFormInputChange}
        />
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            label="電話"
            type="tel"
            id="phone"
            name="phone"
            placeholder="請輸入電話"
            inputValue={donateForm.phone}
            onInputChange={handleFormInputChange}
          />
          <DefaultInput
            label="電子郵件"
            type="email"
            id="email"
            name="email"
            placeholder="請輸入電子郵件"
            inputValue={donateForm.email}
            onInputChange={handleFormInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            label="捐贈金額"
            type="number"
            id="amount"
            name="amount"
            placeholder="請輸入捐贈金額"
            inputValue={donateForm.amount}
            onInputChange={handleFormInputChange}
          />
          <DefaultInput
            label="統一編號"
            id="idNumber"
            name="idNumber"
            placeholder="請輸入統一編號"
            inputValue={donateForm.idNumber}
            onInputChange={handleFormInputChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="invoice"
            name="invoice"
            checked={donateForm.invoice}
            className="w-4 h-5 accent-wine"
            onChange={() => {
              setDonateForm((prev) => ({ ...prev, invoice: !prev.invoice }));
            }}
          />
          <label htmlFor="invoice" className="">
            是否需要統一發票?
          </label>
        </div>
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
