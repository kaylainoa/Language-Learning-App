import React from 'react';
import backgroundImage from './Assets/beach-background-blend.jpeg';
import islandBlend from './Assets/island-blend.png';

function Home() {
  // Create array of levels for easier rendering
  const levels = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Level ${i + 1}`
  }));
  
  return (
    <div className="home-page">
      <div className="content-container">
        <div className="headinghome">
          <h1 className="title">Welcome, [Player's Name]!</h1>
          <p className="subtitle">Continue where you left off, or backtrack for extra practice!</p>
        </div>
        
        <div className="level-grid">
          {levels.map((level) => (
            <div
              key={level.id}
              className="level-item"
            >
              <div className="level-image-container">
                <img
                  id={`level${level.id}`}
                  src={islandBlend}
                  alt={`Island ${level.name}`}
                  style={{ width: '100%' }}
                />
                <div className="level-number-overlay">
                  <span className="level-number">{level.id}</span>
                </div>
              </div>
              <span className="level-text">{level.name}</span>
            </div>
          ))}
        </div>
        
        <div className="button-container">
          {/* <button className="primary-button">
            Continue Journey
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Home;