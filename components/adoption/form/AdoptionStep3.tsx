import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedFormInput } from "@/slices/adoptionSlice";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultTextarea from "@/components/common/input/DefaultTextarea";
import DefaultTrueFalse from "@/components/common/input/DefalutTrueFalse";
const AdoptionStep3 = () => {
  const inputValue = useSelector(
    (state: RootState) => state.adoption.inputValue
  );
  const dispatch = useDispatch();
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updatedFormInput({ name, value }));
  };
  const handleTrueFalseChange = (name: string, value: boolean) => {
    dispatch(updatedFormInput({ name, value }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultTrueFalse
          title="是否養過寵物?"
          name="petexperience"
          inputValue={inputValue.petexperience}
          onRadioChange={handleTrueFalseChange}
        />
        <DefaultTrueFalse
          title="是否教過任何技能或指令?"
          name="skills"
          inputValue={inputValue.skills}
          onRadioChange={handleTrueFalseChange}
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultTrueFalse
          title="是否願意接受指導?"
          name="accepttraining"
          inputValue={inputValue.accepttraining}
          onRadioChange={handleTrueFalseChange}
        />
        <DefaultInput
          label="每天獨處時間(時)"
          type="number"
          id="alone"
          name="alone"
          placeholder="請輸入每天獨處時間(時)"
          inputValue={inputValue.alone}
          onInputChange={handleInputChange}
        />
      </div>
      <DefaultTextarea
        label="為何想要領養狗狗?"
        id="reason"
        name="reason"
        placeholder="請簡寫內容"
        inputValue={inputValue.reason}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default AdoptionStep3;
