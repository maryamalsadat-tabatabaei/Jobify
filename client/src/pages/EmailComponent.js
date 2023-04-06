import { FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useNavigate } from "react-router-dom";

const EmailComponent = () => {
  const {
    showAlert,
    title,
    subject,
    body,
    recipients,
    handleChange,
    clearEmailValues,
    sendEmail,
    displayAlert,
  } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !subject || !body || !recipients) {
      displayAlert();
      return;
    }
    sendEmail();
    navigate("/");
  };

  const handleEmailInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>email</h3>

        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleEmailInput}
          />
          <FormRow
            type="text"
            name="subject"
            value={subject}
            handleChange={handleEmailInput}
          />
          <FormRow
            type="text"
            name="body"
            value={body}
            handleChange={handleEmailInput}
          />
          <FormRow
            type="text"
            name="recipients"
            value={recipients}
            handleChange={handleEmailInput}
          />

          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="sublit"
              onClick={handleSubmit}
            >
              send
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearEmailValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default EmailComponent;
