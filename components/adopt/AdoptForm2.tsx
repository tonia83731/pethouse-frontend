import DefaultInput from "../common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import DefaultMultipleSelect from "../common/DefaultMultipleSelect";
import { useRef } from "react";
import { yes_no_options } from "@/app/donate/money/page";
export const housetypeData = [
  {
    label: "Elevator Building (6 floors and above)",
    value: "Elevator Building",
  },
  { label: "Apartment (5 floors and above, no elevator)", value: "Apartment" },
  { label: "Townhouse, Villa", value: "Townhouse" },
  {
    label: "Single-story House",
    value: "Single-story House",
  },
  {
    label: "General Constructed House (e.g., Tin House, Container House)",
    value: "General Constructed House",
  },
];
export const livingareaData = [
  { label: "Urban", value: "Urban" },
  { label: "Suburban", value: "Suburban" },
  { label: "Rural", value: "Rural" },
  { label: "Other", value: "Other" },
];
export const activityareaData = [
  { label: "Yard or Backyard", value: "yard_or_backyard" },
  { label: "Nearby Park", value: "nearby_park" },
  { label: "Home with Swimming Pool", value: "home_with_pool" },
  { label: "Balcony", value: "balcony" },
  { label: "Other", value: "other" },
];
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
