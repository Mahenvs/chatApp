"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUsersUrl } from "../lib/url"; // Ensure this imports correctly
import { useSession } from "next-auth/react";
import { socket } from "../lib/socket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import User from "./User";
interface propsToChat {
  userHandler: (user: string) => void;
}

const UsersToChat = ({ userHandler }: propsToChat) => {
  const session = useSession();
  const loggedUser = session?.data?.user?.email;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const createRoom = (chatWithUser: string,chatWithName:string) => {
    // const roomId = chatWithUser+loggedUser
    userHandler(chatWithName);

    localStorage.setItem("chatWithUser", chatWithUser);
    localStorage.setItem("loggedUser", loggedUser || "");
    socket.emit("joinChat", chatWithUser, loggedUser);
  };

  useEffect(() => {
    console.log("I am inside useEffect");

    socket.on("sendMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      console.log(messages, "messages are ");

      socket.off("sendMessage");
    };
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${getUsersUrl}?userEmail=${session.data?.user?.email}`
        );
        setUsers(response.data.data);
        console.log(response.data?.data);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (session.status === "authenticated") {
      getUsers();
    } else {
      setLoading(false);
    }
  }, [session.status]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex-1 h-full overflow-auto">
        {users?.map((item, index) => (
          <div
            className="flex gap-2 items-center border-b p-4 py-3 cursor-pointer"
            key={index}
            onClick={() => createRoom(item?.connectedUserEmail,item?.connectedUserName)}
          >
            <User user={item?.connectedUserName}/>
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersToChat;
