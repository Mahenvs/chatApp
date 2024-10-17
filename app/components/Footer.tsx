import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center mb-0  gap-2 px-2  ">
      <Textarea
        className="border-l-0 h-10 py-2 align-text-bottom "
        placeholder="Type your message..."
      ></Textarea>
      <Button className="h-10">Send</Button>
    </div>
  );
};

export default Footer;
