const { canAccessCafe } = require("../utils/tenant");
const { getUserFromSocketToken } = require("../utils/jwtUser");

let io = null;

function initSocket(httpServer) {
  try {
    // Optional dependency: install `socket.io` to enable realtime.
    // If not installed, the app still runs (no-op realtime).
    // eslint-disable-next-line global-require
    const { Server } = require("socket.io");

    io = new Server(httpServer, {
      cors: { origin: "*", methods: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
    });

    io.on("connection", (socket) => {
      socket.on("JOIN_CAFE", async ({ cafeId }) => {
        if (!cafeId) return;
        const token =
          socket.handshake.auth?.token ||
          socket.handshake.query?.token ||
          socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i, "");

        if (token) {
          const user = await getUserFromSocketToken(String(token));
          if (!user) {
            socket.emit("JOIN_ERROR", { message: "Invalid or expired token" });
            return;
          }
          if (!canAccessCafe(user, cafeId)) {
            socket.emit("JOIN_ERROR", { message: "Forbidden: cannot join this cafe room" });
            return;
          }
        }
        // No token: guest PWA / customer live order updates (still room-scoped by cafeId only)
        socket.join(`cafe:${String(cafeId)}`);
      });
    });

    // eslint-disable-next-line no-console
    console.log("Socket.io enabled");
    return io;
  } catch (error) {
    io = null;
    // eslint-disable-next-line no-console
    console.warn(
      "Socket.io not enabled (install `socket.io` to enable realtime):",
      error.message
    );
    return null;
  }
}

function emitCafeEvent(cafeId, event, payload) {
  if (!io || !cafeId) return;
  io.to(`cafe:${String(cafeId)}`).emit(event, payload);
}

module.exports = { initSocket, emitCafeEvent };

