import { useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { showAlert, displayAlert, isLoading, resetPassword } = useAppContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      displayAlert();
      return;
    }

    resetPassword(email);
    setEmail("");
    setTimeout(() => {
      navigate("/register");
    }, 5000);
  };
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>reset password</h3>
        {showAlert && <Alert />}

        <FormRow
          type="text"
          name="email"
          value={email}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Reset Password
        </button>
      </form>
    </Wrapper>
  );
};

export default ResetPassword;
