



import { usesinglePost } from "@/store/blog/blog.store";
import Image from "next/image";

import { useParams } from "next/navigation";


export const LikeComponent = ({ countLikes }: { countLikes?: number }) => {
  const { id } = useParams();
  const likeIncrement = usesinglePost((state) => state.likeIncrement);

//TODO: Сделать так чтобы можно было поставить только один лайк



  const onClick = async () => {
    try {
      likeIncrement(Number(id));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <span className="flex gap-2 font-light text-4xl justify-end items-end">
      <button onClick={onClick}>
        <Image alt="like" src="/Like_Star.svg" width={50} height={50} />
      </button>
      <div> {countLikes}</div>
    </span>
  );
};
