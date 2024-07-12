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
          label="Org. Name"
          inputRef={nameRef}
          extraClass="col-span-2"
          placeholder="Enter name here"
        />
        <DefaultInput
          id="fvolunteer-need-num"
          type="number"
          name="quantity"
          label="Nums of People"
          inputRef={numRef}
          extraClass="col-span-1"
          placeholder="Enter number here"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 items-end">
        <DefaultDatePicker
          id="fvolunteer-date"
          label="Date"
          extraClass="col-span-2"
        />
        <DefaultInput
          id="fvolunteer-need-num"
          type="number"
          name="quantity"
          label="Min. Hours"
          inputRef={hoursRef}
          extraClass="col-span-1"
          placeholder="Enter hours here"
        />
      </div>
      <DefaultTextarea
        id="fvolunteer-note"
        name="note"
        label="Note"
        inputRef={noteRef}
        placeholder="Shortly describe the job"
      />
      <div className="mt-4 flex justify-center md:justify-end items-center">
        <button className="bg-wine text-white rounded-md hover:drop-shadow-md px-4 py-2">
          Submit
        </button>
      </div>
    </div>
  );
};

export default FindVolunteerForm;
