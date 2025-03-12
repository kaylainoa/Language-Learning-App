import React from 'react';
import './ComingSoon.css';
import sandcastleImage from './Assets/sandcastle.png';  // Add this import

function ComingSoon() {
  return (
    <div className="coming-soon-page">
      {/* Decorative Elements */}
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="palm-leaf"></div>
      <div className="palm-leaf"></div>
      
      <div className="content-container">
        <div className="heading-coming-soon">
          <h1 className="title">More Adventure Awaits!</h1>
          <p className="subtitle">Our little beach critters are building sandcastles for new levels</p>
        </div>
        
        <div className="coming-soon-container">
          <div className="coming-soon-image-container">
            <img src={sandcastleImage} alt="Sandcastle" />
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
          <p className="coming-soon-text">More exciting beach adventures are on the way!</p>
          <div className="wave-animation">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
        
        <div className="message-container">
          <p className="message-text">Our team of beach-loving developers is creating new puzzles, challenges, and tropical surprises just for you!</p>
          <p className="message-text">Splash back soon to discover new treasures!</p>
        </div>
        
        <div className="button-container">
          <a href="/" className="primary-button">Back to Home</a>
          <a href="#subscribe" className="secondary-button">Get Updates</a>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;