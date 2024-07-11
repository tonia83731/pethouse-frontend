"use client";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
const Pagination = ({ totalPage }: { totalPage: number }) => {
  const [currPage, setCurrPage] = useState(1);
  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 drop-shadow-md rounded-sm">
      <button
        className=""
        disabled={currPage === 1}
        onClick={() => setCurrPage(currPage - 1)}
      >
        <IoIosArrowBack />
      </button>
      <div className="flex">
        <input type="number" className="w-8 text-center" value={currPage} />
        <div className="">OF {totalPage}</div>
      </div>
      <button
        className=""
        disabled={currPage === totalPage}
        onClick={() => setCurrPage(currPage + 1)}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default Pagination;
