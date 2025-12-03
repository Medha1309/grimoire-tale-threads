import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface HauntedPacmanGameProps {
  onGameEnd: (result: 'won' | 'lost', score: number, duration: number) => void;
  onClose: () => void;
}

const GRID_SIZE = 15;
const CELL_SIZE = 24;
const GHOST_COUNT = 3;
const MOVE_INTERVAL = 200;

// Simple maze layout (1 = wall, 0 = path, 2 = dot)
const MAZE = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,2,1,1,1,2,1,1,1,2,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

export const HauntedPacmanGame: React.FC<HauntedPacmanGameProps> = ({ onGameEnd, onClose }) => {
  const [pacman, setPacman] = useState<Position>({ x: 1, y: 1 });
  const [ghosts, setGhosts] = useState<Position[]>([
    { x: 7, y: 7 },
    { x: 13, y: 1 },
    { x: 1, y: 13 },
  ]);
  const [dots, setDots] = useState<boolean[][]>(() => 
    MAZE.map(row => row.map(cell => cell === 2))
  );
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());
  const [crypticMessage, setCrypticMessage] = useState('');
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const loseMessages = [
    'THE SPIRITS CLAIM ANOTHER SOUL',
    'CONSUMED BY THE HAUNTED',
    'YOUR ESSENCE FADES INTO DARKNESS',
    'THE GHOSTS REMEMBER YOU',
    'TRAPPED IN THE MAZE FOREVER',
    'REALITY CORRUPTED',
    'THE DEAD DO NOT FORGIVE',
  ];

  const winMessages = [
    'THE SPIRITS BOW TO YOUR WILL',
    'YOU HAVE CONQUERED THE HAUNTED MAZE',
    'THE GHOSTS RETREAT IN FEAR',
    'MASTER OF THE SPECTRAL REALM',
  ];

  const isValidMove = (pos: Position): boolean => {
    return pos.x >= 0 && pos.x < GRID_SIZE && 
           pos.y >= 0 && pos.y < GRID_SIZE && 
           MAZE[pos.y][pos.x] !== 1;
  };

  const checkWin = useCallback((currentDots: boolean[][]): boolean => {
    return currentDots.every(row => row.every(dot => !dot));
  }, []);

  const movePacman = useCallback(() => {
    if (gameOver || won) return;

    setPacman(prev => {
      let newPos: Position;

      switch (directionRef.current) {
        case 'UP':
          newPos = { x: prev.x, y: prev.y - 1 };
          break;
        case 'DOWN':
          newPos = { x: prev.x, y: prev.y + 1 };
          break;
        case 'LEFT':
          newPos = { x: prev.x - 1, y: prev.y };
          break;
        case 'RIGHT':
          newPos = { x: prev.x + 1, y: prev.y };
          break;
      }

      if (!isValidMove(newPos)) {
        return prev;
      }

      // Check dot collection
      setDots(prevDots => {
        const newDots = prevDots.map(row => [...row]);
        if (newDots[newPos.y][newPos.x]) {
          newDots[newPos.y][newPos.x] = false;
          setScore(s => s + 10);
          
          // Check win condition
          if (checkWin(newDots)) {
            setWon(true);
            setGameOver(true);
            const message = winMessages[Math.floor(Math.random() * winMessages.length)];
            setCrypticMessage(message);
            const duration = Math.floor((Date.now() - startTime) / 1000);
            onGameEnd('won', score + 10, duration);
          }
        }
        return newDots;
      });

      return newPos;
    });
  }, [gameOver, won, checkWin, onGameEnd, score, startTime]);

  const moveGhosts = useCallback(() => {
    if (gameOver || won) return;

    setGhosts(prevGhosts => {
      return prevGhosts.map(ghost => {
        // Simple AI: move towards pacman
        const dx = pacman.x - ghost.x;
        const dy = pacman.y - ghost.y;
        
        let newPos: Position;
        
        if (Math.abs(dx) > Math.abs(dy)) {
          newPos = { x: ghost.x + Math.sign(dx), y: ghost.y };
        } else {
          newPos = { x: ghost.x, y: ghost.y + Math.sign(dy) };
        }

        // If can't move towards pacman, try random direction
        if (!isValidMove(newPos)) {
          const directions = [
            { x: ghost.x + 1, y: ghost.y },
            { x: ghost.x - 1, y: ghost.y },
            { x: ghost.x, y: ghost.y + 1 },
            { x: ghost.x, y: ghost.y - 1 },
          ].filter(isValidMove);
          
          if (directions.length > 0) {
            newPos = directions[Math.floor(Math.random() * directions.length)];
          } else {
            newPos = ghost;
          }
        }

        return newPos;
      });
    });
  }, [gameOver, won, pacman]);

  // Check collision with ghosts
  useEffect(() => {
    if (gameOver || won) return;

    const collision = ghosts.some(ghost => 
      ghost.x === pacman.x && ghost.y === pacman.y
    );

    if (collision) {
      setGameOver(true);
      const message = loseMessages[Math.floor(Math.random() * loseMessages.length)];
      setCrypticMessage(message);
      const duration = Math.floor((Date.now() - startTime) / 1000);
      onGameEnd('lost', score, duration);
    }
  }, [ghosts, pacman, gameOver, won, onGameEnd, score, startTime]);

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      movePacman();
      moveGhosts();
    }, MOVE_INTERVAL);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [movePacman, moveGhosts]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setDirection('RIGHT');
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-black border-2 border-purple-500/50 rounded-lg p-6 shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-purple-400 font-mono tracking-wider">
              HAUNTED_MAZE.EXE
            </h2>
            <p className="text-xs text-purple-500/70 font-mono mt-1">
              ESCAPE THE VENGEFUL SPIRITS
            </p>
          </div>
          <div className="text-right">
            <div className="text-purple-400 font-mono text-lg">SCORE: {score}</div>
            <div className="text-purple-500/70 font-mono text-xs">
              SOULS: {dots.flat().filter(Boolean).length}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div
          className="relative bg-black border border-purple-500/30 rounded"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.2)',
          }}
        >
          {/* Maze */}
          {MAZE.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="absolute"
                style={{
                  left: x * CELL_SIZE,
                  top: y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              >
                {cell === 1 && (
                  <div
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(135deg, #4c1d95, #5b21b6)',
                      boxShadow: 'inset 0 0 5px rgba(168, 85, 247, 0.3)',
                    }}
                  />
                )}
                {cell === 2 && dots[y][x] && (
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: '#fbbf24',
                        boxShadow: '0 0 8px rgba(251, 191, 36, 0.8)',
                      }}
                    />
                  </motion.div>
                )}
              </div>
            ))
          )}

          {/* Pacman */}
          <motion.div
            className="absolute"
            style={{
              left: pacman.x * CELL_SIZE,
              top: pacman.y * CELL_SIZE,
              width: CELL_SIZE,
              height: CELL_SIZE,
            }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          >
            <div
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
              }}
            >
              <div className="text-xs">👻</div>
            </div>
          </motion.div>

          {/* Ghosts */}
          {ghosts.map((ghost, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: ghost.x * CELL_SIZE,
                top: ghost.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            >
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${
                    ['#ef4444', '#8b5cf6', '#ec4899'][index]
                  }, rgba(0,0,0,0.5))`,
                  boxShadow: `0 0 20px ${['#ef4444', '#8b5cf6', '#ec4899'][index]}`,
                }}
              >
                <div className="text-xs">💀</div>
              </div>
            </motion.div>
          ))}

          {/* Game Over Overlay */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className={`font-mono text-xl mb-4 ${won ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {crypticMessage}
                  </motion.div>
                  <div className="text-purple-400 font-mono text-lg mb-2">
                    FINAL SCORE: {score}
                  </div>
                  <div className="text-purple-500/70 font-mono text-sm">
                    Press ESC to exit
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-4 text-center text-purple-500/70 font-mono text-xs">
          <p>WASD or Arrow Keys to move • ESC to exit</p>
          <p className="mt-1 text-purple-600/50">Collect all souls before the spirits catch you...</p>
        </div>
      </div>
    </motion.div>
  );
};
