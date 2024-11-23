import React, { useEffect, useState } from "react";
import User from "./User";
import ChatBox from "./ChatBox";
import { socket } from "../lib/socket";
import { useScrollToBottom } from "../lib/use-scroll-to-bottom";
import { ChatIcon } from "./Icons";
import useSWR from "swr";
import axios from "axios";
import { getChatUrl } from "../lib/url";
import { parseTime } from "../lib/parseTime";

export type UserType = {
  connectedUserEmail: string;
  userEmail: string;
  connectedUserName: string;
};

type ChatMessage = {
  senderId: string;
  content: string;
  timestamp: string; // or Date, depending on your use case
};
const fetcher = (url: string) =>
  axios.get(url).then((res) => {
    return res.data;
  });

const Previewmessage = ({ user }: { user: UserType | null }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const chatId =
    user && user?.connectedUserEmail < user?.userEmail
      ? `${user?.connectedUserEmail}-${user?.userEmail}`
      : `${user?.userEmail}-${user?.connectedUserEmail}`;

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    //console.log(socket);

    socket.on("sendMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, [socket]);

  const { data } = useSWR(getChatUrl + chatId, fetcher, {
    onSuccess: (fetchedMessages) => {
      setMessages(fetchedMessages.content);
    },
  });
  //console.log(data?.content);

  if (!user) {
    return <span>Loading...</span>;
  }
  const loggedUser = user?.userEmail;

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
            <User user={user?.connectedUserName} />
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
                      ? "bg-customsecondary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <div className="flex flex-col">
                    {chat.content}
                    <span className={`text-sm caption-bottom`}>
                      {parseTime(chat.timestamp)}
                      {/* {chat.senderId === loggedUser ? "You" : chat.senderId} */}
                    </span>
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
