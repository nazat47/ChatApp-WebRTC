import { Check, Clear } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const InvitationDecisionButtons = ({
  acceptInvitationHandler,
  rejectInvitationHandler,
  disabled,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <Check />
      </IconButton>
      <IconButton
        style={{ color: "white" }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <Clear />
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
