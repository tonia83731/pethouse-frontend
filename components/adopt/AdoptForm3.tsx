import DefaultInput from "../common/DefaultInput";
import DefaultSelect from "../common/DefaultSelect";
import DefaultTextarea from "../common/DefaultTextarea";
import { useRef } from "react";
import { yes_no_options } from "@/data/adoptSelectOptions";
const AdoptForm3 = () => {
  const experienceRef = useRef(null);
  const trainRef = useRef(null);
  const guideRef = useRef(null);
  const aloneRef = useRef(null);
  const commentRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <DefaultSelect
          selectRef={experienceRef}
          options={yes_no_options}
          id="adopt-pet-experience"
          label="Any pet experiance?"
        />
        <DefaultSelect
          selectRef={trainRef}
          options={yes_no_options}
          id="adopt-train-experience"
          label="Any pet training experiance?"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <DefaultSelect
          selectRef={guideRef}
          options={yes_no_options}
          id="adopt-guidiance"
          label="Do you accept any guidiance?"
        />
        <DefaultInput
          id="adopt-alone"
          type="number"
          name="alone"
          label="Hours pet will be alone?"
          inputRef={aloneRef}
          placeholder="Enter hours here"
        />
      </div>
      <DefaultTextarea
        id="adopt-comment"
        name="comment"
        label="Comment"
        inputRef={commentRef}
        placeholder="Enter more comment here"
      />
    </div>
  );
};

export default AdoptForm3;
