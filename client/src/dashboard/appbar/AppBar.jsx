import { styled } from "@mui/system";
import DropDownMenu from "./DropDownMenu";
import ChosenOptionLabel from "./ChosenOptionLabel";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  width: "calc(100% - 326px)",
  borderBottom: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 15px",
  backgroundColor: "#36393f",
});

const AppBar = () => {
  return (
    <MainContainer>
      <ChosenOptionLabel />
      <DropDownMenu />
    </MainContainer>
  );
};

export default AppBar;
