import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';

interface DollhouseRoomProps {
  title: string;
  onClick: () => void;
  delay?: number;
  isLit?: boolean;
  roomIndex?: number;
}

// Room-specific styles with unique atmospheres
const getRoomStyle = (index: number) => {
  const styles = [
    // Room 0: Diary - Warm pink with ink particles
    {
      title: 'Diary',
      glowColor: '#ffb6d9',
      primaryColor: '#ffb6d9',
      secondaryColor: '#ffd4e8',
      atmosphere: 'ink',
    },
    // Room 1: Scrapbook - Polaroid pink with photo particles
    {
      title: 'Scrapbook',
      glowColor: '#ffb6d9',
      primaryColor: '#ffb6d9',
      secondaryColor: '#ffd4e8',
      atmosphere: 'photos',
    },
    // Room 2: Art Studio - Paint pink with brush strokes
    {
      title: 'Art Studio',
      glowColor: '#ffb6d9',
      primaryColor: '#ffb6d9',
      secondaryColor: '#ffd4e8',
      atmosphere: 'paint',
    },
    // Room 3: Archive - Matrix green (exception)
    {
      title: 'Archive',
      glowColor: '#0F0',
      primaryColor: '#0F0',
      secondaryColor: '#0A0',
      atmosphere: 'matrix',
    },
    // Room 4: Saved Books - Golden bookmark glow
    {
      title: 'Saved Books',
      glowColor: '#d4af37',
      primaryColor: '#d4af37',
      secondaryColor: '#f0d98d',
      atmosphere: 'books',
    },
  ];
  
  return styles[index % styles.length];
};

export const DollhouseRoom: React.FC<DollhouseRoomProps> = memo(({ title, onClick, delay = 0, isLit = false, roomIndex = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const roomStyle = getRoomStyle(roomIndex);
  
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
      }}
      transition={{ 
        opacity: { delay, duration: 0.6 },
        y: { delay, duration: 0.6 }
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group w-full"
    >
      {/* Outer glow effect */}
      <div
        className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${roomStyle.glowColor}30 0%, transparent 70%)`,
        }}
      />

      {/* Narrow minimalist card with translucency */}
      <div 
        className="relative aspect-[5/4] rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(20, 20, 20, 0.55) 0%, rgba(30, 30, 30, 0.65) 100%)`,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${roomStyle.primaryColor}30`,
          boxShadow: isHovered
            ? `0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${roomStyle.glowColor}40, inset 0 1px 0 rgba(255, 255, 255, 0.05)`
            : `0 8px 20px rgba(0, 0, 0, 0.5), 0 0 15px ${roomStyle.glowColor}20, inset 0 1px 0 rgba(255, 255, 255, 0.03)`,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${roomStyle.primaryColor}08 0%, transparent 70%)`,
          }}
        />

        {/* Top accent line */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${roomStyle.primaryColor}60, transparent)`,
            opacity: isHovered ? 0.8 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${roomStyle.primaryColor}60, transparent)`,
            opacity: isHovered ? 0.8 : 0.4,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Ambient glow with random flicker */}
        <motion.div
          animate={{ 
            opacity: isHovered 
              ? 0.5 
              : isLit 
              ? [0.25, 0.35, 0.25] 
              : [0.1, 0.2, 0.15, 0.1],
          }}
          transition={{ 
            duration: isHovered ? 0.5 : 8 + (roomIndex * 2),
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
            delay: roomIndex * 1.5,
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${roomStyle.glowColor}25 0%, transparent 60%)`,
            filter: 'blur(40px)',
          }}
        />

        {/* Random light flicker effect */}
        <motion.div
          animate={{
            opacity: [0, 0, 0, 0.3, 0, 0, 0, 0.2, 0],
          }}
          transition={{
            duration: 15 + (roomIndex * 3),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: roomIndex * 2,
          }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${roomStyle.glowColor}40 0%, transparent 50%)`,
            filter: 'blur(30px)',
          }}
        />

        {/* Compact title - Consistent Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
          <motion.h3
            animate={{
              color: isHovered ? roomStyle.primaryColor : isLit ? '#e8e8e8' : '#c0c0c0',
            }}
            transition={{ duration: 0.4 }}
            className="font-serif text-base tracking-[0.2em] uppercase"
            style={{
              fontWeight: 300,
              letterSpacing: '0.2em',
              textShadow: isHovered 
                ? `0 0 20px ${roomStyle.glowColor}80, 0 2px 4px rgba(0,0,0,0.8)`
                : '0 2px 4px rgba(0,0,0,0.6)',
            }}
          >
            {title}
          </motion.h3>

          {/* Subtle underline */}
          <motion.div 
            className="mt-3 h-px"
            animate={{
              width: isHovered ? '60px' : '30px',
              opacity: isHovered ? 0.8 : 0.4,
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: `linear-gradient(to right, transparent, ${roomStyle.primaryColor}, transparent)`,
            }}
          />
        </div>
      </div>
    </motion.button>
  );
});

DollhouseRoom.displayName = 'DollhouseRoom';
