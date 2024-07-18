"use client";
import DefaultInput from "../common/input/DefaultInput";
import DefaultDatePicker from "../common/input/DefaultDatePicker";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { useRef } from "react";
const FindVolunteerForm = () => {
  const nameRef = useRef(null);
  const numRef = useRef(null);
  const hoursRef = useRef(null);
  const noteRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 items-end">
        <DefaultInput
          id="fvolunteer-name"
          name="name"
          label="組織名稱"
          inputRef={nameRef}
          extraClass="col-span-2"
          placeholder="請輸入組織名稱"
        />
        <DefaultInput
          id="fvolunteer-need-num"
          type="number"
          name="quantity"
          label="所需人數"
          inputRef={numRef}
          extraClass="col-span-1"
          placeholder="請輸入所需人數"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-end">
        <DefaultDatePicker
          id="fvolunteer-date"
          label="選擇時間"
          extraClass="col-span-2"
        />
        <DefaultInput
          id="fvolunteer-need-num"
          type="number"
          name="quantity"
          label="選擇最低時數"
          inputRef={hoursRef}
          extraClass="col-span-1"
          placeholder="請輸入最低時數"
        />
      </div>
      <DefaultTextarea
        id="fvolunteer-note"
        name="note"
        label="志工簡介"
        inputRef={noteRef}
        placeholder="請簡寫志工簡介"
      />
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          送出
        </button>
      </div>
    </div>
  );
};

export default FindVolunteerForm;
