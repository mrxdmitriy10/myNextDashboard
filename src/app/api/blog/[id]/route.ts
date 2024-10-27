import prisma from "@/prisma";

import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prisma.blogPosts.findUnique({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error(`Error fetching post: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error fetching post: ${params.id}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await prisma.blogPosts.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error(`Error delete post: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error delete post: ${params.id}` },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data: { type: string } = await request.json();
  console.log("data" + data.type);

  try {
    if (data.type == "increment") {
      await prisma.blogPosts.update({
        where: { id: Number(params.id) },
        data: { likes: { increment: 1 } },
      });
    } else {
      await prisma.blogPosts.update({
        where: { id: Number(params.id) },
        data: { likes: { decrement: 1 } },
      });
    }

    return NextResponse.json(200);
  } catch (error) {
    console.error(`Error like post: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error like post: ${params.id}` },
      { status: 500 }
    );
  }
}
