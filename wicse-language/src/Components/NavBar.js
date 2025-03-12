import React from "react";
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  // In a real app, you would get the points from your state management or props
  const playerPoints = 0;
  
  return (
    <div className="navbar">
      <div className="navbar-wave"></div>
      <div className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src="/" alt="Parrot Logo" className="navbar-logo-image" />
          </Link>
          <div className="player-points">
            <span className="points-label">Points:</span>
            <span className="points-value">{playerPoints}</span>
          </div>
        </div>
        
        <div className="navbar-center">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/chat" className="navbar-link">Chat</Link>
          <Link to="/profile" className="navbar-link">Profile</Link>
        </div>
        
        <div className="navbar-right">
          <Link to="/login" className="navbar-link login-link">Login</Link>
        </div>
      </div>
    </div>
  )
};

export default NavBar;