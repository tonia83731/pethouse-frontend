import { create } from "zustand";
type ModalState = {
  isModalToggle: boolean;
  isMemberModalToggle: boolean;
  setIsModalToggle: (type: string) => void;
  setIsModalClose: (type: string) => void;
};
export const useModalStore = create<ModalState>((set) => ({
  isModalToggle: false,
  isMemberModalToggle: false,
  setIsModalToggle: (type: string) => {
    if (type === "volunteer") {
      set((state) => ({
        ...state,
        isModalToggle: !state.isModalToggle,
      }));
    } else if (type === "member") {
      set((state) => ({
        ...state,
        isMemberModalToggle: !state.isMemberModalToggle,
      }));
    }
  },
  setIsModalClose: (type: string) => {
    if (type === "volunteer") {
      set((state) => ({
        ...state,
        isModalToggle: false,
      }));
    } else if (type === "member") {
      set((state) => ({
        ...state,
        isMemberModalToggle: false,
      }));
    }
  },
}));
