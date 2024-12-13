const FriendInvitation = require("../../models/friend-invitation");
const User = require("../../models/user");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../../socket-handlers/updates/friends");

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;
    const invitation = await FriendInvitation.findById(id);
    if (!invitation) {
      return res.status(401).send("Invitation not found");
    }
    const { senderId, receiverId } = invitation;

    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];
    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];
    await senderUser.save();
    await receiverUser.save();

    await FriendInvitation.findByIdAndDelete(id);

    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());
    updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send("Invitation accepted");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = postAccept;
