"use client";
import { useSession } from "next-auth/react";
import React from "react";
import User from "@/app/components/User";
import ListOfUsers from "../components/ListOfUsers";
import Chat from "../components/Chat";

const page = () => {
  console.log("jhew");

  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16 bg -red-100">
      <div className="w-1/4 h-full">
        <ListOfUsers />
        {/* hi */}
      </div>
      <div className="flex-1">
        <Chat />
      </div>
    </div>
  );
};

export default page;
