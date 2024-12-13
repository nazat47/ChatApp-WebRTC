import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { leaveRoom } from "../../../socket/room-handler";

const CloseRoomButton = () => {
  const handleTLeaveRoom = () => {
    leaveRoom();
  };

  return (
    <IconButton onClick={handleTLeaveRoom} style={{ color: "white" }}>
      <Close />
    </IconButton>
  );
};

export default CloseRoomButton;
