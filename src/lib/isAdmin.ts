import { Session } from "next-auth/"



export const isAdmin = (session: Session | null) => {
    if (session?.user?.role=="admin") {
        return true
    } else {return false}

}

