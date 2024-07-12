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
          label="Org. Name"
          inputRef={nameRef}
          placeholder="Enter name here"
        />
        <DefaultInput
          id="fsupplies-need-num"
          name="address"
          label="Org. Address"
          inputRef={addressRef}
          placeholder="Enter address here"
        />
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
        <DefaultInput
          id="fsupplies-supply-name"
          name="supply-name"
          label="Supply Name"
          inputRef={supplynameRef}
          placeholder="Enter supply name here"
        />
        <DefaultInput
          id="fsupplies-num"
          name="supply-num"
          label="Supply Numbers"
          inputRef={supplynumRef}
          placeholder="Enter supply number here"
        />
      </div>
      <DefaultTextarea
        id="fsupplies-note"
        name="note"
        label="Note"
        inputRef={noteRef}
        placeholder="Shortly describe the supply"
      />
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FindSuppliesForm;
