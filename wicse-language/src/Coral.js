import React, { useState, useEffect } from 'react';
import Fish from './Assets/FishImage.PNG';
import CoralPic from './Assets/coralll.png';
import Ocean from './Assets/water.png';


function Coral() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const totalQuestions = 10; // Adjust based on your questions array


  const questions = [
    { question: 'Yo (speak) ________ español todos los días.', answer: 'hablo' },
    { question: 'Ellos (have) ________ una fiesta el fin de semana pasado.', answer: 'tuvieron' },
    { question: 'Mi madre está (happy)________ porque ganó un premio.', answer: 'feliz' },
    { question: '"Rojo" means ________. (color)', answer: 'red' },
    { question: '"Manzana" is the Spanish word for ________. (fruit)', answer: 'apple' },
    { question: 'The Spanish word for "sun" is _____', answer: 'sol' },
    { question: 'The Spanish word for "book" is _____', answer: 'libro' },
    { question: 'The Spanish word for "dog" is _____', answer: 'perro' },
    { question: 'The Spanish word for "shirt" is _____', answer: 'camisa'},
    { question: 'The Spanish word for "bed" is _____', answer: 'cama'},
    {question: 'The Spanish word for "table" is _____', answer: 'mesa' },
    { question: 'The Spanish word for "window" is _____', answer: 'ventana' },
    { question: 'The Spanish word for "chair" is _____', answer: 'silla' },
    { question: 'The Spanish word for "water" is _____', answer: 'agua' },
    { question: 'The Spanish word for "fire" is _____', answer: 'fuego' },
    { question: 'The Spanish word for "door" is _____', answer: 'puerta' },
    { question: 'The Spanish word for "house" is _____', answer: 'casa' },
    { question: 'The Spanish word for "flower" is _____', answer: 'flor' },
    { question: 'The Spanish word for "cat" is _____', answer: 'gato' },
    { question: 'The Spanish word for "tree" is _____', answer: 'arbol' }
  ];


  // Function to shuffle the questions
  const Randomize = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const scoreBoard = (score) => {
    console.log("Final Coral Score:", score);
  };


  useEffect(() => {
    const shuffledQuestions = Randomize([...questions]).slice(0, totalQuestions);
    setSelectedQuestions(shuffledQuestions);
  }, []);


  useEffect(() => {
    if (questionIndex >= totalQuestions) {
      scoreBoard(totalQuestions);
    }
  }, [questionIndex]);


  const fishPosition = selectedQuestions.length > 0
    ? (questionIndex / selectedQuestions.length) * 100
    : 0;


  const coralCount = selectedQuestions.length > 0
    ? selectedQuestions.length - questionIndex
    : 0;


  const handleAnswerSubmit = () => {
    if (userAnswer.trim().toLowerCase() === selectedQuestions[questionIndex].answer.toLowerCase()) {
      setScore(prev => prev + 1);
      setQuestionIndex((prevIndex) => Math.min(prevIndex + 1, totalQuestions));
      setUserAnswer('');
    } else {
      alert('Incorrect answer, try again!');
    }
  };


  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${require('./Assets/water.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden' }}>


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
              {selectedQuestions[questionIndex]?.question}
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
