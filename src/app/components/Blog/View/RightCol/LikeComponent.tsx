'use client'




import { usesinglePost } from "@/store/blog/blog.store";
import { useLikesStore } from "@/store/blog/like.store";

import Image from "next/image";

import { useParams } from "next/navigation";


export const LikeComponent = ({ countLikes }: { countLikes?: number }) => {
  const id = Number(useParams().id);
  const toogleLike = useLikesStore((state) => state.toggleLike);
  const setShortData = usesinglePost((state) => state.setShortData);

//TODO: Сделать так чтобы можно было поставить только один лайк



  const onClick = async () => {
    try {
      toogleLike(id)
      setShortData(id)

    } catch(error) {
      console.log('ERR: toogle like' + error);
    }
  };

  return (
    <span className="flex gap-2 font-light text-4xl justify-end items-end">
      <button onClick={onClick}>
        <Image alt="like" src="/like_new.svg" width={50} height={50} />
      </button>
      <div> {countLikes}</div>
    </span>
  );
};
