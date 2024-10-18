import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const User = ({ user }: { user: string }) => {
  return (
    <>
      <Avatar>
        <AvatarImage src="h ttps://github.com/shadcn.png" />
        <AvatarFallback className="bg-customprimary text-white ">
          {user?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>{" "}
      {/* Change the displayed email to username */}
      <span className="text-lg capitalize">{user}</span>
    </>
  );
};

export default User;
