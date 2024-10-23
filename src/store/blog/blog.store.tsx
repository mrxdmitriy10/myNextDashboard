import iPostBlog from "@/types/iPostBlog";
import axios from "axios";

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

export type IpostsStore = {
  error: unknown;
  loading: boolean;
  all: iPostBlog[] | [];
  selectCategory: string | null;

  setSelectCategory: (value: string | null) => void;
  fetch: () => void;
};

export const usepostsStore = create<IpostsStore>()(
  devtools((set) => ({
    all: [],
    selectCategory: null,
    setSelectCategory: (value) => set({ selectCategory: value }),
    error: null,
    loading: true,
    fetch: async () => {
      try {
        // const res: { data: iPostBlog[] } = await axios.get("/api/blog");
        const data = await fetch("/api/blog");
        const res = await data.json();

        set({ all: res });

        // res.data.map((item: iPostBlog, index: number) => {
        //   setTimeout(() => {
        //     set((state) => ({ all: [...state.all, item] }));
        //   }, index * 100);
        // });
      } catch (error: unknown) {
        set({ error });
        console.error("Ошибка при загрузке данных:", error); // Обработка ошибок
      } finally {
        set({ loading: false });
      }
    },
  }))
);

export interface usesinglePostType {
  id?: number;

  likes?: number;
  date?: string | Date;
  autor?: string;
  content?: string;
  title?: string;
  post?: iPostBlog;
  setData: (postid: number) => void;
  likeIncrement: (postid: number) => void;
  setShortData: (postid: number) => void;
}
export const usesinglePost = create<usesinglePostType>()(
  devtools((set, get) => ({
    id: undefined,
    likes: undefined,
    date: undefined,
    autor: undefined,
    content: undefined,
    title: undefined,
    post: undefined,
    setShortData: async (postid: number) => {
      const data = await fetch(`/api/blog/${postid}/shortdata`);
      const res: { autor: string; date: string | Date; likes: number } =
        await data.json();
      set({ autor: res.autor, date: res.date, likes: res.likes });
    },
    setData: (postid) => {
      usepostsStore.getState().all.forEach((i: iPostBlog) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        i.id === postid &&
          set((state) => ({
            ...state,
            ...i,
          }));
      });
    },

    likeIncrement: async (postid) => {
      if (get().likes != undefined) {
        await axios.patch(`/api/blog/${postid}`);
        get().setShortData(postid);
        // set((state) => ({ likes: (state.likes as number) + 1 }));
      }
    },
  }))
);
