import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import JoblyApi from "../api";

function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    password: ""
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const updatedUser = await JoblyApi.saveProfile(currentUser.username, profileData);
      setFormData(data => ({ ...data, password: "" }));
      setFormErrors([]);
      setSaveConfirmed(true);
      setCurrentUser(updatedUser);
    } catch (err) {
      setFormErrors(err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2 style={{ color: "#007bff" }}>Edit Profile</h2>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Username:</strong> {currentUser.username}
      </div>

      <input
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Confirm password"
        value={formData.password}
        onChange={handleChange}
      />

      {formErrors.length > 0 && (
        <div style={{ color: "red", marginBottom: "1rem" }}>
          {formErrors.join(", ")}
        </div>
      )}

      {saveConfirmed && (
        <div style={{ color: "green", marginBottom: "1rem" }}>
          ✓ Profile updated successfully!
        </div>
      )}

      <button>Save Changes</button>
    </form>
  );
}

export default ProfileForm;
