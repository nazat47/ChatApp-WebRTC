const { removeConnectedUser, getActiveRoooms } = require("../server-store");
const { leaveRoomHandler } = require("./leave-room-handler");

const disconnectHandler = (socket) => {
  const activeRooms = getActiveRoooms();
  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );
    if (userInRoom) {
      leaveRoomHandler(socket, { roomId: activeRoom.roomId });
    }
  });
  removeConnectedUser(socket.id);
};

module.exports = { disconnectHandler };
