import iPostBlog from "@/types/iPostBlog";


import { create } from "zustand";
import { devtools } from "zustand/middleware";



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
  // likeIncrement: (postid: number) => void;
  setShortData: (postid: number) => void;
}
export const usesinglePost = create<usesinglePostType>()(
  devtools((set) => ({
    id: undefined,
    likes: undefined,
    date: undefined,
    autor: undefined,
    content: undefined,
    title: undefined,
    post: undefined,
    setShortData: async (postid: number) => {
      const data = await fetch(`/api/blog/${postid}/shortdata`, {
        cache: 'no-store'
        
      });
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

    // likeIncrement: async (postid) => {
    //   if (get().likes != undefined) {
    //     await axios.patch(`/api/blog/${postid}`);
    //     get().setShortData(postid);
    //     // set((state) => ({ likes: (state.likes as number) + 1 }));
    //   }
    // },
  }))
);
