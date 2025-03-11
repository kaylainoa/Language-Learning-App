import React from "react";
import { Link } from 'react-router-dom';

const GameBar = () => {
  return (
    <div className="navbar" style={{ backgroundColor: 'lightblue', padding: '10px' }}>
      <div className="navbar-left">
        <span className="navbar-text">Minigames</span>
      </div>

      <div className="navbar-right">
        <Link to="login" className="navbar-link">Login</Link>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/volcano" className="navbar-link">Volcano</Link>
        <Link to="/coral" className="navbar-link">Coral</Link>
        <Link to="/surfing" className="navbar-link">Surfing</Link>
        <Link to="/coconut" className="navbar-link">Coconut</Link>
        <Link to="/beachball" className="navbar-link">BeachBall</Link>
      </div>
    </div>
  )
};

export default GameBar;
