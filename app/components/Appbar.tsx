"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NewChat } from "./Newchat";
import { useState } from "react";

const Appbar = () => {
  // To get session related details in client side components
  // To do the same in server component use "await getServerSession()"
  const session = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal

  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => setIsModalOpen(false); // Function to close modal

  return (
    <div className="fixed top-0 z-50 py-3 fl ex h-16 w-full items-center gap-2 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md  print:hidden">
      <div className="flex justify-between items-center">
        <div className="flex font-bold text-xl">CHAT APP </div>
        <h2 className="text-pretty font-mono capitalize">{"Hello "} {session?.data?.user?.name}{"!"}</h2>
        <div className="flex">
          {session?.status !== "authenticated" ? (
            <div className="flex gap-3">
              <Button
                className=" rounded-md p-2 px-4"
                onClick={() => {
                  signIn();
                }}
              >
                Login
              </Button>
              <Button
                variant={"outline"}
                className=" rounded-md p-2 px-4"
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Join now
              </Button>
            </div>
          ) : (
            <>
              <Button
                className="mx-auto my-2"
                variant="secondary"
                onClick={openModal}
              >
                ➕ New Chat
              </Button>

              <NewChat isOpen={isModalOpen} onClose={closeModal} />
<button
                className=" rounded-md p-2 px-4"
                onClick={() => {
                  signOut();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>{" "}
    </div>
  );
};

export default Appbar;
