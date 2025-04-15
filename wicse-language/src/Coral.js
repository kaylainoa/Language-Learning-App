import React, { useState } from 'react';
import Fish from './Assets/FishImage.PNG';
import CoralPic from './Assets/coralll.png';
import Ocean from './Assets/water.png';
import data from "./data.json";

function Coral() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const totalQuestions = 8;

  const fishPosition = (questionIndex / totalQuestions) * 100; 
  const coralCount = totalQuestions - questionIndex; 

  const questions = data["coral-questions"]
  // [
  //   { question: 'Yo (speak) ________ español todos los días.', answer: 'hablo' },
  //   { question: 'Ellos (have) ________ una fiesta el fin de semana pasado.', answer: 'tuvieron' },
  //   { question: 'Mi madre está (happy)________ porque ganó un premio.', answer: 'feliz' },
  //   { question: '"Rojo" means ________. (color)', answer: 'red' },
  //   { question: '"Manzana" is the Spanish word for ________. (fruit)', answer: 'apple' },
  //   { question: 'The Spanish word for "sun" is _____', answer: 'sol' },
  //   { question: 'The Spanish word for "book" is _____', answer: 'libro' },
  //   { question: 'The Spanish word for "dog" is _____', answer: 'perro' },
  // ];

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
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundImage: `url(${Ocean})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}>
      {/* Coral Images - Start on Right Side and Decrease */}
      {Array.from({ length: coralCount }).map((_, index) => (
        <img 
          key={index}
          src={CoralPic}
          alt="Coral reef"
          style={{ 
            position: 'absolute', 
            bottom: '0', 
            right: `${index * 10}%`, 
            width: '20vw', 
            maxWidth: '350px', 
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
            left: `${fishPosition - 25}%`, 
            width: '20vw', 
            maxWidth: '350px', 
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
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '2vw', 
            minFontSize: '16px',
            maxFontSize: '32px',
            color: '#ff4500', 
            textAlign: 'center',
            padding: '20px',
            backgroundColor: 'rgba(255,255,255,0.7)',
            borderRadius: '10px',
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
              top: '10%', 
              left: '50%', 
              transform: 'translateX(-50%)', 
              textAlign: 'center',
              width: '90%',
              maxWidth: '600px',
            }}
          >
            <p style={{ 
              fontSize: '1.5vw', 
              minFontSize: '14px',
              maxFontSize: '24px',
              marginBottom: '20px',
            }}>
              {questions[questionIndex]?.question}
            </p>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here"
              style={{ 
                padding: '10px', 
                fontSize: '1vw',
                minFontSize: '12px',
                maxFontSize: '18px',
                width: '60%',
                marginRight: '10px',
              }}
            />
            <button 
              onClick={handleAnswerSubmit} 
              style={{ 
                padding: '10px', 
                fontSize: '1vw',
                minFontSize: '12px',
                maxFontSize: '18px',
              }}
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