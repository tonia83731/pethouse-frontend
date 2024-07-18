"use client";
import { useRef } from "react";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import { yes_no_options } from "@/data/adoptSelectOptions";
const genderOptions = [
  { label: "先生", value: "M" },
  { label: "女士", value: "F" },
  { label: "其他", value: "Others" },
];
const DonateMoneyForm = () => {
  const nameRef = useRef(null);
  const genderRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const amountRef = useRef(null);
  const guiRef = useRef(null);
  const invoiceRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 items-end">
        <DefaultInput
          id="dm-name"
          name="name"
          label="捐款人"
          inputRef={nameRef}
          extraClass="col-span-2"
          placeholder="請輸入姓名"
        />
        <DefaultSelect
          selectRef={genderRef}
          options={genderOptions}
          id="dm-gender"
          label="Title"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="dm-phone"
          name="phone"
          label="捐款人電話"
          inputRef={phoneRef}
          placeholder="請輸入電話"
        />
        <DefaultInput
          id="dm-email"
          type="email"
          name="email"
          label="捐款人Email"
          inputRef={emailRef}
          placeholder="請輸入email"
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 items-center">
        <DefaultInput
          id="dm-amount"
          type="number"
          name="amount"
          label="捐款金額"
          inputRef={amountRef}
          placeholder="請輸入捐款金額"
          extraClass="w-full"
        />
        <div className="grid grid-cols-2 gap-2 items-end w-full">
          <DefaultInput
            id="dm-gui"
            name="gui"
            label="統一編號"
            inputRef={guiRef}
            placeholder="請輸入統一編號"
          />
          <DefaultSelect
            selectRef={invoiceRef}
            options={yes_no_options}
            id="dm-invoice"
            label="需要發票嗎?"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          捐贈
        </button>
      </div>
    </div>
  );
};

export default DonateMoneyForm;
