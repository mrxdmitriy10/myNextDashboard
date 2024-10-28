import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type commentType = {
  id: number;
  autor_id: string;
  comment: string;
  date: string;
  author: { name: string };
};

type comentsStoreType = {
  loading: boolean;
  error: unknown;
  data: commentType[];

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
          const res: { data: commentType[] } = await axios.get(
            `/api/blog/${postid}/comments`
          );
          set({ data: res.data });
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
