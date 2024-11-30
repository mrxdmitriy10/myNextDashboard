import prisma from "@/prisma";


import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  
  try {
    console.log(request);

    const { ipAddress }: { ipAddress: string } = await request.json();
    

    const res = await prisma.like.findFirst({
      where: {
        postId: Number(params.id),
        ipAddress: ipAddress,
      },
    });
    if (res) {
      return NextResponse.json({ message: "Already liked" }, { status: 409 });
    }
    const like = await prisma.like.create({
      data: {
        postId: Number(params.id),
        ipAddress: ipAddress,
      },
    });
    return NextResponse.json({ like }, { status: 201 });
  } catch (error) {
    console.error(`Error fetch post like: ${params.id}`, error);
    return NextResponse.json(
      { error: `Error fetch post like:  ${params.id}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { ipAddress }: { ipAddress: string } = await request.json();

  try {
    await prisma.like.deleteMany({
      where: {
        postId: Number(params.id),
        ipAddress: ipAddress,
      },
    });
    return NextResponse.json({status: 204});

    
  } catch (error) {
    console.log(error);
  }
}
