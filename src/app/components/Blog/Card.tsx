"use client";

import { MouseEvent } from "react";

import Link from "next/link";

import iPostBlog from "@/types/iPostBlog";
import ClampLines from "react-clamp-lines";

import Image from "next/image";
import { usedelStore } from "@/store/blog/delPost.store";

type Props = {
  post: iPostBlog;
};
export const Card: React.FC<Props> = ({ post }): JSX.Element => {
  const delStore = usedelStore();

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!post.id) return;
    if (delStore.delState) {
      e.preventDefault();

      delStore.setdelID(post.id);
      delStore.setOpenModal(true);
      delStore.setdelState(false);
    }
  };
  console.log(post);

  return (
    <div
      className={`group bg-white border p-4 2xl:px-14 text-xm 
        hover:drop-shadow-lg bg-clip-border rounded-xl drop-shadow-2xl text-gray-700 
        transition-all ${delStore.delState && "hover:text-red-500"}`}
    >
      <Link onClick={onClick} href={"/blog/" + post.id}>
        {/* <PostImg /> */}

        <div
          className="inline-flex flex-col justify-between 
        lg:w-80 min-h-40 lg:min-h-52
        pl-2 overflow-hidden"
        >
          {/* cat + id */}
          <div className="">
            <p
              className="w-full antialiased text-xs font-mono
                            font-light text-inherit mb-2 
                            "
            >
              [{post.category}] [{post.id}]
            </p>
          </div>

          <span
            className="block antialiased tracking-normal 
                                        font-sans text-xm font-semibold 
                                        leading-snug text-blue-gray-500 mb-2 
                                        normal-case transition-colors 
                                        "
          >
            {post.title}
          </span>

          <ClampLines
            className="     
                            antialiased
                            whitespace-normal
                            inline-block
                            w-3/4

                            font-sans text-sm 
                            !text-gray-600"
            lines={3}
            ellipsis="..."
            buttons={false}
            id={"content"}
            text={post.content}
          />

          {/* read and likes */}
          <div className="flex justify-between gap-8 items-end text-lg ">
            <p
              className={
                "text-blue-600 text-sm antialiased transition-all opacity-0 group-hover:opacity-100"
              }
            >
              Читать продолжение
            </p>
            <div className="flex gap-2">
              <span className="flex gap-2 font-light ">
                <Image
                  alt="Количество комментариев"
                  src="comm_qwe.svg"
                  width={30}
                  height={30}
                />
                <div> {post._count.BlogComments} </div>
              </span>
              <span className="flex gap-2 font-light">
                <Image
                  alt="Колличество лайков"
                  src="like_new.svg"
                  width={30}
                  height={30}
                />
                <div> {post.likes}</div>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
