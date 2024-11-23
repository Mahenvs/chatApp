import prisma from "@/db";
import { NextResponse } from "next/server";

// const chatSchema =z.object({
//     chatId: z.string(),
//     // receiver:
// })
// Update the type 
export async function POST(req: any) {
    const data = await req.json()
    // const parsedResult = 

    const query = await prisma.messages.create({
        data
    })



    return NextResponse.json({
        data: data,
        msg: "Chat saved successfully"
    })
}

export async function GET(params: any) {
    // //console.log(params);
    const { searchParams } = new URL(params.url); // Extract query params
    const chatId = searchParams.get('chatId'); // Get 'chatId' value
    // //console.log(chatId);

    if (!chatId) {
        return new Response(JSON.stringify({ error: 'chatId is required' }), {
            status: 400,
        });
    }
    const query = await prisma.messages.findMany({
        where: {
            chatId: chatId
        }
    })
    // //console.log(query);

    return NextResponse.json({
        content: query
    })
}
// id        Int      @id @default(autoincrement())
// chatId    Int      // Foreign key to Chat
// senderId  Int      // Foreign key to User (sender)
// receiverId Int
// content   String   // The message content
// timestamp DateTime @default(now())
