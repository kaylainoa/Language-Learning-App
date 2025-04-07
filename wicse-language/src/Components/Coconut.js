import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Coconut.css';
import './Scoreboard.css';
import Scoreboard from './Scoreboard';

// Function to generate non-overlapping positions
const generateNonOverlappingPositions = (numPositions, xRange, yRange, minDistance) => {
  const positions = [];
  while (positions.length < numPositions) {
    const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
    const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];

    // Check if the new position overlaps with any existing position
    const isOverlapping = positions.some(
      ([px, py]) => Math.sqrt((x - px) ** 2 + (y - py) ** 2) < minDistance
    );

    if (!isOverlapping) {
      positions.push([x, y]);
    }
  }
  return positions;
};

function Coconut() {
  const questions = [
    { question: 'Choose the correct spelling for:', word: 'to write', answer: ['E', 'S', 'C', 'R', 'I', 'B', 'I', 'R'] }
  ];

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const letters = currentQuestion.answer;
  const wordLength = letters.length;

  const [typedLetters, setTypedLetters] = useState([]);
  const [visibleLetters, setVisibleLetters] = useState(
    letters.map((letter, index) => ({ letter, id: index }))
  );
  const [score, setScore] = useState(0);
  const [glowRed, setGlowRed] = useState(false);
  
  // Option 1: Initialize with default values
  const [coconutPositions, setCoconutPositions] = useState(
    Array(letters.length).fill([50, 50]) // Default position in center
  );
  
  const [gameWon, setGameWon] = useState(false); // Track if all questions are answered
  const [showScoreboard, setShowScoreboard] = useState(false); // Control scoreboard popup visibility

  // Generate initial non-overlapping positions for coconuts
  useEffect(() => {
    setCoconutPositions(
      generateNonOverlappingPositions(letters.length, [10, 90], [20, 50], 10)
    );
  }, [currentQuestionIndex]);

  // Handle Levels button click
  const handleLevelsClick = () => {
    navigate('/levels'); // Navigate to levels page
  };

  // Handle letter click
  const handleLetterClick = (id) => {
    const clickedLetter = visibleLetters.find((l) => l.id === id).letter;
    setTypedLetters((prev) => [...prev, clickedLetter]);
    setVisibleLetters((prev) => prev.filter((l) => l.id !== id));
  };

  // Check if typed letters match the correct order
  const isCorrectOrder = () => {
    return typedLetters.join('') === currentQuestion.answer.join('');
  };

  // Reset game state for the next question
  const resetGame = () => {
    setTypedLetters([]);
    setVisibleLetters(letters.map((letter, index) => ({ letter, id: index })));
    setGlowRed(false);
    setCoconutPositions(
      generateNonOverlappingPositions(letters.length, [10, 90], [20, 50], 10)
    );
  };

  // Handle typing logic and check if game is won
  useEffect(() => {
    if (typedLetters.length === wordLength) {
      if (isCorrectOrder()) {
        setScore((prevScore) => prevScore + 10); // Increment score by 10
        const newIndex = currentQuestionIndex + 1;
        if (newIndex >= questions.length) {
          setGameWon(true); // End game if all questions are answered
          setShowScoreboard(true); // Automatically show scoreboard popup
        } else {
          setCurrentQuestionIndex(newIndex); // Move to next question
          resetGame(); // Reset for next round
        }
      } else {
        setGlowRed(true); // Indicate incorrect answer visually
        setTimeout(() => {
          resetGame(); // Reset after incorrect answer
        }, 1000);
      }
    }
  }, [typedLetters]);

  return (
    <div className="coconut-background">
      <div className="score-counter">Score: {score}</div>

      {/* Render scoreboard popup */}
      <Scoreboard 
        isOpen={showScoreboard}
        onClose={() => setShowScoreboard(false)}
        score={score}
        title="YOU WIN!"
        onLevelsClick={handleLevelsClick}
      />

      {!gameWon && (
        <>
          <div className="question-container">
            <h2>{currentQuestion.question}</h2>
            <div className="word-container">
              <span className="word">{currentQuestion.word}</span>
            </div>
          </div>

          <div className="coconut-container">
            {visibleLetters.map((letterObject, index) => (
              <div
                key={letterObject.id}
                className="coconut"
                style={{
                  position: "absolute",
                  left: `${coconutPositions[index][0]}%`,
                  top: `${coconutPositions[index][1]}%`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLetterClick(letterObject.id);
                }}
              >
                <div className="coconut-letter">{letterObject.letter}</div>
              </div>
            ))}
          </div>

          <div className="typed-letters-box">
            {Array.from({ length: wordLength }).map((_, index) => (
              <div key={index} className={`letter-slot ${glowRed ? "glow-red" : ""}`}>
                <span className="typed-letter">{typedLetters[index] || ""}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Coconut;
