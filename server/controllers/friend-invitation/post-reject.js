const FriendInvitation = require("../../models/friend-invitation");
const {
  updateFriendsPendingInvitations,
} = require("../../socket-handlers/updates/friends");

const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;
    const invitationExists = await FriendInvitation.exists({ _id: id });
    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation rejected!");

    return res.send("rejected");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = postReject;
