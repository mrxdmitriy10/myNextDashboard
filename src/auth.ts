
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { objectToAuthDataMap, AuthDataValidator, TelegramUserData } from "@telegram-auth/server";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"

import { Session } from "inspector/promises";
import axios from "axios";
// import prisma from "@/prisma"

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
declare module "next-auth" {
	interface User {
		telegram_username?: string | null;
		telegram_id?: string | null;
		role: string
		provider: string | 'telegram' | 'github'

	}
}



export const { handlers, auth, signIn } = NextAuth({
	providers: [
		Credentials({
			credentials: {},
			async authorize(credentials:any, req) {
				const validator = new AuthDataValidator({
					botToken: `${process.env.BOT_TOKEN}`,
				});
				const u = {
					id: Number(credentials.id),
					first_name: credentials.first_name,
					username: credentials.username,
					photo_url: credentials.photo_url,
					auth_date: credentials.auth_date,
					hash: credentials.hash,
				}

				const data = objectToAuthDataMap(u || {});
				// console.log((data));
				const user = await validator.validate(data);
				// console.log(user);
				//
				if (user.id && user.first_name && user.username) {
					const telegram_user_info: any = {
						// id: user.id.toString() as string,
						telegram_id: user.id.toString(),
						telegram_username: user.username as string,
						name: [user.first_name, user.last_name || ""].join(" "),
						image: user.photo_url as string,

					};

					const DB_TG_USER   = prisma.user.upsert({
						where: {
							telegram_id: user.id.toString(),
						},
						create: {
							telegram_id: user.id.toString(),
							telegram_username: user.username as string,
							name: [user.first_name, user.last_name || ""].join(" "),
							image: user.photo_url as string,
							provider: 'telegram'
						},
						update: {
							telegram_username: user.username as string,
							name: [user.first_name, user.last_name || ""].join(" "),
							image: user.photo_url as string,
							provider: 'telegram'
						},
					})

					console.log(await DB_TG_USER);
					
					return DB_TG_USER
				}
				return null;
			},
		})
	],

	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 24 * 60 * 60
	},

	callbacks: {


		async jwt({ token, user }) {

			if (user) {
				token.name = user.name
				token.id = user.id
				token.image = user.image
				token.provider = user.provider; // предположим, что у вас есть свойство id у пользователя
				token.telegram_username = user.telegram_username; // предположим, что у вас есть свойство id у пользователя
				token.telegram_id = user.telegram_id; // пример дополнительного поля
				token.role = user.role; // пример дополнительного поля

			}
			return token;
		},
		async session({ session, token }: { session: any, token: any }) {
			// Добавьте данные из токена в объект сессии
			session.user.id = token.id
			session.user.name = token.name
			session.user.image = token.image

			session.user.provider = token.provider as "telegram"
			session.user.role = token.role
			session.user.telegram_id = token.telegram_id
			session.user.telegram_username = token.telegram_username

			return session;
		}
	}
})