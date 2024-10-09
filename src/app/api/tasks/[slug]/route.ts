
import prisma from '@/prisma';

import { NextResponse } from "next/server"



export async function GET(request: Request, { params }: { params: { slug: string } }) {

    try {
        const res = await prisma.tasks.findMany({ where: { category: params.slug }, orderBy: { id: 'desc' } });
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return NextResponse.json({ error: 'Error fetching tasks' }, { status: 500 });
    }
}



export async function PUT(request: Request, { params }: { params: { slug: string } }) {
    const { text_task }: { text_task: string } = await request.json()
    if (!text_task) return NextResponse.json({ error: 'The data is empty' }, { status: 400 })
    try {
        await prisma.tasks.create({ data: { category: params.slug, text: text_task } })
        return GET(request, { params })
    } catch (error) {
        console.error('Error put tasks:', error);
        return NextResponse.json({ error: 'Error add tasks to cat' }, { status: 500 });
    }
}




export async function DELETE(request: Request, { params }: { params: {slug: string} }) {

    try {
        const res = await prisma.tasks.delete({ where: { id: Number(params.slug) }});
        return NextResponse.json(res);
    } catch (error) {
        console.error(`Error delete task: ${params.slug}`, error);
        return NextResponse.json({ error: `Error delete task: ${params.slug}` }, { status: 500 });
    }

}


