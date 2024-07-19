"use client";
import { useStatisticStore } from "@/store/useStatisticStore";
const StatisticTable = () => {
  const { statisticData, totalData } = useStatisticStore();

  return <table className=""></table>;
};

export default StatisticTable;
