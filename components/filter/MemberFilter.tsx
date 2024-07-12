"use client";

import Select from "react-select";
import { userIdentity } from "@/data/userIdentity";
import { filterSelectStyles } from "@/styles/filterSelectStyles";
import { useModalStore } from "@/store/useModalStore";
const MemberFilter = () => {
  const { setIsModalToggle } = useModalStore();
  return (
    <div className="flex flex-col gap-2 md:grid md:grid-cols-2 items-center">
      <div className="grid grid-cols-3 gap-4 text-center w-full">
        <button
          onClick={() => setIsModalToggle("member")}
          className="bg-dark text-white rounded-full py-2 px-4 col-span-2 hover:drop-shadow-md hover:font-bold"
        >
          Add Members
        </button>
        <Select
          id="member"
          options={userIdentity}
          defaultValue={userIdentity[0]}
          closeMenuOnSelect={true}
          isClearable={false}
          isSearchable={false}
          classNamePrefix=""
          styles={filterSelectStyles}
        />
      </div>
    </div>
  );
};

export default MemberFilter;
