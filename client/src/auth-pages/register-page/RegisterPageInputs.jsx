import InputWithLabel from "../../shared/components/InputWithLabel";

const RegisterPageInputs = ({
  email,
  password,
  setEmail,
  setPassword,
  username,
  setUsername,
}) => {
  return (
    <>
      <InputWithLabel
        value={email}
        setValue={setEmail}
        label={"Email address"}
        type={"text"}
        placeholder={"Enter email address"}
      />
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label={"Username"}
        type={"text"}
        placeholder={"Enter your username"}
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label={"Password"}
        type={"password"}
        placeholder={"Enter password"}
      />
    </>
  );
};

export default RegisterPageInputs;
