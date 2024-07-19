import { create } from "zustand";
type StatisticState = {
  statisticData: any[];
  totalData: number;
  setStatisticData: (data: any[], length: number) => void;
};
export const useStatisticStore = create<StatisticState>((set) => ({
  statisticData: [],
  totalData: 0,
  setStatisticData: (data, length) => {
    set({
      statisticData: data,
      totalData: length,
    });
  },
}));
