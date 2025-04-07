import React, { useState, useEffect } from 'react';
import './Coconut.css';
import Scoreboard from './Scoreboard';
import { useNavigate } from 'react-router-dom';

const generateNonOverlappingPositions = (numPositions, xRange, yRange, minDistance) => {
  const positions = [];
  let attempts = 0;
  const maxAttempts = 1000;

  while (positions.length < numPositions && attempts < maxAttempts) {
    attempts++;
    const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
    const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];

    const isOverlapping = positions.some(
      ([px, py]) => Math.sqrt((x - px) ** 2 + (y - py) ** 2) < minDistance
    );

    if (!isOverlapping) positions.push([x, y]);
  }

  return positions;
};

function Coconut() {
  const questions = [
    { question: 'Choose the correct spelling for:', word: 'to read', answer: ['L', 'E', 'E', 'R'] },
    /* { question: 'Choose the correct spelling for:', word: 'to write', answer: ['E', 'S', 'C', 'R', 'I', 'B', 'I', 'R'] },
    { question: 'Choose the correct spelling for:', word: 'book', answer: ['L', 'I', 'B', 'R', 'O'] },
    { question: 'Choose the correct spelling for:', word: 'letter', answer: ['C', 'A', 'R', 'T', 'A'] },
    { question: 'Choose the correct spelling for:', word: 'pencil', answer: ['L', 'Á', 'P', 'I', 'Z'] },
    { question: 'Choose the correct spelling for:', word: 'pen', answer: ['B', 'O', 'L', 'Í', 'G', 'R', 'A', 'F', 'O'] }*/
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const letters = currentQuestion.answer;
  const wordLength = letters.length;

  const [typedLetters, setTypedLetters] = useState([]);
  const [visibleLetters, setVisibleLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [glowRed, setGlowRed] = useState(false);
  const [gameWon, setGameWon] = useState(null);
  const [coconutPositions, setCoconutPositions] = useState([]);

  // Initialize positions and letters
  useEffect(() => {
    const positions = generateNonOverlappingPositions(letters.length, [10, 90], [20, 50], 20);
    setCoconutPositions(positions);
    setVisibleLetters(letters.map((letter, index) => ({ letter, id: index })));
    setTypedLetters([]);
    setGlowRed(false);
  }, [currentQuestionIndex]);

  const isCorrectOrder = () => typedLetters.join('') === currentQuestion.answer.join('');

  const handleLetterClick = (id) => {
    const clickedLetter = visibleLetters.find((l) => l.id === id).letter;
    setTypedLetters((prev) => [...prev, clickedLetter]);
    setVisibleLetters((prev) => prev.filter((l) => l.id !== id));
  };

  useEffect(() => {
    if (typedLetters.length === wordLength) {
      if (isCorrectOrder()) {
        setScore((prev) => prev + 10);
        const newIndex = currentQuestionIndex + 1;
        if (newIndex >= questions.length) {
          setGameWon(true); // Game won
        } else {
          setCurrentQuestionIndex(newIndex); // Next question
        }
      } else {
        setGlowRed(true);
        setTimeout(() => setGameWon(false), 1000); // Game lost
      }
    }
  }, [typedLetters]);

  return (
    <div className="coconut-background">
      <div className="score-counter">Score: {score}</div>

      {/* Render Scoreboard when game is over */}
      {gameWon !== null && <Scoreboard isWin={gameWon} score={score} />}

      {/* Render game elements only if game is ongoing */}
      {gameWon === null && (
        <>
          <div className="question-container">
            <h2>{currentQuestion.question}</h2>
            <div className="word-container">
              <span className="word">{currentQuestion.word}</span>
            </div>
          </div>

          <div className="coconut-container">
            {visibleLetters.map((letterObject, index) => (
              coconutPositions[index] && (
                <div
                  key={letterObject.id}
                  className="coconut"
                  style={{
                    position: "absolute",
                    left: `${coconutPositions[index][0]}%`,
                    top: `${coconutPositions[index][1]}%`,
                  }}
                  onClick={() => handleLetterClick(letterObject.id)}
                >
                  <div className="coconut-letter">{letterObject.letter}</div>
                </div>
              )
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
