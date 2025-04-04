import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import './Scoreboard.css';
import React from 'react';

function Scoreboard() {
  const navigate = useNavigate();

  const handleLevelsClick = () => {
    navigate('/home');
  };
  
   // State to track points and title
   const [points, setPoints] = useState(100);
   const [title, setTitle] = useState("You Win");

   // Function to increment points
   const incrementPoints = () => {
     setPoints((prevPoints) => prevPoints + 1);
   };

   // Function to toggle the title between "You Win" and "You Lose"
   const toggleTitle = () => {
    setTitle((prevTitle) => {
      const newTitle = prevTitle === "You Win" ? "You Lose" : "You Win";
      console.log(`New title: ${newTitle}`);
      return newTitle;
    });
  };
   // Event listener for key press (up arrow)
   useEffect(() => {
     const handleKeyPress = (event) => {
        console.log(`key pressed: ${event.key}`);
        if (event.key === " ") {
            toggleTitle(); // Toggle title when spacebar is pressed
          }

       if (event.key === "ArrowUp") {
         incrementPoints();
       }
     };
 
     window.addEventListener("keydown", handleKeyPress);
 
     // Cleanup event listener on component unmount
     return () => {
       window.removeEventListener("keydown", handleKeyPress);
     };
   }, []);
 

  return (
      <div className="background">
          <div className="score-board">
          </div>
      </div>
  );
}

export default Scoreboard;
