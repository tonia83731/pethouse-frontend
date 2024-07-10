import { create } from "zustand";
type StepState = {
  currStep: number;
  increaseSteps: () => void;
  decreseSteps: () => void;
};
export const useStepStore = create<StepState>((set) => ({
  currStep: 1,
  increaseSteps: () => set((state) => ({ currStep: state.currStep + 1 })),
  decreseSteps: () => set((state) => ({ currStep: state.currStep - 1 })),
}));
