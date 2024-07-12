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
          label="House Type"
        />
        <DefaultSelect
          selectRef={livingRef}
          options={livingareaData}
          id="living-area"
          label="Living Area"
        />
      </div>
      <DefaultMultipleSelect
        selectRef={activityAreaRef}
        options={activityareaData}
        id="activity-area"
        label="Activity Area"
      />
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="adopt-family-number"
          name="family-number"
          type="number"
          label="Family Member Numbers"
          inputRef={numberFamilyRef}
          placeholder="Enter family numbers here"
        />
        <DefaultSelect
          selectRef={agreeRef}
          options={yes_no_options}
          id="adopt-agree"
          label="oes everyone agree on a pet?"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultSelect
          selectRef={allergicRef}
          options={yes_no_options}
          id="adopt-allergic"
          label="Any family members allergic to dogs?"
        />
        <DefaultSelect
          selectRef={otherpetRef}
          options={yes_no_options}
          id="adopt-otherpet"
          label="Any other pets?"
        />
      </div>
    </div>
  );
};

export default AdoptForm2;
