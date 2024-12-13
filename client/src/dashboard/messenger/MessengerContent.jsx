import { styled } from "@mui/material";
import { useEffect } from "react";
import Messages from "./messages/Messages";
import NewMessageInput from "./NewMessageInput";
import { getDirectChatHistory } from "../../socket/connection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
