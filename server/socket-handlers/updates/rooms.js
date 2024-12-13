const {
  getSocketServerInstance,
  getActiveRoooms,
} = require("../../server-store");

const updateRooms = (toSpecificSocketId = null) => {
  const io = getSocketServerInstance();
  const activeRooms = getActiveRoooms();

  if (toSpecificSocketId) {
    io.to(toSpecificSocketId).emit("active-rooms", { activeRooms });
  } else {
    io.emit("active-rooms", {
      activeRooms,
    });
  }
};

module.exports = { updateRooms };
