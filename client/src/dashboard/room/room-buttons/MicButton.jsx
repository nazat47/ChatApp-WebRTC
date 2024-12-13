import { Mic, MicOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";

const MicButton = ({ localStream }) => {
  const [micEnabled, setMicEnabled] = useState(true);

  const handleTogglemic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnabled;
    setMicEnabled(!micEnabled);
  };

  return (
    <IconButton onClick={handleTogglemic} style={{ color: "white" }}>
      {micEnabled ? <Mic /> : <MicOff />}
    </IconButton>
  );
};

export default MicButton;
