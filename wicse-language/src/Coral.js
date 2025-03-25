import React, { useState } from 'react';
import Fish from './Assets/FishImage.PNG';
import CoralPic from './Assets/coralll.png';
import Ocean from './Assets/water.png';

function Coral() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const totalQuestions = 8; // Adjust based on your questions array

  // Fish position (0% means left, 100% means right)
  const fishPosition = (questionIndex / totalQuestions) * 100; 

  // Number of coral images (reduces as fish moves right)
  const coralCount = totalQuestions - questionIndex; 

  const questions = [
    { question: 'Yo (speak) ________ español todos los días.', answer: 'hablo' },
    { question: 'Ellos (have) ________ una fiesta el fin de semana pasado.', answer: 'tuvieron' },
    { question: 'Mi madre está (happy)________ porque ganó un premio.', answer: 'feliz' },
    { question: '"Rojo" means ________. (color)', answer: 'red' },
    { question: '"Manzana" is the Spanish word for ________. (fruit)', answer: 'apple' },
    { question: 'The Spanish word for "sun" is _____', answer: 'sol' },
    { question: 'The Spanish word for "book" is _____', answer: 'libro' },
    { question: 'The Spanish word for "dog" is _____', answer: 'perro' },
  ];

  const handleAnswerSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[questionIndex].answer.toLowerCase()) {
      setQuestionIndex((prevIndex) => Math.min(prevIndex + 1, totalQuestions));
      setUserAnswer('');
    } else {
      alert('Incorrect answer, try again!');
    }
  };

  return (
    <div 
      style={{ position: 'relative', width: '100vw', height: '100vh', backgroundImage: `url(${require('./Assets/water.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
      {/* Coral Images - Start on Right Side and Decrease */}
      {Array.from({ length: coralCount }).map((_, index) => (
        <img 
          key={index}
          src={CoralPic}
          alt="Coral reef"
          style={{ 
            position: 'absolute', 
            bottom: '-50px', 
            right: `${index * 10}%`, // Spread corals evenly
            width: '350px', 
            height: 'auto',
          }} 
        />
      ))}

      {/* Fish Image - Moves Right as Questions Are Answered */}
      {questionIndex < totalQuestions && (
        <img 
          src={Fish} 
          alt="Fish swimming" 
          style={{ 
            position: 'absolute', 
            bottom: '15%', 
            left: `${fishPosition - 25}%`, // Moves based on question progress
            width: '350px', 
            height: 'auto', 
            transition: 'left 0.5s ease-in-out',
          }} 
        />
      )}
      {/* Winning Message when all questions are answered */}
      {questionIndex >= totalQuestions ? (
        <div 
          style={{ 
            position: 'absolute', 
            top: '40%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '2rem', 
            color: '#ff4500', 
            textAlign: 'center',
          }}
        >
          Congratulations! You helped the fish get through the coral!
        </div>
      ) : (
        <>
          {/* Question and Answer Box */}
          <div 
            style={{ 
              position: 'absolute', 
              top: '10%', left: '50%', 
              transform: 'translateX(-50%)', 
              textAlign: 'center' 
            }}
          >
            <p style={{ fontSize: '1.5rem', fontFamily: 'YourFontName, sans-serif' }}>
              {questions[questionIndex]?.question}
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here"
              style={{ padding: '10px', fontSize: '1rem' }}
            />
            <button 
              onClick={handleAnswerSubmit} 
              style={{ marginLeft: '10px', padding: '10px', fontSize: '1rem' }}
            >
              Submit Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Coral;
