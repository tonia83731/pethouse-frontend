import { useFormContext } from "@/context/FormContext";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultSelect from "@/components/common/DefaultSelect";
import DefaultCheckbox from "@/components/common/DefaultCheckbox";
import DefaultRadio from "@/components/common/DefaultRadio";
import DefaultTrueFalse from "@/components/common/DefalutTrueFalse";
import { housetype_options, livingarea_options } from "@/datas/adoption-option";
import { ChangeEvent } from "react";
const AdoptionStep2 = () => {
  const {
    inputValue,
    handleFormInputChange,
    handleCheckboxChange,
    handleTrueFalseChange,
    handleSelectChange,
  } = useFormContext();
  return (
    <>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultSelect
          title="住宅類型"
          options={housetype_options}
          placeholder="請輸入住宅類型"
          name="housetype"
          // inputValue={getTwCity()[0]}
          onSelectChange={(value) => handleSelectChange("housetype", value)}
        />
        <DefaultSelect
          title="居住地區"
          options={livingarea_options}
          placeholder="請輸入居住地區"
          name="livingarea"
          // inputValue={getTwCity()[0]}
          onSelectChange={(value) => handleSelectChange("livingarea", value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-medium">可以帶狗去的戶外區域</div>
        {/* <DefaultCheckbox 
          label=""
        /> */}
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          label="住家人數"
          type="number"
          id="familynumber"
          name="familynumber"
          placeholder="請輸入住家人數"
          inputValue={inputValue.familynumber}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
        <DefaultTrueFalse
          title="所有成員是否都同意養狗?"
          name="agreement"
          inputValue={inputValue.agreement}
          onRadioChange={handleTrueFalseChange}
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultTrueFalse
          title="有沒有任何家人對狗狗過敏?"
          name="allergic"
          inputValue={inputValue.allergic}
          onRadioChange={handleTrueFalseChange}
        />
        <DefaultTrueFalse
          title="是否有其他寵物?"
          name="otheranimal"
          inputValue={inputValue.otheranimal}
          onRadioChange={handleTrueFalseChange}
        />
      </div>
      {/* <DefaultCheckbox
        label="所有成員都同意養狗?"
        id="agreement"
        name="agreement"
        inputValue={inputValue.agreement}
        onCheckboxChange={(e) => handleCheckboxChange(e)}
      />
      <DefaultCheckbox
        label="沒有任何家人對狗狗過敏?"
        id="allergic"
        name="allergic"
        inputValue={inputValue.allergic}
        onCheckboxChange={(e) => handleCheckboxChange(e)}
      />
      <DefaultCheckbox
        label="家中有其他寵物?"
        id="otheranimal"
        name="otheranimal"
        inputValue={inputValue.otheranimal}
        onCheckboxChange={(e) => handleCheckboxChange(e)}
      /> */}
    </>
  );
};

export default AdoptionStep2;
