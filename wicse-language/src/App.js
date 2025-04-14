/*

WICSE React project led by Kayla Inoa, built by Daya, Diya, Paulina, and Abigail.

Uses React, React Router, and Tailwind for a multi-page learning app.

GitHub: https://github.com/kaylainoa/Language-Learning-App

*/

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Volcanogame from './volcanogame';
import NavBar from './Components/NavBar';
import Coral from './Coral';
import Surfing from './Surfing';
import Coconut from './Components/Coconut';
import BeachBall from './beachball';

// navbar links
import Login from './Login';
import Chat from './Chat';
import Profile from './Profile';

import ComingSoon from './ComingSoon';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Routes>
          {/* nav bar links */}
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />

          <Route path="/ComingSoon" element={<ComingSoon />} />

          {/* minigame pages */}
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
