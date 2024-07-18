"use client";

import { useEffect, useState } from "react";
import AnimalCard from "../card/AnimalCard";
import Pagination from "../common/Pagination";
const AnimalList = () => {
  const [twAnimalData, setTwAnimalData] = useState<any[]>([]);
  const [totalData, setTotalData] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const base_url = process.env.NEXT_PUBLIC_ANIMAL_BASE_URL;
  const top = 8;
  const skip = (currentPage - 1) * top;
  const totalPage = Math.ceil(totalData / top);
  useEffect(() => {
    const fetchTotalAnimalData = async () => {
      try {
        // skip: 跳過幾筆
        // top: 取幾筆
        const res = await fetch(`${base_url}?UnitId=QcbUEzN6E6DL`);
        const data = await res.json();
        const length = data?.length;
        setTotalData(length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotalAnimalData();
  });
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        // skip: 跳過幾筆
        // top: 取幾筆
        const res = await fetch(
          `${base_url}?UnitId=QcbUEzN6E6DL&$top=${top}&$skip=${skip}`
        );
        const data = await res.json();
        setTwAnimalData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnimalData();
  }, [currentPage, skip]);
  //   console.log(skip);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {twAnimalData.map((props) => {
          return <AnimalCard {...props} key={props.animal_id} />;
        })}
      </div>
      <div className="w-full flex justify-center md:justify-end">
        <Pagination
          totalPage={totalPage}
          currPage={currentPage}
          onPrevClick={() => setCurrentPage(currentPage - 1)}
          onNextClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </>
  );
};
export default AnimalList;
