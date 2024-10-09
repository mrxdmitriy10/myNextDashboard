
import { signIn } from '@/auth';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { SHA256 as sha256 } from "crypto-js";
// import prisma client

import { objectToAuthDataMap, AuthDataValidator, urlStrToAuthDataMap } from "@telegram-auth/server";

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export async function GET(req: any, res: NextApiResponse) {
  try {
      const validator = new AuthDataValidator({
        botToken: `${process.env.BOT_TOKEN}`,})

      const data = urlStrToAuthDataMap(req.url || {});
      
      const res = await signIn("credentials", {
                redirect: false,
                ...data, // передаем данные от Telegram
              });

      return NextResponse.json({})
  } catch (error) {
      console.error('Error auth:', error);
      return NextResponse.json({ error: 'Error auth' }, { status: 500 });
  }

}
