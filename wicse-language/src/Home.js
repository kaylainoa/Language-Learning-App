import React from 'react';
import backgroundImage from './Assets/beach-background-blend.jpeg';
import islandBlend from './Assets/island-blend.png';

function Home() {
  return (
    <div 
      className="flex items-center justify-center min-h-screen text-white text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-4xl font-bold">Home</h1>
        <p className="text-lg mb-4">The current navbar is just for testing, it is not the official one.</p>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex justify-center mb-2 w-full">
            <img id="level1" style={{width: '15%'}} src={islandBlend} alt="Island Level 1" />
            <img id="level2" style={{width: '15%'}} src={islandBlend} alt="Island Level 2" />
            <img id="level3" style={{width: '15%'}} src={islandBlend} alt="Island Level 3" />
            <img id="level4" style={{width: '15%'}} src={islandBlend} alt="Island Level 4" />
            <img id="level5" style={{width: '15%'}} src={islandBlend} alt="Island Level 5" />
          </div>
          <div className="flex justify-center mb-2 w-full">
            <img id="level6" style={{width: '15%'}} src={islandBlend} alt="Island Level 6" />
            <img id="level7" style={{width: '15%'}} src={islandBlend} alt="Island Level 7" />
            <img id="level8" style={{width: '15%'}} src={islandBlend} alt="Island Level 8" />
            <img id="level9" style={{width: '15%'}} src={islandBlend} alt="Island Level 9" />
            <img id="level10" style={{width: '15%'}} src={islandBlend} alt="Island Level 10" />
          </div>
          <div className="flex justify-center mb-2 w-full">
            <img id="level11" style={{width: '15%'}} src={islandBlend} alt="Island Level 11" />
            <img id="level12" style={{width: '15%'}} src={islandBlend} alt="Island Level 12" />
            <img id="level13" style={{width: '15%'}} src={islandBlend} alt="Island Level 13" />
            <img id="level14" style={{width: '15%'}} src={islandBlend} alt="Island Level 14" />
            <img id="level15" style={{width: '15%'}} src={islandBlend} alt="Island Level 15" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
