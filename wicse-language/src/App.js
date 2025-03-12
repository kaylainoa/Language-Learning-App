/*

WICSE React project led by Kayla Inoa, built by Daya, Diya, Paulina, and Abigail.

Uses React, React Router, and Tailwind for a multi-page learning app.

GitHub: https://github.com/kaylainoa/Language-Learning-App

*/

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Volcanogame from './volcanogame';
import GameBar from './Components/GameBar';
import Coral from './Coral';
import Surfing from './Surfing';
import Coconut from './Coconut';
import BeachBall from './beachball';
import Login from './Login';
import Profile from './Profile';
import Chat from './Chat';  


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GameBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
