// import { NextRequest, NextResponse } from "next/server";

import { NEXT_AUTH } from "@/app/lib/auth";
import NextAuth from "next-auth";

// export function GET(req: NextRequest, { params }: {
//     params: {
//         authRoutes: string[]
//     }
// }) {
//     //console.log(params);

//     return NextResponse.json({
//         msg: "Hello"
//     })
// }

// The catch all route from api/auth/...anything handled by NextAuth

const handler = NextAuth(NEXT_AUTH)

export const GET = handler;
export const POST = handler;