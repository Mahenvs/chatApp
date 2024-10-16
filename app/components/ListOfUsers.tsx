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
  ];
  return (
    <div className="flex flex-col w-1/6 min-h-screen border-r-2">
      {users?.map((item) => (
        <div className="border-b p-4 py-3" key={item.id}>
          {" "}
          {item?.name}
        </div>
      ))}
    </div>
  );
};

export default ListOfUsers;
