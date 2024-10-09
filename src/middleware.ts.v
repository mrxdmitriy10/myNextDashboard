
import { getToken } from "next-auth/jwt";
import  {auth}  from "@/auth"
import { NextResponse } from "next/server";


export {auth as middleware} from '@/auth'
// export default auth (async (req) => {
//     const secret = process.env.AUTH_SECRET
//     const token = await getToken({ req, secret});
//     const redirectUrl = new URL("api/auth/signin", req.url); // Перенаправляем на страницу входа
//     redirectUrl.searchParams.set("redirect", req.url);
//     if (!token)
//         return NextResponse.redirect(redirectUrl);

//     return NextResponse.next();


//     });


// export const config = {
// 	matcher: ['/blog:path'],
// };