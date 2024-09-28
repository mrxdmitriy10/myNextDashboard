import prisma from '@/lib/prisma';

import { NextResponse } from "next/server"



export async function GET(request: Request, { params }: { params: {id: string} }) {

    try {
        const res = await prisma.blogPosts.findUnique({ where: { id: Number(params.id) }});
        return NextResponse.json(res);
    } catch (error) {
        console.error(`Error fetching post: ${params.id}`, error);
        return NextResponse.json({ error: `Error fetching post: ${params.id}` }, { status: 500 });
    }

}

export async function DELETE(request: Request, { params }: { params: {id: string} }) {

    try {
        const res = await prisma.blogPosts.delete({ where: { id: Number(params.id) }});
        return NextResponse.json(res);
    } catch (error) {
        console.error(`Error delete post: ${params.id}`, error);
        return NextResponse.json({ error: `Error delete post: ${params.id}` }, { status: 500 });
    }

}