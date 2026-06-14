import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      await registerUser(formData);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setSuccess(true);
      setMessage("Registration successful. Please click Login and sign in.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
      setSuccess(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>

      {message && (
        <p className={success ? "success" : "error"}>
          {message}
        </p>
      )}

      <form onSubmit={handleRegister}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          placeholder="Enter full name"
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter email"
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>

      <p>
        Already have account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;