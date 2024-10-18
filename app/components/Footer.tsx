"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { socket } from "../lib/socket";

const Footer = () => {

  const [message, setMessage] = useState("");
  const textHandler = (e) => {
    setMessage(e.target.value);
  };

  
  const sendMessageHandler = () => {
    console.log("Send message handler");
    socket.on("connect", () => {
      console.log(`connect ${socket.id}`);
    });
    const chatWithUser = localStorage.getItem("chatWithUser");
    const loggedUser = localStorage.getItem("loggedUser");

    socket.emit("sendMessage", chatWithUser, loggedUser, message);
  };

  return (
    <div className="flex items-center mb-0  gap-2 px-2  ">
      <Textarea
        className="border-l-0 h-10 py-2 align-text-bottom "
        placeholder="Type your message..."
        value={message}
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

export default Footer;
