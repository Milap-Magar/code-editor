import { io } from "socket.io-client";

let socket = null;

export const initSocket = async () => {
  const BACKEND_URL = "http://localhost:5000";
  socket = io(BACKEND_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });
  return socket;
};
