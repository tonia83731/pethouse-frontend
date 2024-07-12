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
  const dateRef = useRef(null);
  const hoursRef = useRef(null);
  return (
    <ModalLayout>
      <div className="flex justify-between items-center bg-milk-tea rounded-t-md px-4 py-6">
        <h5 className="font-bold text-lg md:text-xl">
          Volunteer Application Form
        </h5>
        <button className="text-lg text-wine" onClick={() => setIsModalClose()}>
          <ImCross />
        </button>
      </div>
      <div className="w-10/12 mx-auto py-4 h-[600px] md:h-[450px] overflow-y-auto flex flex-col gap-4">
        <DefaultInput
          id="volunteer-name"
          name="name"
          label="Name"
          inputRef={nameRef}
          placeholder="Enter name here"
        />
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultInput
            id="volunteer-phone"
            name="phone"
            label="Phone"
            inputRef={phoneRef}
            placeholder="Enter phone here"
          />
          <DefaultInput
            id="volunteer-email"
            type="email"
            name="email"
            label="Email"
            inputRef={emailRef}
            placeholder="Enter email here"
          />
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
          <DefaultDatePicker
            id="volunteer-date"
            name="date"
            label="Working Date"
            inputRef={dateRef}
            placeholder="Enter workinge date here"
          />
          <DefaultInput
            id="volunteer-hours"
            type="number"
            name="hours"
            label="Working Hours"
            inputRef={hoursRef}
            placeholder="Enter hours here"
          />
        </div>
        <div className="flex gap-4 items-center justify-center mt-8">
          <button
            className="bg-dirt text-dark drop-shadow-md rounded-md px-4 py-2"
            onClick={() => setIsModalClose()}
          >
            Cancel
          </button>
          <button className="bg-milk-tea text-dark drop-shadow-md rounded-md px-4 py-2">
            Submit
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default ApplyFormModal;
