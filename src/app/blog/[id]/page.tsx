
import React from 'react';
import View from '../View/View';

import { notFound } from 'next/navigation';
import iPostBlog from '@/types/iPostBlog';
import axios from 'axios';



// export const dynamic = 'auto'
// export const dynamicParams = false





// export async function generateStaticParams() {
//   const res = await fetch('http://localhost:5000/blog')

//   let posts: iPostBlog[] = await res.json() as iPostBlog[]
//   return posts.map((post) => ({id: post.id}.toString()))
//   return []

// }

export const revalidate = 10;

export default async function Page({ params }: { params: {id: string} }) {
    
  try {

    
    const res = await axios.get<iPostBlog>(`${process.env.API_BASE_URL}/api/blog/${params.id}`)
    const post = res.data
    if (!post) return notFound()
    return (
       <View post={post} isNewPost={false}/>    
    )
  } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return notFound();
    }
}

