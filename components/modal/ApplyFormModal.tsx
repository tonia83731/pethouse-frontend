import { ImCross } from "react-icons/im";
import DefaultInput from "../common/input/DefaultInput";
import DefaultDatePicker from "../common/input/DefaultDatePicker";
import { useRef } from "react";
import { useModalStore } from "@/store/useModalStore";
import ModalLayout from "./ModalLayout";
const ApplyFormModal = () => {
  const { setIsModalClose } = useModalStore();
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const hoursRef = useRef(null);
  return (
    <ModalLayout>
      <div className="flex justify-between items-center bg-milk-tea rounded-t-md px-4 py-6">
        <h5 className="font-bold text-lg md:text-xl">志工申請表</h5>
        <button
          className="text-lg text-wine"
          onClick={() => setIsModalClose("volunteer")}
        >
          <ImCross />
        </button>
      </div>
      <div className="w-10/12 mx-auto py-4 h-[720px] md:h-[600px] overflow-y-auto flex flex-col gap-4">
        <DefaultInput
          id="volunteer-name"
          name="name"
          label="姓名"
          inputRef={nameRef}
          placeholder="請輸入姓名"
        />
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            id="volunteer-phone"
            name="phone"
            label="連絡電話"
            inputRef={phoneRef}
            placeholder="請輸入連絡電話"
          />
          <DefaultInput
            id="volunteer-email"
            type="email"
            name="email"
            label="Email"
            inputRef={emailRef}
            placeholder="請輸入Email"
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultDatePicker id="volunteer-date" label="Working Date" />
          <DefaultInput
            id="volunteer-hours"
            type="number"
            name="hours"
            label="工作時數"
            inputRef={hoursRef}
            placeholder="請輸入工作時數(小時)"
          />
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="volunteer-proven"
            name="proven"
            className="accent-wine"
          />
          <label
            htmlFor="volunteer-proven"
            className="text-lg md:text-xl font-bold"
          >
            是否需要志工時數證明?
          </label>
        </div>
        <div className="flex gap-4 items-center justify-center mt-8">
          <button
            className="bg-dirt text-dark drop-shadow-md rounded-md px-4 py-2"
            onClick={() => setIsModalClose("volunteer")}
          >
            取消
          </button>
          <button className="bg-milk-tea text-dark drop-shadow-md rounded-md px-4 py-2">
            報名
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ApplyFormModal;
