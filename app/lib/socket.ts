import { io } from "socket.io-client"
const socketEnd = process.env.NEXT_PUBLIC_SOCKET_URL
console.log(socketEnd,"Socket is ",process.env.SOCKET_URL);

export const socket = io(`ws://${socketEnd}`); 