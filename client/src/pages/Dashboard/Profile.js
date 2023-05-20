import { useCallback, useEffect, useState } from "react";
import { FormRow, Alert, Payment, FileUpload } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  useEffect(() => {
    if (user?.imageUrl) {
      fetch(`http://localhost:8000/${user?.imageUrl}`)
        .then((res) => res.blob())
        .then((data) => setImageUrl(data));
    }

    return;
  }, []);

  const [name, setName] = useState(user?.name);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);
  const [imageUrl, setImageUrl] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, lastName, location, imageUrl });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3>profile </h3>
          <Payment />
        </div>
        {showAlert && <Alert />}

        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />

          <FormRow
            labelText="last name"
            type="text"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <FileUpload
            type="file"
            labelText="image"
            name="imageUrl"
            value={imageUrl}
            accept="image/*"
            handleChange={(e) => setImageUrl(e.target.files[0])}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
