import prisma from '@/lib/prisma';

import { NextResponse } from "next/server"



export async function GET(request: Request, { params }: { params: {id: string} }) {


    try {
        const res = await prisma.blogComments.findMany({ where: { post_id: Number(params.id) }, orderBy: { id: 'desc' }});
        console.log(res); 
        
        return NextResponse.json(res);
    } catch (error) {
        console.error(`Error fetching comment post: ${params.id}`, error);
        return NextResponse.json({ error: `Error fetching comment post: ${params.id}` }, { status: 500 });
    }

}