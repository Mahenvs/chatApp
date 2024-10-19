import { io } from "socket.io-client"
const socketEnd = process.env.SOCKET_URL
export const socket = io(`ws://${socketEnd}`); 