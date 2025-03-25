import React, { useState, useEffect } from "react";
import parrotImg from "./Assets/parrotImg.png"; 
import surfboardImg from "./Assets/surfboard.png"; 
import bgImage from "./Assets/surfingbg.png"; 

function Game() {
  const [parrotY, setParrotY] = useState(50); // Parrot's vertical position
  const [score, setScore] = useState(0);
  const [currentSentence, setCurrentSentence] = useState("El ___ es grande."); // Current sentence to display
  const [currentWords, setCurrentWords] = useState([
    { text: "perro", correct: true, x: 100, y: 20 },
    { text: "gata", correct: false, x: 100, y: 70 },
  ]);

  const sentences = [
    { sentence: "El ___ es grande.", correct: "perro", answers: ["perro", "gata"] },
    { sentence: "El ___ está jugando.", correct: "pajaro", answers: ["hombre", "pajaro"] },
    { sentence: "La ___ corre rápido.", correct: "gata", answers: ["pajaro", "gata"] },
    { sentence: "El ___ está durmiendo.", correct: "pajaro", answers: ["pajaro", "gata"] },
    { sentence: "El ___ es pequeño.", correct: "hombre", answers: ["gata", "hombre"] },
    { sentence: "La ___ es rápida.", correct: "gata", answers: ["hombre", "gata"] },
    { sentence: "La ___ es pequeña.", correct: "gata", answers: ["pajaro", "gata"] },
    { sentence: "El ___ vuela.", correct: "pajaro", answers: ["pajaro", "gato"] },
    { sentence: "El ___ corre.", correct: "gato", answers: ["pajaro", "gato"] },
    { sentence: "La ___ está comiendo.", correct: "gata", answers: ["gata", "perro"] },
  ];

  // The correct answers pattern (alternating top/bottom)
  const answerPositions = [
    "top", "bottom", "bottom", "top", "bottom", 
    "bottom", "bottom", "top", "bottom", "top"
  ];

  // Up and Down motion of the parrot
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && parrotY > 0) {
        setParrotY((prev) => prev - 10);
      }
      if (event.key === "ArrowDown" && parrotY < 90) {
        setParrotY((prev) => prev + 10);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [parrotY]);

  // Word movement across the screen
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          x: word.x - 5, // Moves words to the left
        }))
      );
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // Detect collision and handle score
  useEffect(() => {
    currentWords.forEach((word) => {
      if (word.x < 10 && Math.abs(word.y - parrotY) < 10) {
        if (word.correct) {
          setScore((prev) => prev + 1); // Increase score if correct word is hit

          // Get the current sentence index
          const currentSentenceIndex = sentences.findIndex(sentence => sentence.sentence === currentSentence);

          // Get next sentence with alternating correct answers
          const nextSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
          setCurrentSentence(sentences[nextSentenceIndex].sentence);

          // Update word choices with the correct answer at the right position
          setCurrentWords([
            { text: sentences[nextSentenceIndex].answers[0], correct: sentences[nextSentenceIndex].answers[0] === sentences[nextSentenceIndex].correct, x: 100, y: 20 },
            { text: sentences[nextSentenceIndex].answers[1], correct: sentences[nextSentenceIndex].answers[1] === sentences[nextSentenceIndex].correct, x: 100, y: 70 },
          ]);
        } else {
          alert("Game Over! You hit the wrong word.");
          window.location.reload();
        }
      }
    });
  }, [currentWords, parrotY, currentSentence]);

  return (
    <div style={styles.gameContainer}>
      <h2 style={styles.sentence}>{currentSentence}</h2>
      <p style={styles.score}>Score: {score}</p>

      {/* Surfboard */}
      <img
        src={surfboardImg}
        alt="Surfboard"
        style={{ ...styles.surfboard, top: `${parrotY}%` }}
      />
      {/* Parrot on top of Surfboard */}
      <img
        src={parrotImg}
        alt="Parrot"
        style={{ ...styles.parrot, top: `${parrotY - 5}%` }} // Adjusted to sit on surfboard
      />

      {/* Moving words */}
      {currentWords.map((word, index) => (
        <div
          key={index}
          style={{
            ...styles.wordObstacle,
            left: `${word.x}%`,
            top: `${word.y}%`,
          }}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
}

// 🎨 Styles
const styles = {
  gameContainer: {
    position: "relative",
    width: "100%",
    height: "600px",
    background: `url(${bgImage}) lightgray 50% / cover no-repeat`,
    overflow: "hidden",
    textAlign: "center",
  },
  sentence: { fontSize: "24px", fontWeight: "bold" },
  score: { fontSize: "20px", marginBottom: "10px" },
  surfboard: {
    position: "absolute",
    left: "50px",
    width: "100px",
    transition: "top 0.2s ease-in-out",
  },
  parrot: {
    position: "absolute",
    left: "65px", // Adjust sitting on surfboard
    width: "60px",
    transition: "top 0.2s ease-in-out",
  },
  wordObstacle: {
    position: "absolute",
    fontSize: "20px",
    background: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    textAlign: "center",
  },
};

export default Game;

