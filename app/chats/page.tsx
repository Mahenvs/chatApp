import ChatWrapper from "@/app/components/ChatWrapper";

const page = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] mt-16 ">
      <ChatWrapper /> {/* State management happens here */}
    </div>
  );
};

export default page;
