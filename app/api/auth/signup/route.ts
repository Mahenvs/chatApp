import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
const signUpSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }), // Ensure it's not empty
    email: z.string().email({ message: "Invalid email address" }),     // Email validation
    password: z.string().min(6, { message: "Password must be at least 6 characters" }) // Password length check
});
export async function POST(req: NextRequest) {

    const parseResult = signUpSchema.safeParse(await req.json());
    console.log(parseResult?.error?.message);
    if (!parseResult.success) {
        return NextResponse.json(
            { error: "Invalid Creds" },
            { status: 500 })
    }

    return NextResponse.json({
        msg: "I am signup"
    })
}
export async function GET() {
    return NextResponse.json({
        msg: "USER REQUSR"
    })
}