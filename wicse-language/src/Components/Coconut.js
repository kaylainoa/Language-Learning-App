import React from 'react';
import './Coconut.css';
import { useState, useEffect } from 'react';

function Coconut() {
  return (
    <div className="coconut-background">
      <div className="question-container">
        <h2>Choose the correct spelling for:</h2>
        <div className="word-container">
          <span className="word">to read</span>
        </div>
      </div>
    </div>
  );
}

export default Coconut;
