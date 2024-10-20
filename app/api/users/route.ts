import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
    const query = await prisma.user.findMany();
    return NextResponse.json({
        msg:"Users Fetched ",
        data:query
    })

}