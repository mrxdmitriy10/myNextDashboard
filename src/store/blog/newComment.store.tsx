import axios from "axios";
import { Session } from "next-auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { useCommentsStore } from "./comments.store";


type newCommentStore = {
  loading: boolean;
  error?: unknown;
  text: string;
  validate: boolean;
  final: boolean;
  setValidate: (bool: boolean) => void;
  setText: (text: string) => void;
  fetch: (postid: number, session: Session) => void;
};

export const usenewCommentStore = create<newCommentStore>()(
  devtools((set, get) => ({
    text: "",
    final: false,
    loading: false,
    error: undefined,
    data: undefined,
    validate: false,

    setValidate: (bool: boolean) => set({ validate: bool }),
    setText: (text: string) => {
      if (text.length > 5) {
        set({ validate: true });
      } else {
        set({ validate: false });
      }
      set({ text });
    },
    fetch: async (postid, session) => {
      try {
        if (!session.user?.name) throw new Error("Не авторизован");
        set({ loading: true });
        await axios.post(`/api/blog/${postid}/comments/`, {
          text: get().text,
          username: session.user?.name,
        });
        set({ final: true });
        useCommentsStore.getState().fetch(postid, true);
        set({ text: "" });

      } catch (error) {
        set({ error });
        console.log("error fetch comments " + error);
      } finally {
        set({ loading: false });
      }
    },
  }))
);
