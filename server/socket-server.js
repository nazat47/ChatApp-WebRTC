const { verifyTokenSocket } = require("./middlewares/auth-socket");
const { setSocketServerInstance, getOnlineUsers } = require("./server-store");
const {
  directChatHistoryHandler,
} = require("./socket-handlers/direct-chat-history-handler");
const {
  directMessageHandler,
} = require("./socket-handlers/direct-message-handler");
const { disconnectHandler } = require("./socket-handlers/disconnect-handler");
const { leaveRoomHandler } = require("./socket-handlers/leave-room-handler");
const newConnectionHandler = require("./socket-handlers/new-connection-handler");
const { roomCreateHandler } = require("./socket-handlers/room-create-handler");
const {
  roomInitializeConnectHandler,
} = require("./socket-handlers/room-initialize-connection-handler");
const { roomJoinHandler } = require("./socket-handlers/room-join-handler");
const {
  roomSignalingDataHandler,
} = require("./socket-handlers/room-signaling-data-handler");

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  setSocketServerInstance(io);

  io.use((socket, next) => {
    verifyTokenSocket(socket, next);
  });

  const emitOnlineUsers = () => {
    const onlineUsers = getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on("connection", (socket) => {
    console.log("A user connected :" + socket.id);
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data);
    });

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });

    socket.on("room-join", (data) => {
      roomJoinHandler(socket, data);
    });

    socket.on("room-leave", (data) => {
      leaveRoomHandler(socket, data);
    });

    socket.on("conn-init", (data) => {
      roomInitializeConnectHandler(socket, data);
    });

    socket.on("conn-signal", (data) => {
      roomSignalingDataHandler(socket, data);
    });

    socket.on("disconnect", () => {
      disconnectHandler(socket);
    });
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [8000]);
};

module.exports = { registerSocketServer };
