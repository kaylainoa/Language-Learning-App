import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Coconut.css';
import './Scoreboard.css';
import Scoreboard from './Scoreboard.js';

function Coconut() {
  const questions = [
    { question: 'Choose the correct spelling for:', word: 'to read', answer: ['L', 'E', 'E', 'R'] },
    /* { question: 'Choose the correct spelling for:', word: 'to write', answer: ['E', 'S', 'C', 'R', 'I', 'B', 'I', 'R'] },
    { question: 'Choose the correct spelling for:', word: 'book', answer: ['L', 'I', 'B', 'R', 'O'] },
    { question: 'Choose the correct spelling for:', word: 'letter', answer: ['C', 'A', 'R', 'T', 'A'] },
    { question: 'Choose the correct spelling for:', word: 'pencil', answer: ['L', 'Á', 'P', 'I', 'Z'] },
    { question: 'Choose the correct spelling for:', word: 'pen', answer: ['B', 'O', 'L', 'Í', 'G', 'R', 'A', 'F', 'O'] }*/
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
  const [coconutPositions, setCoconutPositions] = useState(
    letters.map(() => ({ x: Math.random() * (90 - 10) + 10, y: Math.random() * (50 - 20) + 20 }))
  );
  const [gameWon, setGameWon] = useState(false); // Track if all questions are answered
  const [showScoreboard, setShowScoreboard] = useState(false); // Control scoreboard popup visibility

  // Handle Levels button click
  const handleLevelsClick = () => {
    console.log('Navigating to Levels...');
    setShowScoreboard(false); // Close popup
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
      letters.map(() => ({
        x: Math.random() * (90 - 10) + 10,
        y: Math.random() * (50 - 20) + 20,
      }))
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

  // Update visible letters and coconut positions when the question changes
  useEffect(() => {
    setVisibleLetters(currentQuestion.answer.map((letter, index) => ({ letter, id: index })));
    setCoconutPositions(
      letters.map(() => ({
        x: Math.random() * (90 - 10) + 10,
        y: Math.random() * (50 - 20) + 20,
      }))
    );
  }, [currentQuestionIndex]);

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
      {/* Debug button - will always be visible */}
      <button
        onClick={() => setShowScoreboard(true)}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "8px 16px",
          borderRadius: "4px",
          backgroundColor: "#582604",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Show Scoreboard (Debug)
      </button>
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
                  left: `${coconutPositions[index].x}%`,
                  top: `${coconutPositions[index].y}%`,
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