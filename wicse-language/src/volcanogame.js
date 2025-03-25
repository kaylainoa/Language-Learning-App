import React, { useState } from 'react';
import './volcanogame.css';
import volcanoImage from './Assets/volcano.png'; // Import the PNG from src/Assets

function VolcanoGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const spanishQuestions = [
    {
      question: "What does 'hola' mean?",
      options: ["Goodbye", "Hello", "Thank you", "Please"],
      correctAnswer: "Hello",
      hint: "Hint: 'Adiós' means 'goodbye' in Spanish."
    },
    {
      question: "How do you say 'water' in Spanish?",
      options: ["Fuego", "Agua", "Tierra", "Aire"],
      correctAnswer: "Agua",
      hint: "Hint: 'Fuego' means 'fire' in Spanish."
    },
    {
      question: "What is the Spanish word for 'cat'?",
      options: ["Perro", "Gato", "Pájaro", "Pez"],
      correctAnswer: "Gato",
      hint: "Hint: 'Perro' means 'dog' in Spanish."
    },
    {
      question: "How do you say 'good morning'?",
      options: ["Buenas noches", "Buenas tardes", "Buenos días", "Adiós"],
      correctAnswer: "Buenos días",
      hint: "Hint: 'Buenas noches' means 'good night' in Spanish."
    },
    {
      question: "What does 'gracias' mean?",
      options: ["Sorry", "Hello", "Thank you", "Goodbye"],
      correctAnswer: "Thank you",
      hint: "Hint: 'Lo siento' means 'sorry' in Spanish."
    }
  ];

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);

    if (answer !== spanishQuestions[currentQuestion].correctAnswer) {
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);

      if (newWrongAttempts >= 3) {
        setGameStatus('erupted');
        return;
      }
    }

    setTimeout(() => {
      if (currentQuestion < spanishQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowHint(false);
      } else {
        setGameStatus('won');
      }
    }, 500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setWrongAttempts(0);
    setGameStatus('playing');
    setSelectedAnswer(null);
    setShowHint(false);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="volcano-game-container">
      <div className={`volcano-landscape ${gameStatus}`}>
        <div className="ocean-waves">
          <div className="wave wave1"></div>
          <div className="wave wave2"></div>
          <div className="wave wave3"></div>
        </div>
        <img src={volcanoImage} alt="Volcano" className={`volcano-image ${gameStatus}`} />
        <div className={`volcano-rocks ${gameStatus}`}></div>
        {/* Decorative Elements */}
        <div className="seashell"></div>
        <div className="seashell"></div>
        <div className="palm-leaf"></div>
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
      </div>

      <div className="game-overlay">
        {gameStatus === 'playing' && (
          <div className="question-container">
            <h1>Volcano Spanish Quiz</h1>
            <h2 className="question-text">{spanishQuestions[currentQuestion].question}</h2>
            <div className="attempts-display">
              Volcano Danger: {3 - wrongAttempts} attempts left
            </div>
            {showHint && (
              <div className="hint-text">{spanishQuestions[currentQuestion].hint}</div>
            )}
            <button onClick={toggleHint} className="hint-button">
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            <div className="answer-options">
              {spanishQuestions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswer(option)}
                  className={`answer-button ${
                    selectedAnswer === option 
                      ? option === spanishQuestions[currentQuestion].correctAnswer 
                        ? 'correct' 
                        : 'incorrect' 
                      : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameStatus === 'erupted' && (
          <div className="game-result erupted">
            <h1>Volcano Erupted!</h1>
            <p>The volcano couldn't be stopped. Keep practicing your Spanish!</p>
            <button onClick={resetGame} className="reset-button">Try Again</button>
          </div>
        )}

        {gameStatus === 'won' && (
          <div className="game-result won">
            <h1>Volcano Saved!</h1>
            <p>Congratulations! You prevented the eruption!</p>
            <button onClick={resetGame} className="reset-button">Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VolcanoGame;