"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../lib/socket";
import axios from "axios";
import { saveChatUrl } from "../lib/url";
import { useSession } from "next-auth/react";
import { SendArrowIcon } from "./Icons";
import { UserType } from "@/app/components/Previewmessage";
type ChatBoxProps = {
  user: UserType | null;
};
const ChatBox: React.FC<ChatBoxProps> = ({ user }) => {
  if(user == null){
    return 
  }
  const receiver = user?.connectedUserEmail;
  const [message, setMessage] = useState("");

  const { data: session } = useSession();
  useEffect(() => {
    autoResize(); // Resize when the component mounts or updates
  }, [message]); // Depend on message to resize when it changes
  const textareaRef = useRef(null);
  // && session?.user && session.user.email
  if (session == null ) {
    return <span>Loading...</span>;
  }
  const loggedUser = session?.user?.email || "unknown";
  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const sendMessageHandler = async () => {
    console.log("Send message handler");
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });

    socket.emit("sendMessage", receiver, loggedUser, message);

    const roomId =
      receiver < loggedUser
        ? `${receiver}-${loggedUser}`
        : `${loggedUser}-${receiver}`;
    setMessage("");
    const response = await axios({
      method: "post",
      url: saveChatUrl,
      data: {
        chatId: roomId,
        receiverId: receiver,
        senderId: loggedUser,
        content: message,
      },
    });
    console.log(response);
    
  };

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`; // Set height to scrollHeight, but max 240px
    }
  };

  return (
    <div className="flex items-center mb-0  gap-2 px-10 ">
      <Textarea
        ref={textareaRef}
        className="h-10 max-h-60 border-l-0 border-2  py-2 "
        placeholder="Type your message..."
        value={message}
        onChange={(e) => {
          textHandler(e);
        }}
        style={{ minHeight: "2.5rem" }} // Ensures it starts at the intended height
      ></Textarea>
      <Button
        className="h-10 left-3 "
        onClick={sendMessageHandler}
        disabled={message.length == 0}
      >
        <SendArrowIcon />
      </Button>
    </div>
  );
};

export default ChatBox;
