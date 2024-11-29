import { useFormContext } from "@/context/FormContext";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultTextarea from "@/components/common/DefaultTextarea";
import DefaultTrueFalse from "@/components/common/DefalutTrueFalse";
import { ChangeEvent } from "react";
const AdoptionStep3 = () => {
  const { inputValue, handleFormInputChange, handleTrueFalseChange } =
    useFormContext();
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
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
      </div>
      <DefaultTextarea
        label="為何想要領養狗狗?"
        id="reason"
        name="reason"
        placeholder="請簡寫內容"
        inputValue={inputValue.reason}
        onInputChange={(e) => handleFormInputChange(e)}
      />
    </>
  );
};

export default AdoptionStep3;
