import React, { useEffect, useState } from "react";
import User from "./User";
import Footer from "./Footer";
import { socket } from "../lib/socket";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const loggedUser = localStorage.getItem("loggedUser");

  useEffect(() => {
    console.log("I am inside useEffect");

    socket.on("sendMessage", (msg) => {
      console.log("New message received:", msg); // Log the message to the console

      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      console.log(messages, "messages are ");

      socket.off("sendMessage");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      {/* Header Section (User Component) */}
      <header className="p-4 border-b bg-gray-200">
        <User />
      </header>

      {/* Scrollable Conversation Section */}
      <div className="flex-1 overflow-y-auto  px-4">
        {messages?.map((chat, index) => (
  <div key={index} className={`p-2 flex ${chat.senderId === loggedUser ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-fit flex rounded-md p-2 border flex-col ${chat.senderId === loggedUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
      <div className="flex">
        <span className={`text-sm`}>
          {/* {chat.senderId === loggedUser ? "You" : chat.senderId} */}
        </span>
      </div>
      <div>
        <span>{chat.content}</span>
      </div>
    </div>
  </div>
))}

      </div>

      {/* Footer Section */}
      <footer className="mb-2">
        <Footer />
      </footer>
    </div>
  );
};

export default Chat;
