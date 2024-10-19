import ChatWrapper from "@/app/components/ChatWrapper";

const page = () => {
  
  return (
    // <div className="flex h-[calc(100vh-4rem)] mt-16 bg -red-100">
    //   <div className="w-1/4 h-full border-r">
    //     <UsersToChat userHandler={setUser}/>
    //   </div>
    //   <div className="flex-1">
    //     <Previewmessage user={user}/>
    //   </div>
    // </div>
    <div className="flex h-[calc(100vh-4rem)] mt-16 ">
      <ChatWrapper /> {/* State management happens here */}
    </div>
  );
};

export default page;
