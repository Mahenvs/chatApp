import React from "react";
import User from "./User";
import Footer from "./Footer";

const Chat = () => {
  const conversation = [{ msg: "hi" }, { msg: "hey there" }];
  return (
<div className="flex flex-col h-full">
  {/* Header Section (User Component) */}
  <header className="p-4 border-b bg-gray-200">
    <User />
  </header>

  {/* Scrollable Conversation Section */}
  <div className="flex-1 overflow-y-auto  px-4">
    {conversation?.map((chat) => (
      <div key={chat.msg} className="py-2 bord er-b">
        {chat.msg}
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
