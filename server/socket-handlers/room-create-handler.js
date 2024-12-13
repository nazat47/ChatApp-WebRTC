const { addNewActiveRoom } = require("../server-store");
const { updateRooms } = require("./updates/rooms");

const roomCreateHandler = (socket) => {
  const socketId = socket.id;
  const { userId } = socket.user;

  const roomDetails = addNewActiveRoom(userId, socketId);

  socket.emit("room-create", {
    roomDetails,
  });

  updateRooms();
};

module.exports = { roomCreateHandler };
