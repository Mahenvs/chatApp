import { NextResponse } from "next/server";
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient()

export async function GET() {
    // const body = await
    // const dat= await client.user.create({
    //     data:{
    //         username:"Mahe",
    //         email:"mahe@gmail.com"
    //     }
    // })
    const users = await client.user.findMany(); // Fetch all users
    console.log(users);

    // console.log(dat);
    
    return NextResponse.json({
        msg:"USER REQUSR"
    })
}