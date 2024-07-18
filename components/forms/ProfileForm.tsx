"use client";

import DefaultInput from "../common/input/DefaultInput";
import DefaultPasswordInput from "../common/input/DefaultPasswordInput";
import { useRef } from "react";
const ProfileForm = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-8">
        <DefaultInput
          id="profile-name"
          name="name"
          label="姓名"
          inputRef={nameRef}
          placeholder="請輸入姓名"
        />
        <DefaultInput
          id="profile-email"
          name="email"
          label="Email"
          type="email"
          inputRef={emailRef}
          placeholder="請輸入Email"
        />
        <DefaultPasswordInput
          id="profile-password"
          name="password"
          label="密碼"
          type="password"
          inputRef={passwordRef}
          placeholder="請輸入密碼"
        />
        <DefaultInput
          id="profile-phone"
          name="phone"
          label="連絡電話"
          type="tel"
          inputRef={phoneRef}
          placeholder="請輸入連絡電話"
        />
        <DefaultInput
          id="profile-address"
          name="address"
          label="地址"
          inputRef={addressRef}
          placeholder="請輸入地址"
        />
      </div>
      <div className="flex justify-center md:justify-end">
        <button className="min-h-[45px] bg-wine text-white rounded-md px-8 py-2">
          儲存
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
