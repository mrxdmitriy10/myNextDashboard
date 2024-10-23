import { signOut } from "next-auth/react";

export const signOut_func = async () => 
    {
        await signOut({redirect: false,})
        
}