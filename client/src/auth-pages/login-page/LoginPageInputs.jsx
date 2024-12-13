import InputWithLabel from "../../shared/components/InputWithLabel";

const LoginPageInputs = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <InputWithLabel
        value={email}
        setValue={setEmail}
        label={"Email"}
        type="text"
        placeholder={"Enter email address"}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label={"Password"}
        type="password"
        placeholder={"Enter password"}
      />
    </>
  );
};

export default LoginPageInputs;
