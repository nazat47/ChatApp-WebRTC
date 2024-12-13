const FriendInvitation = require("../../models/friend-invitation");
const User = require("../../models/user");
const serverStore = require("../../server-store");

const updateFriendsPendingInvitations = async (userId) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate("senderId", "_id username email");

    const receiverList = serverStore.getActiveConnections(userId);

    const io = serverStore.getSocketServerInstance();

    receiverList.forEach((socketId) => {
      io.to(socketId).emit("friends-invitations", {
        pendingInvitations: pendingInvitations ?? [],
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const updateFriends = async (userId) => {
  try {
    const receiverList = serverStore.getActiveConnections(userId);
    if (receiverList.length > 0) {
      const user = await User.findById(userId, { _id: 1, friends: 1 }).populate(
        "friends",
        "_id username email"
      );
      if (user) {
        const friendsList = user.friends.map((f) => ({
          id: f._id,
          email: f.email,
          username: f.username,
        }));

        const io = serverStore.getSocketServerInstance();
        receiverList.forEach((id) => {
          io.to(id).emit("friends-list", { friends: friendsList ?? [] });
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateFriendsPendingInvitations,
  updateFriends,
};
