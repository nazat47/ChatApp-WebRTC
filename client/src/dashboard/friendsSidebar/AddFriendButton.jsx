import { useState } from "react";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";

const additionalStyles = {
  marginTop: "10px",
  marginLeft: "5px",
  width: "80%",
  height: "30px",
  background: "#3ba55d",
};

export default function AddFriendButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenFriendDialog = () => {
    setIsDialogOpen(true);
  };

    const handleCloseFriendDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label={"Add Friend"}
        onClick={handleOpenFriendDialog}
      />
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseFriendDialog}
      />
    </>
  );
}
