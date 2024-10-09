import { AdapterUser } from './../node_modules/@auth/core/adapters.d';
import { NextApiRequest } from 'next';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { User } from "next-auth";
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
import Credentials from "next-auth/providers/credentials";
import { TelegramUserData, urlStrToAuthDataMap } from '@telegram-auth/server/utils';

import { Session } from "inspector/promises";
import Providers from "next-auth/providers";

import TelegramAuth from '@telegram-auth/server';
import credentials from 'next-auth/providers/credentials';

export type UserType = {
		id: string
		name: string;
		image: string;
		telegram_username?: string;
		telegram_id?: string;
		provider?: 'github' | 'telegram'
	
}

declare module "next-auth" {
	interface Session {
		user: UserType
	}
}


// Функция для создания или обновления пользователя
async function createUserOrUpdate(user: any) {
  // Ваша логика по созданию или обновлению пользователя в базе данных
}


export const { handlers, auth, signIn } = NextAuth({
  providers: [
    Credentials({
      credentials: {},
	  async authorize(credentials, req) {


			const validator = new AuthDataValidator({
				botToken: `${process.env.BOT_TOKEN}`,
			});

			
			const u = {

				id: Number(credentials.id),
				first_name: credentials.first_name,
				username: credentials.username,
				photo_url: credentials.photo_url,
				auth_date:  credentials.auth_date,
				hash: credentials.hash,
			}

			
			const data = objectToAuthDataMap(u || {});
			console.log((data));
			
			const user = await validator.validate(data);
			console.log(user);
			


			if (user.id && user.first_name) {
				const telegram_user_info:UserType = {
					id: user.id.toString() as string,
					telegram_id: user.id.toString(),
					telegram_username: user.username,
					name: user.username as string,//[user.first_name, user.last_name || ""].join(" "),
					image: user.photo_url as string,
					provider: 'telegram'
				};

				try {
					// await createUserOrUpdate(user);
					return telegram_user_info as UserType;

				} catch {
					console.log(
						"Something went wrong while creating the user."
					);
				}

			}
			return null;
		
	  },
	  })
	],



	//   callbacks: {
	// 	async session({ session, user, token }) {

	// 		session = user
	// 		return session;
	// 	},
	// },
	// pages: {
	// 	signIn: "/",
	// 	signOut: "/",
	// 	error: "/login",
	// },
})