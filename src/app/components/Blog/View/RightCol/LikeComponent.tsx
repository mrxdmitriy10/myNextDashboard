"use client";

import { usesinglePost } from "@/store/blog/blog.store";
import useLikesStore from "@/store/blog/like.store";


import Image from "next/image";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const LikeComponent = ({ count }: { count?: number }) => {
  const id = Number(useParams().id);
  const likesStore = useLikesStore();
  const [sizeLike, setSizeLike] = useState<number>(35);
  const updateDataPost = usesinglePost(
    ({ setShortDataFetch }) => setShortDataFetch
  );
  const onClick = async () => {
    if (!likesStore.likes.includes(id)) {
      try {
        await likesStore.toggleLike(id, "ip");
        updateDataPost(id);

      } catch (error) {
        console.log("ERR: toogle like" + error);
      }
    } else {
      try {
        likesStore.removeLike(id, "ip");
        updateDataPost(id);

      } catch (error) {
        console.log("ERR: remove like" + error);
      }
    }
  };
  useEffect(() => {

    likesStore.getAllLikesUser('ip')
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="flex gap-3 font-light text-4xl justify-end items-center">
      <div>{count}</div>

      <button
        onClick={onClick}
        className={`transition-all hover:opacity-100 ${!likesStore.likes.includes(id) && "opacity-50"}`}
      >
        <Image
          className="transition-all"
          alt="like"
          src="/like_new.svg"
          onMouseEnter={() => setSizeLike(40)}
          onMouseLeave={() => setSizeLike(35)}
          width={sizeLike}
          height={sizeLike}
        />
      </button>
    </span>
  );
};
