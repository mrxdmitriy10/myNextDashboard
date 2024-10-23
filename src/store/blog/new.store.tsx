import iPostBlog from "@/types/iPostBlog";
import axios from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
export enum variant {
  Editor,
  Prewiew,
}
interface iNewPost extends iPostBlog {
  validate: boolean;
  variant: variant;

  setTitle: (value: iPostBlog["title"]) => void;
  setCategory: (value: iPostBlog["category"]) => void;
  setContent: (value: iPostBlog["content"]) => void;
  setAutor: (value: iPostBlog["autor"]) => void;
  setVariant: (variant: variant) => void;
  setValidate: (bool: boolean) => void;
  getDataToPublishPost: () => iPostBlog;
}
export const useNewPost = create<iNewPost>()(
  immer((set, get) => ({
    title: "",
    category: "",
    content: "",
    autor: "",
    variant: variant.Editor,
    validate: false,

    getDataToPublishPost: () => ({
      title: get().title,
      category: get().category,
      content: get().content,
      autor: get().autor,
    }),
    setTitle: (value) => set({ title: value }),
    setCategory: (value) => set({ category: value }),
    setContent: (value) => set({ content: value }),
    setAutor: (value) => set({ autor: value }),
    setVariant: (variant) => set({ variant: variant }),
    setValidate: (bool) => set({ validate: bool }),
  }))
);

export type publishNewPost = {
  loading: boolean;
  error: unknown;
  finish: boolean;
  fetch: () => Promise<void>;
};

export const usePublishNewPost = create<publishNewPost>()((set) => ({
  loading: false,
  error: null,
  finish: false,
  fetch: async () => {
    try {
      set({ loading: true });
      await axios.post(
        "/api/blog/",
        useNewPost.getState().getDataToPublishPost
      );
      set({ finish: true });
    } catch (error: unknown) {
      set({ error });
      console.error("err ", error);
    } finally {
      set({ loading: false });
    }
  },
}));
