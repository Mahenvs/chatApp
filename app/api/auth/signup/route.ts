import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import bcrypt from "bcrypt";
import prisma from "@/db";

const signUpSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }), // Ensure it's not empty
    email: z.string().email({ message: "Invalid email address" }),     // Email validation
    password: z.string().min(6, { message: "Password must be at least 6 characters" }) // Password length check
});
export async function POST(req: NextRequest) {

    const parseResult = signUpSchema.safeParse(await req.json());
    if (!parseResult.success) {
        return NextResponse.json(
            { error: "Invalid Credentials" },
            { status: 500 })
    }
    //console.log(prisma);

    const { username, email, password } = parseResult.data;

    const hashedPswd = await bcrypt.hash(password, 10);
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (userExist) {
            return NextResponse.json({
                msg: "User already exist, change your username"
            },
                { status: 500 })
        }
        const user = await prisma.user.create({
            data: {
                username,
                email,
                hashedPswd
            }
        })
        return NextResponse.json({
            msg: user ? "SignUp Success!" : "Failed to signUp!",
        }, { status: user ? 201 : 500 }); // 201 for created

    } catch (error: unknown) {
        console.error(error);
        return NextResponse.json({
            msg: "Network Error "
        }, { status: 500 })

    }
}
export async function GET() {
    return NextResponse.json({
        msg: "USER REQUSR"
    })
}