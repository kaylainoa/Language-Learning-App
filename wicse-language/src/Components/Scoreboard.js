import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Scoreboard.css';


//TO USE
  //create a isWin boolean and a score count
  //pass those in and it will show the correct board and the score

  
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
      </div>
    </div>
  );
}

export default Scoreboard;
