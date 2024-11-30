import React from "react";
import View from "@/app/components/Blog/View/View";

import { notFound } from "next/navigation";

import { Metadata } from "next";
import iPostBlog from "@/types/iPostBlog";



async function fetchPost(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/blog/${id}`, {
    cache: "force-cache",
  });

  return res.json() as Promise<iPostBlog>;
}


export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post: iPostBlog | null = await fetchPost(params.id);
  if (!post) {
    return {
      title: "Статья не найдена",
      description: "Не удалось найти эту статью.",
    };
  }

  return {
    title: post.title,
    description: post.title,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  try {
    const post = await fetchPost(params.id);

    if (!post) return notFound();
    //Provider store redux
    return (

        <View post={post} isNewPost={false} />

    );
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return notFound();
  }
}
