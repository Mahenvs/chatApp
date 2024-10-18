import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";

const client = new PrismaClient();

export async function GET(request) {
    // const session = await auth();
    // console.log(session);
    const session = await getServerSession(NEXT_AUTH)
    console.log("session ",session);
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("userEmail"); // Get userId from query params

    if (!email) {
        return NextResponse.json(
            { error: "User ID is required" },
            { status: 400 }
        );
    }

    try {
        const user = await client.connections.findMany({
            where: {
                userEmail: email, // Use the userId field defined in your model
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
