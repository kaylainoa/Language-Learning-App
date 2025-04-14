import React, { useState, useEffect } from "react";
import parrotImg from "./Assets/parrotImg.png"; 
import surfboardImg from "./Assets/surfboard.png"; 
import bgImage from "./Assets/surfingbg.png"; 
import questions from "./data.json";

function Game() {
  const [parrotY, setParrotY] = useState(50); // Parrot's vertical position
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [currentSentence, setCurrentSentence] = useState("El ___ es grande."); // Current sentence to display
  const [currentWords, setCurrentWords] = useState([
    { text: "perro", correct: true, x: 100, y: 20 },
    { text: "gata", correct: false, x: 100, y: 70 },
  ]);

  const sentences = questions["surfing-questions"]
  //[
  //   { sentence: "El ___ es grande.", correct: "perro", answers: ["perro", "gata"] },
  //   { sentence: "El ___ está jugando.", correct: "pajaro", answers: ["hombre", "pajaro"] },
  //   { sentence: "La ___ corre rápido.", correct: "gata", answers: ["pajaro", "gata"] },
  //   { sentence: "El ___ está durmiendo.", correct: "pajaro", answers: ["pajaro", "gata"] },
  //   { sentence: "El ___ es pequeño.", correct: "hombre", answers: ["gata", "hombre"] },
  //   { sentence: "La ___ es rápida.", correct: "gata", answers: ["hombre", "gata"] },
  //   { sentence: "La ___ es pequeña.", correct: "gata", answers: ["pajaro", "gata"] },
  //   { sentence: "El ___ vuela.", correct: "pajaro", answers: ["pajaro", "gato"] },
  //   { sentence: "El ___ corre.", correct: "gato", answers: ["pajaro", "gato"] },
  //   { sentence: "La ___ está comiendo.", correct: "gata", answers: ["gata", "perro"] },
  // ];

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
    if (gameOver) return;

    const interval = setInterval(() => {
      setCurrentWords((prevWords) =>
        prevWords.map((word) => ({
          ...word,
          x: word.x - 5,
        }))
      );
    }, 200);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Detect collision and handle score
  useEffect(() => {
    if (gameOver) return;
  
    for (let word of currentWords) {
      if (word.x < 10 && Math.abs(word.y - parrotY) < 10) {
        if (word.correct) {
          setScore((prev) => prev + 1);
          const currentSentenceIndex = sentences.findIndex(
            (s) => s.sentence === currentSentence
          );
          const nextSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
          setCurrentSentence(sentences[nextSentenceIndex].sentence);
  
          setCurrentWords([
            {
              text: sentences[nextSentenceIndex].answers[0],
              correct: sentences[nextSentenceIndex].answers[0] === sentences[nextSentenceIndex].correct,
              x: 100,
              y: 20,
            },
            {
              text: sentences[nextSentenceIndex].answers[1],
              correct: sentences[nextSentenceIndex].answers[1] === sentences[nextSentenceIndex].correct,
              x: 100,
              y: 70,
            },
          ]);
        } else {
          setGameOver(true);
          break; 
        }
      }
    }
  }, [currentWords, parrotY, currentSentence, gameOver]);
  

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
     {/* game over */}
     {gameOver && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Game Over!</h2>
            <p>Your final score: {score}</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const styles = {
  gameContainer: {
    position: "relative",
    width: "100%",
    height: "calc(100vh - 70px)", // Subtract navbar height
    background: `url(${bgImage}) lightgray 50% / cover no-repeat`,
    overflow: "hidden",
    textAlign: "center",
  },
  sentence: { 
    fontSize: "24px", 
    fontWeight: "bold", 
    color: "black", 
    marginTop: "10px",
  },
  score: { 
    fontSize: "20px", 
    marginBottom: "10px", 
    color: "black", 
  },
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
  // game over screen
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  // box for game over screen
  modal: {
    backgroundColor: "white",
    padding: "40px 50px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",

    minWidth: "300px",
    minHeight: "200px",
    fontSize: "22px",
    lineHeight: "1.6", // adds spacing between lines
  },
};

export default Game;