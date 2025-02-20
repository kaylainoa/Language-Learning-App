import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Volcanogame from './volcanogame';
import GameBar from './Components/GameBar';
import Coral from './Coral';
import Surfing from './Surfing';
import Coconut from './Coconut';
import BeachBall from './BeachBall';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GameBar /> {}
        <Routes>
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
