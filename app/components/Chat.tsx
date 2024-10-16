import React from "react";
import User from "./User";
import Footer from "./Footer";

const Chat = () => {
  const conversation = [{ msg: "hi" }, { msg: "hey there" }];
  return (
    <div className="flex flex-1 flex-col justify-between h-full">
      <header>
        <User></User>
      </header>
      <div className="flex-1 mt-16 overflow-y-auto"> {/* This allows scrolling for the conversation */}
      {conversation?.map((chat) => (
        <div className="" key={chat.msg}>
          {chat.msg}
        </div>
      ))}</div>
      <Footer></Footer>
    </div>
  );
};

export default Chat;
