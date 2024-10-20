import { io } from "socket.io-client"
const socketEnd = process.env.NEXT_PUBLIC_SOCKET_URL
const protocol = process.env.NODE_ENV === "production" ? "wss" : "ws";
const socketIs = protocol+"://"+socketEnd
console.log(socketIs,"Socket is ",process.env.NEXT_PUBLIC_SOCKET_URL);

export const socket = io(socketIs); 