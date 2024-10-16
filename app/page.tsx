import Image from "next/image";
import Appbar from "./components/Appbar";

export default function Home() {
  return (
    // <div className="flex min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex p-10 justify-between ">
        {/* <div>d</div> */}
        <Appbar/>
      </div>

    // </div>
  );
}
