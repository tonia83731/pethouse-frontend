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
          label="Name"
          inputRef={nameRef}
          placeholder="Enter name here"
        />
        <DefaultInput
          id="profile-email"
          name="email"
          label="Email"
          type="email"
          inputRef={emailRef}
          placeholder="Enter email here"
        />
        <DefaultPasswordInput
          id="profile-password"
          name="password"
          label="Password"
          type="password"
          inputRef={passwordRef}
          placeholder="Enter password here"
        />
        <DefaultInput
          id="profile-phone"
          name="phone"
          label="Contact"
          type="tel"
          inputRef={phoneRef}
          placeholder="Enter phone here"
        />
        <DefaultInput
          id="profile-address"
          name="address"
          label="Address"
          inputRef={addressRef}
          placeholder="Enter address here"
        />
      </div>
      <div className="flex justify-center md:justify-end">
        <button className="min-h-[45px] bg-wine text-white rounded-md px-8 py-2">
          Update
        </button>
      </div>
    </>
  );
};

export default ProfileForm;
