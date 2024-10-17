/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// We impot our prisma client
import { hashPassword } from "@/lib/hashPassword";
import prisma from "@/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {

  // let errors = [];
  console.log(req.body);


  return res.status(201).json({ message: 'aaa' });

  try {
    const user = await prisma.user.create({
      data: { ...req.body, password: hashPassword(req.body.password) },
    });
    return res.status(201).json({ user });
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(400).json({ message: e.message });
      }
      return res.status(400).json({ message: e.message });
    }

    else {

      return res.status(400).json({ message: `Error create or update: ${e}` })
    }

  }
}



// We hash the user entered password using crypto.js

// function to create user in our database

