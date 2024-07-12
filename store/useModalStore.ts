import { create } from "zustand";
type ModalState = {
  isModalToggle: boolean;
  setIsModalToggle: () => void;
  setIsModalClose: () => void;
};
export const useModalStore = create<ModalState>((set) => ({
  isModalToggle: false,
  setIsModalToggle: () =>
    set((state) => ({
      isModalToggle: !state.isModalToggle,
    })),
  setIsModalClose: () =>
    set((state) => ({
      isModalToggle: false,
    })),
}));
