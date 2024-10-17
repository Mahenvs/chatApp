import { Button } from "@/components/ui/button";
import React from "react";

const ListOfUsers = () => {
  const users = [
    {
      name: "chakr",
      id: 1,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "Vam",
      id: 3,
    },
    {
      name: "maeh",
      id: 2,
    },
    {
      name: "oj",
      id: 3,
    },
  ];
  return (
    <>
      {/* <div className="fixed flex min-w-full top-16 z-999 max-w-max  py-3 h-16  border-b bg-background/10 shadow-sm backdrop-blur-md"> */}
        {/* <Button className="mx-auto my-2 " variant="outline">
          ➕ New Chat
        </Button> */}
      {/* </div> */}
      <div className="flex-1 mt- h-full overflow-auto">
        {users?.map((item) => (
          <div className="border-b p-4 py-3" key={item.id}>
            {item?.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default ListOfUsers;
