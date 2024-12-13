import { ScreenShare, StopScreenShare } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { switchOutgoingTracks } from "../../../socket/webRtc-handler";

const constraints = {
  audio: false,
  video: true,
};

const ScreenShareButton = ({
  localStream,
  setScreenSharingStream,
  screenSharingStream,
  isScreenSharingActive,
}) => {
  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (error) {
        console.log(error);
      }
      if (stream) {
        setScreenSharingStream(stream);
        switchOutgoingTracks(stream);
      }
    } else {
      switchOutgoingTracks(localStream);
      screenSharingStream.getTracks().forEach((track) => track.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <IconButton onClick={handleScreenShareToggle} style={{ color: "white" }}>
      {isScreenSharingActive ? <StopScreenShare /> : <ScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;
