import { Session } from "next-auth/"
import { UpdateSession } from "next-auth/react";
type sessiontype = {
    update: UpdateSession;
    data: Session;
    status: "authenticated";
} | {
    update: UpdateSession;
    data: null;
    status: "unauthenticated" | "loading";
}

export const isAdmin = (session: sessiontype) => {
    if (session.data?.user?.role=="admin") {
        return true
    } else {return false}

}

