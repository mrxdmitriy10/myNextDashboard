import prisma from "@/prisma";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prisma.blogComments.findMany({
      where: { post_id: Number(params.id) },
      orderBy: { id: "desc" },
      include: {
        author: {
          select: {
            name: true, // Получаем только поле username
          },
        },
      },
    });
    console.log("comment", res);
    
    return NextResponse.json(res);
  } catch (error) {
    console.error(`Error fetching comment post: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error fetching comment post: ${params.id}` },
      { status: 500 }
    );
  }
}

export type newcomment_data = {
  post_id: number;
  text: string;
  autor_id: string;
};

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data: newcomment_data = await req.json();
    const res = await prisma.blogComments.create({
      data: {
        post_id: Number(params.id),
        comment: data.text,
        author_id: data.autor_id,
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error add comment in  comment:", error);
    return NextResponse.json(
      { error: "Error add comment in  comment:" },
      { status: 500 }
    );
  }
}
