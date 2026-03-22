import { io } from "socket.io-client";
import { getApiBaseUrl } from "./api";
import { getToken } from "./auth";

export function connectCafeSocket(cafeId) {
  const baseUrl = getApiBaseUrl();
  const token = typeof window !== "undefined" ? getToken() : null;
  const socket = io(baseUrl, {
    transports: ["websocket"],
    auth: token ? { token } : {},
  });

  socket.on("connect", () => {
    if (cafeId) socket.emit("JOIN_CAFE", { cafeId });
  });

  return socket;
}