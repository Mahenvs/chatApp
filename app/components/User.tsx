import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import React from "react";

const User = ({ user }: { user: string }) => {
  const { data: session } = useSession();
  if (session == null && session?.user && session?.user?.email) {
    return <span>Loading...</span>;
  }
  const loggedUser = session?.user?.name || "unknown";
  //console.log(loggedUser);

  return (
    <>
      <Avatar>
        <AvatarImage src="h ttps://github.com/shadcn.png" />
        <AvatarFallback className="bg-customprimary text-white ">
          {user == loggedUser ? "ME" : user?.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>{" "}
      <span className="text-lg capitalize">
        {user == loggedUser ? "Self" : user}
      </span>
    </>
  );
};

export default User;
