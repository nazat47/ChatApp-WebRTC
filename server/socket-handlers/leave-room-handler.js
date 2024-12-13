const { getActiveRoom, leaveActiveRoom } = require("../server-store");
const { updateRooms } = require("./updates/rooms");

const leaveRoomHandler = (socket, data) => {
  const { roomId } = data;
  const activeRoom = getActiveRoom(roomId);
  if (activeRoom) {
    leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = getActiveRoom(roomId);
    if (updatedActiveRoom) {
      updatedActiveRoom.participants?.forEach((participant) => {
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }
    updateRooms();
  }
};

module.exports = { leaveRoomHandler };
