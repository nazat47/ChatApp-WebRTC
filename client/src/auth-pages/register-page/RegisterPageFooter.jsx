import { useNavigate } from "react-router-dom";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { Tooltip } from "@mui/material";

const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Tooltip
        title={
          !isFormValid
            ? "Username should contain between 3 to 12 characters,enter correct email address and password must be between 6 to 12 characters"
            : "Press to register!"
        }
      >
        <div>
          <CustomPrimaryButton
            label={"Register"}
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text={""}
        redirectText={"Already have an account?"}
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLogin}
      />
    </>
  );
};

export default RegisterPageFooter;
