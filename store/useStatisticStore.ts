import { create } from "zustand";
export type TableOptions = "in" | "out" | "feed" | "stay";
export type ShowTableType = {
  [key in TableOptions]: boolean;
};
type StatisticState = {
  statisticData: any[];
  totalData: number;
  tableShow: ShowTableType;
  setStatisticData: (
    data: any[],
    length: number,
    tableShow: ShowTableType
  ) => void;
};
export const useStatisticStore = create<StatisticState>((set) => ({
  statisticData: [],
  totalData: 0,
  tableShow: {
    in: false,
    out: false,
    feed: false,
    stay: false,
  },
  setStatisticData: (data, length, tableShow) => {
    set({
      statisticData: data,
      totalData: length,
      tableShow: tableShow,
    });
  },
}));
