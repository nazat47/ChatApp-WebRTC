const { getActiveRoom, joinActiveRoom } = require("../server-store");
const { updateRooms } = require("./updates/rooms");

const roomJoinHandler = (socket, data) => {
  const { roomId } = data;
  const participantDetails = {
    userId: socket.user.userId,
    socketId: socket.id,
  };

  const roomDetails = getActiveRoom(roomId);
  joinActiveRoom(roomId, participantDetails);

  roomDetails.participants.forEach((participant) => {
    if (participant.socketId !== participantDetails.socketId) {
      socket.to(participant.socketId).emit("conn-prepare", {
        connUserSocketId: participantDetails.socketId,
      });
    }
  });

  updateRooms();
};

module.exports = { roomJoinHandler };
