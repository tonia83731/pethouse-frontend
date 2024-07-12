"use client";
import { useRef } from "react";
import DefaultInput from "../common/input/DefaultInput";
import DefaultSelect from "../common/input/DefaultSelect";
import { yes_no_options } from "@/data/adoptSelectOptions";
const genderOptions = [
  { label: "Mr", value: "Mr" },
  { label: "Miss", value: "Miss" },
  { label: "Mrs", value: "Mrs" },
  { label: "Others", value: "Others" },
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
          label="Donor Name"
          inputRef={nameRef}
          extraClass="col-span-2"
          placeholder="Enter name here"
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
          label="Donor Phone"
          inputRef={phoneRef}
          placeholder="Enter phone here"
        />
        <DefaultInput
          id="dm-email"
          type="email"
          name="email"
          label="Donor Email"
          inputRef={emailRef}
          placeholder="Enter email here"
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 items-center">
        <DefaultInput
          id="dm-amount"
          type="number"
          name="amount"
          label="Donate Amount"
          inputRef={amountRef}
          placeholder="Enter amount here"
          extraClass="w-full"
        />
        <div className="grid grid-cols-2 gap-2 items-end w-full">
          <DefaultInput
            id="dm-gui"
            name="gui"
            label="GUI"
            inputRef={guiRef}
            placeholder="Enter GUI here"
          />
          <DefaultSelect
            selectRef={invoiceRef}
            options={yes_no_options}
            id="dm-invoice"
            label="Need Invoice?"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DonateMoneyForm;
