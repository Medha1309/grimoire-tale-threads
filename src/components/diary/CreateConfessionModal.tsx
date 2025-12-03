/**
 * CreateConfessionModal Component
 * Modal for creating new diary entries - Enhanced with atmospheric horror elements
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreateEntryData, DiaryMood } from '../../types/diary';
import { RibbonPicker } from './RibbonPicker';
import { modalVariants } from '../../utils/animations';
import { useAuth } from '../../contexts/AuthContext';

interface CreateConfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateEntryData) => Promise<void>;
}

export const CreateConfessionModal: React.FC<CreateConfessionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<DiaryMood>('calm');
  const [isLocked, setIsLocked] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSeal, setShowSeal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Intro animation
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);
  
  // Creepy atmospheric effects
  const [inkBlots, setInkBlots] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);
  const [whisperText, setWhisperText] = useState('');
  const [showWhisper, setShowWhisper] = useState(false);
  const [candleFlicker, setCandleFlicker] = useState(1);
  const [pageAge, setPageAge] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorGhost, setCursorGhost] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  
  // Whispers that appear occasionally
  const whispers = [
    "your secrets are safe here...",
    "the paper remembers everything...",
    "write what you dare not speak...",
    "the ink knows your truth...",
    "confess, and be free...",
    "these words will never fade...",
    "the diary listens...",
    "pour your heart onto the page..."
  ];
  
  // Intro sequence
  useEffect(() => {
    if (!isOpen || !showIntro) return;
    
    const timers: number[] = [
      window.setTimeout(() => setIntroStep(1), 0),           // "The page awaits"
      window.setTimeout(() => setIntroStep(2), 3000),        // Pause
      window.setTimeout(() => setIntroStep(3), 3500),        // "Your secrets"
      window.setTimeout(() => setIntroStep(4), 6500),        // "are safe here" appears
      window.setTimeout(() => setIntroStep(5), 10000),       // Pause
      window.setTimeout(() => setIntroStep(6), 10500),       // "Write" appears
      window.setTimeout(() => setIntroStep(7), 13500),       // Pause
      window.setTimeout(() => setIntroStep(8), 14000),       // "what haunts you"
      window.setTimeout(() => setIntroStep(9), 17000),       // Dot appears
      window.setTimeout(() => setShowIntro(false), 20000),   // Form shows
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen, showIntro]);
  
  // Generate random ink blots when modal opens
  useEffect(() => {
    if (isOpen && !showIntro) {
      const blots = Array.from({ length: 8 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 20 + Math.random() * 40,
        delay: i * 0.3
      }));
      setInkBlots(blots);
      setPageAge(Math.random());
    }
  }, [isOpen, showIntro]);
  
  // Whisper effect - appears occasionally
  useEffect(() => {
    if (!isOpen || showIntro) return;
    
    const whisperInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomWhisper = whispers[Math.floor(Math.random() * whispers.length)];
        setWhisperText(randomWhisper);
        setShowWhisper(true);
        
        setTimeout(() => setShowWhisper(false), 4000);
      }
    }, 8000);
    
    return () => clearInterval(whisperInterval);
  }, [isOpen, showIntro]);
  
  // Candle flicker effect
  useEffect(() => {
    if (!isOpen || showIntro) return;
    
    const flickerInterval = setInterval(() => {
      setCandleFlicker(0.85 + Math.random() * 0.15);
    }, 100 + Math.random() * 200);
    
    return () => clearInterval(flickerInterval);
  }, [isOpen, showIntro]);
  
  // Ghost cursor that occasionally appears
  useEffect(() => {
    if (!isOpen || showIntro || !textareaRef.current) return;
    
    const ghostInterval = setInterval(() => {
      if (Math.random() > 0.85 && content.length > 20) {
        const rect = textareaRef.current?.getBoundingClientRect();
        if (rect) {
          setCursorGhost({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            show: true
          });
          
          setTimeout(() => setCursorGhost(prev => ({ ...prev, show: false })), 1500);
        }
      }
    }, 5000);
    
    return () => clearInterval(ghostInterval);
  }, [isOpen, showIntro, content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError('Please sign in to add a confession.');
      return;
    }

    if (content.trim().length < 10) {
      setError('Your confession must be at least 10 characters.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setShowSeal(true);

      // Wait for seal animation
      await new Promise(resolve => setTimeout(resolve, 1500));

      await onSubmit({
        content: content.trim(),
        mood,
        isLocked,
        enableAI: false,
      });

      // Reset form
      setContent('');
      setMood('calm');
      setIsLocked(true);
      setShowSeal(false);
      onClose();
    } catch (err: any) {
      setError('Failed to save confession. Please try again.');
      setShowSeal(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setContent('');
      setMood('calm');
      setIsLocked(true);
      setError(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-40"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.95) 100%)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Intro sequence */}
          <AnimatePresence>
            {showIntro && (
              <>
                {/* Intro overlay */}
                <motion.div
                  className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <AnimatePresence mode="wait">
                  {(introStep === 1 || introStep === 2) && (
                    <motion.p
                      key="page"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                      className="font-serif text-5xl text-[#8b7355]"
                    >
                      The page awaits
                    </motion.p>
                  )}
                  
                  {(introStep === 3 || introStep === 4 || introStep === 5) && (
                    <motion.p
                      key="secrets"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="font-serif text-5xl text-[#8b7355]"
                    >
                      Your secrets{(introStep === 4 || introStep === 5) && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                        >
                          {" "}are safe here
                        </motion.span>
                      )}
                    </motion.p>
                  )}
                  
                  {(introStep === 6 || introStep === 7) && (
                    <motion.p
                      key="write"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="font-serif text-5xl text-[#8b7355]"
                    >
                      Write
                    </motion.p>
                  )}
                  
                  {(introStep === 8 || introStep === 9) && (
                    <motion.p
                      key="haunts"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="font-serif text-5xl text-[#2a1810]"
                    >
                      what haunts you
                      {introStep === 9 && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 1.2, ease: "easeInOut" }}
                          className="text-[#8b7355]"
                        >
                          .
                        </motion.span>
                      )}
                    </motion.p>
                  )}
                  </AnimatePresence>
                </motion.div>
                
                {/* Skip button - OUTSIDE container for proper z-index */}
                <button
                  onClick={() => setShowIntro(false)}
                  className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50
                             rounded font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed 
                             hover:scale-[1.02] active:scale-[0.98]
                             bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700
                             px-4 py-2 text-sm"
                >
                  Skip to confessional
                </button>
              </>
            )}
          </AnimatePresence>

          {/* Floating candles in background */}
          {!showIntro && (
            <div className="fixed inset-0 z-45 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${20 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-4xl" style={{ filter: `brightness(${candleFlicker})` }}>
                    🕯️
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal */}
          {!showIntro && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Aged paper texture background */}
              <div 
                className="relative bg-gradient-to-br from-[#f5f1e8] via-[#ede8dc] to-[#e8e3d5]
                           border-4 border-[#8b7355] rounded-sm
                           shadow-[0_0_80px_-10px_rgba(139,115,85,0.8),inset_0_0_100px_rgba(139,115,85,0.1)]
                           p-10"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, rgba(139,115,85,0.03) 1px, transparent 1px),
                    linear-gradient(rgba(139,115,85,0.03) 1px, transparent 1px),
                    radial-gradient(circle at ${pageAge * 100}% ${(1 - pageAge) * 100}%, rgba(139,115,85,0.15) 0%, transparent 60%)
                  `,
                  backgroundSize: '20px 20px, 20px 20px, 100% 100%',
                }}
              >
                {/* Ink blots scattered on page */}
                {inkBlots.map((blot, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-black/10 blur-sm pointer-events-none"
                    style={{
                      left: `${blot.x}%`,
                      top: `${blot.y}%`,
                      width: `${blot.size}px`,
                      height: `${blot.size}px`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.15 }}
                    transition={{ delay: blot.delay, duration: 0.8 }}
                  />
                ))}
                
                {/* Torn edge effect at top */}
                <div 
                  className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-[#8b7355]/20 to-transparent"
                  style={{
                    clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)'
                  }}
                />
                
                {/* Coffee stain ring */}
                <motion.div
                  className="absolute top-8 right-12 w-20 h-20 rounded-full border-2 border-[#8b7355]/20 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.3, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    boxShadow: 'inset 0 0 20px rgba(139,115,85,0.2)'
                  }}
                />
              {/* Whisper text that appears occasionally */}
              <AnimatePresence>
                {showWhisper && !submitting && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: [0, 0.6, 0.6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 4 }}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
                  >
                    <p className="text-[#8b7355]/60 font-serif text-lg italic text-center px-4">
                      {whisperText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Ghost cursor */}
              <AnimatePresence>
                {cursorGhost.show && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1, 0.5] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="fixed w-4 h-4 rounded-full bg-[#8b7355]/30 blur-sm pointer-events-none z-50"
                    style={{
                      left: cursorGhost.x,
                      top: cursorGhost.y,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Seal Animation Overlay */}
              <AnimatePresence>
                {showSeal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center 
                               bg-gradient-to-br from-[#f5f1e8] via-[#ede8dc] to-[#e8e3d5]
                               backdrop-blur-md z-10 rounded-sm"
                  >
                    <div className="text-center">
                      {/* Melting wax seal animation */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180, y: -100 }}
                        animate={{ 
                          scale: [0, 1.3, 1],
                          rotate: [-180, 0, 0],
                          y: [-100, 0, 0]
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="relative"
                      >
                        <div className="text-8xl mb-6 relative">
                          🔴
                          <motion.div
                            className="absolute inset-0 text-8xl"
                            animate={{
                              filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            💧
                          </motion.div>
                        </div>
                      </motion.div>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="text-[#8b7355] font-serif text-3xl mb-4"
                      >
                        sealed in wax and shadow
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.6, 0.6, 0] }}
                        transition={{ delay: 1, duration: 2 }}
                        className="text-[#8b7355]/60 font-serif text-sm italic"
                      >
                        your confession is bound to the page...
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="text-center mb-8 relative">
                {/* Decorative corner flourishes */}
                <div className="absolute top-0 left-0 text-[#8b7355]/30 text-2xl">╔</div>
                <div className="absolute top-0 right-0 text-[#8b7355]/30 text-2xl">╗</div>
                
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="text-5xl mb-3"
                  style={{ filter: `brightness(${candleFlicker})` }}
                >
                  🖋️
                </motion.div>
                
                <h2 className="font-serif text-5xl text-[#8b7355] mb-2 relative">
                  <span className="relative z-10">Confessional</span>
                  <motion.span
                    className="absolute inset-0 text-[#8b7355]/20 blur-sm"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Confessional
                  </motion.span>
                </h2>
                
                <motion.div
                  className="w-32 h-px mx-auto mb-2 bg-gradient-to-r from-transparent via-[#8b7355]/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 }}
                />
                
                <p className="text-sm text-[#8b7355]/60 font-serif italic">
                  ink your darkest truths upon this page
                </p>
                
                <button
                  onClick={handleClose}
                  disabled={submitting}
                  className="absolute -top-2 -right-2 text-[#8b7355]/40 hover:text-[#8b7355] 
                             transition-colors disabled:opacity-50 text-2xl
                             hover:rotate-90 transform transition-transform duration-300"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {/* Content */}
                <div>
                  <label className="block text-[#8b7355] font-serif text-2xl mb-4 text-center relative">
                    <span className="relative z-10">What haunts you?</span>
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-48 h-px bg-gradient-to-r from-transparent via-[#8b7355]/30 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.6 }}
                    />
                  </label>
                  
                  <div className="relative">
                    {/* Handwritten lines background */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(139,115,85,0.15) 31px, rgba(139,115,85,0.15) 32px)',
                      }}
                    />
                    
                    {/* Margin line like a real notebook */}
                    <div 
                      className="absolute left-12 top-0 bottom-0 w-px bg-[#ff6b6b]/20"
                    />
                    
                    <textarea
                      ref={textareaRef}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Dear Diary, tonight I must confess..."
                      rows={12}
                      className="w-full px-6 py-4 bg-transparent
                                 border-2 border-[#8b7355]/30 rounded-sm
                                 text-[#2a1810] font-serif text-base leading-[32px]
                                 focus:outline-none focus:border-[#8b7355]/60 focus:ring-2 focus:ring-[#8b7355]/10
                                 placeholder:text-[#8b7355]/40 placeholder:italic resize-none
                                 shadow-inner relative z-10"
                      disabled={submitting}
                      maxLength={5000}
                      style={{
                        textShadow: '0 0 1px rgba(42,24,16,0.3)',
                        fontFamily: "'Courier New', monospace",
                      }}
                    />
                    
                    {/* Ink splatter when typing */}
                    <AnimatePresence>
                      {content.length > 0 && content.length % 50 === 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 0.2 }}
                          exit={{ opacity: 0 }}
                          className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#2a1810] blur-sm pointer-events-none"
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Character count with quill icon */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-[#f5f1e8]/80 px-2 py-1 rounded">
                      <motion.span 
                        className="text-sm"
                        animate={{ rotate: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ filter: `brightness(${candleFlicker})` }}
                      >
                        🖋️
                      </motion.span>
                      <span className="text-xs text-[#8b7355]/70 font-serif">
                        {content.length}/5000
                      </span>
                    </div>
                    
                    {/* Aged paper corner fold */}
                    <div 
                      className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#8b7355]/10 pointer-events-none"
                      style={{
                        clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                        transform: 'rotate(0deg)',
                      }}
                    />
                  </div>
                </div>

                {/* Mood Picker with vintage styling */}
                <div className="relative">
                  <label className="block text-[#8b7355] font-serif text-xl mb-3 text-center">
                    How does your soul feel?
                  </label>
                  <RibbonPicker
                    selected={mood}
                    onSelect={setMood}
                    disabled={submitting}
                  />
                </div>

                {/* Privacy Toggle with vintage lock */}
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className="relative p-5 bg-[#f5f1e8]/60 rounded-sm border-2 border-[#8b7355]/30
                             shadow-[inset_0_2px_8px_rgba(139,115,85,0.1)]"
                >
                  {/* Decorative corner elements */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#8b7355]/20" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#8b7355]/20" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#8b7355]/20" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#8b7355]/20" />
                  
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ 
                        rotate: isLocked ? 0 : 15,
                        scale: isLocked ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl"
                    >
                      {isLocked ? '🔒' : '🔓'}
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <input
                          type="checkbox"
                          id="isLocked"
                          checked={isLocked}
                          onChange={(e) => setIsLocked(e.target.checked)}
                          disabled={submitting}
                          className="w-5 h-5 text-[#8b7355] border-[#8b7355]/50 rounded
                                     focus:ring-[#8b7355] focus:ring-2 cursor-pointer"
                        />
                        <label htmlFor="isLocked" className="text-base text-[#2a1810] font-serif cursor-pointer">
                          Seal with enchanted lock
                        </label>
                      </div>
                      <p className="text-xs text-[#8b7355]/60 font-serif italic ml-8">
                        Your words will be bound in shadow, readable only by you
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle shimmer effect when locked */}
                  {isLocked && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none rounded-sm"
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(139,115,85,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(139,115,85,0.1) 0%, transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(139,115,85,0.1) 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  )}
                </motion.div>



                {/* Error Message with vintage styling */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-900/10 border-2 border-red-900/30 rounded-sm"
                    >
                      <p className="text-red-900 text-sm font-serif text-center flex items-center justify-center gap-2">
                        <span>⚠️</span>
                        <span>{error}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <div className="flex gap-4 pt-6">
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    disabled={submitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 border-2 border-[#8b7355]/40 rounded-sm
                               text-[#8b7355] font-serif text-sm
                               hover:bg-[#8b7355]/5 transition-all
                               disabled:opacity-50 shadow-md
                               relative overflow-hidden"
                  >
                    <span className="relative z-10">Abandon Entry</span>
                    <motion.div
                      className="absolute inset-0 bg-[#8b7355]/5"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    disabled={submitting || content.trim().length < 10}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-4 bg-gradient-to-b from-[#8b7355] to-[#6d5a43]
                               border-2 border-[#5a4a36] rounded-sm text-[#f5f1e8] font-serif text-xl
                               hover:shadow-[0_0_30px_rgba(139,115,85,0.6),inset_0_0_20px_rgba(245,241,232,0.1)]
                               transition-all
                               disabled:opacity-50 disabled:cursor-not-allowed shadow-lg
                               flex items-center justify-center gap-3
                               relative overflow-hidden"
                    style={{ filter: `brightness(${candleFlicker})` }}
                  >
                    {submitting ? (
                      <>
                        <motion.span
                          animate={{ 
                            rotate: 360,
                            scale: [1, 1.2, 1],
                          }}
                          transition={{ 
                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                            scale: { duration: 1, repeat: Infinity },
                          }}
                          className="text-2xl"
                        >
                          🕯️
                        </motion.span>
                        <span>Sealing in wax...</span>
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={{ rotate: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🖋️
                        </motion.span>
                        <span>Bind to Page</span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🔒
                        </motion.span>
                      </>
                    )}
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f5f1e8]/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
                </div>
                
                {/* Decorative bottom flourish */}
                <motion.div
                  className="flex items-center justify-center gap-2 pt-4 text-[#8b7355]/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <span className="text-xs">✦</span>
                  <span className="text-xs">✦</span>
                  <span className="text-xs">✦</span>
                </motion.div>
              </form>
              
              {/* Bottom decorative corners */}
              <div className="absolute bottom-4 left-4 text-[#8b7355]/30 text-2xl">╚</div>
              <div className="absolute bottom-4 right-4 text-[#8b7355]/30 text-2xl">╝</div>
            </div>
          </motion.div>
          </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
