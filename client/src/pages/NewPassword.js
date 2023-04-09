import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const NewPassword = () => {
  const [userId, setUserId] = useState();
  const [password, setPassword] = useState();
  const passwordToken = useParams().token;
  const navigate = useNavigate();

  const { showAlert, displayAlert, isLoading, user } = useAppContext();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const responseData = await axios(
          `http://localhost:8000/api/user/resetPassword/${passwordToken}`
        );
        setUserId(responseData.userId);
      } catch (err) {}
      fetchedData();
    };
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      displayAlert();
      return;
    }

    try {
      const responseData = await axios.post(
        "http://localhost:8000/api/v1/user/new-password",
        password
      );
      setPassword("");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper className="full-page">
      <form className="form">
        <Logo />
        <h3> Update Password</h3>
        {showAlert && <Alert />}

        <FormRow
          type="text"
          name="password"
          value={password}
          handleChange={handleChange}
        />

        <button
          type="submit"
          className="btn btn-block"
          disabled={isLoading}
          onSubmit={handleSubmit}
        >
          Update Password
        </button>
      </form>
    </Wrapper>
  );
};

export default NewPassword;
