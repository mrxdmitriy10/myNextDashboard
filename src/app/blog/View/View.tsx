"use client";

import htmlParser from "@/lib/htmlparser";

import RightCol from "./RightCol/RightCol";
import axios from "axios";

import iPostBlog from "@/types/iPostBlog";


import { CommentsBlock } from "./Comments/CommentsBlock";

import { useSession } from "next-auth/react";

type Props = {
  post: iPostBlog;
  isNewPost: boolean;
};

const View: React.FC<Props> = ({ post, isNewPost }) => {


  const session = useSession();

  return (
    <main className="text-slate-700 grid grid-cols-10 gap-8 sm:gap-4 sm:p-10">
      <div className="col-span-10 sm:col-span-8 grid gap-5">
        <div className="font-light text-2xl p-2 sm:p-8 bg-purple-200 text-purple-500">
          {post.title}
        </div>
        <div className="w-full font-light text-justify sm:p-8 p-2">
          {htmlParser.parse(post.content)}
        </div>
      </div>
      <div className="col-span-10 sm:col-span-2">
        <RightCol
          postInfo={{
            date: post.date,
            autor: post.autor,
          }}
          isNewPost={isNewPost}
        />
      </div>
      {!isNewPost && (
        <div className="col-span-10 border p-2 sm:p-8 grid gap-7">
          <CommentsBlock session={session} post_id={post.id as number} />
        </div>
      )}
    </main>
  );
};

export default View;
