import io from "socket.io-client";
import {
  setFriends,
  setOnlineUsers,
  setPendingFriendsInvitations,
} from "../store/actions/friends-actions";
import { store } from "../store/store";
import { updateDirectChatHistoryIfActive } from "../shared/utils/chat";
import { newRoomCreated, updateActiveRooms } from "./room-handler";
import {
  handleParticipantLeftRoom,
  handleSignalingData,
  prepareNewPeerConnection,
} from "./webRtc-handler";

let socket = null;

export const connectSocketServer = (userDetails) => {
  const { token } = userDetails;
  socket = io("http://localhost:3001", {
    auth: {
      token,
    },
  });

  socket.on("connect", () => {
    console.log("successfully connected");
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on("room-create", (data) => {
    newRoomCreated(data);
  });

  socket.on("active-rooms", (data) => {
    updateActiveRooms(data);
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, false);
    socket.emit("conn-init", { connUserSocketId: connUserSocketId });
  });

  socket.on("conn-init", (data) => {
    const { connUserSocketId } = data;
    prepareNewPeerConnection(connUserSocketId, true);
  });

  socket.on("conn-signal", (data) => {
    handleSignalingData(data);
  });

  socket.on("room-participant-left", (data) => {
    handleParticipantLeftRoom(data);
  });
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const getDirectChatHistory = (data) => {
  socket.emit("direct-chat-history", data);
};

export const createRoom = () => {
  socket.emit("room-create");
};

export const socketJoinRoom = (data) => {
  socket.emit("room-join", data);
};

export const socketLeaveRoom = (data) => {
  socket.emit("room-leave", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
