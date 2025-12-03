import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface OuroborosGameProps {
  onGameEnd: (result: 'won' | 'lost', score: number, duration: number) => void;
  onClose: () => void;
}

const GRID_SIZE = 20;
const CELL_SIZE = 16;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 10;

export const OuroborosGame: React.FC<OuroborosGameProps> = ({ onGameEnd, onClose }) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [startTime] = useState(Date.now());
  const [crypticMessage, setCrypticMessage] = useState('');
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  const crypticMessages = [
    'THE SERPENT CONSUMES ITSELF',
    'ETERNAL CYCLE BROKEN',
    'THE OUROBOROS WEEPS',
    'INFINITY SHATTERED',
    'THE TAIL ESCAPES THE MOUTH',
    'CORRUPTION DETECTED IN LOOP',
    'REALITY.EXE HAS STOPPED',
    'THE CIRCLE IS INCOMPLETE',
  ];

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (directionRef.current) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y };
          break;
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setGameOver(true);
        const message = crypticMessages[Math.floor(Math.random() * crypticMessages.length)];
        setCrypticMessage(message);
        const duration = Math.floor((Date.now() - startTime) / 1000);
        onGameEnd('lost', score, duration);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        const message = crypticMessages[Math.floor(Math.random() * crypticMessages.length)];
        setCrypticMessage(message);
        const duration = Math.floor((Date.now() - startTime) / 1000);
        onGameEnd('lost', score, duration);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
        setFood(generateFood(newSnake));
        return newSnake;
      }

      // Remove tail if no food eaten
      newSnake.pop();
      return newSnake;
    });
  }, [gameOver, food, generateFood, onGameEnd, score, startTime]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, speed);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, speed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') setDirection('RIGHT');
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
        className="relative bg-black border-2 border-pink-500/50 rounded-lg p-6 shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(236, 72, 153, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-pink-400 font-mono tracking-wider">
              OUROBOROS.EXE
            </h2>
            <p className="text-xs text-pink-500/70 font-mono mt-1">
              THE ETERNAL SERPENT AWAITS
            </p>
          </div>
          <div className="text-right">
            <div className="text-pink-400 font-mono text-lg">SCORE: {score}</div>
            <div className="text-pink-500/70 font-mono text-xs">
              SPEED: {Math.floor((INITIAL_SPEED - speed) / SPEED_INCREMENT)}x
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div
          className="relative bg-black border border-pink-500/30 rounded"
          style={{
            width: GRID_SIZE * CELL_SIZE,
            height: GRID_SIZE * CELL_SIZE,
            boxShadow: 'inset 0 0 20px rgba(236, 72, 153, 0.2)',
          }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: GRID_SIZE }).map((_, i) => (
              <React.Fragment key={i}>
                <div
                  className="absolute bg-pink-500"
                  style={{
                    left: 0,
                    top: i * CELL_SIZE,
                    width: '100%',
                    height: '1px',
                  }}
                />
                <div
                  className="absolute bg-pink-500"
                  style={{
                    left: i * CELL_SIZE,
                    top: 0,
                    width: '1px',
                    height: '100%',
                  }}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Snake */}
          {snake.map((segment, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: segment.x * CELL_SIZE,
                top: segment.y * CELL_SIZE,
                width: CELL_SIZE - 2,
                height: CELL_SIZE - 2,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div
                className="w-full h-full rounded-sm"
                style={{
                  background: index === 0
                    ? 'linear-gradient(135deg, #ec4899, #f472b6)'
                    : `rgba(236, 72, 153, ${1 - (index / snake.length) * 0.5})`,
                  boxShadow: index === 0
                    ? '0 0 10px rgba(236, 72, 153, 0.8)'
                    : '0 0 5px rgba(236, 72, 153, 0.4)',
                }}
              />
            </motion.div>
          ))}

          {/* Food */}
          <motion.div
            className="absolute"
            style={{
              left: food.x * CELL_SIZE,
              top: food.y * CELL_SIZE,
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'radial-gradient(circle, #fbbf24, #f59e0b)',
                boxShadow: '0 0 15px rgba(251, 191, 36, 0.8)',
              }}
            />
          </motion.div>

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
                    className="text-red-500 font-mono text-xl mb-4"
                  >
                    {crypticMessage}
                  </motion.div>
                  <div className="text-pink-400 font-mono text-lg mb-2">
                    FINAL SCORE: {score}
                  </div>
                  <div className="text-pink-500/70 font-mono text-sm">
                    Press ESC to exit
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-4 text-center text-pink-500/70 font-mono text-xs">
          <p>WASD or Arrow Keys to move • ESC to exit</p>
          <p className="mt-1 text-pink-600/50">The serpent grows with each fragment consumed...</p>
        </div>
      </div>
    </motion.div>
  );
};
