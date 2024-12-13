import { styled } from "@mui/system";
import Sidebar from "./sidebar/Sidebar";
import FriendsSiderbar from "./friendsSidebar/FriendsSiderbar";
import Messenger from "./messenger/Messenger";
import AppBar from "./appbar/AppBar";
import { useEffect } from "react";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../store/actions/auth-actions";
import { connectSocketServer } from "../socket/connection";
import Room from "./room/Room";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) logout();
    else {
      setUserDetails(JSON.parse(userDetails));
      connectSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <FriendsSiderbar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
