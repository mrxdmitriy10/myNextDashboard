import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LikesStore {
  likes: number[];
  toggleLike: (postId: number) => void;
}

export const useLikesStore = create<LikesStore>()(
  devtools((set, get) => {
    const likesFromStorage = JSON.parse(localStorage.getItem("likes") || "[]")

    console.log("Likes from storage:", likesFromStorage);

    return {
      likes: likesFromStorage,
      toggleLike: async (postId) => {
        let newLikes = [...likesFromStorage];

        if (get().likes.includes(postId)) {
          try {
            await axios.patch(`/api/blog/${postId}`, { type: "decrement" });
            newLikes = newLikes.filter((i) => i !== postId);
          } catch (error) {
            console.error("Error decrementing like:", error);
          }
        } else {
          try {
            await axios.patch(`/api/blog/${postId}`, { type: "increment" });
            newLikes.push(postId);
          } catch (error) {
            console.error("Error incrementing like:", error);
          }
        }

        localStorage.setItem("likes", JSON.stringify(newLikes));

        console.log("Updated likes:", newLikes);
        set({ likes: newLikes });
      },
    };
  })
);
