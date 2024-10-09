/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaAdapter } from "@auth/prisma-adapter"



import type { User } from "next-auth"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"


import prisma from "@/prisma"
import { hashPassword } from "./lib/hashPassword"




export const { handlers, signIn, signOut, auth } = NextAuth({
    // adapter: PrismaAdapter(prisma),
    providers: [
        // GitHub({ clientId: process.env.GITHUB_CLIENT_ID as string, clientSecret: process.env.GITHUB_CLIENT_SECRET as string }),  
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
              username: {label: 'username', type: 'username'},
              password: {label: 'password', type: 'password'},
            },
            authorize: async (credentials) => {
                if(!credentials?.username || !credentials?.password) return null
                let user = null
                // logic to salt and hash password
                // const pwHash = hashPassword(credentials.password)
                user = {id: '1', name: 'alex'} as User
                // logic to verify if the user exists
                //   user = await getUserFromDb(credentials.email, pwHash)
                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error("User not found.")
                }
                // return user object with their profile data

                return user as User
            }
        }),
    ]
    // secret: process.env.NEXTAUTH_SECRET,
    // session: { strategy: "jwt", maxAge: 24 * 60 * 60 },

    // jwt: {
    //     secret: process.env.NEXTAUTH_SECRET,
    //     maxAge: 60 * 60 * 24 * 30,

    //   },


    // callbacks: {
    //     async jwt({ token, user }) {
    //        if (user) {
    //           token.id = user.id;
    //        }
    //        return token;
    //     },
        
    //     async session({ session, user, token }) {

    //         if (user !== null) {
        
    //             session.user = user;
    //           }
    //         return  session;
    //     },
    //  },

    // pages: {
    //     signIn: "/login",
    //     signOut: "/login",
    //     error: "/login",
    //   },


})



