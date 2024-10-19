
import React from 'react';
import View from '../View/View';

import { notFound } from 'next/navigation';


import { Metadata } from 'next';

 export const dynamic = 'auto'
 export const dynamicParams = false


async function fetchPost(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/api/blog/${id}`, { cache: 'force-cache' })
  return res.json()
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {

  const post = await fetchPost(params.id);
  if (!post) {
    return { title: 'Статья не найдена', description: 'Не удалось найти эту статью.' }; // Если статья не найдена, возвращаем стандартные метаданные
  }

  return {
    title: post.tittle, // Заголовок статьи
    description: post.tittle, // Описание статьи
  };
}

export default async function Page({ params }: { params: {id: string} }) {

  try {

    const post = await fetchPost(params.id);

    if (!post) return notFound()
    return (
       <View post={post} isNewPost={false}/>    
    )
  } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return notFound();
    }
}