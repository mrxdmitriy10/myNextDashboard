"use client";
import SignOutBtn from "./signOutBtn";

import { useState } from "react";


import { signIn_telegram } from "@/lib/SignIn_Telegram";
import { LoginButton } from "@telegram-auth/react";

import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";


const Login = ({ children }: { children: React.ReactNode }) => {
  const [visibleAuthMethod, setVisibleAuthMethod] = useState<boolean>(false);

  const session = useSession().data




  return (
    <>
      {!session?.user && (
        <div className={`flex gap-3 text-black  ${!visibleAuthMethod && "hidden"}`}>
          <div className="hover:text-blue-600 transition-all" onClick={async ()=>await signIn('github')}>GitHub</div>
          <div className="hover:text-blue-600 transition-all" onClick={async ()=>await signIn('google')}>Google</div>
          <div>
            <LoginButton
              buttonSize="medium"
              botUsername={"aaa_o00oxzdbot"}
              onAuthCallback={signIn_telegram}
              lang="ru"
              showAvatar={false}
            />
          </div>
        </div>
      )}

      <div>
        {session?.user?.provider == "telegram" && (
          <a href={`https://t.me/${session?.user.telegram_username}`}>
            @{session.user?.telegram_username}
          </a>
        )}
      </div>
      <div>
        {session?.user ? (
          <SignOutBtn />
        ) : (
          !visibleAuthMethod && (
            <button
              onClick={() =>
                !visibleAuthMethod
                  ? setVisibleAuthMethod(!visibleAuthMethod)
                  : setVisibleAuthMethod(!visibleAuthMethod)
              }
            >
              {children}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Login;
