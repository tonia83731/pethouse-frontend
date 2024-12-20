import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { updatedFormInput } from "@/slices/adoptionSlice";
import DefaultInput from "@/components/common/input/DefaultInput";
import DefaultSelect from "@/components/common/input/DefaultSelect";
import DefaultTrueFalse from "@/components/common/input/DefalutTrueFalse";
import { housetype_options, livingarea_options } from "@/datas/adoption-option";

const AdoptionStep2 = () => {
  const inputValue = useSelector(
    (state: RootState) => state.adoption.inputValue
  );
  const dispatch = useDispatch();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updatedFormInput({ name, value }));
  };
  const handleSelectChange = (
    name: string,
    inputValue: { label: string; value: string }
  ) => {
    const value = inputValue.value;

    dispatch(updatedFormInput({ name, value }));
  };

  const handleTrueFalseChange = (name: string, value: boolean) => {
    dispatch(updatedFormInput({ name, value }));
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultSelect
          title="住宅類型"
          options={housetype_options}
          placeholder="請輸入住宅類型"
          name="housetype"
          onSelectChange={(value) => handleSelectChange("housetype", value)}
        />
        <DefaultSelect
          title="居住地區"
          options={livingarea_options}
          placeholder="請輸入居住地區"
          name="livingarea"
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
          onInputChange={handleInputChange}
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
    </>
  );
};

export default AdoptionStep2;
