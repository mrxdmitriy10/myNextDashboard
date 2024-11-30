"use client";

import htmlParser from "@/lib/htmlparser";

import RightCol from "./RightCol/RightCol";

import iPostBlog from "@/types/iPostBlog";

import { CommentsBlock } from "./Comments/CommentsBlock";


import { useEffect } from "react";


type Props = {
  post: iPostBlog;
  isNewPost: boolean;
};

const View: React.FC<Props> = ({ post, isNewPost }) => {






  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // !isNewPost&&post.id&&setDataPost(post.id)
  }, []);
  console.log(post);
  
  return (
    <main className="text-slate-700 grid grid-cols-10 gap-8 sm:gap-4 xl:p-10">
      <div className="col-span-10 lg:col-span-8 grid gap-5">
        <div className="font-light text-2xl p-2 sm:p-8 text-purple-500 border-orange-500 border-b-2">
          {post.title}
        </div>
        <div className="w-full font-light text-justify sm:p-8 p-2">
          {htmlParser.parse(post.content)}
        </div>
      </div>
      <div className="col-span-10 lg:col-span-2">
        <RightCol
          autor={isNewPost ? post.autor : undefined}
          isNewPost={isNewPost}
        />
      </div>
      {!isNewPost && (
        <div className="col-span-10 border grid gap-7 p-7 sm:p-18">
          <CommentsBlock post_id={post.id as number} />
        </div>
      )}
    </main>
  );
  // ):<div className={'w-auto m-auto text-4xl'}>Загрузка</div>
};

export default View;
