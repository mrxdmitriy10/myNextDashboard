"use client";
import SignOutBtn from "./signOutBtn";

import { useState } from "react";


import { signInt_func } from "@/lib/SignIn";
import { LoginButton } from "@telegram-auth/react";

import { useSession } from "next-auth/react";


const Login = ({ children }: { children: React.ReactNode }) => {
  const [visibleAuthMethod, setVisibleAuthMethod] = useState<boolean>(false);

  const session = useSession().data




  return (
    <>
      {!session?.user && (
        <div className={`flex gap-3 ${!visibleAuthMethod && "hidden"}`}>
          <div>GitHub</div>
          <div>
            <LoginButton
              buttonSize="medium"
              botUsername={"aaa_o00oxzdbot"}
              onAuthCallback={signInt_func}
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
