"use client";
import { useRef } from "react";
import DefaultInput from "../common/DefaultInput";
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
        placeholder="Enter email here"
      />
      <DefaultInput
        id="signin-password"
        type="password"
        name="password"
        label="Password"
        inputRef={passwordRef}
        placeholder="Enter email here"
      />
      <DefaultInput
        id="signin-confirm-password"
        type="password"
        name="confirm-password"
        label="Confirm Password"
        inputRef={confirmPasswordRef}
        placeholder="Enter email here"
      />
      <button className="bg-wine text-white rounded-md px-4 py-2 mt-4">
        Submit
      </button>
    </form>
  );
};
export default SigninForm;
