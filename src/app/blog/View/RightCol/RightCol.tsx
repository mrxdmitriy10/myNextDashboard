"use client";

import Like from "./Like";

import ButtonNewPost from "./ButtonNewPost";



import date_time from "@/lib/formatDate";

export type Props = {
  postInfo: {
    date?: string;
    autor: string;
  };

  isNewPost: boolean;
};

const RightCol: React.FC<Props> = ({ isNewPost, postInfo }) => {
  return (
    <div className="gap-5 text-right flex-1">
      <ButtonNewPost/>
      <div>{postInfo.autor}</div>
      {postInfo.date ? (
        <div>{date_time(postInfo.date as string).date}</div>
      ) : (
        <></>
      )}
      <Like active={!isNewPost} />
    </div>
  );
};

export default RightCol;
