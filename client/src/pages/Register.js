import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { showAlert, displayAlert, isLoading, authenticateUser, user } =
    useAppContext();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
  };
  const [values, setvalues] = useState(initialState);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      authenticateUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      authenticateUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
    setvalues(initialState);
  };
  const handleToggleMember = () => {
    setvalues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="text"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a memeber yet?" : "Already a member?"}
          <button
            type="button"
            onClick={handleToggleMember}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;