import React, { useRef, useEffect, useState } from "react";
import "./beachball.css";
import image5 from "./Assets/image5.png";
import beachballImage from "./Assets/beachball.png";

function Beachball() {
  const canvasRef = useRef(null);
  const ballArrayRef = useRef([]); // stores the ball objects
  const currentQuestionDataRef = useRef(null); // stores the current question data
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 540; 

    // Load images
    const beachball = new Image();
    beachball.src = beachballImage;
    const background = new Image();
    background.src = image5;

    const questions = [
      {
        question: "What is the yo form of 'hablar' in present tense?",
        correct: "Hablo",
        answers: ["Habla", "Hablo", "Hablas"]
      },
      {
        question: "What is the tú form of 'comer' in present tense?",
        correct: "Comes",
        answers: ["Como", "Comes", "Comemos"]
      },
      {
        question: "What is the él/ella form of 'vivir' in present tense?",
        correct: "Vive",
        answers: ["Vivo", "Vives", "Vive"]
      },
      {
        question: "What is the nosotros form of 'ser' in past tense?",
        correct: "Fuimos",
        answers: ["Fuimos", "Somos", "Eran"]
      },
      {
        question: "What is the yo form of 'tener' in future tense?",
        correct: "Tendré",
        answers: ["Tendrá", "Tendré", "Tienes"]
      },
      {
        question: "What is the yo form of 'escribir' in present tense?",
        correct: "Escribo",
        answers: ["Escribe", "Escribimos", "Escribo"]    
      },
      {
        question: "What is the tú form of 'hacer' in present tense?",
        correct: "Haces",
        answers: ["Haces", "Hago", "Hace"]
      },
      {
        question: "What is the nosotros form of 'estar' in present tense?",
        correct: "Estamos",
        answers: ["Estás", "Estamos", "Están"]
      },
      {
        question: "What is the ellos/ellas form of 'beber' in present tense?",
        correct: "Beben",
        answers: ["Bebes", "Beben", "Bebemos"]
      },
      {
        question: "What is the yo form of 'poder' in present tense?",
        correct: "Puedo",
        answers: ["Puedo", "Puedes", "Pueda"]
      }
    ];

    class Ball {
      constructor(questionData, answer) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height; // start at the bottom
        this.size = 150;
        this.speedY = 7.7;
        this.speedX = (Math.random() - 0.5) * 8;
        this.question = questionData.question;
        this.answers = questionData.answers;
        this.correctAnswer = questionData.correct;
        this.currentAnswer = answer;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= 0.05; // Gravity effect
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX *= -1;
        }
      }

      draw() {
        context.drawImage(beachball, this.x, this.y, this.size, this.size);
        context.fillStyle = "black";
        context.font = "20px 'Fuzzy Bubbles', sans-serif";
        context.textAlign = "center";
        context.fillText(
          this.currentAnswer,
          this.x + this.size / 2,
          this.y + this.size / 2
        );
      }
    }

    function spawnBalls() {
      const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
      currentQuestionDataRef.current = randomQuestion;
      const shuffledAnswers = [...randomQuestion.answers].sort(() => Math.random() - 0.5);
      const newBalls = [];
      for (let i = 0; i < 3; i++) {
        newBalls.push(new Ball(randomQuestion, shuffledAnswers[i]));
      }
      ballArrayRef.current = newBalls;
      setCurrentQuestion(randomQuestion.question);
      setMessage("");
    }

    function reSpawnBalls() {
      if (currentQuestionDataRef.current) {
        const qData = currentQuestionDataRef.current;
        const shuffledAnswers = [...qData.answers].sort(() => Math.random() - 0.5);
        const newBalls = [];
        for (let i = 0; i < 3; i++) {
          newBalls.push(new Ball(qData, shuffledAnswers[i]));
        }
        ballArrayRef.current = newBalls;
        setCurrentQuestion(qData.question);
        setMessage("");
      } else {
        spawnBalls();
      }
    }

    function handleCanvasClick(event) {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      let hitBall = null;
      ballArrayRef.current.forEach((ball) => {
        const centerX = ball.x + ball.size / 2;
        const centerY = ball.y + ball.size / 2;
        const dx = clickX - centerX;
        const dy = clickY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= ball.size / 2) {
          hitBall = ball;
        }
      });

      if (hitBall) {
        if (hitBall.currentAnswer === hitBall.correctAnswer) {
          setMessage("Correct!");
          setTimeout(spawnBalls, 750);
        } else {
          setMessage("Wrong! Try again.");
        }
      }
    }

    canvas.addEventListener("click", handleCanvasClick);

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(background, 0, 0, canvas.width, canvas.height);

      ballArrayRef.current.forEach((ball) => {
        ball.update();
        ball.draw();
      });

      if (
        ballArrayRef.current.length > 0 &&
        ballArrayRef.current.every((ball) => ball.y > canvas.height)
      ) {
        ballArrayRef.current = [];
        setTimeout(reSpawnBalls, 1000);
      }
      
      requestAnimationFrame(animate);
    }

    beachball.onload = () => {
      spawnBalls();
      animate();
    };

    return () => {
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <div className="beachball-container">
      <canvas ref={canvasRef}></canvas>
      <div className="overlay-text">
        <h1>Hit the ball with the correct conjugation!</h1>
        <p>{currentQuestion}</p>
        <div className="message-container">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default Beachball;