import date_time from "@/lib/formatDate";

import { useEffect } from "react";
import InputNewComment from "./InputNewComment";
import { commentType, useCommentsStore } from "@/store/blog/comments.store";






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
        commentsStore.data.map((i:commentType) => {
          return (
            <div key={i.id} className="w-full grid gap-1 ">
              <span className="font-sans  text-orange-600 w-full border-b-2 border-purple-500 flex flex-nowrap justify-start">
                <span className="my-auto px-2 sm:px-5 font-semibold">
                  {i.author.name}
                </span>
                <span className="my-auto text-sm font-light text-purple-800">
                  {date_time(i.date).date}
                </span>
              </span>
              <p className="m-2 flow-root text-purple-900">{i.comment}</p>
            </div>
          );
        })
      )}
    </>
  );
};
