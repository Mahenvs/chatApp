import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const searchUserSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  fromUser: z.string(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = searchUserSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid inp2ut", issues: parseResult.error.format() },
        { status: 400 }
      );
    }
    const { email, username, fromUser } = parseResult.data;

    console.log(email, username);
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
      select: {
        userId: true,
        username: true,
        email: true,
        id: true,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const existingConnection = await prisma.connections.findFirst({
      where: {
        userEmail: fromUser,
        connectedUserEmail: user.email,
      },
    });
    if (!existingConnection) {
      const connections = await prisma.connections.create({
        data: {
          userEmail: fromUser,
          connectedUserEmail: email,
        },
      });
      console.log(connections);
    }

    return NextResponse.json({ msg: "User found", user });
  } catch (error) {
    console.error("Error searching user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
