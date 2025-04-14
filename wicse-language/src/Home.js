import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import islandBlend from './Assets/island-blend.png';

function Home() {
  // State for player name (could be fetched from props or context in a real app)
  const [playerName, setPlayerName] = useState('Explorer');
  
  // Create array of levels with specific links for special levels
  const levels = Array.from({ length: 15 }, (_, i) => {
    const levelNumber = i + 1;
    let isLinked = false;
    let path = null;
    let pageName = null;
    
    // Map special levels to their corresponding pages
    switch(levelNumber) {
      case 2: //for testing winscreen
        isLinked = true;
        path = '/winscreen';
        pageName = 'Level 2';
        break;
      case 3:
        isLinked = true;
        path = '/beachball';
        pageName = 'Level 3';
        break;
      case 6:
        isLinked = true;
        path = '/coconut';
        pageName = 'Level 6';
        break;
      case 9:
        isLinked = true;
        path = '/coral';
        pageName = 'Level 9';
        break;
      case 12:
        isLinked = true;
        path = '/surfing';
        pageName = 'Level 12';
        break;
      case 15:
        isLinked = true;
        path = '/volcano';
        pageName = 'Level 15';
        break;
      default:
        break;
    }
    
    return {
      id: levelNumber,
      name: isLinked ? `${pageName}` : `Level ${levelNumber}`,
      isLinked: isLinked,
      path: path
    };
  });
  
  // Render either a link or a div based on whether the level is linked
  const renderLevelItem = (level) => {
    const itemContent = (
      <>
        <div className="level-image-container">
          <img src={islandBlend} alt={`Island Level ${level.id}`} />
          <div className="level-number-overlay">
            <span className="level-number">{level.id}</span>
          </div>
        </div>
        <p className="level-text">{level.name}</p>
      </>
    );

    if (level.isLinked) {
      return (
        <Link to={level.path} className="level-item linked-level" key={level.id}>
          {itemContent}
        </Link>
      );
    } else {
      return (
        <div className="level-item" key={level.id}>
          {itemContent}
        </div>
      );
    }
  };
  
  return (
    <div className="home-page">
      {/* Decorative elements */}
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="palm-leaf"></div>
      <div className="palm-leaf"></div>
      
      <div className="content-container">
        <div className="headinghome">
          <h1 className="title">Welcome, {playerName}!</h1>
          <p className="subtitle">Continue your island adventure or practice previous levels!</p>
        </div>
        
        <div className="level-grid">
          {levels.map(level => renderLevelItem(level))}
        </div>
        
        <div className="button-container">
          <Link to="/comingSoon" className="primary-button">Continue Journey</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;