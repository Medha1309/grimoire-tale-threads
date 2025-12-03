import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CostumeProvider, useCostume, CostumeTheme } from '../contexts/CostumeContext';
import { COSTUME_THEMES } from '../design-system/costume-themes';
import { TypewriterSequence } from '../components/about/TypewriterSequence';
import { Button } from '../components/shared/Button';
import { TorchEffect, useTorchPosition } from '../components/library/TorchEffect';

interface Polaroid {
  id: string;
  title: string;
  description: string[];
  route?: string;
  isCostumeSwitcher?: boolean;
}

const POLAROIDS: Polaroid[] = [
  {
    id: 'library',
    title: 'The Library',
    description: ['Torch-lit corridors', 'Browse horror fiction', 'Genre atmospheres'],
    route: '/stories',
  },
  {
    id: 'tearoom',
    title: 'Tea Room',
    description: ['Victorian forum', 'Candle reactions', 'Gothic discussions'],
    route: '/forum',
  },
  {
    id: 'boudoir',
    title: 'The Boudoir',
    description: ['Private diary rooms', 'Art studio', 'Memory scrapbook'],
    route: '/dollhouse',
  },
  {
    id: 'chains',
    title: 'Tale Threads',
    description: ['Collaborative writing', 'Live sessions', 'Proposal voting'],
    route: '/chains',
  },
  {
    id: 'tech-react',
    title: 'React 18',
    description: ['Modern UI library', 'Component-based', 'Fast rendering'],
  },
  {
    id: 'tech-firebase',
    title: 'Firebase',
    description: ['Real-time database', 'Authentication', 'Cloud storage'],
  },
  {
    id: 'tech-framer',
    title: 'Framer Motion',
    description: ['Smooth animations', 'Page transitions', 'Interactive effects'],
  },
  {
    id: 'tech-typescript',
    title: 'TypeScript',
    description: ['Type safety', 'Better tooling', 'Fewer bugs'],
  },
  {
    id: 'filter',
    title: 'Change Costume',
    description: ['5 visual themes', 'Instant switching', 'Try them all!'],
    isCostumeSwitcher: true,
  },
];

export const About: React.FC = () => {
  return (
    <CostumeProvider>
      <AboutContent />
    </CostumeProvider>
  );
};

