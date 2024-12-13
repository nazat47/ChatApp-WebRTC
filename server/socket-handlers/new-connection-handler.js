const { addNewConnectedUser } = require("../server-store");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("./updates/friends");
const { updateRooms } = require("./updates/rooms");

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;
  addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId });
  updateFriendsPendingInvitations(userDetails.userId);
  updateFriends(userDetails.userId);

  setTimeout(() => {
    updateRooms(socket.id);
  }, [500]);
};

module.exports = newConnectionHandler;
