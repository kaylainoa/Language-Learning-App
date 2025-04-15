import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";

const Signup = () => {
    // Add first name and last name in addition to just login info for sign up
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send error message if user does not duplicate password correctly
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    axios
      .post("http://localhost:3000/signup", userData)
      .then((response) => {
        console.log("Signup successful:", response.data);
        alert("Account created successfully!");
        // Redirect to login or home page here
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response.data);
          alert(`Error: ${error.response.data.message || "Signup failed"}`);
        } else if (error.request) {
          console.error("No response received:", error.request);
          alert("No response from server. Please try again later.");
        } else {
          console.error("Error message:", error.message);
          alert("An unexpected error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>

      <div className="login-card">
        <div className="sun-icon">
          <div>☀️</div>
        </div>

        <h1>Create Account</h1>
        <p className="subtitle">Start your beach adventure</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            Sign Up
          </button>
        </form>

        <div className="signup-link">
          Already have an account?{" "}
          <Link to="login">
            Log in
          </Link>
        </div>

        <div className="palm-tree">🌴</div>
        <div className="beach">🏖️</div>
      </div>
    </div>
  );
};

export default Signup;
