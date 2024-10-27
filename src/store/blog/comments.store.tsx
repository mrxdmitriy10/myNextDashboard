import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type comment = {
  id: number;
  autor: string;
  comment: string;
  date: string;
};

type comentsStoreType = {
  loading: boolean;
  error: unknown;
  data: comment[];

  fetch: (postid: number, reload?: boolean) => void;
};

export const useCommentsStore = create<comentsStoreType>()(
  devtools((set) => {
    return {
      loading: false,
      error: null,
      data: [],
      fetch: async (postid, reload) => {
        try {
          if (!reload) set({ loading: true });
          const res: { data: comment[] } = await axios.get(
            `/api/blog/${postid}/comments`
          );
          set(({ data: res.data }));
        } catch (error) {
          set({ error });
          console.log("error fetch comments " + error);
        } finally {
          if (!reload) set({ loading: false });

        }
      },
    };
  })
);
