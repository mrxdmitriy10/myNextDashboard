import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prisma.blogPosts.findUnique({
      where: { id: Number(params.id) },
      select: {
        date: true,
        autor: true,
        _count: {
          select: {
            likes: true, // Подсчитываем количество комментариев
          },
        },
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error(`Error fetching shortdata post: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error fetching shortdata post: ${params.id}` },
      { status: 500 }
    );
  }
}
