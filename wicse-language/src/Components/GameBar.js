import React from "react";
import { Link } from 'react-router-dom';

const GameBar = () => {
  return (
    <div className="navbar" style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      <div className="navbar-left">
        <span className="navbar-text">Minigames</span>
      </div>

      <div className="navbar-right">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="chat" className="navbar-link">Chat</Link>
        <Link to="/profile" className="navbar-link">Profile</Link>
        <Link to="login" className="navbar-link">Login</Link>
      </div>
    </div>
  )
};

export default GameBar;
