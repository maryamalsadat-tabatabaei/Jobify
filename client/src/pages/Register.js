import { useState, useEffect } from "react";
import { Logo, FormRow, Alert, FileUpload } from "../components";
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
    imageUrl: "",
    isMember: false,
  };
  const [values, setvalues] = useState(initialState);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { target } = e;
    !target.files
      ? setvalues({ ...values, [e.target.name]: target.value })
      : setvalues({ ...values, [e.target.name]: target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember, imageUrl } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { email, password };
    if (isMember) {
      authenticateUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      const formData = new FormData();
      for (const [key, value] of Object.entries({
        ...currentUser,
        name,
        imageUrl,
      })) {
        formData.append(key, value);
      }
      authenticateUser({
        currentUser: formData,
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
        {!values.isMember && (
          <FileUpload
            type="file"
            labelText="image"
            name="imageUrl"
            value={values.imageUrl}
            accept="image/*"
            handleChange={handleChange}
          />
        )}
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
