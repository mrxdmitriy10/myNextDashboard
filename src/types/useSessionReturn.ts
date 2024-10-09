import { Session } from "next-auth";


type UseSessionReturn = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

export default UseSessionReturn