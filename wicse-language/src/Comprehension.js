import React, { useState, useEffect } from 'react';
import './Comprehension.css';

function Comprehension() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [feedbackClass, setFeedbackClass] = useState('');
  const [roundQuestions, setRoundQuestions] = useState([]);

  // Fetch questions from data.json
  useEffect(() => {
    // In a real app, you'd fetch from an API or import the JSON
    // For this example, we'll assume data is available
    import('./data.json')
      .then(data => {
        // Select 10 random questions from the comprehension-questions array
        const allQuestions = data.default["comprehension-questions"];
        const selectedQuestions = selectRandomQuestions(allQuestions, 10);
        setRoundQuestions(selectedQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading questions:", error);
        setLoading(false);
      });
  }, []);

  const selectRandomQuestions = (allQuestions, count) => {
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    
    if (!userAnswer.trim()) return;
    
    // Check answer logic would depend on the expected answers
    // For this example, we'll simply check if the answer contains some expected words
    const currentQuestion = roundQuestions[currentQuestionIndex];
    const lowerAnswer = userAnswer.toLowerCase();
    
    // Simplified answer checking (would be more sophisticated in real app)
    let isCorrect = false;
    
    if (currentQuestion.question.includes("El sol brilla") && lowerAnswer.includes("sun") && lowerAnswer.includes("shine")) {
      isCorrect = true;
    } else if (currentQuestion.question.includes("Yo camino") && lowerAnswer.includes("walk") && lowerAnswer.includes("school")) {
      isCorrect = true;
    } // You would add more specific cases here for each question

    // Fallback generic checking
    if (!isCorrect) {
      // Extract keywords from the hint and check if they're in the answer
      const hintWords = currentQuestion.hint.match(/\b[a-zA-Z]+\b/g) || [];
      const englishWords = hintWords.filter(word => !['means', 'the', 'a', 'an', 'is', 'are', 'to', 'and', 'or', 'but'].includes(word.toLowerCase()));
      
      // Count how many relevant words from the hint appear in the answer
      const matchCount = englishWords.filter(word => 
        lowerAnswer.includes(word.toLowerCase().replace(/[.,?!;:]/, ''))
      ).length;
      
      // If the answer contains at least half of the expected words, consider it correct
      if (matchCount >= Math.ceil(englishWords.length / 2)) {
        isCorrect = true;
      }
    }
    
    if (isCorrect) {
      setScore(score + 1);
      setFeedback('¡Correcto! Great job!');
      setFeedbackClass('correct-feedback');
    } else {
      setFeedback('Not quite. Try again or use the hint!');
      setFeedbackClass('incorrect-feedback');
    }
    
    // Wait a moment to show feedback before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < roundQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
        setShowHint(false);
        setFeedback('');
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const restartGame = () => {
    // Reset game state
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowHint(false);
    setGameOver(false);
    setFeedback('');
    
    // Get new questions
    import('./data.json').then(data => {
      const allQuestions = data.default["comprehension-questions"];
      const selectedQuestions = selectRandomQuestions(allQuestions, 10);
      setRoundQuestions(selectedQuestions);
    });
  };

  if (loading) {
    return <div className="comprehension-page loading">Loading questions...</div>;
  }

  return (
    <div className="comprehension-page">
      {/* Decorative Elements */}
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="seashell"></div>
      <div className="palm-leaf"></div>
      <div className="palm-leaf"></div>
      
      <div className="sparkle sparkle-1"></div>
      <div className="sparkle sparkle-2"></div>
      <div className="sparkle sparkle-3"></div>

      <div className="content-container">
        {!gameOver ? (
          <>
            <div className="heading-comprehension">
              <h1 className="title">Comprehension Challenge</h1>
              <p className="subtitle">Translate the Spanish sentences to English</p>
            </div>
            
            <div className="progress-tracker">
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / roundQuestions.length) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Question {currentQuestionIndex + 1} of {roundQuestions.length}
              </div>
            </div>
            
            <div className="comprehension-container">
              <div className="question-card">
                <h3 className="question-text">{roundQuestions[currentQuestionIndex].question}</h3>
                
                {showHint && (
                  <div className="hint-container">
                    <p className="hint-text">{roundQuestions[currentQuestionIndex].hint}</p>
                  </div>
                )}
                
                <form onSubmit={handleAnswerSubmit} className="answer-form">
                  <textarea
                    className="answer-input"
                    placeholder="Type your translation here..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    rows={3}
                  />
                  
                  <div className="buttons-row">
                    <button type="button" className="hint-button" onClick={toggleHint}>
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button type="submit" className="submit-button">Submit Answer</button>
                  </div>
                </form>
                
                {feedback && (
                  <div className={`feedback-message ${feedbackClass}`}>
                    {feedback}
                  </div>
                )}
              </div>
            </div>
            
            <div className="score-display">
              <div className="score-text">Current Score: {score}/{roundQuestions.length}</div>
            </div>
          </>
        ) : (
          <div className="game-over-container">
            <h2 className="game-over-title">¡Muy bien!</h2>
            <div className="final-score-container">
              <div className="final-score">
                <span className="score-number">{score}</span>
                <span className="score-divider">/</span>
                <span className="total-questions">{roundQuestions.length}</span>
              </div>
              <p className="score-message">
                {score === roundQuestions.length ? '¡Perfecto! Perfect score!' : 
                 score >= Math.round(roundQuestions.length * 0.7) ? '¡Excelente! Great job!' : 
                 score >= Math.round(roundQuestions.length * 0.5) ? '¡Bien hecho! Good effort!' : 
                 '¡Sigue practicando! Keep practicing!'}
              </p>
            </div>
            
            <div className="button-container">
              <button className="primary-button" onClick={restartGame}>
                Play Again
              </button>
              <a href="/" className="secondary-button">
                Back to Home
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Wave Animation */}
      <div className="wave-animation">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
    </div>
  );
}

export default Comprehension;