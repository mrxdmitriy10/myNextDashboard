"use client";

import { MouseEvent } from "react";

import Link from "next/link";

import iPostBlog from "@/types/iPostBlog";
import ClampLines from "react-clamp-lines";
import htmlParser from "@/lib/htmlparser";
import { usedelStore } from "@/store/blog/blog.store";

type Props = {
  post: iPostBlog;
};
export const Card: React.FC<Props> = ({ post }): JSX.Element => {
  const delStore = usedelStore();

  const delPost = async (id: number) => {
    delStore.setdelID(id);
    delStore.setOpenModal(true);
  };

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!post.id) return;
    if (delStore.delState) {
      e.preventDefault();
      delPost(post.id);
      delStore.setdelState(false);
    }
  };

  return (
    <div
      className={`group bg-white border p-4 2xl:px-14 2xl:pr-48 pr-32 lg:pr-10 text-xm 
        hover:drop-shadow-lg bg-clip-border rounded-xl drop-shadow-2xl text-gray-700 
        transition-all ${delStore.delState && "hover:text-red-500"}`}
    >
      <Link onClick={onClick} href={"/blog/" + post.id}>
        {/* <PostImg /> */}

        <div
          className="flex flex-col justify-between w-auto 
        lg:max-w-80 min-h-40 lg:min-h-52
        pl-2 overflow-hidden"
        >
          <div className="flex justify-between justify-items-center">
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
            text={htmlParser.parse(post.content.replace(/(<([^>]+)>)/gi, ""))}
          />

          <p
            className={
              "text-blue-600 text-sm antialiased transition-all opacity-0 group-hover:opacity-100"
            }
          >
            Читать продолжение
          </p>
        </div>
      </Link>
    </div>
  );
};
