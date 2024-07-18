"use client";
import { useRef } from "react";
import DefaultInput from "../common/input/DefaultInput";
const SigninForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  return (
    <form className="flex flex-col gap-4 w-full">
      <DefaultInput
        id="signin-email"
        type="email"
        name="email"
        label="Email"
        inputRef={emailRef}
        placeholder="請輸入Email"
      />
      <DefaultInput
        id="signin-password"
        type="password"
        name="password"
        label="密碼"
        inputRef={passwordRef}
        placeholder="請輸入密碼"
      />
      <DefaultInput
        id="signin-confirm-password"
        type="password"
        name="confirm-password"
        label="請再次填寫密碼"
        inputRef={confirmPasswordRef}
        placeholder="請再次輸入密碼"
      />
      <button className="bg-wine text-white rounded-md px-4 py-2 mt-4">
        登入
      </button>
    </form>
  );
};
export default SigninForm;
