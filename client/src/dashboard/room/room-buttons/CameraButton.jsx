import { Videocam, VideocamOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const CameraButton = ({ localStream }) => {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnabled;
    setCameraEnabled(!cameraEnabled);
  };

  return (
    <IconButton onClick={handleToggleCamera} style={{ color: "white" }}>
      {cameraEnabled ? <Videocam /> : <VideocamOff />}
    </IconButton>
  );
};

export default CameraButton;
