import { useNavigate } from "react-router-dom";
import CustomPrimaryButton from "../../shared/components/CustomPrimaryButton";
import RedirectInfo from "../../shared/components/RedirectInfo";
import { Tooltip } from "@mui/material";

const LoginPageFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToRegister = () => {
    navigate("/register");
  };
  return (
    <>
      <Tooltip
        title={
          !isFormValid
            ? "Enter correct email address and password must be between 6 to 12 characters"
            : "Press to log in!"
        }
      >
        <div>
          <CustomPrimaryButton
            label={"Login"}
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <RedirectInfo
        text={"Need an account?  "}
        redirectText={"Create an account"}
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegister}
      />
    </>
  );
};

export default LoginPageFooter;
