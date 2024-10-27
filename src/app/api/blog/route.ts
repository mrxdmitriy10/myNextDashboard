import iPostBlog from "@/types/iPostBlog";

import prisma from "@/prisma";
import { NextResponse } from "next/server";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function GET() {
  try {
    const posts = (await prisma.blogPosts.findMany({
      select: {
        id: true,
        content: true,
        title: true,
        autor: true,
        category: true,
        likes: true,
        // Остальные поля поста
        _count: {
          select: {
            BlogComments: true, // Подсчитываем количество комментариев
          },
        },
      },
      orderBy: { id: 'desc' },
    }))
    

    const blogPostIds = posts.map(post => post.id);


    // 5. Преобразуем посты и добавляем количество комментариев
    const trimmedContent = posts.map((post) => ({
      ...post,
      content: post.content.replace(/<([^>]+)>/gi, "").slice(0, 250),

    }));


    return NextResponse.json(trimmedContent);
  } catch (error) {
    console.error("Error fetching blog_posts:", error);
    return NextResponse.json(
      { error: "Error fetching blogposts" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data: iPostBlog = await req.json();
    console.log('sss' + data);
    
    const res = await prisma.blogPosts.create({
      data: {
        title: data.title,
        autor: data.autor,
        content: data.content,
        category: data.category,
      },
    });
    await delay(5000);
    return NextResponse.json(res);
  } catch (error) {
    console.error("Error add Post in  blog_posts:", error);
    return NextResponse.json(
      { error: "Error add Post in  blog_posts:" },
      { status: 500 }
    );
  }
}
