const User = require("../../models/user");
const Invitation = require("../../models/friend-invitation");
const {
  updateFriendsPendingInvitations,
} = require("../../socket-handlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetEmail } = req.body;
  const { userId, email } = req.user;
  if (email.toLowerCase() === targetEmail.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry you can not send invitation to yourself!");
  }
  const targetUser = await User.findOne({
    email: targetEmail,
  });
  if (!targetUser) {
    return res
      .status(404)
      .send(`Friend with email of ${targetEmail} has not been found!`);
  }
  const invitationAlreadyReceived = await Invitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });
  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already send");
  }
  const alreadyFriends = targetUser.friends.find(
    (id) => id.toString() === userId.toString()
  );
  if (alreadyFriends) {
    return res.status(409).send("Friend already added!");
  }

  const newInvitation = await Invitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent!");
};

module.exports = postInvite;
