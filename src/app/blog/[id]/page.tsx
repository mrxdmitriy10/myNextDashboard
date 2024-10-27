import React from "react";
import View from "@/app/components/Blog/View/View";

import { notFound } from "next/navigation";

import { Metadata } from "next";
import iPostBlog from "@/types/iPostBlog";



async function fetchPost(id: string) {

  
  const res = await fetch(`${process.env.API_BASE_URL}/api/blog/${id}`, {
  cache: 'force-cache'
  });
  
  return res.json() as Promise<iPostBlog>;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const post = await fetchPost(params.id);
  if (!post) {
    return {
      title: "Статья не найдена",
      description: "Не удалось найти эту статью.",
    }; // Если статья не найдена, возвращаем стандартные метаданные
  }

  return {
    title: post.title, // Заголовок статьи
    description: post.title, // Описание статьи
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  try {

    
    const post = await fetchPost(params.id);

    if (!post) return notFound();



    return <View post = {post} isNewPost={false} />;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return notFound();
  }
}
