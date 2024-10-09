/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// We impot our prisma client
import { hashPassword } from "@/lib/hashPassword";
import prisma from "@/prisma";
// Prisma will help handle and catch errors
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req:NextApiRequest, res:NextApiResponse) {

    let errors = [];
    const { name, email, password } = req.body;
   
    if (password.length < 6) {
      errors.push("password length should be more than 6 characters");
      return res.status(400).json({ errors });
    }
    try {
      const user = await prisma.user.create({
        data: { ...req.body, password: hashPassword(req.body.password) },
      });
      return res.status(201).json({ user });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          return res.status(400).json({ message: e.message });
        }
        return res.status(400).json({ message: e.message });
      }
    }
}



// We hash the user entered password using crypto.js

// function to create user in our database

 