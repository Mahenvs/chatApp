"use client";

import React, { useState } from "react";
import UsersToChat from "./UsersToChat";
import Previewmessage from "./Previewmessage";
import { useSession } from "next-auth/react";
import { ChatIcon } from "./Icons";

const ChatWrapper = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // State management
  const { status } = useSession();

  if (status != "authenticated") {
    return (
      <span className="flex gap-2 text-3xl items-center mx-auto">
        <ChatIcon classname="size-20" />
        <code>Login to chat</code>
      </span>
    );
  }
  const handleUserSelect = (user: string) => {
    console.log(user);
    
    setSelectedUser(user); 
  };

  return (
    <div className="flex w-full h-full">
      {/* Users List */}
      <div className="w-1/4 h-full border-r">
        <UsersToChat userHandler={handleUserSelect} />
      </div>

      {/* Chat Preview */}
      <div className="flex-1">
        <Previewmessage user={selectedUser} />
      </div>
    </div>
  );
};

export default ChatWrapper;
