import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type stackBlockStoreType = {
  data?: [{name: string, descr: string, category: string}];
  fetchData: () => Promise<void>;
  selectedDescr: string;
  setselectedDescr: (name: string) => void;
};

export const usestackBlockStore = create<stackBlockStoreType>()(
  devtools((set, get) => ({
    data: undefined,
    fetchData: async () => {
      const res = await fetch("/api/portfolio/stack");
      if (res.ok) {
        set({ data: await res.json() });
      }
    },
    selectedDescr: "Привет, предлагаю тебе навести мышкой на любую интересующую позицию в моем стеке, чтобы узнать подробней!",
    setselectedDescr: (name) => {
      get().data?.forEach((item)=>{
        if (item.name === name) {
            set({ selectedDescr: item.descr });
        }
      })
    },
  }))
);
