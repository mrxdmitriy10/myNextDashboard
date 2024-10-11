import { TelegramAuthData } from "@telegram-auth/react";
import { signIn, SignInResponse } from "next-auth/react";


export const signInt_func = async (data: TelegramAuthData) => {

    const res:SignInResponse | undefined = await signIn('credentials', {
        redirect: false,
        ...data // передаем данные от Telegram
    })

    if (res?.error) {
        console.error("Authentication failed:", res.error);
    } else {
        // Успешная аутентификация, можем перенаправить пользователя
        // Например, на главную страницу
        console.log('Auth!!!');
    }
}