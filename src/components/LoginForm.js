import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formErrors, setFormErrors] = useState([]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const result = await login(formData);
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
      <h2 style={{ color: "#007bff" }}>Login</h2>

      <input
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />

      {formErrors.length > 0 && (
        <div className="errors" style={{ color: "red", marginBottom: "1rem" }}>
          {formErrors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      <button>Log In</button>
    </form>
  );
}

export default LoginForm;

