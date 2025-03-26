import React, { useState } from 'react';
// Fish moves through coral not hitting it each time you get a question right
// Fish doesn't move if question wrong
function Coral() {
  // Will keep track of the current question
  const [questionIndex, setQuestionIndex] = useState(0);

  // Keeps track of user input when answering questions
  const [userAnswer, setUserAnswer] = useState('');

  // Array of questions to loop through during mini game (with answers expected from user)
  const questions = [
    {
      question: 'Complete the sentence with the correct conjugation of the verb "hablar" in the present tense: Yo ________ español todos los días.',
      answer: 'hablo',
    },
    {
      question: 'Fill in the blank with the correct form of the verb "tener" (hint: irregular) in the preterite tense: Ellos ________ una fiesta el fin de semana pasado.',
      answer: 'tuvieron',
    },
    {
      question: 'Fill in the blank with the correct form of the adjective "feliz" to match the subject in the sentence: Mi madre está ________ porque ganó un premio.',
      answer: 'feliz',
    },
  ];

  // Handles answer submission (will determine if we move to next question or not)
  const handleAnswerSubmit = () => {
    if (userAnswer.trim().toLowerCase() === questions[questionIndex].answer.toLowerCase()) {
      // Index is incremented if question is right (moves to the next)
      setQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); 
      setUserAnswer(''); 
    } else {
      alert('Incorrect answer, try again!');
    }
  };

  // Function to handle going to the next question
  const handleNextQuestion = () => {
    setQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length); 
  };

  const styles = {
    container: {
      padding: '20px',
    },
    textBoxContainer: {

    },
    textBox: {
      padding: '8px',
      border: 'none', 
    },
    button: {
      padding: '8px 16px',
      backgroundColor: 'initial', 
    },
  };

  return (
    // Container with styles applied
    <div style={styles.container}>
      <div style={styles.textBoxContainer}>
        {/* Display the current question */}
        <p style={styles.textBox}>
          {questions[questionIndex].question}
        </p>

        {/* User input for answering the question */}
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          style={styles.textBox}
          placeholder="Type your answer here"
        />

        {/* Button that submits user's answer and moves to next question */}
        <button onClick={handleAnswerSubmit} style={styles.button}>
          Submit Answer
        </button>
      </div>
    </div>
  );
}

export default Coral;