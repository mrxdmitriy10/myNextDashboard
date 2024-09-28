import iPostBlog  from '@/types/iPostBlog';

import  prisma  from '@/lib/prisma';
import { NextRequest, NextResponse } from "next/server"
import { NextApiRequest, NextApiResponse } from 'next';


const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  

export async function GET() {
    try {
        const res = await prisma.blogPosts.findMany()
        return NextResponse.json(res);
    } catch (error) {
        console.error('Error fetching blog_posts:', error);
        return NextResponse.json({ error: 'Error fetching blogposts' }, { status: 500 });
    }

}

export async function POST(req: Request) {

    
    try{
        const data:iPostBlog = await req.json()
        const res = await prisma.blogPosts.create({data: {tittle: data.tittle, autor: data.autor, content: data.content, category: data.category}})
        await delay(5000)
        return NextResponse.json(res);
    }
    catch (error) {
        console.error('Error add Post in  blog_posts:', error);
        return NextResponse.json({ error: 'Error add Post in  blog_posts:' }, { status: 500 });
    }



     ///// ТУТ закончил
//     return NextResponse.json(200);

// }
}