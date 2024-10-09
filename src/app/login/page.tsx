'use client'
import { signIn, useSession } from 'next-auth/react';
 
import { auth } from "@/auth";


import { LoginButton } from '@telegram-auth/react';
const Page =()=> {
    const session =  useSession()
    console.log(session);
    
    return (

        <div className="App">

            <LoginButton
                botUsername={'aaa_o00oxzdbot'}

                onAuthCallback={(data) => {
                    console.log(data);
                    const res = signIn('credentials', {
                        redirect: true,
                        ...data // передаем данные от Telegram
                      })
                    console.log(res);
                }}
                />
                </div>
    )
}
                   
                   
                   
                    //   if (res?.error) {
                    //     console.error("Authentication failed:", res.error);
                    //   } else {
                    //     // Успешная аутентификация, можем перенаправить пользователя
                    //     // Например, на главную страницу
                    //     console.log('Yeeeeaaah!!!');

        
        export default Page
                    
                    

                    // console.log(res);
                    

                    //   if (res?.error) {
                    //     console.error("Authentication failed:", res.error);
                    //   } else {
                    //     // Успешная аутентификация, можем перенаправить пользователя
                    //     // Например, на главную страницу
                    //     console.log('Yeeeeaaah!!!');
                        
                    //   }
                    
                    // signIn('telegram')
                    // call your backend here to validate the data and sign in the user

{/* <LoginButton
			botUsername={botUsername}
			onAuthCallback={(data) => {
				signIn("telegram-login", { callbackUrl: "/" }, data as any);
			}}
		/> */}


            {/* <LoginButton
                botUsername={'aaa_o00oxzdbot'}
                authCallbackUrl="/api/user/auth/"
                buttonSize="large" // "large" | "medium" | "small"
                cornerRadius={5} // 0 - 20
                showAvatar={true} // true | false
                lang="ru"
            /> */}
