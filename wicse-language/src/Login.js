import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember me:", rememberMe);
  };

  return (
    <div className="login-container">
      {/* Decorative waves */}
      <div className="wave wave-1"></div>
      <div className="wave wave-2"></div>
      <div className="wave wave-3"></div>
      
      <div className="login-card">
        {/* Sun icon */}
        <div className="sun-icon">
          <div>☀️</div>
        </div>
        
        <h1>Welcome Back!</h1>
        <p className="subtitle">Sign in to continue your beach adventure</p>
        
        <form onSubmit={handleSubmit}>
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
          
          <div className="form-actions">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">
                Remember me
              </label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        <div className="signup-link">
          Don't have an account?{" "}
          <a href="#">
            Sign up
          </a>
        </div>
        
        {/* Beach decorations */}
        <div className="palm-tree">🌴</div>
        <div className="beach">🏖️</div>
      </div>
    </div>
  );
};

export default Login;