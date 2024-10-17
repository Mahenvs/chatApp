"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import axios from "axios";
interface authForm {
  username: string;
  email: string;
  password: string;
}
const SignIn = () => {
  const router = useRouter();
  const path = usePathname();

  console.log(path);

  const email = useRef("");
  const password = useRef("");
  const username = useRef("");

  const [error, setError] = useState({
    emailReq: false,
    pswdReq: false,
    userReq: false,
    formError: "",
  });
  const handleLogin = async (e?: React.FormEvent<HTMLButtonElement>) => {
    // Call signIn with the credentials and redirect option
    if (e) {
      e.preventDefault();
    }

    if (!email.current || !password.current || !username.current) {
      setError((prev) => ({
        ...prev,
        emailReq: email.current ? false : true,
        userReq: username.current ? false : true,
        pswdReq: password.current ? false : true,
      }));
      return;
    }
    let result;

    if (path == "/signup") {
      const URL = "http://localhost:3000/api/auth/signup";
      const data = {
        username: username.current,
        password: password.current,
        email: email.current,
      };
      result = await axios({
        method: "post",
        url: URL,
        data: data,
      });
    } else {
      result = await signIn("credentials", {
        username: username.current,
        password: password.current,
        email: email.current,

        redirect: false, // Disable default redirect
      });
    }
    if (result?.error) {
      setError((prev) => ({
        ...prev,
        formError: "Invalid username or password",
      }));
    } else {
      resetError()
      router.push("../chats"); // Redirect to the home page or desired route after login
    }
  };

  const resetError = () => {
    setError({
      emailReq: false,
      pswdReq: false,
      userReq: false,
      formError: "",
    });
  };
  return (
    <section className="flex h-screen items-center justify-center">
      <Card className="mx-auto w-[70%] md:w-[70%] lg:w-[30%]">
        <CardHeader className="text-center">
          <CardTitle>SignIn to CHAT</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Username</Label>
              <Input
                name="username"
                id="username"
                placeholder="username"
                onChange={(e) => {
                  setError((prevState) => ({
                    ...prevState,
                    userReq: false,
                  }));
                  username.current = e.target.value;
                }}
              />
              {error.userReq && (
                <span className="text-red-500">Username is required</span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                placeholder="name@email.com"
                onChange={(e) => {
                  setError((prevState) => ({
                    ...prevState,
                    emailReq: false,
                  }));
                  email.current = e.target.value;
                }}
              />
              {error.emailReq && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <Label>Password</Label>
              <div className="flex rounded-lg border">
                <Input
                  className="border-0"
                  name="password"
                  // type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => {
                    setError((prevState) => ({
                      ...prevState,
                      passReq: false,
                    }));
                    password.current = e.target.value;
                  }}
                  // onKeyDown={async (e) => {
                  //   if (e.key === 'Enter') {
                  //     setIsPasswordVisible(false);
                  //     handleSubmit();
                  //   }
                  // }}
                />
                <button
                  className="absolute bottom-0 right-0 flex h-10 items-center px-4 text-gray-600"
                  // onClick={togglePasswordVisibility}
                >
                  {/* {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )} */}
                </button>
              </div>
              {error.pswdReq && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
          </div>
          {error.formError && (
            <span className="flex justify-center mt-2 text-red-500">
              Invalid Credentials
            </span>
          )}
          <Button
            className="my-3 w-full"
            // disabled={checkingPassword}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default SignIn;
