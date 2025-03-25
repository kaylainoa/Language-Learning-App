import React from 'react';
import './Coconut.css';
import { useState, useEffect } from 'react';

function Coconut() {
  const [typedLetters, setTypedLetters] = useState([]); // State to hold typed letters
  const wordLength = 4;

  return (
    <div className="coconut-background">
      <div className="question-container">
        <h2>Choose the correct spelling for:</h2>
        <div className="word-container">
          <span className="word">to read</span>
        </div>
      </div>
      <div className="typed-letters-box">
        {/* Render empty bars */}
        {Array.from({ length: wordLength }).map((_, index) => (
          <div key={index} className="letter-slot"></div>
        ))}
      </div>
    </div>
  );
}

export default Coconut;
