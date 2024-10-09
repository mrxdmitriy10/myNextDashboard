

import SignOutBtn from "./signOutBtn";
import Link from "next/link";
import { auth } from "@/auth";

const LoginLine = async () => {
    const session = await auth()


    return ( 
        
        <div className='flex justify-end gap-5 text-sm'>
          <div>{session?.user && <a href={`https://t.me/${session.user.name}`}>@{session.user.name}</a>}</div>
          <div>
            {session?.user ? <SignOutBtn />:<Link href='/login'>Вход</Link>}
          </div>
        </div>
    );
}

export default LoginLine