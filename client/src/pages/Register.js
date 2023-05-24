import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { Logo, FormRow, Alert, FileUpload } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const {
    showAlert,
    displayAlert,
    isLoading,
    authenticateUser,
    user,
    googleSignIn,
  } = useAppContext();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    email: "",
    password: "",
    imageUrl: "",
    isMember: true,
  };
  const [values, setvalues] = useState(initialState);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleGoogleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      const user = JSON.parse(urlParams.get("user"));
      googleSignIn(user, token);
    };

    handleGoogleCallback();
  }, []);

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleSignIn,
      auto_select: true,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-button"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleSignIn = (res) => {
    const googleIdToken = res.credential;
    const redirectUrl =
      "http://localhost:8000/auth/google?googleIdToken=" + googleIdToken;
    window.location.href = redirectUrl;
  };

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

        {values.isMember && (
          <p>
            Forgot your password?
            <button className="member-btn">
              <Link to="/reset-password">Reset Password</Link>
            </button>
          </p>
        )}
        {values.isMember && (
          <>
            <p className="text">Or</p>
            <div
              id="custom-google-signin-button"
              className="authentication__action"
            >
              {/* <button
                className="google_btn btn"
                type="button"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle />
                <span>Sing in with Google</span>
              </button> */}
              <div id="google-signin-button"></div>
            </div>
          </>
        )}
      </form>
    </Wrapper>
  );
};

export default Register;
