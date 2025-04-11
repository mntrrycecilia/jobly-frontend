import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await signup(formData);
    if (result.success) {
      navigate("/");
    } else {
      setFormErrors(result.err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h2 style={{ color: "#007bff" }}>Sign Up</h2>

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
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

      {formErrors.length > 0 && (
        <div className="errors" style={{ color: "red", marginBottom: "1rem" }}>
          {formErrors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      <button>Sign Up</button>
    </form>
  );
}

export default SignupForm;


