import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type IdelStore = {
  delState: boolean;
  setdelState: (delState: boolean) => void;
  delID: number | null;
  setdelID: (value: number | null) => void;
  isOpenModal: boolean;
  setOpenModal: (bool: boolean) => void;
};

export const usedelStore = create<IdelStore>()(
  devtools((set) => ({
    delID: null,
    setdelID: (value) => set({ delID: value }),
    isOpenModal: false,
    setOpenModal: (bool) => set({ isOpenModal: bool }),
    delState: false,
    setdelState: (value) => set({ delState: value }),
  }))
);
