import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { ipAddress }: { ipAddress: string } = await request.json();

  const res = await prisma.like.findMany({
    where: {
      ipAddress: ipAddress,
    },
  });

  return NextResponse.json(res);
}
