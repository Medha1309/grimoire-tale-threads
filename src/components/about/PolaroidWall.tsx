/**
 * Polaroid Wall - Evidence board with red string connections
 * Photos reveal dark secrets and feature jump scare
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Polaroid {
  id: string;
  title: string;
  description: string;
  darkSecret: string;
  route: string;
  position: { x: number; y: number; rotation: number };
  pinColor: string;
}

const POLAROIDS: Polaroid[] = [
  {
    id: 'library',
    title: 'THE LIBRARY',
    description: 'Browse horror fiction\nBookmark & track reading\nTorch-lit interface',
    darkSecret: 'The stories track you back',
    route: '/stories',
    position: { x: 15, y: 15, rotation: -6 },
    pinColor: '#4A0E0E',
  },
  {
    id: 'watching',
    title: 'WATCHING',
    description: 'Reading history tracker\nAutomatic logging\nComplete records\nBlinking surveillance',
    darkSecret: 'It knows what you read',
    route: '/diary',
    position: { x: 45, y: 20, rotation: 4 },
    pinColor: '#8B0000',
  },
  {
    id: 'tearoom',
    title: 'THE TEA ROOM',
    description: 'Discussion forum\nCandle reactions\nGothic atmosphere',
    darkSecret: 'The walls remember everything',
    route: '/forum',
    position: { x: 75, y: 18, rotation: -5 },
    pinColor: '#6B0F1A',
  },
  {
    id: 'confessional',
    title: 'CONFESSIONAL',
    description: 'Private diary entries\nMood tracking system\nOptional encryption',
    darkSecret: 'Some entries write themselves',
    route: '/diary',
    position: { x: 12, y: 48, rotation: 7 },
    pinColor: '#8B0000',
  },
  {
    id: 'kiro',
    title: 'BUILT WITH KIRO',
    description: 'AI development partner\nSpec-driven architecture\nSteering documents\nAgent hooks automation',
    darkSecret: 'The code writes itself',
    route: '#',
    position: { x: 45, y: 52, rotation: -3 },
    pinColor: '#9333EA',
  },
  {
    id: 'scrapbook',
    title: 'SCRAPBOOK',
    description: 'Photo memory system\nVintage polaroid effects\nFilters, stickers, secrets\nDrag-drop upload',
    darkSecret: 'Images change when unwatched',
    route: '/diary',
    position: { x: 75, y: 50, rotation: 5 },
    pinColor: '#C71585',
  },
  {
    id: 'chains',
    title: 'CURSED CHAINS',
    description: 'Collaborative horror writing\n7-day deadline system\nPass stories between users\nCurse levels 1-5',
    darkSecret: 'Break the chain at your peril',
    route: '/chains',
    position: { x: 60, y: 78, rotation: 6 },
    pinColor: '#8B0000',
  },
  {
    id: 'techstack',
    title: 'TECH STACK',
    description: 'React 18 • TypeScript • Vite\nFirebase (Auth, Firestore, Storage)\nFramer Motion • Tailwind CSS',
    darkSecret: 'Performance-optimized horror',
    route: '#',
    position: { x: 28, y: 78, rotation: -4 },
    pinColor: '#D4AF37',
  },
];

interface PolaroidWallProps {
  isActive: boolean;
}

export const PolaroidWall: React.FC<PolaroidWallProps> = ({ isActive }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [revealedSecrets, setRevealedSecrets] = useState<Set<string>>(new Set());
  const [showTechModal, setShowTechModal] = useState(false);
  const [showKiroModal, setShowKiroModal] = useState(false);
  const navigate = useNavigate();

  const handlePolaroidClick = (route: string, id: string) => {
    if (id === 'techstack') {
      setShowTechModal(true);
    } else if (id === 'kiro') {
      setShowKiroModal(true);
    } else if (route !== '#') {
      navigate(route);
    }
  };

  if (!isActive) return null;

  return (
    <motion.div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      {/* Cork board texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #3d2817 0%, #2d1f12 100%)',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(60,40,25,0.8) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(50,35,20,0.8) 0%, transparent 50%)
          `,
        }}
      />

      {/* Neon accent lighting */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical neon lines */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Neon glow spots - like distant lights */}
        {[
          { left: '8%', top: '15%', delay: 0 },
          { right: '8%', top: '25%', delay: 1.5 },
          { left: '10%', top: '70%', delay: 3 },
          { right: '10%', top: '80%', delay: 4.5 },
        ].map((spot, i) => (
          <motion.div
            key={i}
            className="absolute w-16 h-16 rounded-full"
            style={{
              ...spot,
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: spot.delay,
            }}
          />
        ))}

        {/* Subtle red neon accent in corners */}
        <motion.div
          className="absolute top-0 left-0 w-32 h-32"
          style={{
            background: 'radial-gradient(circle at top left, rgba(139, 0, 0, 0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-32 h-32"
          style={{
            background: 'radial-gradient(circle at bottom right, rgba(139, 0, 0, 0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>

      {/* Red string connections with neon glow */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <filter id="neon-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {POLAROIDS.slice(0, -1).map((polaroid, i) => {
          const nextPolaroid = POLAROIDS[i + 1];
          if (!nextPolaroid) return null;
          return (
            <g key={`string-${i}`}>
              {/* Neon glow layer */}
              <motion.line
                x1={`${polaroid.position.x}%`}
                y1={`${polaroid.position.y}%`}
                x2={`${nextPolaroid.position.x}%`}
                y2={`${nextPolaroid.position.y}%`}
                stroke="rgba(212, 175, 55, 0.3)"
                strokeWidth="4"
                strokeDasharray="5,5"
                filter="url(#neon-glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  pathLength: { duration: 0.8, delay: i * 0.2 },
                  opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }
                }}
              />
              {/* Main red string */}
              <motion.line
                x1={`${polaroid.position.x}%`}
                y1={`${polaroid.position.y}%`}
                x2={`${nextPolaroid.position.x}%`}
                y2={`${nextPolaroid.position.y}%`}
                stroke="#8B0000"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
              />
            </g>
          );
        })}
      </svg>

      {/* Footstep trails - VERY visible */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          {/* Footprint shape - much bigger and very dark */}
          <g id="footprint">
            {/* Main foot */}
            <ellipse cx="0" cy="0" rx="15" ry="22" fill="rgba(20,10,5,0.7)" stroke="rgba(10,5,2,0.8)" strokeWidth="2" />
            {/* Toes */}
            <ellipse cx="0" cy="-12" rx="5" ry="5" fill="rgba(20,10,5,0.65)" />
            <ellipse cx="-5" cy="-10" rx="4.5" ry="4.5" fill="rgba(20,10,5,0.65)" />
            <ellipse cx="5" cy="-10" rx="4.5" ry="4.5" fill="rgba(20,10,5,0.65)" />
            <ellipse cx="-8" cy="-7" rx="4" ry="4" fill="rgba(20,10,5,0.6)" />
            <ellipse cx="8" cy="-7" rx="4" ry="4" fill="rgba(20,10,5,0.6)" />
            {/* Heel detail */}
            <ellipse cx="0" cy="8" rx="10" ry="8" fill="rgba(15,8,4,0.5)" />
          </g>
        </defs>

        {/* Footsteps to Library (from bottom left) - glow and fade */}
        {POLAROIDS[0] && [0, 1, 2, 3, 4].map((step) => {
          const progress = step / 4;
          const startX = 5;
          const startY = 95;
          const endX = POLAROIDS[0].position.x;
          const endY = POLAROIDS[0].position.y;
          const x = startX + (endX - startX) * progress;
          const y = startY + (endY - startY) * progress;
          const side = step % 2 === 0 ? -1 : 1;
          const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
          
          return (
            <g key={`foot-library-${step}`}>
              {/* Neon glow layer */}
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                style={{ filter: 'blur(4px)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0.6],
                  scale: [0, 1.2, 1]
                }}
                transition={{ 
                  delay: 1 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
                fill="rgba(212, 175, 55, 0.6)"
              />
              {/* Main footprint */}
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.8],
                  scale: [0, 1, 1]
                }}
                transition={{ 
                  delay: 1 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
              />
            </g>
          );
        })}

        {/* Footsteps to Confessional (from left) - glow and fade */}
        {POLAROIDS[1] && [0, 1, 2, 3].map((step) => {
          const progress = step / 3;
          const startX = 0;
          const startY = 50;
          const endX = POLAROIDS[1].position.x;
          const endY = POLAROIDS[1].position.y;
          const x = startX + (endX - startX) * progress;
          const y = startY + (endY - startY) * progress;
          const side = step % 2 === 0 ? -1 : 1;
          const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
          
          return (
            <g key={`foot-confess-${step}`}>
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                style={{ filter: 'blur(4px)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0.6],
                  scale: [0, 1.2, 1]
                }}
                transition={{ 
                  delay: 1.5 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
                fill="rgba(212, 175, 55, 0.6)"
              />
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.8],
                  scale: [0, 1, 1]
                }}
                transition={{ 
                  delay: 1.5 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
              />
            </g>
          );
        })}

        {/* Footsteps to Parlour (from top right) - glow and fade */}
        {POLAROIDS[3] && [0, 1, 2, 3, 4].map((step) => {
          const progress = step / 4;
          const startX = 95;
          const startY = 5;
          const endX = POLAROIDS[3].position.x;
          const endY = POLAROIDS[3].position.y;
          const x = startX + (endX - startX) * progress;
          const y = startY + (endY - startY) * progress;
          const side = step % 2 === 0 ? -1 : 1;
          const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
          
          return (
            <g key={`foot-parlour-${step}`}>
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                style={{ filter: 'blur(4px)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.8, 0.6],
                  scale: [0, 1.2, 1]
                }}
                transition={{ 
                  delay: 2 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
                fill="rgba(212, 175, 55, 0.6)"
              />
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 15})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.8],
                  scale: [0, 1, 1]
                }}
                transition={{ 
                  delay: 2 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
              />
            </g>
          );
        })}

        {/* Footsteps to Mystery (from bottom, more erratic) - red glow and fade */}
        {POLAROIDS[6] && [0, 1, 2, 3, 4, 5].map((step) => {
          const progress = step / 5;
          const startX = 40;
          const startY = 100;
          const endX = POLAROIDS[6].position.x;
          const endY = POLAROIDS[6].position.y;
          const wobble = Math.sin(step * 1.5) * 3;
          const x = startX + (endX - startX) * progress + wobble;
          const y = startY + (endY - startY) * progress;
          const side = step % 2 === 0 ? -1 : 1;
          const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI) + wobble * 2;
          
          return (
            <g key={`foot-mystery-${step}`}>
              {/* Red glow for mystery - more ominous */}
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 20})`}
                style={{ filter: 'blur(5px)' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: step < 4 ? [0, 0.9, 0.7] : [0, 0.6, 0.4],
                  scale: [0, 1.3, 1.1]
                }}
                transition={{ 
                  delay: 2.5 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
                fill="rgba(139, 0, 0, 0.7)"
              />
              <motion.use
                href="#footprint"
                x={`${x}%`}
                y={`${y}%`}
                transform={`rotate(${angle + side * 20})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: step < 4 ? [0, 1, 0.8] : [0, 0.7, 0.5],
                  scale: [0, 1, 1]
                }}
                transition={{ 
                  delay: 2.5 + step * 0.3, 
                  duration: 1.5,
                  times: [0, 0.4, 1]
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Polaroids */}
      {POLAROIDS.map((polaroid, index) => {
        const isTechStack = polaroid.id === 'techstack';
        const isKiro = polaroid.id === 'kiro';
        const isSpecial = isTechStack || isKiro;

        return (
          <motion.div
            key={polaroid.id}
            className="absolute cursor-pointer pointer-events-auto"
            style={{
              left: `${polaroid.position.x}%`,
              top: `${polaroid.position.y}%`,
              zIndex: hoveredId === polaroid.id ? 10 : 2,
              filter: isKiro 
                ? 'drop-shadow(0 0 12px rgba(147, 51, 234, 0.4))' 
                : isTechStack 
                  ? 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.4))' 
                  : undefined,
            }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: isSpecial ? 1.05 : 1, 
              rotate: polaroid.position.rotation,
            }}
            transition={{ 
              delay: index * 0.3,
              duration: 0.5,
            }}
            whileHover={{ 
              scale: isSpecial ? 1.15 : 1.1, 
              rotate: 0, 
              zIndex: 10,
              filter: isKiro
                ? 'drop-shadow(0 0 16px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 24px rgba(147, 51, 234, 0.3))'
                : isTechStack 
                  ? 'drop-shadow(0 0 16px rgba(212, 175, 55, 0.6)) drop-shadow(0 0 24px rgba(212, 175, 55, 0.3))'
                  : 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.2)) drop-shadow(0 0 12px rgba(139, 0, 0, 0.15))'
            }}
            onHoverStart={() => {
              setHoveredId(polaroid.id);
              setRevealedSecrets(prev => new Set([...prev, polaroid.id]));
            }}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => handlePolaroidClick(polaroid.route, polaroid.id)}
          >
            {/* Push pin */}
            {isSpecial ? (
              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${polaroid.pinColor}, #8B7355)`,
                  boxShadow: isKiro
                    ? '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(147, 51, 234, 0.5)'
                    : '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(212, 175, 55, 0.5)',
                }}
                animate={{
                  boxShadow: isKiro ? [
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(147, 51, 234, 0.5)',
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 12px rgba(147, 51, 234, 0.7)',
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(147, 51, 234, 0.5)',
                  ] : [
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(212, 175, 55, 0.5)',
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 12px rgba(212, 175, 55, 0.7)',
                    '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.3), 0 0 8px rgba(212, 175, 55, 0.5)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ) : (
              <div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full z-10"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${polaroid.pinColor}, #000)`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.8), inset -1px -1px 2px rgba(255,255,255,0.2)',
                }}
              />
            )}

            {/* Polaroid frame - responsive sizing */}
            <div 
              className="bg-white p-2 pb-10 shadow-2xl sm:p-3 sm:pb-14"
              style={{
                width: 'clamp(140px, 18vw, 210px)',
                boxShadow: isKiro
                  ? '0 8px 24px rgba(147, 51, 234, 0.4), 0 0 30px rgba(147, 51, 234, 0.2), inset 0 0 20px rgba(147, 51, 234, 0.1)'
                  : isTechStack 
                    ? '0 8px 24px rgba(212, 175, 55, 0.4), 0 0 30px rgba(212, 175, 55, 0.2), inset 0 0 20px rgba(212, 175, 55, 0.1)'
                    : '0 8px 24px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.05)',
                backgroundColor: isSpecial ? 'rgba(255, 255, 255, 0.95)' : 'white',
              }}
            >
              {/* Photo area - responsive height */}
              <div 
                className="relative w-full overflow-hidden"
                style={{
                  height: 'clamp(120px, 15vw, 176px)',
                  backgroundColor: isKiro 
                    ? 'rgba(25, 10, 45, 1)' 
                    : isTechStack 
                      ? 'rgba(30, 30, 30, 1)' 
                      : 'rgb(18, 18, 20)',
                  boxShadow: isKiro
                    ? 'inset 0 0 30px rgba(147, 51, 234, 0.25)'
                    : isTechStack 
                      ? 'inset 0 0 30px rgba(212, 175, 55, 0.25)'
                      : 'inset 0 0 30px rgba(0,0,0,0.6)',
                }}
              >
                {/* Photo content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Animated eyes for Watching polaroid */}
                    {polaroid.id === 'watching' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex gap-6 sm:gap-10">
                          {/* Left eye */}
                          <motion.div
                            className="relative bg-white rounded-full flex items-center justify-center"
                            style={{
                              width: 'clamp(28px, 4vw, 40px)',
                              height: 'clamp(40px, 5.5vw, 56px)',
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            <motion.div
                              className="bg-red-900 rounded-full"
                              style={{
                                width: 'clamp(14px, 2vw, 20px)',
                                height: 'clamp(14px, 2vw, 20px)',
                              }}
                              animate={{
                                x: [0, 3, -3, 0],
                                y: [0, 2, -2, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <div 
                                className="bg-black rounded-full absolute top-1 left-1"
                                style={{
                                  width: 'clamp(7px, 1vw, 10px)',
                                  height: 'clamp(7px, 1vw, 10px)',
                                }}
                              />
                            </motion.div>
                          </motion.div>
                          
                          {/* Right eye */}
                          <motion.div
                            className="relative bg-white rounded-full flex items-center justify-center"
                            style={{
                              width: 'clamp(28px, 4vw, 40px)',
                              height: 'clamp(40px, 5.5vw, 56px)',
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                            }}
                          >
                            <motion.div
                              className="bg-red-900 rounded-full"
                              style={{
                                width: 'clamp(14px, 2vw, 20px)',
                                height: 'clamp(14px, 2vw, 20px)',
                              }}
                              animate={{
                                x: [0, 3, -3, 0],
                                y: [0, 2, -2, 0],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <div 
                                className="bg-black rounded-full absolute top-1 left-1"
                                style={{
                                  width: 'clamp(7px, 1vw, 10px)',
                                  height: 'clamp(7px, 1vw, 10px)',
                                }}
                              />
                            </motion.div>
                          </motion.div>
                        </div>
                        
                        {/* Blink effect */}
                        <motion.div
                          className="absolute inset-0 bg-zinc-900"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: [0, 0, 1, 0, 0] }}
                          transition={{
                            duration: 0.3,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                    )}
                    
                    {/* Regular text content for other polaroids */}
                    {polaroid.id !== 'watching' && (
                      <div className="text-center p-2 sm:p-4">
                        <motion.div 
                          className="text-xs sm:text-sm mb-2 sm:mb-3 font-mono font-bold tracking-wide"
                          style={{
                            color: isKiro 
                              ? 'rgb(200, 150, 255)' 
                              : isTechStack 
                                ? 'rgb(255, 220, 100)' 
                                : 'rgb(220, 220, 230)',
                            textShadow: isKiro 
                              ? '0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.4), 0 0 36px rgba(147, 51, 234, 0.2)' 
                              : isTechStack 
                                ? '0 0 12px rgba(212, 175, 55, 0.8), 0 0 24px rgba(212, 175, 55, 0.4), 0 0 36px rgba(212, 175, 55, 0.2)' 
                                : '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)',
                          }}
                          animate={{
                            textShadow: isKiro ? [
                              '0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.4), 0 0 36px rgba(147, 51, 234, 0.2)',
                              '0 0 16px rgba(147, 51, 234, 1), 0 0 32px rgba(147, 51, 234, 0.6), 0 0 48px rgba(147, 51, 234, 0.3)',
                              '0 0 12px rgba(147, 51, 234, 0.8), 0 0 24px rgba(147, 51, 234, 0.4), 0 0 36px rgba(147, 51, 234, 0.2)',
                            ] : isTechStack ? [
                              '0 0 12px rgba(212, 175, 55, 0.8), 0 0 24px rgba(212, 175, 55, 0.4), 0 0 36px rgba(212, 175, 55, 0.2)',
                              '0 0 16px rgba(212, 175, 55, 1), 0 0 32px rgba(212, 175, 55, 0.6), 0 0 48px rgba(212, 175, 55, 0.3)',
                              '0 0 12px rgba(212, 175, 55, 0.8), 0 0 24px rgba(212, 175, 55, 0.4), 0 0 36px rgba(212, 175, 55, 0.2)',
                            ] : [
                              '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)',
                              '0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.4)',
                              '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)',
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          {polaroid.title}
                        </motion.div>
                        <div 
                          className="text-[10px] sm:text-xs leading-relaxed whitespace-pre-line font-medium"
                          style={{
                            color: isKiro 
                              ? 'rgb(180, 140, 230)' 
                              : isTechStack 
                                ? 'rgb(230, 200, 120)' 
                                : 'rgb(200, 200, 210)',
                            textShadow: isKiro 
                              ? '0 0 8px rgba(147, 51, 234, 0.5), 0 0 16px rgba(147, 51, 234, 0.2)' 
                              : isTechStack 
                                ? '0 0 8px rgba(212, 175, 55, 0.5), 0 0 16px rgba(212, 175, 55, 0.2)' 
                                : '0 0 6px rgba(255, 255, 255, 0.4), 0 0 12px rgba(255, 255, 255, 0.2)',
                          }}
                        >
                          {polaroid.description}
                        </div>
                      </div>
                    )}
                  </div>

                {/* Dark secret overlay */}
                <AnimatePresence>
                  {revealedSecrets.has(polaroid.id) && (
                    <motion.div
                      className="absolute inset-0 bg-red-900/90 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-white text-xs text-center px-4 font-mono">
                        {polaroid.darkSecret}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Film grain */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Caption area */}
              <div className="mt-2 text-center sm:mt-3">
                <p className="text-xs sm:text-sm text-zinc-800 font-handwriting">
                  {polaroid.title}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Kiro Modal - Development Process */}
      <AnimatePresence>
        {showKiroModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowKiroModal(false)}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(20,0,40,0.9), rgba(0,0,0,0.95))',
              }}
            />
            
            {/* Kiro Details Panel */}
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-3xl pointer-events-auto">
                {/* Main panel */}
                <motion.div
                  className="border-2 border-purple-400/60 p-6 sm:p-8 shadow-2xl backdrop-blur-sm overflow-y-auto max-h-[85vh] relative"
                  style={{
                    background: 'rgba(15, 5, 30, 0.98)',
                    boxShadow: '0 0 40px rgba(147, 51, 234, 0.4), 0 20px 60px rgba(0,0,0,0.9)',
                  }}
                  initial={{ scale: 0.8, y: 50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.8, y: 50 }}
                  transition={{ type: 'spring', damping: 20 }}
                >
                  {/* Close button - inside panel, top right */}
                  <button
                    onClick={() => setShowKiroModal(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-800/90 text-purple-100 hover:bg-purple-700 transition-colors flex items-center justify-center text-lg font-bold z-10"
                    style={{
                      boxShadow: '0 0 15px rgba(147, 51, 234, 0.5)',
                    }}
                  >
                    ×
                  </button>

                  {/* Header */}
                  <div className="text-center mb-6 pb-4 border-b border-purple-400/40">
                    <motion.div 
                      className="text-purple-200 font-mono text-sm tracking-[0.3em] mb-2"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(147, 51, 234, 0.4)',
                          '0 0 12px rgba(147, 51, 234, 0.6)',
                          '0 0 8px rgba(147, 51, 234, 0.4)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      AI DEVELOPMENT WORKFLOW
                    </motion.div>
                    <div className="text-purple-50 font-bold text-2xl mb-1 tracking-wide">
                      Kiro
                    </div>
                    <div className="text-purple-300/80 font-mono text-xs tracking-widest">
                      TECHNICAL IMPLEMENTATION DETAILS
                    </div>
                  </div>

                  {/* Content - Single Column for More Detail */}
                  <div className="space-y-4">
                    {/* Spec-Driven Development */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        SPEC-DRIVEN ARCHITECTURE
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-300 rounded-full mt-1.5 flex-shrink-0" />
                          <div>.kiro/specs/ directory with requirements.md, design.md, tasks.md</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-300 rounded-full mt-1.5 flex-shrink-0" />
                          <div>Forum system: nested threading, real-time likes, content moderation</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-300 rounded-full mt-1.5 flex-shrink-0" />
                          <div>Dollhouse diary: encryption, mood tracking, multiple view modes</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-300 rounded-full mt-1.5 flex-shrink-0" />
                          <div>Library: bookmarking, reading history, Firebase integration</div>
                        </div>
                      </div>
                    </div>

                    {/* Steering Documents */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        STEERING DOCUMENTS
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>.kiro/steering/ with design-system.md, component-patterns.md</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Design tokens: colors (#6a0000, #d4af37), spacing scale, typography</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Gothic naming: Forum→Parlour, Posts→Whispers, Likes→Candles</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Reusable patterns: UnifiedWritingModal, corner brackets, film grain</div>
                        </div>
                      </div>
                    </div>

                    {/* Refactoring */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        REFACTORING & OPTIMIZATION
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Forum refactor: made all elements functional with Firebase CRUD</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Performance: React.memo, lazy loading, intersection observers</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Animation controller for reduced motion, 60fps optimization</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Design system tokens refactor across 80+ components</div>
                        </div>
                      </div>
                    </div>

                    {/* Testing */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        TESTING & QUALITY
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Jest + React Testing Library for component tests</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Integration tests: AuthFlow, LibraryIntegration, NavigationButtons</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Unit tests for hooks: useStories, useRoomLighting, useToast</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>TypeScript strict mode, ESLint, accessibility compliance</div>
                        </div>
                      </div>
                    </div>

                    {/* Agent Hooks */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        AGENT HOOKS AUTOMATION
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>On file save: automatic test execution and diagnostics</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Event-driven: code quality checks, linting, type validation</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Documentation: auto-generated markdown from conversations</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Workflow: explore→define→implement→refine→iterate</div>
                        </div>
                      </div>
                    </div>

                    {/* Technical Stack */}
                    <div className="border border-purple-400/40 p-4 bg-purple-900/20">
                      <div className="text-purple-200 font-mono text-xs font-bold mb-2 tracking-wide">
                        IMPLEMENTATION DETAILS
                      </div>
                      <div className="space-y-1.5 text-purple-100/90 text-[11px] font-mono leading-relaxed">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Security: AES-256 encryption, DOMPurify XSS, rate limiting</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Firebase: Auth, Firestore rules, Storage, real-time sync</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Animations: Framer Motion with GPU acceleration, physics-based</div>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-400 rounded-full mt-1 flex-shrink-0" />
                          <div>Admin: content moderation, audit logs, user management, FIPPA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section */}
                  <div className="mt-4 pt-4 border-t border-purple-400/40">
                    <div className="text-center">
                      <div className="text-purple-200/70 text-xs font-mono tracking-wider">
                        SPECS • STEERING • HOOKS • REFACTORING • TESTING
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Tech Stack - Interactive Evidence Board */}
      <AnimatePresence>
        {showTechModal && (
          <>
            {/* Backdrop with subtle pattern */}
            <motion.div
              className="fixed inset-0 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTechModal(false)}
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.85), rgba(0,0,0,0.95))',
              }}
            />
            
            {/* Floating evidence cards - like scattered on a desk */}
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-full max-w-4xl h-[600px]">
                {/* Close button */}
                <button
                  onClick={() => setShowTechModal(false)}
                  className="absolute -top-12 right-0 text-amber-200/80 hover:text-red-500 text-4xl leading-none transition-colors pointer-events-auto z-10"
                >
                  ×
                </button>

                {/* Central title card - like a case file cover */}
                <motion.div
                  className="absolute left-1/2 top-1/2 pointer-events-auto"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    zIndex: 5,
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', damping: 15 }}
                >
                  <div 
                    className="bg-zinc-900 border-2 border-amber-600/50 p-6 shadow-2xl"
                    style={{
                      width: '280px',
                      boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 60px rgba(0,0,0,0.9)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-amber-500 font-mono text-xs tracking-[0.3em] mb-2">
                        CASE FILE
                      </div>
                      <div className="text-amber-200 font-bold text-2xl mb-1 tracking-wide">
                        GRIMR
                      </div>
                      <div className="text-amber-600/70 font-mono text-[10px] tracking-widest">
                        TECHNICAL DOSSIER
                      </div>
                      <div className="mt-4 pt-4 border-t border-amber-600/30">
                        <div className="text-zinc-500 text-xs italic">
                          "Performance-optimized horror"
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Frontend card - top left */}
                <motion.div
                  className="absolute pointer-events-auto"
                  style={{
                    left: '8%',
                    top: '12%',
                  }}
                  initial={{ opacity: 0, x: -100, rotate: -45 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: -8,
                    y: [0, -2, 0, 2, 0],
                    rotateZ: [-8, -7, -8, -9, -8],
                  }}
                  transition={{ 
                    delay: 0.4, 
                    type: 'spring', 
                    damping: 20,
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    rotateZ: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="border border-blue-400/40 p-5 shadow-xl backdrop-blur-sm"
                    style={{
                      width: '220px',
                      background: 'rgba(23, 37, 84, 0.4)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.15), 0 10px 30px rgba(0,0,0,0.8)',
                    }}
                  >
                    <motion.div 
                      className="mb-3"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(147, 197, 253, 0.3)',
                          '0 0 12px rgba(147, 197, 253, 0.5)',
                          '0 0 8px rgba(147, 197, 253, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <div className="text-blue-300 font-mono text-sm font-bold tracking-wide">
                        FRONTEND
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-blue-200/90 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>React 18.3</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>TypeScript 5.6</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>Vite 5.4</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>Framer Motion 11</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>Tailwind CSS 3.4</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <div>React Router 7</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Backend card - top right */}
                <motion.div
                  className="absolute pointer-events-auto"
                  style={{
                    right: '8%',
                    top: '12%',
                  }}
                  initial={{ opacity: 0, x: 100, rotate: 45 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0, 
                    rotate: 8,
                    y: [0, 2, 0, -2, 0],
                    rotateZ: [8, 9, 8, 7, 8],
                  }}
                  transition={{ 
                    delay: 0.5, 
                    type: 'spring', 
                    damping: 20,
                    y: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                    rotateZ: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="border border-orange-400/40 p-5 shadow-xl backdrop-blur-sm"
                    style={{
                      width: '220px',
                      background: 'rgba(67, 20, 7, 0.4)',
                      boxShadow: '0 0 20px rgba(251, 146, 60, 0.15), 0 10px 30px rgba(0,0,0,0.8)',
                    }}
                  >
                    <motion.div 
                      className="mb-3"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(253, 186, 116, 0.3)',
                          '0 0 12px rgba(253, 186, 116, 0.5)',
                          '0 0 8px rgba(253, 186, 116, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                    >
                      <div className="text-orange-300 font-mono text-sm font-bold tracking-wide">
                        BACKEND
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-orange-200/90 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <div>Firebase 12.5</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <div>Authentication</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <div>Cloud Firestore</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <div>Cloud Storage</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                        <div>Real-time sync</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Performance card - bottom left */}
                <motion.div
                  className="absolute pointer-events-auto"
                  style={{
                    left: '8%',
                    bottom: '8%',
                  }}
                  initial={{ opacity: 0, y: 100, rotate: -45 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotate: -5,
                    x: [0, -1, 0, 1, 0],
                    rotateZ: [-5, -6, -5, -4, -5],
                  }}
                  transition={{ 
                    delay: 0.6, 
                    type: 'spring', 
                    damping: 20,
                    x: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                    rotateZ: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="border border-green-400/40 p-5 shadow-xl backdrop-blur-sm"
                    style={{
                      width: '220px',
                      background: 'rgba(20, 83, 45, 0.4)',
                      boxShadow: '0 0 20px rgba(34, 197, 94, 0.15), 0 10px 30px rgba(0,0,0,0.8)',
                    }}
                  >
                    <motion.div 
                      className="mb-3"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(134, 239, 172, 0.3)',
                          '0 0 12px rgba(134, 239, 172, 0.5)',
                          '0 0 8px rgba(134, 239, 172, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1,
                      }}
                    >
                      <div className="text-green-300 font-mono text-sm font-bold tracking-wide">
                        PERFORMANCE
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-green-200/90 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <div>60fps animations</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <div>Code splitting</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <div>Lazy loading</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <div>GPU acceleration</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                        <div>Image optimization</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Security card - bottom right */}
                <motion.div
                  className="absolute pointer-events-auto"
                  style={{
                    right: '8%',
                    bottom: '8%',
                  }}
                  initial={{ opacity: 0, y: 100, rotate: 45 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    rotate: 5,
                    x: [0, 1, 0, -1, 0],
                    rotateZ: [5, 4, 5, 6, 5],
                  }}
                  transition={{ 
                    delay: 0.7, 
                    type: 'spring', 
                    damping: 20,
                    x: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                    rotateZ: { duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 },
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0, 
                    zIndex: 10,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div 
                    className="border border-red-400/40 p-5 shadow-xl backdrop-blur-sm"
                    style={{
                      width: '220px',
                      background: 'rgba(69, 10, 10, 0.4)',
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.15), 0 10px 30px rgba(0,0,0,0.8)',
                    }}
                  >
                    <motion.div 
                      className="mb-3"
                      animate={{
                        textShadow: [
                          '0 0 8px rgba(252, 165, 165, 0.3)',
                          '0 0 12px rgba(252, 165, 165, 0.5)',
                          '0 0 8px rgba(252, 165, 165, 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.5,
                      }}
                    >
                      <div className="text-red-300 font-mono text-sm font-bold tracking-wide">
                        SECURITY
                      </div>
                    </motion.div>
                    <div className="space-y-1.5 text-red-200/90 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <div>AES-256 encryption</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <div>DOMPurify XSS</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <div>Rate limiting</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <div>Firestore rules</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                        <div>Input validation</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connecting lines between cards - like red string */}
                <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                  <defs>
                    <filter id="tech-glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Lines connecting to center */}
                  {[
                    { from: { x: 20, y: 20 }, color: 'rgba(59, 130, 246, 0.3)' },
                    { from: { x: 80, y: 20 }, color: 'rgba(251, 146, 60, 0.3)' },
                    { from: { x: 20, y: 80 }, color: 'rgba(34, 197, 94, 0.3)' },
                    { from: { x: 80, y: 80 }, color: 'rgba(239, 68, 68, 0.3)' },
                  ].map((line, i) => (
                    <motion.line
                      key={i}
                      x1={`${line.from.x}%`}
                      y1={`${line.from.y}%`}
                      x2="50%"
                      y2="50%"
                      stroke={line.color}
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      filter="url(#tech-glow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 0.8 }}
                    />
                  ))}
                </svg>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
