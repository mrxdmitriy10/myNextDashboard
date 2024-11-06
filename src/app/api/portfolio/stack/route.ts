import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        
        const res = await prisma.portfolioStack.findMany()

        
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error fetching stacksitem', error);
        return NextResponse.json({ error: 'Error fetching stacksitem' }, { status: 500 });
    }


}