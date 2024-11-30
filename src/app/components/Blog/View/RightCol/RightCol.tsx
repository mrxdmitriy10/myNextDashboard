"use client";

import ButtonNewPost from "./ButtonNewPost";

import date_time from "@/lib/formatDate";
import { LikeComponent } from "./LikeComponent";
import { usesinglePost } from "@/store/blog/blog.store";
import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";

export type Props = {
  autor?: string;
  isNewPost: boolean;
};

const RightCol: React.FC<Props> = ({ isNewPost, autor }) => {
  // const data = isNewPost?useNewPost((state)=>(state.autor, state.date, state.)):usesinglePost();
  const postShortData = usesinglePost();

  // const data = isNewPost? postShortData : postData
  const id = Number(useParams().id);
  useEffect(() => {
    console.log(isNewPost);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isNewPost && postShortData.setShortDataFetch(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="gap-10 flex text-right flex-col ">
      {!isNewPost && <LikeComponent count={postShortData.likes} />}
      <div className="flex flex-col gap-1">
        <div className="underline text-sm font-mono">Автор: </div>
        <div>
          {!isNewPost ? (
            postShortData.autor?.includes("@") ? (
              <Link
                className="hover:underline text-blue-500"
                href={`https://t.me/${postShortData.autor.slice(1)}`}
              >
                {postShortData.autor}
              </Link>
            ) : (
              postShortData.autor
            )
          ) : (
            autor
          )}
        </div>
      </div>
      {!isNewPost && postShortData.date && (
        <div className="text-sm font-semibold">
          {date_time(postShortData.date as string).date}
        </div>
      )}

      {isNewPost && <ButtonNewPost />}
    </div>
  );
};

export default RightCol;
