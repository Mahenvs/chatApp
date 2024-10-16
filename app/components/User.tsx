"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const session = useSession();
  return <span> {session?.data?.user?.name}</span>;
};

export default User;
