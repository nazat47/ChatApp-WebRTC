import Button from "@mui/material/Button";
import { Group } from "@mui/icons-material";

const MainPageButton = () => {
  return (
    <Button
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
    >
      <Group />
    </Button>
  );
};

export default MainPageButton;
