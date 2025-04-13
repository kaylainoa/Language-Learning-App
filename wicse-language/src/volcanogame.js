import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './volcanogame.css';

function VolcanoGame() {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [erupting, setErupting] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wordsLearned, setWordsLearned] = useState([]);
  
  // Refs
  const timerRef = useRef(null);
  const volcanoRef = useRef(null);
  
  // Spanish volcano vocabulary by difficulty
  const vocabularyWords = {
    easy: [
      { spanish: 'el estudiante', english: 'student' },
      { spanish: 'la universidad', english: 'university' },
      { spanish: 'el profesor', english: 'professor' },
      { spanish: 'la clase', english: 'class' },
      { spanish: 'el examen', english: 'exam' },
      { spanish: 'la biblioteca', english: 'library' },
      { spanish: 'el libro', english: 'book' },
      { spanish: 'el cuaderno', english: 'notebook' },
      { spanish: 'azul', english: 'blue' },
      { spanish: 'naranja', english: 'orange' },
      { spanish: 'universidad de florida', english: 'university of florida'},
    ],
    medium: [
      { spanish: 'los Gators', english: 'the Gators' },
      { spanish: 'el campo de fútbol', english: 'football field' },
      { spanish: 'la residencia estudiantil', english: 'dorm' },
      { spanish: 'la beca', english: 'scholarship' },
      { spanish: 'el compañero de cuarto', english: 'roommate' },
      { spanish: 'la cafetería', english: 'cafeteria' },
      { spanish: 'el campus', english: 'campus' },
      { spanish: 'el laboratorio', english: 'laboratory' },
    ],
    hard: [
      { spanish: 'la fraternidad', english: 'fraternity' },
      { spanish: 'la hermandad femenina', english: 'sorority' },
      { spanish: 'el título universitario', english: 'college degree' },
      { spanish: 'la graduación', english: 'graduation' },
      { spanish: 'el caimán', english: 'alligator' },
      { spanish: 'el orgullo naranja y azul', english: 'orange and blue pride' },
      { spanish: 'el semestre de primavera', english: 'spring semester' },
      { spanish: 'la investigación académica', english: 'academic research' },
      { spanish: "pasantía", english: "internship"}
    ]
  };
  
  // Get random word based on current difficulty
  const getRandomWord = () => {
    const words = vocabularyWords[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };
  
  // Start game
  const startGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
    setScore(0);
    setTimeLeft(selectedDifficulty === 'easy' ? 30 : selectedDifficulty === 'medium' ? 25 : 20);
    setWordsLearned([]);
    nextWord();
    
    // Start timer
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };
  
  // End game
  const endGame = () => {
    clearInterval(timerRef.current);
    setGameCompleted(true);
    setGameStarted(false);
  };
  
  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setCurrentWord(null);
    setErupting(false);
    setPlayerAnswer('');
    setFeedback('');
    clearInterval(timerRef.current);
  };
  
  // Move to next word
  const nextWord = () => {
    const word = getRandomWord();
    setCurrentWord(word);
    setPlayerAnswer('');
    setFeedback('');
  };
  
  // Check answer
  const checkAnswer = (e) => {
    e.preventDefault();
    
    if (!gameStarted || !currentWord) return;
    
    const isCorrect = playerAnswer.toLowerCase().trim() === currentWord.english.toLowerCase();
    
    if (isCorrect) {
      setScore(prevScore => prevScore + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
      setFeedback('¡Correcto!');
      setWordsLearned(prev => [...prev, currentWord]);
      
      // Visual feedback - volcano eruption animation
      triggerEruption();
      
      // Move to next word after short delay
      setTimeout(() => {
        nextWord();
      }, 1500);
    } else {
      setFeedback(`Intenta otra vez. La palabra "${currentWord.spanish}" en inglés es "${currentWord.english}".`);
    }
  };
  
  // Trigger volcano eruption animation
  const triggerEruption = () => {
    setErupting(true);
    setTimeout(() => {
      setErupting(false);
    }, 1500);
  };
  
  // Handle input change
  const handleInputChange = (e) => {
    setPlayerAnswer(e.target.value);
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  return (
    <div className="volcano-page">
      {/* Decorative elements */}
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="palm-leaf"></div>
      <div className="palm-leaf"></div>
      
      <div className="content-container">
        <div className="headinghome">
          <h1 className="title">Volcano Spanish Challenge</h1>
          <p><em>Complete as many as you can before the timer runs out!</em></p><br></br>
          <p className="subtitle">¡Aprende palabras sobre volcanes en español!</p>
        </div>
        
        <div className="game-container">
          {!gameStarted && !gameCompleted ? (
            <div className="start-screen">
              <div className="volcano-intro">
                <div className="volcano-image"></div>
                <div className="intro-text">
                  <h2>Welcome to the Volcano Spanish Challenge!</h2>
                  <p>Translate Spanish words related to volcanoes to learn volcano vocabulary. Each correct answer makes the volcano erupt!</p>
                  <p>Choose your difficulty level:</p>
                  
                  <div className="difficulty-buttons">
                    <button 
                      className="difficulty-button easy"
                      onClick={() => startGame('easy')}
                    >
                      Easy (30 seconds)
                    </button>
                    <button 
                      className="difficulty-button medium"
                      onClick={() => startGame('medium')}
                    >
                      Medium (25 seconds)
                    </button>
                    <button 
                      className="difficulty-button hard"
                      onClick={() => startGame('hard')}
                    >
                      Hard (20 seconds)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : gameStarted ? (
            <div className="game-play">
              <div className="game-status">
                <div className="score-display">Score: {score}</div>
                <div className="timer">Time: {timeLeft}s</div>
                <div className="difficulty-badge">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</div>
              </div>
              
              <div className="volcano-container">
                <div className={`volcano ${erupting ? 'erupting' : ''}`} ref={volcanoRef}>
                  <div className="lava"></div>
                  <div className="smoke"></div>
                </div>
              </div>
              
              <div className="word-challenge">
                <h3>Translate this word:</h3>
                <div className="spanish-word">{currentWord?.spanish}</div>
                
                <form onSubmit={checkAnswer} className="answer-form">
                  <input
                    type="text"
                    value={playerAnswer}
                    onChange={handleInputChange}
                    placeholder="Type English translation"
                    className="answer-input"
                    autoFocus
                  />
                  <button type="submit" className="submit-button">Check</button>
                </form>
                
                {feedback && (
                  <div className={`feedback ${feedback.startsWith('¡Correcto!') ? 'correct' : 'incorrect'}`}>
                    {feedback}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="game-over">
              <h2>¡Juego terminado!</h2>
              <div className="final-score">Your Score: {score}</div>
              
              <div className="words-learned">
                <h3>Words you learned:</h3>
                <div className="vocabulary-list">
                  {wordsLearned.length > 0 ? (
                    <ul>
                      {[...new Set(wordsLearned.map(w => w.spanish))].map((word, index) => {
                        const wordObj = wordsLearned.find(w => w.spanish === word);
                        return (
                          <li key={index}>
                            <strong>{wordObj.spanish}</strong> - {wordObj.english}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p>You didn't get any words correct. Try again!</p>
                  )}
                </div>
              </div>
              
              <div className="game-over-buttons">
                <button className="primary-button" onClick={resetGame}>
                  Play Again
                </button>
                <Link to="/" className="secondary-button">
                  Return to Map
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VolcanoGame;