const AboutContent: React.FC = () => {
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [showRoom, setShowRoom] = useState(false);
  const [costumeMenuOpen, setCostumeMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { costume, setCostume } = useCostume();
  const { torchPos, torchActive } = useTorchPosition();

  const handleTypewriterComplete = () => {
    setTimeout(() => {
      setShowTypewriter(false);
      setTimeout(() => setShowRoom(true), 500);
    }, 1000);
  };

  const handleSkip = () => {
    setShowTypewriter(false);
    setShowRoom(true);
  };

  const handlePolaroidClick = (polaroid: Polaroid) => {
    if (polaroid.isCostumeSwitcher) {
      setCostumeMenuOpen(true);
    } else if (polaroid.route) {
      navigate(polaroid.route);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Fixed Skip Button - only shows during typewriter */}
      {showTypewriter && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Button variant="ghost" position="skip" action="skip" onClick={handleSkip} />
        </div>
      )}

      {showTypewriter && <TypewriterSequence onComplete={handleTypewriterComplete} />}
      
      {/* Torch lighting effect */}
      {showRoom && <TorchEffect active={torchActive} position={torchPos} />}

      {showRoom && (
        <>
          {/* Enhanced Gothic Background with dramatic effects */}
          <motion.div 
            key={costume}
            className="fixed inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              background: costume === 'neon-cyberpunk' 
                ? 'radial-gradient(ellipse at top, #1a0033 0%, #0a0a0a 50%, #000000 100%)'
                : costume === 'vintage-sepia'
                ? 'radial-gradient(ellipse at center, #2a1f18 0%, #1a1410 60%, #0a0705 100%)'
                : costume === 'windows-98'
                ? 'linear-gradient(135deg, #008080 0%, #000080 50%, #008080 100%)'
                : costume === 'haunted-mansion'
                ? 'radial-gradient(ellipse at center, #1a0f0f 0%, #0f0505 60%, #000000 100%)'
                : 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 60%, #000000 100%)',
            }}
          />

          {/* Gothic vignette overlay - darker edges */}
          <div 
            className="fixed inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Subtle animated fog/mist effect */}
          <motion.div
            className="fixed inset-0 pointer-events-none opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: costume === 'neon-cyberpunk'
                ? `radial-gradient(circle at 20% 50%, rgba(0, 245, 255, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(255, 0, 255, 0.15) 0%, transparent 50%)`
                : costume === 'haunted-mansion'
                ? `radial-gradient(circle at 20% 50%, rgba(157, 78, 221, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(199, 125, 255, 0.15) 0%, transparent 50%)`
                : `radial-gradient(circle at 20% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(75, 0, 130, 0.1) 0%, transparent 50%)`,
              backgroundSize: '200% 200%',
            }}
          />

          {/* Floating dust particles for gothic atmosphere */}
          {costume !== 'windows-98' && (
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: costume === 'neon-cyberpunk' 
                      ? '#00ffff' 
                      : costume === 'haunted-mansion'
                      ? '#9d4edd'
                      : costume === 'vintage-sepia'
                      ? '#d4a574'
                      : '#8b0000',
                    opacity: 0.3,
                    boxShadow: costume === 'neon-cyberpunk' 
                      ? '0 0 10px #00ffff' 
                      : costume === 'haunted-mansion'
                      ? '0 0 10px #9d4edd'
                      : 'none',
                  }}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 10,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative min-h-screen px-6 py-20">
            {/* Enhanced Gothic Title */}
            <motion.div
              key={`title-${costume}`}
              className="relative z-10 mb-16 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-5xl md:text-6xl font-bold tracking-wider"
                style={{
                  fontFamily: costume === 'windows-98' 
                    ? '"Courier New", monospace' 
                    : costume === 'vintage-sepia'
                    ? '"Playfair Display", Georgia, serif'
                    : costume === 'neon-cyberpunk'
                    ? '"Courier New", monospace'
                    : '"Playfair Display", Georgia, serif',
                  color: costume === 'neon-cyberpunk'
                    ? '#00ffff'
                    : costume === 'vintage-sepia'
                    ? '#d4a574'
                    : costume === 'windows-98'
                    ? '#00ff00'
                    : costume === 'haunted-mansion'
                    ? '#e8d5b7'
                    : '#e0e0e0',
                  textShadow: costume === 'neon-cyberpunk'
                    ? '0 0 20px #00ffff, 0 0 40px #ff00ff, 0 0 60px #00ffff'
                    : costume === 'haunted-mansion'
                    ? '0 0 30px rgba(139, 0, 0, 0.9), 0 0 60px rgba(139, 0, 0, 0.5), 0 4px 8px rgba(0,0,0,0.8)'
                    : costume === 'vintage-sepia'
                    ? '0 4px 8px rgba(0,0,0,0.6)'
                    : '0 0 20px rgba(139, 0, 0, 0.6), 0 4px 8px rgba(0,0,0,0.8)',
                  letterSpacing: '0.15em',
                }}
              >
                GRIMOIRE
              </h1>
            </motion.div>

            {/* Clothesline/String */}
            <div className="relative z-10 max-w-7xl mx-auto mb-16" style={{ minHeight: '1100px' }}>
              {/* Horizontal strings */}
              <div 
                className="absolute top-0 left-0 right-0 h-px opacity-30"
                style={{
                  background: costume === 'vintage-sepia' 
                    ? '#8b7355' 
                    : costume === 'neon-cyberpunk'
                    ? '#00ffff'
                    : '#666',
                  boxShadow: costume === 'neon-cyberpunk' ? '0 0 4px #00ffff' : 'none',
                }}
              />
              <div 
                className="absolute top-[40%] left-0 right-0 h-px opacity-30"
                style={{
                  background: costume === 'vintage-sepia' 
                    ? '#8b7355' 
                    : costume === 'neon-cyberpunk'
                    ? '#00ffff'
                    : '#666',
                  boxShadow: costume === 'neon-cyberpunk' ? '0 0 4px #00ffff' : 'none',
                }}
              />
              <div 
                className="absolute top-[75%] left-0 right-0 h-px opacity-30"
                style={{
                  background: costume === 'vintage-sepia' 
                    ? '#8b7355' 
                    : costume === 'neon-cyberpunk'
                    ? '#00ffff'
                    : '#666',
                  boxShadow: costume === 'neon-cyberpunk' ? '0 0 4px #00ffff' : 'none',
                }}
              />
              {POLAROIDS.map((polaroid, index) => {
                // Stable rotation values - different for each polaroid
                const rotations = [-8, 6, -5, 7, 4, -7, 5, 6, -4];
                const rotation = rotations[index] || 0;
                
                // Scattered positions - different for each polaroid (more visible)
                const positions = [
                  { top: '8%', left: '10%' },    // Library
                  { top: '8%', left: '42%' },    // Tea Room
                  { top: '8%', left: '74%' },    // Boudoir
                  { top: '42%', left: '26%' },   // Tale Threads
                  { top: '72%', left: '8%' },    // React (tech)
                  { top: '72%', left: '32%' },   // Firebase (tech)
                  { top: '72%', left: '56%' },   // Framer (tech)
                  { top: '72%', left: '80%' },   // TypeScript (tech)
                  { top: '42%', left: '68%' },   // Filter
                ];
                
                const position = positions[index] || { top: '50%', left: '50%' };

                return (
                  <motion.div
                    key={polaroid.id}
                    className="absolute cursor-pointer"
                    style={{ 
                      ...position,
                      transformOrigin: 'top center',
                    }}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      y: 0,
                      rotate: rotation,
                    }}
                    transition={{ 
                      delay: 0.15 + index * 0.08, 
                      type: 'spring', 
                      stiffness: 150, 
                      damping: 15,
                      rotate: {
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 3 + index * 0.3,
                        ease: 'easeInOut',
                      }
                    }}
                    whileHover={{ 
                      scale: 1.08, 
                      rotate: 0, 
                      y: -8, 
                      zIndex: 50, 
                      transition: { duration: 0.2 } 
                    }}
                    onClick={() => handlePolaroidClick(polaroid)}
                  >
                    {/* Simple binder clip at top */}
                    <div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                      style={{
                        width: '20px',
                        height: '8px',
                        opacity: 0.4,
                      }}
                    >
                      {/* Clip body - simple rectangle */}
                      <div 
                        className="relative w-full h-full rounded-sm"
                        style={{
                          background: costume === 'vintage-sepia' 
                            ? 'rgba(60, 50, 40, 0.6)'
                            : costume === 'neon-cyberpunk'
                            ? 'rgba(0, 255, 255, 0.2)'
                            : costume === 'windows-98'
                            ? 'rgba(128, 128, 128, 0.5)'
                            : 'rgba(40, 40, 40, 0.5)',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                        }}
                      />
                    </div>
                    {/* Enhanced Gothic Polaroid */}
                    <div 
                      className="relative p-3 pb-12 shadow-2xl border transition-all duration-300 backdrop-blur-lg"
                      style={{
                        width: polaroid.id.startsWith('tech-') ? '140px' : '200px',
                        background: costume === 'neon-cyberpunk'
                          ? 'rgba(26, 0, 51, 0.08)'
                          : costume === 'vintage-sepia'
                          ? 'rgba(245, 230, 211, 0.12)'
                          : costume === 'windows-98'
                          ? 'rgba(192, 192, 192, 0.12)'
                          : costume === 'haunted-mansion'
                          ? 'rgba(42, 26, 26, 0.08)'
                          : 'rgba(255, 255, 255, 0.08)',
                        borderColor: costume === 'neon-cyberpunk'
                          ? 'rgba(0, 255, 255, 0.25)'
                          : costume === 'vintage-sepia'
                          ? 'rgba(139, 115, 85, 0.25)'
                          : costume === 'windows-98'
                          ? 'rgba(0, 0, 128, 0.25)'
                          : costume === 'haunted-mansion'
                          ? 'rgba(139, 0, 0, 0.25)'
                          : 'rgba(255, 255, 255, 0.25)',
                        boxShadow: costume === 'neon-cyberpunk'
                          ? '0 0 40px rgba(0,255,255,0.3), 0 12px 24px rgba(0,0,0,0.6)'
                          : costume === 'haunted-mansion'
                          ? '0 0 40px rgba(139,0,0,0.3), 0 12px 24px rgba(0,0,0,0.6)'
                          : costume === 'vintage-sepia'
                          ? '0 8px 16px rgba(0,0,0,0.3), 0 16px 32px rgba(0,0,0,0.2)'
                          : '0 0 30px rgba(139,0,0,0.2), 0 12px 24px rgba(0,0,0,0.6)',
                      }}
                    >
                      {/* Subtle texture */}
                      <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                        }}
                      />

                      {/* Photo area */}
                      <div
                        className={`relative flex items-center justify-center overflow-hidden border ${polaroid.id.startsWith('tech-') ? 'h-20' : 'h-32'}`}
                        style={{
                          background: polaroid.isCostumeSwitcher 
                            ? 'linear-gradient(135deg, #990045 0%, #7a0033 100%)' 
                            : costume === 'neon-cyberpunk'
                            ? 'linear-gradient(135deg, #008b8b 0%, #8b008b 100%)'
                            : costume === 'vintage-sepia'
                            ? 'linear-gradient(135deg, #8b6f47 0%, #5c4033 100%)'
                            : costume === 'windows-98'
                            ? 'linear-gradient(135deg, #008000 0%, #005555 100%)'
                            : costume === 'haunted-mansion'
                            ? 'linear-gradient(135deg, #5c0000 0%, #2a0000 100%)'
                            : 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                          borderColor: costume === 'neon-cyberpunk'
                            ? '#00ffff'
                            : costume === 'vintage-sepia'
                            ? '#8b7355'
                            : costume === 'windows-98'
                            ? '#000080'
                            : '#444',
                        }}
                      >
                        {/* Dimming overlay */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'rgba(0, 0, 0, 0.3)',
                          }}
                        />
                        
                        {/* Film grain effect */}
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-20"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                          }}
                        />
                        
                        {/* Vignette */}
                        <div 
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
                          }}
                        />
                        
                        <div className="relative text-center px-4 z-10">
                          <div 
                            className={`font-bold ${polaroid.id.startsWith('tech-') ? 'text-lg' : 'text-2xl mb-2'}`} 
                            style={{ 
                              color: '#ffffff',
                              textShadow: '0 0 30px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.6), 0 0 10px rgba(255,255,255,1), 0 2px 8px rgba(0,0,0,1)',
                              fontFamily: costume === 'windows-98' 
                                ? '"Courier New", monospace' 
                                : costume === 'vintage-sepia'
                                ? '"Playfair Display", Georgia, serif'
                                : costume === 'neon-cyberpunk'
                                ? '"Courier New", monospace'
                                : '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.8))',
                            }}
                          >
                            {polaroid.title}
                          </div>
                        </div>
                      </div>

                      {/* Caption area */}
                      <div className={`text-center px-3 space-y-1 ${polaroid.id.startsWith('tech-') ? 'mt-3' : 'mt-5 space-y-1.5'}`}>
                        {polaroid.description.map((line, i) => (
                          <div 
                            key={i} 
                            className={`leading-relaxed font-bold ${polaroid.id.startsWith('tech-') ? 'text-xs' : 'text-sm'}`}
                            style={{
                              color: costume === 'vintage-sepia' ? '#1a1410' : '#ffffff',
                              textShadow: costume === 'vintage-sepia' 
                                ? '0 0 15px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.5)' 
                                : '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.5), 0 0 8px rgba(255,255,255,1), 0 2px 6px rgba(0,0,0,1)',
                              fontFamily: costume === 'windows-98' 
                                ? '"Courier New", monospace' 
                                : costume === 'vintage-sepia'
                                ? '"Playfair Display", Georgia, serif'
                                : costume === 'neon-cyberpunk'
                                ? '"Courier New", monospace'
                                : '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.7))',
                            }}
                          >
                            {line}
                          </div>
                        ))}
                      </div>

                      {/* Subtle edge highlight */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                          background: `
                            linear-gradient(to right, rgba(255,255,255,0.03) 0%, transparent 3%, transparent 97%, rgba(255,255,255,0.03) 100%),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 3%, transparent 97%, rgba(255,255,255,0.03) 100%)
                          `,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Enhanced Filter Modal with Visual Previews */}
            <AnimatePresence>
              {costumeMenuOpen && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setCostumeMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                  <motion.div
                    className="relative max-w-4xl w-full rounded-lg p-8 border-2 shadow-2xl overflow-y-auto max-h-[90vh]"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                      borderColor: '#8b0000',
                      boxShadow: '0 0 60px rgba(139,0,0,0.6), 0 20px 40px rgba(0,0,0,0.9)',
                    }}
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 
                      className="text-4xl font-bold mb-3 text-center tracking-wider"
                      style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: '#e8d5b7',
                        textShadow: '0 0 20px rgba(139,0,0,0.8), 0 4px 8px rgba(0,0,0,0.8)',
                      }}
                    >
                      CHOOSE YOUR AESTHETIC
                    </h2>
                    <p 
                      className="text-center text-zinc-400 mb-8 text-sm tracking-wide"
                      style={{
                        fontFamily: '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                      }}
                    >
                      Each filter transforms the entire experience
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(Object.keys(COSTUME_THEMES) as CostumeTheme[]).map((themeKey) => {
                        const theme = COSTUME_THEMES[themeKey];
                        const isActive = costume === themeKey;
                        
                        // Visual preview colors for each theme
                        const previewGradient = themeKey === 'neon-cyberpunk'
                          ? 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)'
                          : themeKey === 'vintage-sepia'
                          ? 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)'
                          : themeKey === 'windows-98'
                          ? 'linear-gradient(135deg, #00ff00 0%, #008080 100%)'
                          : themeKey === 'haunted-mansion'
                          ? 'linear-gradient(135deg, #9d4edd 0%, #c77dff 100%)'
                          : 'linear-gradient(135deg, #ff006e 0%, #8b0000 100%)';
                        
                        return (
                          <motion.button
                            key={themeKey}
                            onClick={() => {
                              setCostume(themeKey);
                              setCostumeMenuOpen(false);
                            }}
                            className="relative p-6 rounded-lg border-2 transition-all text-left overflow-hidden group"
                            style={{
                              background: isActive 
                                ? 'linear-gradient(135deg, #2a1a1a 0%, #1a0f0f 100%)' 
                                : 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
                              borderColor: isActive ? '#ff006e' : '#333',
                            }}
                            whileHover={{ scale: 1.03, borderColor: '#ff006e' }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {/* Visual preview strip */}
                            <div 
                              className="absolute top-0 left-0 right-0 h-2"
                              style={{
                                background: previewGradient,
                                boxShadow: themeKey === 'neon-cyberpunk' 
                                  ? '0 0 20px rgba(0,255,255,0.6)' 
                                  : themeKey === 'haunted-mansion'
                                  ? '0 0 20px rgba(157,78,221,0.6)'
                                  : 'none',
                              }}
                            />
                            
                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                className="absolute top-4 right-4 w-3 h-3 rounded-full"
                                style={{
                                  background: '#ff006e',
                                  boxShadow: '0 0 20px rgba(255,0,110,0.8)',
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              />
                            )}
                            
                            <div className="mt-4">
                              <div 
                                className="font-bold text-xl mb-2 tracking-wide"
                                style={{
                                  color: isActive ? '#ff006e' : '#e0e0e0',
                                  fontFamily: themeKey === 'windows-98' 
                                    ? '"Courier New", monospace' 
                                    : '"Playfair Display", Georgia, serif',
                                }}
                              >
                                {theme.name}
                              </div>
                              <div 
                                className="text-sm leading-relaxed mb-4"
                                style={{ 
                                  color: isActive ? '#c0c0c0' : '#808080',
                                  fontFamily: '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                                }}
                              >
                                {theme.description}
                              </div>
                              
                              {/* Mini color palette preview */}
                              <div className="flex gap-2 mt-3">
                                <div 
                                  className="w-8 h-8 rounded border border-zinc-700"
                                  style={{ background: theme.colors.accent }}
                                  title="Accent color"
                                />
                                <div 
                                  className="w-8 h-8 rounded border border-zinc-700"
                                  style={{ background: theme.colors.text }}
                                  title="Text color"
                                />
                                <div 
                                  className="w-8 h-8 rounded border border-zinc-700"
                                  style={{ background: theme.colors.bg }}
                                  title="Background"
                                />
                              </div>
                            </div>
                            
                            {/* Hover glow effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                              style={{
                                background: 'radial-gradient(circle at center, rgba(255,0,110,0.1) 0%, transparent 70%)',
                              }}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    {/* Close hint */}
                    <p 
                      className="text-center text-zinc-600 mt-6 text-xs"
                      style={{
                        fontFamily: '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                      }}
                    >
                      Click outside to close
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Gothic Footer */}
            <motion.div
              className="relative z-10 max-w-4xl mx-auto border-t pt-16 pb-8"
              style={{
                borderColor: costume === 'neon-cyberpunk' ? '#00ffff' : costume === 'haunted-mansion' ? '#6a3d9a' : '#333',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p 
                className="text-center text-sm tracking-wider"
                style={{
                  color: costume === 'neon-cyberpunk' ? '#ff00ff' : costume === 'vintage-sepia' ? '#8b7355' : '#666',
                  fontFamily: costume === 'windows-98' 
                    ? '"Courier New", monospace' 
                    : '"Cormorant Garamond", "Crimson Text", Georgia, serif',
                }}
              >
                Built for Kiroween 2025 • Powered by AI-Assisted Development
              </p>
              <p 
                className="text-center text-xs mt-2 opacity-50"
                style={{
                  color: costume === 'neon-cyberpunk' ? '#00ffff' : '#555',
                }}
              >
                "In the shadows of code, stories come alive..."
              </p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};
