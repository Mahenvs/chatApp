import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/app/lib/auth";
export default async function User() {
  // If you want the ID from the server, mandatorily pass the authOptions as param in getServerSession function
  const session = await getServerSession(NEXT_AUTH);
  console.log("session ",session);
  
  return <div>USER COMPONENT{JSON.stringify(session)}</div>;
}
