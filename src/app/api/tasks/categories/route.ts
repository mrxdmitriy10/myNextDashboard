
import prisma from '@/prisma';

import { NextResponse } from "next/server"


 
export async function GET() {
    try {
        const res = await prisma.catTasks.findMany()
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error fetching cattasks:', error);
        return NextResponse.json({ error: 'Error fetching cattasks' }, { status: 500 });
    }


}