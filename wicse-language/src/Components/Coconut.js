import React, { useState, useEffect } from 'react';
import './Coconut.css';

function Coconut() {
  const questions = [
    { question: 'Choose the correct spelling for:', word: 'to read', answer: ['L', 'E', 'E', 'R'] },
    { question: 'Choose the correct spelling for:', word: 'to write', answer: ['E', 'S', 'C', 'R', 'I', 'B', 'I', 'R'] },
    { question: 'Choose the correct spelling for:', word: 'book', answer: ['L', 'I', 'B', 'R', 'O'] },
    { question: 'Choose the correct spelling for:', word: 'letter', answer: ['C', 'A', 'R', 'T', 'A'] },
    { question: 'Choose the correct spelling for:', word: 'pencil', answer: ['L', 'Á', 'P', 'I', 'Z'] },
    { question: 'Choose the correct spelling for:', word: 'pen', answer: ['B', 'O', 'L', 'Í', 'G', 'R', 'A', 'F', 'O'] }
  ];

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
  const [coconutPositions, setCoconutPositions] = useState( //random cocnut positions
    letters.map(() => ({ x: 0, y: 0 }))
  );
  const [gameWon, setGameWon] = useState(false); // State to track if the game is won

  const handleLetterClick = (id) => {
    const clickedLetter = visibleLetters.find((l) => l.id === id).letter;

    setTypedLetters((prev) => [...prev, clickedLetter]); 
    setVisibleLetters((prev) => prev.filter((l) => l.id !== id)); 
  };

  const isCorrectOrder = () => {
    return typedLetters.join('') === currentQuestion.answer.join('');
  };

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

  useEffect(() => {
    if (typedLetters.length === wordLength) {
      if (isCorrectOrder()) {
        setScore((prevScore) => prevScore + 10); 
        const newIndex = currentQuestionIndex + 1;
        if (newIndex >= questions.length) { //setting game state
          setGameWon(true); 
        } else {
          setCurrentQuestionIndex(newIndex);
          resetGame();
        }
      } else {
        setGlowRed(true); 
        setTimeout(() => {
          resetGame(); 
        }, 1000);
      }
    }
  }, [typedLetters]);

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
      {gameWon && (
        <div className="win-message">You Win!</div>
      )}
      {!gameWon && (
        <div className="question-container">
          <h2>{currentQuestion.question}</h2>
          <div className="word-container">
            <span className="word">{currentQuestion.word}</span>
          </div>
        </div>
      )}
      {!gameWon && (
        <div className="coconut-container">
          {visibleLetters.map((letterObject, index) => (
            <div
              key={letterObject.id}
              className="coconut"
              style={{
                position: 'absolute',
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
      )}
      {!gameWon && (
        <div className="typed-letters-box">
          {Array.from({ length: wordLength }).map((_, index) => (
            <div
              key={index}
              className={`letter-slot ${glowRed ? 'glow-red' : ''}`}
            >
              <span className="typed-letter">{typedLetters[index] || ''}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Coconut;
