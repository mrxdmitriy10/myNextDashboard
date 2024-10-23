"use client";


import { signOut_func } from "@/lib/SignOut";
import Link from "next/link";

const signOutBtn = () => {



  return (
    <Link href="#" onClick={signOut_func}>
      Выход
    </Link>
  );
};

export default signOutBtn;
