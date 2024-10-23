import iPostBlog from "@/types/iPostBlog";

import prisma from "@/prisma";
import { NextResponse } from "next/server";

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function GET() {
  try {
    const res = (await prisma.blogPosts.findMany({
      orderBy: { id: "desc" },
    })) as iPostBlog[];
    const trimmedContent = res.map((i) => ({
      ...i,
      content: i.content.replace(/(<([^>]+)>)/gi, "").slice(0, 250),
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
