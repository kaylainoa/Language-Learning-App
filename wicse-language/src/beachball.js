import React, { useRef, useEffect, useState } from "react";
import "./beachball.css";
import image5 from "./Assets/image5.png";
import beachballImage from "./Assets/beachball.png";
import questions from "./data.json";

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

    // load the images
    const beachball = new Image();
    beachball.src = beachballImage;
    const background = new Image();
    background.src = image5;

    // get the questions from json file
    const beachballQuestions = questions["beachball-questions"];

    class Ball {
      constructor(questionData, answer) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height; // start at the bottom
        this.size = 150;
        this.speedY = 4.5;
        this.speedX = (Math.random() - 0.5) * 8;
        this.question = questionData.question;
        this.answers = questionData.answers;
        this.correctAnswer = questionData.correct;
        this.currentAnswer = answer;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= 0.02; // gravity effect
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

    // spawn only three balls for each questions
    function spawnBalls() {
      const randomQuestion = beachballQuestions[Math.floor(Math.random() * beachballQuestions.length)];
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

      // set the message when the ball is clicked on
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