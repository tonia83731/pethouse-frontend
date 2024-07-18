"use client";

import DefaultInput from "../common/input/DefaultInput";
import DefaultTextarea from "../common/input/DefaultTextarea";
import { useRef } from "react";
const FindSuppliesForm = () => {
  const nameRef = useRef(null);
  const addressRef = useRef(null);
  const supplynameRef = useRef(null);
  const supplynumRef = useRef(null);
  const noteRef = useRef(null);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="fsupplies-name"
          name="name"
          label="組織名稱"
          inputRef={nameRef}
          placeholder="請輸入組織名稱"
        />
        <DefaultInput
          id="fsupplies-need-num"
          name="address"
          label="組織地址"
          inputRef={addressRef}
          placeholder="請輸入組織地址"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="fsupplies-supply-name"
          name="supply-name"
          label="所需物資"
          inputRef={supplynameRef}
          placeholder="請輸入所需物資"
        />
        <DefaultInput
          id="fsupplies-num"
          name="supply-num"
          label="所需數量"
          inputRef={supplynumRef}
          placeholder="請輸入所需數量"
        />
      </div>
      <DefaultTextarea
        id="fsupplies-note"
        name="note"
        label="簡介"
        inputRef={noteRef}
        placeholder="請簡寫簡介"
      />
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          送出
        </button>
      </div>
    </div>
  );
};

export default FindSuppliesForm;
