import React, { useRef, useEffect } from "react";
import "./beachball.css";
import image5 from './Assets/image5.png';
import beachballImage from "./Assets/beachball.png"; // Import the image

function Beachball() {
  const canvasRef = useRef(null);
  let ballArray = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Preload the image
    const beachball = new Image();
    beachball.src = beachballImage;

    const background = new Image();
    background.src = image5;
  

    class Ball {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = 150; // Size between 30px and 70px
        this.speedY = 11;
        this.speedX = (Math.random() - 0.5) * 8;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY -= 0.1;
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.speedX *= -1; // Reverse direction on collision
        }
      }

      draw() {
        context.drawImage(beachball, this.x, this.y, this.size, this.size);
      }
    }

    function spawnBalls() {
      if (ballArray.length < 3) {
        ballArray.push(new Ball());
      }
    }

    function renderBalls() {
      for (let i = 0; i < ballArray.length; i++) {
        ballArray[i].draw();
        ballArray[i].update();
        if (ballArray[i].y > canvas.height * 10) {
          ballArray.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
      context.drawImage(background, 0, 0, canvas.width, canvas.height)
      renderBalls();
      requestAnimationFrame(animate);
    }

    // Start the animation when the image is loaded
    beachball.onload = () => {
      spawnBalls();
      setInterval(spawnBalls, 1500);
      animate();
    };

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  return (
    <div className="beachball-container">
      {/* Background Canvas */}
      <canvas ref={canvasRef}></canvas>

      {/* Overlay Text */}
      <div className="overlay-text">
        <h1>Hit the ball with the correct conjugation!</h1>
      </div>
    </div>
    
  );
}

export default Beachball;


