"use client";

import React, { useState } from "react";
import UsersToChat from "./UsersToChat";
import Previewmessage from "./Previewmessage";

const ChatWrapper = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // State management

  const handleUserSelect = (user: string) => {
    console.log("Selected user:", user);
    setSelectedUser(user); // Update the selected user state
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
