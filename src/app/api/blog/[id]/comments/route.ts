import { newpost_data } from '@/app/blog/View/Comments/InputNewComment';
import prisma from '@/prisma';


import { NextResponse } from "next/server"



export async function GET(request: Request, { params }: { params: {id: string} }) {


    try {
        const res = await prisma.blogComments.findMany({ where: { post_id: Number(params.id) }, orderBy: { id: 'desc' }});

        
        return NextResponse.json(res);
    } catch (error) {
        console.error(`Error fetching comment post: ${params.id}`, error);
        return NextResponse.json({ error: `Error fetching comment post: ${params.id}` }, { status: 500 });
    }

}


export async function POST(req: Request) {

    
    try{
        const data:newpost_data = await req.json()
        const res = await prisma.blogComments.create({data: {post_id: data.post_id, comment: data.text, autor: data.username }})

        return NextResponse.json(res);
    }
    catch (error) {
        console.error('Error add comment in  comment:', error);
        return NextResponse.json({ error: 'Error add comment in  comment:' }, { status: 500 });
    }
}
