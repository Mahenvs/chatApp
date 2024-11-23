"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getUsersUrl } from "../lib/url"; // Ensure this imports correctly
import { useSession } from "next-auth/react";
import { socket } from "../lib/socket";
import User from "./User";
import { useStore } from "../store/useStore";
interface propsToChat {
  userHandler: (user: string) => void;
}
export type UserType = {
  connectedUserEmail: string;
  connectedUserName: string;
  // Add any other properties that your user object may have
};
const UsersToChat = ({ userHandler }: propsToChat) => {
  const session = useSession();
  const loggedUser = session?.data?.user?.email;
  const { knownUsers, setUsersN } = useStore();
  console.log(knownUsers);

  // const [users, setUsers] = useState<UserType[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const createRoom = (receiver: string, chatWithName: string) => {
    userHandler(chatWithName);

    localStorage.setItem("receiver", receiver);
    localStorage.setItem("loggedUser", loggedUser || "");
    socket.emit("joinChat", receiver, loggedUser);
  };

  useEffect(() => {
    //console.log("I am inside useEffect");

    socket.on("sendMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      //console.log(messages, "messages are ");

      socket.off("sendMessage");
    };
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `${getUsersUrl}?userEmail=${session.data?.user?.email}`
        );
        // setUsers(response.data.data);
        setUsersN(response.data.data);
        console.log(response.data?.data);
      } catch (err) {
        console.error(err);

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
      <div className="flex-1 h-full overflow-auto ">
        {knownUsers?.map((item, index) => (
          <div
            className="flex gap-2 items-center border-b p-8 py-3 mx-auto cursor-pointer"
            key={index}
            onClick={() => createRoom(item?.connectedUserEmail, item)}
          >
            <User user={item?.connectedUserName} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UsersToChat;
