import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import {connect} from 'react-redux'

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationList = ({ pendingFriendsInvitations }) => {
  return (
    <MainContainer>
      {pendingFriendsInvitations?.map((inv) => (
        <PendingInvitationsListItem
          key={inv._id}
          id={inv._id}
          username={inv.senderId.username}
          email={inv.senderId.email}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(PendingInvitationList);
