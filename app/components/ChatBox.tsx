"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import axios from "axios";
import { saveChatUrl } from "../lib/url";
import { useSession } from "next-auth/react";

const ChatBox = ({chatWithUser}:{chatWithUser:string}) => {
  const { data: session, status } = useSession();
console.log(session?.user);

  const [message, setMessage] = useState("");
  const textHandler = (e) => {
    setMessage(e.target.value);
  };
  
  const sendMessageHandler =async () => {
    console.log("Send message handler");
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });
    // const chatWithUser = localStorage.getItem("chatWithUser");
    const loggedUser = localStorage.getItem("loggedUser");

    socket.emit("sendMessage", chatWithUser, loggedUser, message);
  //   chatId    Int      // Foreign key to Chat
  // senderId  Int      // Foreign key to User (sender)
  // content   String   // The message content
  // timestamp DateTime @default(now())
  const roomId = chatWithUser < loggedUser ? `${chatWithUser}-${loggedUser}` : `${loggedUser}-${chatWithUser}`;

    const response = await axios({
      method:"POST",
      url:saveChatUrl,
      data:{
        // chatId:
        // chatWithUser:chat
      }
    })
  };

  return (
    <div className="flex items-center mb-0  gap-2 px-2  ">
      <Textarea
        className="border-l-0 h-10 py-2 align-text-bottom "
        placeholder="Type your message..."
        value={message}
        rows={14}
        onChange={(e) => {
          textHandler(e);
        }}
      ></Textarea>
      <Button className="h-10" onClick={sendMessageHandler}>
        Send
      </Button>
    </div>
  );
};

export default ChatBox;
