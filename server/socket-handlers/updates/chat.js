const Conversation = require("../../models/conversation");
const {
  getSocketServerInstance,
  getActiveConnections,
} = require("../../server-store");

const updateChatHistory = async (conversationId, toSpecificSocketId = null) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "User",
      select: "username _id",
    },
  });
  //   console.log(conversationId, toSpecificSocketId);
  if (conversation) {
    const io = getSocketServerInstance();
    if (toSpecificSocketId) {
      return io.to(toSpecificSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }
    conversation.participants.forEach((userId) => {
      const activeConnections = getActiveConnections(userId.toString());
      activeConnections.forEach((socketId) => {
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
