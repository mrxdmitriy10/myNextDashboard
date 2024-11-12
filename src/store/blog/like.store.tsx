import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
interface LikesStoreType {
  likes: number[];
  toggleLike: (postId: number, ipAddress: string) => Promise<void>;
  removeLike: (postId: number, ipAddress: string) => Promise<void>;
  getAllLikesUser: (ipAddress: string) => Promise<void>;
}





const useLikesStore = create<LikesStoreType>()(
  devtools(
    immer((set) => ({
      likes: [],
      getAllLikesUser: async (ipAddress) => {
        const res = await fetch(`/api/blog/alllikes`, {
          cache: 'no-store',

          method: "POST",
          body: JSON.stringify({ ipAddress }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data: [{ ipAddress: string; postId: number }] = await res.json();
        if (data) {
          set({ likes: data.map((i) => i.postId) });
        }
      },


      



      toggleLike: async (postId, ipAddress) => {
        


        const res = await fetch(`/api/blog/${postId}/like`, {
          cache: 'no-store',

          method: "POST",
          body: JSON.stringify({ ipAddress }),
        });
        if (res.ok) {
          set((state) => {
            state.likes.push(postId);


          });
        }
      },
      removeLike: async (postId, ipAddress) => {
        const res = await fetch(`/api/blog/${postId}/like`, {
          cache: 'no-store',
          method: "DELETE",
          body: JSON.stringify({ ipAddress }),
        });

        console.log(await res.json());

        if (res.ok) {
          console.log("delete");

          set((state) => ({ likes: state.likes.filter((n) => n !== postId) }));

        }
      },
    }))
  )
);
export default useLikesStore;
