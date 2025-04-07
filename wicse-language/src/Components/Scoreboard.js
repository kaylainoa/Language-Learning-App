import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scoreboard.css';

function Scoreboard({ isWin, score }) {
  const [isOpen, setIsOpen] = useState(true); // Control visibility internally
  const navigate = useNavigate();
  const handleLevelsClick = () => {
    console.log('Navigating to levels...');
   navigate ('/');
  };

  const handleClose = () => {
    setIsOpen(false); // Close the scoreboard
  };

  if (!isOpen) return null; // Do not render if scoreboard is closed

  const title = isWin ? "YOU WIN!" : "YOU LOSE!";

  return (
    <div className="scoreboard-overlay">
      <div className="scoreboard-popup">
        <h2 className="scoreboard-title">{title}</h2>

        <div className="points-section">
          <span className="points-label">Your Score</span>
          <div className="points-value">{score}</div>
        </div>

        <div className="levels-button-container">
          <button 
            className="levels-button"
            onClick={handleLevelsClick}
          >
            Home
          </button>
        </div>

        {/* Optional close button */}
        <button 
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#fff'
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
}

export default Scoreboard;
