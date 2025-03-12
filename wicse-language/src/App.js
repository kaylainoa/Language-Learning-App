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


import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GameBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/volcano" element={<Volcanogame />} />
          <Route path="/coral" element={<Coral />} />
          <Route path="/surfing" element={<Surfing />} />
          <Route path="/coconut" element={<Coconut />} />
          <Route path="/beachball" element={<BeachBall />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
