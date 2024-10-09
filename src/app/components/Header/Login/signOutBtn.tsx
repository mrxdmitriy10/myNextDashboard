'use client'
import { signOut } from 'next-auth/react';

import Link from "next/link";

const  signOutBtn= () => {
    return ( 
        <Link href='#' onClick={()=>signOut({callbackUrl: "/"})}>Выход</Link>
    );
}



export default signOutBtn