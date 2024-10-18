import React, { useEffect, useState } from "react";
import User from "./User";
import ChatBox from "./ChatBox";
import { socket } from "../lib/socket";
import { useScrollToBottom } from "../lib/use-scroll-to-bottom";
import { ChatIcon } from "./Icons";

const Previewmessage = ({ user }: { user: string | null }) => {
  const [messages, setMessages] = useState([]);

  const loggedUser = localStorage.getItem("loggedUser");
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    socket.on("sendMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-full">
      {!user ? (
        <span className="h-full  flex justify-center items-center flex-col">
          <ChatIcon classname="size-28" />
          <code className="text-customprimary text-xl rounded-md ">
            Chat now
          </code>
        </span>
      ) : (
        <>
          <header className="flex items-center gap-2 p-3 border-b bg-gray-100">
            <User user={user} />
          </header>

          <div
            className="flex-1 overflow-y-auto  px-4"
            ref={messagesContainerRef}
          >
            {messages?.map((chat, index) => (
              <div
                key={index}
                className={`p-2 flex ${
                  chat.senderId === loggedUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-fit flex rounded-md p-2 border flex-col ${
                    chat.senderId === loggedUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
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
            <div
              ref={messagesEndRef}
              className="shrink-0 min-w-[24px] min-h-[24px]"
            />
          </div>

          <footer className="mb-2">
            <ChatBox user={user} />
          </footer>
        </>
      )}
    </div>
  );
};

export default Previewmessage;
