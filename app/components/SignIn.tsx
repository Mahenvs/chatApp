"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
    const router = useRouter()
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
  const handleLogin = async () => {
    // Call signIn with the credentials and redirect option
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false, // Disable default redirect
    });

    if (result?.error) {
      setError("Invalid username or password"); // Set error if login fails
    } else {
      router.push("/"); // Redirect to the home page or desired route after login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0b10]">
      <div className="w-full max-w-sm p-6 bg-[#151720] rounded-lg shadow-md">
        <h2 className="text-center font-bold text-white text-3xl mb-4">
          Login
        </h2>

        <div className="flex flex-col gap-4">
          {/* Username Input */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-1 font-medium text-white/80 "
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="border border-gray-300 rounded-md p-2 text-gray-900 outline-none transition-shadow duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-white/80 "
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md p-2 text-gray-900 outline-none transition-shadow duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500 hover:shadow-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Display Error Message */}
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            className=" bg-gradient-to-t from-gray-900 to-blue-600 text-white py-4  font-semibold text-lg  rounded-md hover:bg-blue-600 transition"
          >
            Login
          </Button>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          {/* OAuth Login Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => signIn("google")}
              className="flex-1 bg-red-500 text-white py-2 rounded-md mr-2 hover:bg-red-600 transition"
            >
              Google
            </button>
            <button
              onClick={() => signIn("github")}
              className="flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
