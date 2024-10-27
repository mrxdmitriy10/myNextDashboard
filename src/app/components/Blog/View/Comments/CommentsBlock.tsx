import date_time from "@/lib/formatDate";

import { useEffect } from "react";
import InputNewComment from "./InputNewComment";
import { useCommentsStore } from "@/store/blog/comments.store";




type comment = {
  id: number;
  autor: string;
  comment: string;
  date: string;
};

type Props = {
  post_id: number;
};

export const CommentsBlock = ({ post_id }: Props) => {
const commentsStore = useCommentsStore()




  useEffect(() => {
    commentsStore.fetch(post_id)


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InputNewComment
        post_id={post_id}

      />
      {commentsStore.loading ? (
        <>Загрузка комментариев</>
      ) : !commentsStore.data.length ? (
        <p>Комментариев нет, будь первым</p>
      ) : (
        commentsStore.data.map((i: comment) => {
          return (
            <div key={i.id} className="w-full grid gap-1">
              <span className="font-sans  text-white w-full bg-purple-500 flex flex-nowrap justify-between">
                <span className="my-auto px-2 sm:px-5 font-semibold">
                  {i.autor}
                </span>
                <span className="my-auto px-2 sm:px-10 font-light">
                  {date_time(i.date).date}
                </span>
              </span>
              <p className="m-5 flow-root ">{i.comment}</p>
            </div>
          );
        })
      )}
    </>
  );
};
