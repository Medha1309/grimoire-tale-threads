import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OuroborosGame } from '../games/OuroborosGame';
import { HauntedPacmanGame } from '../games/HauntedPacmanGame';
import { useGameArchive } from '../../hooks/useGameArchive';

interface BoudoirTerminalProps {
  onClose?: () => void;
}

export const BoudoirTerminal: React.FC<BoudoirTerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ type: 'input' | 'output' | 'error'; text: string }>>([
    { type: 'output', text: 'BOUDOIR TERMINAL v1.3.7' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
  ]);
  const [activeGame, setActiveGame] = useState<'ouroboros' | 'haunted-pacman' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { saveGameSession, getGameStats, getRecentSessions } = useGameArchive();

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  const addOutput = (text: string, type: 'output' | 'error' = 'output') => {
    setHistory(prev => [...prev, { type, text }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);

    if (!trimmed) return;

    // Debug: log the command
    console.log('Command received:', trimmed);

    switch (trimmed) {
      case 'help':
        addOutput('Available commands:');
        addOutput('  EXECUTE SNAKE      - Launch Ouroboros (Snake game)');
        addOutput('  LAUNCH OUROBOROS   - Launch Ouroboros (Snake game)');
        addOutput('  EXECUTE PACMAN     - Launch Haunted Pac-Man');
        addOutput('  LAUNCH SPIRITS     - Launch Haunted Pac-Man');
        addOutput('  STATS              - View game statistics');
        addOutput('  HISTORY            - View recent game sessions');
        addOutput('  CLEAR              - Clear terminal');
        addOutput('  EXIT               - Close terminal');
        break;

      case 'execute snake':
      case 'executesnake':
      case 'snake':
      case 'launch ouroboros':
      case 'launchouroboros':
      case 'ouroboros':
        addOutput('Initializing Ouroboros protocol...');
        addOutput('WARNING: The eternal serpent awakens...');
        setTimeout(() => setActiveGame('ouroboros'), 500);
        break;

      case 'execute pacman':
      case 'executepacman':
      case 'pacman':
      case 'launch spirits':
      case 'launchspirits':
      case 'spirits':
        addOutput('Loading Haunted Maze...');
        addOutput('WARNING: The spirits are restless...');
        setTimeout(() => setActiveGame('haunted-pacman'), 500);
        break;

      case 'stats': {
        const ouroborosStats = getGameStats('ouroboros');
        const pacmanStats = getGameStats('haunted-pacman');
        const totalStats = getGameStats();

        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        addOutput('GAME STATISTICS');
        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        addOutput('');
        addOutput('OUROBOROS:');
        addOutput(`  Games Played: ${ouroborosStats.totalGames}`);
        addOutput(`  Wins: ${ouroborosStats.wins} | Losses: ${ouroborosStats.losses}`);
        addOutput(`  Win Rate: ${ouroborosStats.winRate}%`);
        addOutput(`  High Score: ${ouroborosStats.highScore}`);
        addOutput(`  Avg Score: ${ouroborosStats.avgScore}`);
        addOutput('');
        addOutput('HAUNTED PAC-MAN:');
        addOutput(`  Games Played: ${pacmanStats.totalGames}`);
        addOutput(`  Wins: ${pacmanStats.wins} | Losses: ${pacmanStats.losses}`);
        addOutput(`  Win Rate: ${pacmanStats.winRate}%`);
        addOutput(`  High Score: ${pacmanStats.highScore}`);
        addOutput(`  Avg Score: ${pacmanStats.avgScore}`);
        if (pacmanStats.bestTime > 0) {
          addOutput(`  Best Time: ${pacmanStats.bestTime}s`);
        }
        addOutput('');
        addOutput(`TOTAL GAMES: ${totalStats.totalGames}`);
        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        break;
      }

      case 'history': {
        const recent = getRecentSessions(5);
        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        addOutput('RECENT GAME SESSIONS');
        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (recent.length === 0) {
          addOutput('No games played yet.');
        } else {
          recent.forEach((session, i) => {
            const gameName = session.gameName === 'ouroboros' ? 'OUROBOROS' : 'HAUNTED PAC-MAN';
            const result = session.result === 'won' ? '✓ WON' : '✗ LOST';
            addOutput(`${i + 1}. ${gameName} - ${result} - Score: ${session.score}`);
            if (session.crypticMessage) {
              addOutput(`   "${session.crypticMessage}"`);
            }
          });
        }
        addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        break;
      }

      case 'clear':
        setHistory([
          { type: 'output', text: 'BOUDOIR TERMINAL v1.3.7' },
          { type: 'output', text: 'Type "help" for available commands' },
          { type: 'output', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
        ]);
        break;

      case 'exit':
        if (onClose) {
          onClose();
        } else {
          addOutput('Terminal session ended.');
        }
        break;

      default:
        addOutput(`Command not found: ${trimmed}`, 'error');
        addOutput('Type "help" for available commands', 'error');
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleGameEnd = (
    gameName: 'ouroboros' | 'haunted-pacman',
    result: 'won' | 'lost',
    score: number,
    duration: number,
    crypticMessage?: string
  ) => {
    saveGameSession(gameName, result, score, duration, crypticMessage);
    setActiveGame(null);
    
    addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    addOutput(`GAME ENDED: ${result.toUpperCase()}`);
    addOutput(`Score: ${score} | Duration: ${duration}s`);
    if (crypticMessage) {
      addOutput(`Message: ${crypticMessage}`);
    }
    addOutput('Session logged to archive.');
    addOutput('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="w-full max-w-3xl mx-auto bg-black/90 backdrop-blur-sm border-2 border-pink-500/50 rounded-lg overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.1)',
        }}
      >
        {/* Terminal Header */}
        <div className="bg-pink-900/30 border-b border-pink-500/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-pink-400 font-mono text-sm">BOUDOIR_TERMINAL.EXE</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-pink-400 hover:text-pink-300 transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Terminal Content */}
        <div
          ref={historyRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ec4899 #000',
          }}
        >
          {history.map((entry, i) => (
            <div
              key={i}
              className={`mb-1 ${
                entry.type === 'input'
                  ? 'text-pink-300'
                  : entry.type === 'error'
                  ? 'text-red-400'
                  : 'text-pink-500/80'
              }`}
            >
              {entry.text}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="border-t border-pink-500/30 p-4 flex items-center gap-2">
          <span className="text-pink-400 font-mono">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-pink-300 font-mono outline-none placeholder-pink-500/40"
            placeholder="Enter command..."
            autoFocus
          />
        </form>
      </motion.div>

      {/* Game Overlays */}
      <AnimatePresence>
        {activeGame === 'ouroboros' && (
          <OuroborosGame
            onGameEnd={(result, score, duration) => {
              const messages = [
                'THE SERPENT CONSUMES ITSELF',
                'ETERNAL CYCLE BROKEN',
                'THE OUROBOROS WEEPS',
              ];
              handleGameEnd(
                'ouroboros',
                result,
                score,
                duration,
                messages[Math.floor(Math.random() * messages.length)]
              );
            }}
            onClose={() => setActiveGame(null)}
          />
        )}
        {activeGame === 'haunted-pacman' && (
          <HauntedPacmanGame
            onGameEnd={(result, score, duration) => {
              const messages = result === 'won'
                ? ['THE SPIRITS BOW TO YOUR WILL', 'MASTER OF THE SPECTRAL REALM']
                : ['THE SPIRITS CLAIM ANOTHER SOUL', 'CONSUMED BY THE HAUNTED'];
              handleGameEnd(
                'haunted-pacman',
                result,
                score,
                duration,
                messages[Math.floor(Math.random() * messages.length)]
              );
            }}
            onClose={() => setActiveGame(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};
