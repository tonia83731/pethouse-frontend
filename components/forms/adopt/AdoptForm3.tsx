import DefaultInput from "../../common/input/DefaultInput";
import DefaultSelect from "../../common/input/DefaultSelect";
import DefaultTextarea from "../../common/input/DefaultTextarea";
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
          label="是否養過寵物?"
        />
        <DefaultSelect
          selectRef={trainRef}
          options={yes_no_options}
          id="adopt-train-experience"
          label="是否教過任何技能或指令?"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <DefaultSelect
          selectRef={guideRef}
          options={yes_no_options}
          id="adopt-guidiance"
          label="是否願意接受指導?"
        />
        <DefaultInput
          id="adopt-alone"
          type="number"
          name="alone"
          label="狗每天需要獨處幾個小時?"
          inputRef={aloneRef}
          placeholder="請填寫數字(小時)"
        />
      </div>
      <DefaultTextarea
        id="adopt-comment"
        name="comment"
        label="為何想要領養狗狗?"
        inputRef={commentRef}
        placeholder="請簡寫內容"
      />
    </div>
  );
};

export default AdoptForm3;
