import iPostBlog from "@/types/iPostBlog";
import { create } from "zustand";

export interface IdelStore {
  delState: boolean;
  setdelState: (delState: boolean) => void;
  delID: number | null;
  setdelID: (value: number | null) => void;
  isOpenModal: boolean;
  setOpenModal: (bool: boolean) => void;
}
export const usedelStore = create<IdelStore>((set) => ({
  delID: null,
  setdelID: (value) => set(() => ({ delID: value })),
  isOpenModal: false,
  setOpenModal: (bool) => set(() => ({ isOpenModal: bool })),
  delState: false,
  setdelState: (value) => set(() => ({ delState: value })),
}));

export interface IpostsStore {
  all: iPostBlog[] | [];
  setPosts: (res_array: iPostBlog[]) => void;
  selectCategory: string | null,
  setSelectCategory: (value: string | null) => void,
}

export const usepostsStore = create<IpostsStore>((set) => ({
  all: [],
  setPosts: (res_array) => set(() => ({ all: res_array })),
  selectCategory: null,
  setSelectCategory: (value) => set(() => ({ selectCategory: value}))
  
}));
