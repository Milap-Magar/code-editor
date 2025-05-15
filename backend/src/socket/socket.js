const { Server } = require("socket.io");

const userSocketMap = {}; // socketId => username

function getAllConnectedClients(io, roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => ({
    socketId,
    username: userSocketMap[socketId],
  }));
}

function registerSocketServer(server, origin) {
  const io = new Server(server, {
    cors: {
      origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("join", ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);

      const clients = getAllConnectedClients(io, roomId);
      clients.forEach(({ socketId }) => {
        io.to(socketId).emit("joined", {
          clients,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.in(roomId).emit("code-change", { code });
    });

    socket.on("sync-code", ({ socketId, code }) => {
      io.to(socketId).emit("code-change", { code });
    });

    socket.on("disconnecting", () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        if (roomId !== socket.id) {
          socket.in(roomId).emit("disconnected", {
            socketId: socket.id,
            username: userSocketMap[socket.id],
          });
        }
      });
      delete userSocketMap[socket.id];
    });
  });

  return io;
}

module.exports = registerSocketServer;
