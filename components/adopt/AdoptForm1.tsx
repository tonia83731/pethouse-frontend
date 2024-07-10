import DefaultInput from "../common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import { useRef } from "react";
export const incomes = [
  { label: "0 - 250K", value: "low" },
  { label: "250K - 500K", value: "medium-low" },
  { label: "500K - 750K", value: "medium" },
  { label: "750K - 1M", value: "medium-high" },
  { label: "1M or above", value: "high" },
];
const AdoptForm1 = () => {
  const nameRef = useRef(null);
  const ageRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const occupationRef = useRef(null);
  const incomeRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <DefaultInput
          id="adopt-name"
          name="name"
          label="Name"
          inputRef={nameRef}
          placeholder="Enter name here"
          extraClass="col-span-2"
        />
        <DefaultInput
          id="adopt-age"
          type="number"
          name="age"
          label="Age"
          inputRef={ageRef}
          placeholder="Enter email here"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-phone"
          name="phone"
          label="Phone"
          inputRef={phoneRef}
          placeholder="Enter phone here"
        />
        <DefaultInput
          id="adopt-email"
          type="email"
          name="email"
          label="Email"
          inputRef={emailRef}
          placeholder="Enter email here"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-occupation"
          name="occupation"
          label="Occupation"
          inputRef={occupationRef}
          placeholder="Enter occupatoin here"
        />
        <DefaultSelect
          selectRef={incomeRef}
          options={incomes}
          id="occupation-income"
          label="Income"
        />
      </div>
    </div>
  );
};

export default AdoptForm1;
