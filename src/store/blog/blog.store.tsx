import iPostBlog from "@/types/iPostBlog";
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware"





export type IdelStore =  {
  delState: boolean;
  setdelState: (delState: boolean) => void;
  delID: number | null;
  setdelID: (value: number | null) => void;
  isOpenModal: boolean;
  setOpenModal: (bool: boolean) => void;
}


export const usedelStore = create<IdelStore>()(devtools((set) => ({
  delID: null,
  setdelID: (value) => set({ delID: value }),
  isOpenModal: false,
  setOpenModal: (bool) => set({ isOpenModal: bool }),
  delState: false,
  setdelState: (value) => set({ delState: value }),
})))








export type IpostsStore = {
  error: unknown;
  loading: boolean
  all: iPostBlog[] | [];
  setPosts: (res_array: iPostBlog[]) => void;
  selectCategory: string | null,
  setSelectCategory: (value: string | null) => void,
  fetch: () => void
}



export const usepostsStore = create<IpostsStore>()(devtools((set) => ({
  all: [],
  setPosts: (res_array) => set({ all: res_array }),
  selectCategory: null,
  setSelectCategory: (value) => set({ selectCategory: value}),
  error: null,
  loading: false,
  fetch: async () => {
    set({loading: true})
    try {
      const res: { data: iPostBlog[] } = await axios.get("/api/blog");

      res.data.map((item, index) => {
        setTimeout(() => {
          set((state) => ({all: [...state.all, item] }));
        }, index * 100);
      });
        
      
    } catch (error: unknown) {
      set({ error })
      console.error("Ошибка при загрузке данных:", error); // Обработка ошибок
    } finally {

      set({ loading: false })
    }
  }
  
})));



