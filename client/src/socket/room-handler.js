import {
  setActiveRooms,
  setisUserJoinedWithOnlyAudio,
  setLocalStream,
  setOpenRoom,
  setRemoteStreams,
  setRoomDetails,
  setScreenSharingStream,
} from "../store/actions/room-actions";
import { store } from "../store/store";
import { createRoom, socketJoinRoom, socketLeaveRoom } from "./connection";
import { closeAllConnections, getLocalStreamPreview } from "./webRtc-handler";

export const createNewRoom = () => {
  const successCallbackFn = () => {
    store.dispatch(setOpenRoom(true, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setisUserJoinedWithOnlyAudio(audioOnly));
    createRoom();
  };
  const audioOnly = store.getState().room.audioOnly;
  getLocalStreamPreview(audioOnly, successCallbackFn);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;
  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  const friends = store.getState().friends.friends;
  const rooms = [];

  const userId = store.getState().auth.userDetails?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });
  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCallbackFn = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(setOpenRoom(false, true));
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setisUserJoinedWithOnlyAudio(audioOnly));
    socketJoinRoom({ roomId });
  };
  const audioOnly = store.getState().room.audioOnly;
  getLocalStreamPreview(audioOnly, successCallbackFn);
};

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  const localStream = store.getState().room.localStream;
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setLocalStream(null));
  }

  const screenShareStream = store.getState().room.screenSharingStream;
  if (screenShareStream) {
    screenShareStream.getTracks().forEach((track) => track.stop());
    store.dispatch(setScreenSharingStream(null));
  }
  store.dispatch(setRemoteStreams([]));
  closeAllConnections();

  socketLeaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(setOpenRoom(false, false));
};
