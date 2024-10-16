"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Appbar = () => {
  // To get session related details in client side components
  // To do the same in server component use "await getServerSession()"
  const session = useSession();

  return (
    <div className="">
      <button
        className=" rounded-md p-2 px-4"
        onClick={() => {
          signIn();
        }}
      >
        Login
      </button>
      <button
        className=" rounded-md p-2 px-4"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
      {JSON.stringify(session)}
    </div>
  );
};

export default Appbar;
