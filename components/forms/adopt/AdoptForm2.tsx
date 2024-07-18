import DefaultInput from "../../common/input/DefaultInput";
import DefaultSelect from "../../common/input/DefaultSelect";
import DefaultMultipleSelect from "../../common/input/DefaultMultipleSelect";
import { useRef } from "react";
import { yes_no_options } from "@/data/adoptSelectOptions";
import {
  housetypeData,
  livingareaData,
  activityareaData,
} from "@/data/adoptSelectOptions";

const AdoptForm2 = () => {
  const houseTypeRef = useRef(null);
  const livingRef = useRef(null);
  const activityAreaRef = useRef(null);
  const numberFamilyRef = useRef(null);
  const agreeRef = useRef(null);
  const allergicRef = useRef(null);
  const otherpetRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:grid-cols-2 gap-4">
        <DefaultSelect
          selectRef={houseTypeRef}
          options={housetypeData}
          id="house-type"
          label="住宅類型"
        />
        <DefaultSelect
          selectRef={livingRef}
          options={livingareaData}
          id="living-area"
          label="居住地區"
        />
      </div>
      <DefaultMultipleSelect
        selectRef={activityAreaRef}
        options={activityareaData}
        id="activity-area"
        label="可以去的戶外區域"
      />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-family-number"
          name="family-number"
          type="number"
          label="住家人數"
          inputRef={numberFamilyRef}
          placeholder="請輸入住家人數"
        />
        <DefaultSelect
          selectRef={agreeRef}
          options={yes_no_options}
          id="adopt-agree"
          label="所有成員是否都同意養狗?"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultSelect
          selectRef={allergicRef}
          options={yes_no_options}
          id="adopt-allergic"
          label="有沒有任何家人對狗狗過敏?"
        />
        <DefaultSelect
          selectRef={otherpetRef}
          options={yes_no_options}
          id="adopt-otherpet"
          label="是否有其他寵物?"
        />
      </div>
    </div>
  );
};

export default AdoptForm2;
