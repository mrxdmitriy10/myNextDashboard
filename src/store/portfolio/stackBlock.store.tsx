import { create } from "zustand";
import { devtools } from "zustand/middleware";


export interface StackBlockStoreType {
  data?: Array<{ name: string; descr: string; category: string }>;
  fetchData(): Promise<void>;
  selectedDescr: string;
  setselectedDescr(name: string): void;
}






export const usestackBlockStore = create<StackBlockStoreType>()(
  devtools((set, get) => ({
    data: undefined,
    fetchData: async () => {
      const res = await fetch("/api/portfolio/stack");
      if (res.ok) {
        const data = (await res.json()) as Array<{
          name: string;
          descr: string;
          category: string;
        }>;
        set({ data });
      }
    },
    selectedDescr:
      "Привет, предлагаю тебе навести мышкой на любую интересующую позицию в моем стеке, чтобы узнать подробней!",
    setselectedDescr: (name) => {
      const item = get().data?.find((item) => item.name === name);
      if (item) {
        set({ selectedDescr: item.descr });
      }
    },
  }))
);
