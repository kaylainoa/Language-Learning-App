import React from 'react';
import './Scoreboard.css';

function Scoreboard({ isOpen, onClose, score, title, onLevelsClick }) {
  if (!isOpen) return null;

  return (
    <div className="scoreboard-overlay">
      <div className="scoreboard-popup">
        <h2 className="scoreboard-title">{title}</h2>

        <div className="points-section">
          <span className="points-label">Your Score</span>
          <div className="points-value">{score}</div>
        </div>

        {/* Levels Button Container */}
        <div className="levels-button-container">
          <button 
            className="levels-button"
            onClick={onLevelsClick}
          >
            Levels
          </button>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
