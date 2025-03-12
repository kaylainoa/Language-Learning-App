import React from 'react';
import backgroundImage from './Assets/beach-background-blend.jpeg';
import islandBlend from './Assets/island-blend.png';

function Home() {
  // Create array of levels for easier rendering
  const levels = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: `Level ${i + 1}`
  }));

  return (
    <div className="home-page">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-5xl mx-auto">
        <div className="headinghome">
          <h1 className="text-4xl font-bold mb-3">Welcome, [Player's Name]!</h1>
          <p className="text-lg">Continue where you left off, or backtrack for extra practice!</p>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-8">
          {levels.map((level) => (
            <div 
              key={level.id} 
              className="flex flex-col items-center transition-transform hover:scale-110 cursor-pointer"
            >
              <div className="relative">
                <img 
                  id={`level${level.id}`}
                  src={islandBlend} 
                  alt={`Island ${level.name}`}
                  style={{ width: '100%' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">{level.id}</span>
                </div>
              </div>
              <span className="level-text mt-2 font-medium text-center">{level.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-colors">
            Continue Journey
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Home;