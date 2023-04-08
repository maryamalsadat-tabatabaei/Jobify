import {
  FormRow,
  Alert,
  FormRowSelect,
  EmailComponent,
  FileUpload,
} from "../../components";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobImageUrl: imageUrl,
    jobTypeOptions,
    jobStatus,
    jobStatusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = !e.target.files ? e.target.value : e.target.files[0];
    handleChange({ name, value });
  };

  return (
    <Wrapper>
      <form className="form">
        <div className="form-header">
          <h3>{isEditing ? "edit job" : "add job"} </h3>
          <Link to="/send-email" className="btn btn-danger">
            Email
          </Link>
        </div>

        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText="location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect
            labelText="status"
            name="jobStatus"
            value={jobStatus}
            handleChange={handleJobInput}
            list={jobStatusOptions}
          />
          <FormRowSelect
            labelText="type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />
          {/* <FileUpload
            type="file"
            labelText="image"
            name="imageUrl"
            value={imageUrl}
            accept="image/*"
            handleChange={handleJobInput}
          /> */}
          <div className="btn-container">
            <button
              className="btn btn-block submit-btn"
              type="submit"
              onClick={handleSubmit}
            >
              submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
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

export default AddJob;
