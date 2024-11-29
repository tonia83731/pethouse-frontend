import { useFormContext } from "@/context/FormContext";
import DefaultInput from "@/components/common/DefaultInput";
import DefaultSelect from "@/components/common/DefaultSelect";
import { ChangeEvent } from "react";
import { getTwCity } from "@/datas/twCityDistricts";
import { income_options } from "@/datas/adoption-option";
const AdoptionStep1 = () => {
  const { inputValue, handleFormInputChange, handleSelectChange } =
    useFormContext();
  return (
    <>
      <div className="grid grid-cols-[2fr_1fr] gap-4">
        <DefaultInput
          label="姓名"
          id="name"
          name="name"
          placeholder="請輸入姓名"
          inputValue={inputValue.name}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
        <DefaultInput
          label="年齡"
          type="number"
          id="age"
          name="age"
          placeholder="請輸入年齡"
          inputValue={inputValue.age}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <DefaultInput
          label="電話"
          type="tel"
          id="phone"
          name="phone"
          placeholder="請輸入電話"
          inputValue={inputValue.phone}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
        <DefaultInput
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="請輸入Email"
          inputValue={inputValue.email}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-end">
        <DefaultSelect
          title="地址"
          options={getTwCity()}
          placeholder="請輸入城市"
          name="city"
          inputValue={getTwCity()[0]}
          onSelectChange={(value) => handleSelectChange("city", value)}
        />
        <DefaultInput
          id="address"
          name="address"
          placeholder="請輸入地址"
          inputValue={inputValue.address}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <DefaultInput
          label="職業"
          id="occupation"
          name="occupation"
          placeholder="請輸入職業"
          inputValue={inputValue.occupation}
          onInputChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFormInputChange(e)
          }
        />
        <DefaultSelect
          title="收入情況"
          options={income_options}
          placeholder="請輸入收入情況"
          name="income"
          onSelectChange={(value) => handleSelectChange("income", value)}
        />
      </div>
    </>
  );
};

export default AdoptionStep1;
