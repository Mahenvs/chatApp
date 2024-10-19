import {
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { searchUserUrl } from "@/app/lib/url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export function NewChat({ isOpen:any, onClose:any }) {
  const [newUser, setUser] = useState("");
  const session = useSession();
  console.log(session);
  
  const [userExists, setUserExists] = useState("");
  const searchUser = async () => {
    setUserExists("")
    try {
      const response = await axios({
        method: "post",
        url: searchUserUrl,
        data: {
          email: newUser,
          username: "",
          fromUser:session.data?.user?.email
        },
      });
      setUserExists("true")
      console.log(response.status);
    } catch (error) {
      console.error(error);
      setUserExists("false")
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Share</Button> */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Username or Email</DialogTitle>
          <DialogDescription>
            The user must already be registered in the application.{" "}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <Input
              id="username"
              value={newUser}
              onChange={(e) => setUser(e.target.value)}
              placeholder="john@gmail.com"
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={searchUser}>
            Search
          </Button>
        </div>
        <section className="flex align-middle justify-center gap-1 items-center">
          {userExists == "true" && (
            <>
              <CheckCircledIcon className="bg-green-300  rounded-full" />
              <span className="text-sm font-sans"> user found</span>
              <Button size={"sm"} className="p-1" variant={"outline"}>Start Chat</Button>
            </>
          )}
          {userExists == "false" && (
            <>
              <CrossCircledIcon className="bg-red-300  rounded-full" />
              <span className="text-sm font-serif"> user not found</span>
            </>
          )}
        </section>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
