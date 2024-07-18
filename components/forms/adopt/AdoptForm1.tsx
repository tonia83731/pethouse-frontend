import DefaultInput from "../../common/input/DefaultInput";
import DefaultSelect from "../../common/input/DefaultSelect";
import { useRef } from "react";
import { incomes } from "@/data/adoptSelectOptions";
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
          label="領養人姓名"
          inputRef={nameRef}
          placeholder="請輸入姓名"
          extraClass="col-span-2"
        />
        <DefaultInput
          id="adopt-age"
          type="number"
          name="age"
          label="領養人年齡"
          inputRef={ageRef}
          placeholder="請輸入年齡"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-phone"
          name="phone"
          label="領養人電話"
          inputRef={phoneRef}
          placeholder="請輸入電話"
        />
        <DefaultInput
          id="adopt-email"
          type="email"
          name="email"
          label="領養人Email"
          inputRef={emailRef}
          placeholder="請輸入Email"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-occupation"
          name="occupation"
          label="領養人職業"
          inputRef={occupationRef}
          placeholder="請輸入職業"
        />
        <DefaultSelect
          selectRef={incomeRef}
          options={incomes}
          id="occupation-income"
          label="領養人收入"
        />
      </div>
    </div>
  );
};

export default AdoptForm1;
