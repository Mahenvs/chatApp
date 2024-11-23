import { NEXT_AUTH } from "@/app/lib/auth";
import prisma from "@/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(NEXT_AUTH); // Fetch the session (or user info)
    
    if (!session) {
        return NextResponse.json({ msg: "Not Authorized" }, { status: 401 })
    }    
    const query = await prisma.user.findMany();
    return NextResponse.json({
        msg:"Users Fetched ",
        data:query
    })

}