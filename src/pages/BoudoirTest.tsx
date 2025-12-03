import React, { useState } from 'react';
import { BoudoirTerminal } from '../components/diary/BoudoirTerminal';
import { BoudoirAtmosphere, useBoudoirAtmosphere } from '../components/diary/BoudoirAtmosphere';

export default function BoudoirTest() {
  const [showTerminal, setShowTerminal] = useState(false);
  const { atmospherePos, atmosphereActive } = useBoudoirAtmosphere();

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Boudoir Atmosphere */}
      <BoudoirAtmosphere active={atmosphereActive} position={atmospherePos} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-5xl font-bold text-pink-400 mb-4 font-mono">
          BOUDOIR TEST
        </h1>
        <p className="text-pink-500 mb-8 text-center max-w-md">
          Click the button below to open the terminal and test the games.
        </p>

        {/* Terminal Trigger Button */}
        <button
          onClick={() => setShowTerminal(true)}
          className="px-8 py-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-mono text-lg transition-all transform hover:scale-105"
          style={{
            boxShadow: '0 0 30px rgba(236, 72, 153, 0.5)',
          }}
        >
          OPEN TERMINAL
        </button>

        {/* Instructions */}
        <div className="mt-12 max-w-2xl text-pink-500/80 font-mono text-sm space-y-2">
          <p>📝 Instructions:</p>
          <p>1. Click "OPEN TERMINAL" button</p>
          <p>2. Type "help" to see available commands</p>
          <p>3. Type "EXECUTE SNAKE" to play Ouroboros</p>
          <p>4. Type "EXECUTE PACMAN" to play Haunted Pac-Man</p>
          <p>5. Type "STATS" to see your game statistics</p>
          <p>6. Type "HISTORY" to see recent game sessions</p>
        </div>
      </div>

      {/* Terminal Modal */}
      {showTerminal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowTerminal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <BoudoirTerminal onClose={() => setShowTerminal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
