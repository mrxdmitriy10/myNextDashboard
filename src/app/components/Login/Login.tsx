
'use client'
import SignOutBtn from "./signOutBtn";


import { useSession } from "next-auth/react";
import { useState } from "react";
// import { usePathname } from "next/navigation";


import { signInt_func } from "@/lib/SignIn";
import { LoginButton } from "@telegram-auth/react";

const Login = ({children}:{children: React.ReactNode}) => {




  const [visibleAuthMethod, setVisibleAuthMethod] = useState<boolean>(false)


  const session = useSession()
  return (
    <>

      {!session.data?.user&&<div className={`flex gap-3 ${!visibleAuthMethod && 'hidden'}`}>
        <div>
          GitHub
        </div>
        <div>
        <LoginButton
          buttonSize='medium'
          botUsername={'aaa_o00oxzdbot'}
          onAuthCallback={signInt_func}
          lang="ru"
          showAvatar={false}
        />
        </div>
      </div>}


      <div>{session?.data?.user && <a href={`https://t.me/${session.data?.user?.telegram_username}`}>@{session.data?.user?.telegram_username}</a>}</div>
      <div>
        {session?.data?.user ? <SignOutBtn /> : !visibleAuthMethod && <button onClick={() => !visibleAuthMethod ? setVisibleAuthMethod(!visibleAuthMethod) : setVisibleAuthMethod(!visibleAuthMethod)}>{children}</button>}
      </div>


    </>
  );
}

export default Login