"use client";
import ModalLayout from "./ModalLayout";
import { ImCross } from "react-icons/im";
import DefaultInput from "../common/input/DefaultInput";
import DefaultPasswordInput from "../common/input/DefaultPasswordInput";
import { useRef } from "react";
import { useModalStore } from "@/store/useModalStore";
const AddMemberModal = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setIsModalClose } = useModalStore();
  return (
    <ModalLayout>
      <div className="flex justify-between items-center bg-milk-tea rounded-t-md px-4 py-6">
        <h5 className="font-bold text-lg md:text-xl">新增合作夥伴</h5>
        <button
          className="text-lg text-wine"
          onClick={() => setIsModalClose("member")}
        >
          <ImCross />
        </button>
      </div>
      <div className="w-10/12 mx-auto py-4 h-[720px] md:h-[600px] overflow-y-auto flex flex-col gap-4">
        <DefaultInput
          id="member-name"
          name="name"
          label="組織名稱"
          inputRef={nameRef}
          placeholder="請輸入組織名稱"
        />
        <DefaultInput
          id="member-email"
          type="email"
          name="email"
          label="Email"
          inputRef={emailRef}
          placeholder="請輸入組織Email"
        />
        <DefaultPasswordInput
          id="member-password"
          type="password"
          name="password"
          label="密碼"
          inputRef={passwordRef}
          placeholder="請輸入密碼"
        />
        <div className="flex gap-4 items-center justify-center mt-8">
          <button
            className="bg-dirt text-dark drop-shadow-md rounded-md px-4 py-2"
            onClick={() => setIsModalClose("member")}
          >
            取消
          </button>
          <button className="bg-milk-tea text-dark drop-shadow-md rounded-md px-4 py-2">
            新增
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddMemberModal;
