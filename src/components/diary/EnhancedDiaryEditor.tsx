import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodSelector } from './MoodSelector';
import { FocusMode } from './FocusMode';
import { WritingGoals } from './WritingGoals';
import { SaveSuccessToast } from './SaveSuccessToast';
import { MagicalTypingEffect } from './MagicalTypingEffect';
import { countWords } from '../../utils/writingStats';

type Mood = 'joy' | 'sorrow' | 'calm' | 'unrest';

interface EnhancedDiaryEditorProps {
  entryTitle: string;
  entryText: string;
  selectedMood: Mood;
  isLocked: boolean;
  isSaving: boolean;
  showSuccessPreview: boolean;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onMoodChange: (mood: Mood) => void;
  onLockToggle: (locked: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EnhancedDiaryEditor: React.FC<EnhancedDiaryEditorProps> = ({
  entryTitle,
  entryText,
  selectedMood,
  isLocked,
  isSaving,
  showSuccessPreview,
  onTitleChange,
  onContentChange,
  onMoodChange,
  onLockToggle,
  onSave,
  onCancel,
}) => {
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [textColor, setTextColor] = useState('#ffb6d9');
  const [fontSize, setFontSize] = useState('base');
  const [fontFamily, setFontFamily] = useState('serif');
  const [lineHeight, setLineHeight] = useState('relaxed');
  const [letterSpacing, setLetterSpacing] = useState('normal');
  const [textAlign, setTextAlign] = useState('left');
  const [backgroundPattern, setBackgroundPattern] = useState('none');
  const [textOpacity, setTextOpacity] = useState(100);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Detect typing for magical effects
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  // Stats
  const stats = useMemo(() => {
    const words = countWords(entryText);
    const chars = entryText.length;
    const paragraphs = entryText.split(/\n\n+/).filter(p => p.trim()).length;
    const sentences = entryText.split(/[.!?]+/).filter(s => s.trim()).length;
    const readingTime = Math.ceil(words / 200);
    
    return { words, chars, paragraphs, sentences, readingTime };
  }, [entryText]);

  // Active formatting states
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());

  // Formatting with persistent state
  const applyFormatting = useCallback((format: string, prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = entryText.substring(start, end);
    
    if (selectedText) {
      // Apply to selection
      const newContent = 
        entryText.substring(0, start) + 
        prefix + selectedText + suffix + 
        entryText.substring(end);
      onContentChange(newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + prefix.length, end + prefix.length);
      }, 0);
    } else {
      // Toggle format mode for future typing
      setActiveFormats(prev => {
        const next = new Set(prev);
        if (next.has(format)) {
          next.delete(format);
        } else {
          next.add(format);
        }
        return next;
      });
    }
  }, [entryText, onContentChange]);

  // Handle content changes with active formatting and typing detection
  const handleContentChange = useCallback((newContent: string) => {
    // Trigger typing effect
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 500);

    if (activeFormats.size > 0 && newContent.length > entryText.length) {
      // User is typing with active formats
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const cursorPos = textarea.selectionStart;
      const addedText = newContent.substring(entryText.length);
      
      // Wrap new text with active formats
      let wrappedText = addedText;
      if (activeFormats.has('bold')) wrappedText = `**${wrappedText}**`;
      if (activeFormats.has('italic')) wrappedText = `*${wrappedText}*`;
      if (activeFormats.has('strikethrough')) wrappedText = `~~${wrappedText}~~`;
      
      const finalContent = entryText + wrappedText;
      onContentChange(finalContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPos, cursorPos);
      }, 0);
    } else {
      onContentChange(newContent);
    }
  }, [entryText, onContentChange, activeFormats]);

  const fontSizeClasses = {
    sm: 'text-base',
    base: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const fontFamilyClasses = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono',
  };

  const lineHeightValues = {
    tight: '1.5',
    normal: '1.7',
    relaxed: '1.9',
    loose: '2.2',
  };

  const letterSpacingValues = {
    tight: '-0.02em',
    normal: '0.01em',
    wide: '0.05em',
    wider: '0.1em',
  };

  return (
    <>
      {/* Magical typing particles */}
      <MagicalTypingEffect isTyping={isTyping} color={textColor} />

      <FocusMode
        isActive={focusModeActive}
        content={entryText}
        onContentChange={onContentChange}
        onExit={() => setFocusModeActive(false)}
      />

      {!focusModeActive && (
        <section className="relative min-h-screen bg-black text-zinc-100" style={{ cursor: 'auto' }}>
          {/* Haunted vignette effect */}
          <div 
            className="fixed inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Subtle pink glow */}
          <div 
            className="fixed inset-0 pointer-events-none z-10 opacity-20"
            style={{
              background: 'radial-gradient(circle at 50% 0%, rgba(255, 182, 217, 0.1) 0%, transparent 50%)'
            }}
          />
          
          <div className="relative flex h-screen z-20">
            {/* Sidebar */}
            <AnimatePresence>
              {showSidebar && (
                <motion.aside
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="w-80 border-r border-pink-900/20 bg-zinc-950/80 backdrop-blur-sm overflow-y-auto"
                  style={{ 
                    backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255, 182, 217, 0.03) 0%, transparent 50%)',
                    cursor: 'auto'
                  }}
                >
                  <div className="p-6 space-y-6">
                    {/* Cute header decoration */}
                    <motion.div 
                      className="flex items-center justify-center gap-2 pb-4 border-b border-pink-900/20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <motion.span 
                        className="text-pink-400/60"
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ✦
                      </motion.span>
                      <span className="text-xs uppercase tracking-widest text-pink-300/70 font-serif">
                        Writing Tools
                      </span>
                      <motion.span 
                        className="text-pink-400/60"
                        animate={{ rotate: [0, -10, 0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        ✦
                      </motion.span>
                    </motion.div>

                    {/* Stats */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center gap-2">
                        <span>Entry Stats</span>
                        <motion.span 
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-pink-400/60"
                        >
                          ✧
                        </motion.span>
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <StatCard label="Words" value={stats.words.toLocaleString()} />
                        <StatCard label="Characters" value={stats.chars.toLocaleString()} />
                        <StatCard label="Paragraphs" value={stats.paragraphs} />
                        <StatCard label="Sentences" value={stats.sentences} />
                      </div>
                    </div>

                    {/* Writing Goals */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Daily Goal
                      </h3>
                      <WritingGoals currentWordCount={stats.words} />
                    </div>

                    {/* Text Color - Haunted Palette with Wow Factor */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center justify-between">
                        <span>Ink Color</span>
                        <motion.span 
                          className="text-[10px] font-mono"
                          style={{ color: textColor }}
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ✦
                        </motion.span>
                      </h3>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[
                          { color: '#ffb6d9', name: 'Blood Rose' },
                          { color: '#ff8fc7', name: 'Pink Mist' },
                          { color: '#c084fc', name: 'Phantom' },
                          { color: '#a78bfa', name: 'Twilight' },
                          { color: '#94a3b8', name: 'Moonlight' },
                          { color: '#cbd5e1', name: 'Fog' },
                          { color: '#fbbf24', name: 'Candlelight' },
                          { color: '#fb923c', name: 'Ember' },
                          { color: '#f87171', name: 'Crimson' },
                          { color: '#dc2626', name: 'Blood' },
                          { color: '#86efac', name: 'Spectral' },
                          { color: '#4ade80', name: 'Poison' },
                          { color: '#60a5fa', name: 'Ice' },
                          { color: '#3b82f6', name: 'Midnight' },
                          { color: '#e5e7eb', name: 'Ghost' },
                          { color: '#d4d4d8', name: 'Ash' },
                          { color: '#a1a1aa', name: 'Smoke' },
                          { color: '#71717a', name: 'Shadow' },
                        ].map(({ color, name }) => (
                          <motion.button
                            key={color}
                            onClick={() => setTextColor(color)}
                            title={name}
                            whileHover={{ 
                              scale: 1.2, 
                              rotate: [0, -5, 5, -5, 0],
                              transition: { rotate: { duration: 0.5 } }
                            }}
                            whileTap={{ scale: 0.9 }}
                            className={`relative w-full aspect-square rounded-full border-2 transition-all cursor-pointer overflow-hidden
                              ${textColor === color 
                                ? 'border-pink-400/80 scale-110 shadow-lg shadow-pink-500/30 ring-2 ring-pink-400/40' 
                                : 'border-zinc-800/60 hover:border-pink-700/50'}`}
                            style={{ backgroundColor: color }}
                          >
                            {textColor === color && (
                              <>
                                <motion.div
                                  className="absolute inset-0"
                                  style={{ 
                                    background: `radial-gradient(circle at center, ${color}50 0%, transparent 70%)`,
                                  }}
                                  animate={{ 
                                    scale: [1, 1.3, 1],
                                    opacity: [0.4, 0.7, 0.4],
                                    rotate: [0, 180, 360]
                                  }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                                <motion.div
                                  className="absolute inset-0 flex items-center justify-center text-white text-sm drop-shadow-lg"
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                  ♥
                                </motion.div>
                              </>
                            )}
                          </motion.button>
                        ))}
                      </div>
                      
                      {/* Custom Color Input with Jiggle */}
                      <motion.div 
                        className="pt-2 border-t border-zinc-900/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <span className="text-xs text-zinc-600 font-serif group-hover:text-pink-400/60 transition-colors">Custom:</span>
                          <motion.div
                            whileHover={{ 
                              rotate: [0, -5, 5, -5, 5, 0],
                              scale: 1.15
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <input
                              type="color"
                              value={textColor}
                              onChange={(e) => setTextColor(e.target.value)}
                              className="w-8 h-8 rounded-full border-2 border-zinc-800/50 cursor-pointer bg-transparent"
                            />
                          </motion.div>
                          <span className="text-xs text-zinc-700 font-mono group-hover:text-pink-400/40 transition-colors">{textColor}</span>
                        </label>
                      </motion.div>
                    </div>

                    {/* Font Size with Visual Feedback */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Text Size
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {(['sm', 'base', 'lg', 'xl'] as const).map((size, index) => (
                          <motion.button
                            key={size}
                            onClick={() => setFontSize(size)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-3 py-2 rounded-lg font-serif transition-all cursor-pointer overflow-hidden
                              ${fontSize === size
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }`}
                            style={{ fontSize: `${10 + index * 2}px` }}
                          >
                            {fontSize === size && (
                              <motion.div
                                layoutId="sizeIndicator"
                                className="absolute inset-0 bg-pink-900/10"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">
                              {size === 'sm' && 'S'}
                              {size === 'base' && 'M'}
                              {size === 'lg' && 'L'}
                              {size === 'xl' && 'XL'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Font Family with Preview */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Writing Style
                      </h3>
                      <div className="space-y-2">
                        {(['serif', 'sans', 'mono'] as const).map((font) => (
                          <motion.button
                            key={font}
                            onClick={() => setFontFamily(font)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative w-full px-3 py-2 rounded-lg text-sm transition-all text-left cursor-pointer overflow-hidden
                              ${fontFamily === font
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }
                              ${font === 'serif' ? 'font-serif' : font === 'sans' ? 'font-sans' : 'font-mono'}`}
                          >
                            {fontFamily === font && (
                              <motion.div
                                layoutId="fontIndicator"
                                className="absolute inset-0 bg-pink-900/10"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center justify-between">
                              <span>
                                {font === 'serif' && 'Grimoire'}
                                {font === 'sans' && 'Modern'}
                                {font === 'mono' && 'Typewriter'}
                              </span>
                              {fontFamily === font && (
                                <motion.span
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="text-pink-400"
                                >
                                  ✦
                                </motion.span>
                              )}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Line Height */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center gap-2">
                        <span>Line Spacing</span>
                        <motion.span 
                          animate={{ y: [-1, 1, -1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-pink-400/60"
                        >
                          ⋮
                        </motion.span>
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {(['tight', 'normal', 'relaxed', 'loose'] as const).map((height) => (
                          <motion.button
                            key={height}
                            onClick={() => setLineHeight(height)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-2 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer
                              ${lineHeight === height
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }`}
                          >
                            {lineHeight === height && (
                              <motion.div
                                layoutId="lineHeightIndicator"
                                className="absolute inset-0 bg-pink-900/10 rounded-lg"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 capitalize">{height}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Letter Spacing */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center gap-2">
                        <span>Letter Spacing</span>
                        <motion.span 
                          animate={{ scaleX: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-pink-400/60"
                        >
                          ⟷
                        </motion.span>
                      </h3>
                      <div className="grid grid-cols-4 gap-2">
                        {(['tight', 'normal', 'wide', 'wider'] as const).map((spacing) => (
                          <motion.button
                            key={spacing}
                            onClick={() => setLetterSpacing(spacing)}
                            whileHover={{ scale: 1.05, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-2 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer
                              ${letterSpacing === spacing
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }`}
                            style={{ letterSpacing: letterSpacingValues[spacing] }}
                          >
                            {letterSpacing === spacing && (
                              <motion.div
                                layoutId="letterSpacingIndicator"
                                className="absolute inset-0 bg-pink-900/10 rounded-lg"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 capitalize">{spacing}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Text Alignment
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['left', 'center', 'right'] as const).map((align) => (
                          <motion.button
                            key={align}
                            onClick={() => setTextAlign(align)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-3 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer
                              ${textAlign === align
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }`}
                          >
                            {textAlign === align && (
                              <motion.div
                                layoutId="alignIndicator"
                                className="absolute inset-0 bg-pink-900/10 rounded-lg"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 flex items-center justify-center">
                              {align === 'left' && '⊣'}
                              {align === 'center' && '⊢⊣'}
                              {align === 'right' && '⊢'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Mood & Privacy */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Mood & Privacy
                      </h3>
                      <MoodSelector
                        selectedMood={selectedMood}
                        onMoodChange={onMoodChange}
                        isLocked={isLocked}
                        onLockToggle={onLockToggle}
                      />
                    </div>

                    {/* Background Pattern */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center gap-2">
                        <span>Background</span>
                        <motion.span 
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-pink-400/60"
                        >
                          ✧
                        </motion.span>
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {(['none', 'stars', 'hearts'] as const).map((pattern) => (
                          <motion.button
                            key={pattern}
                            onClick={() => setBackgroundPattern(pattern)}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-2 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer
                              ${backgroundPattern === pattern
                                ? 'bg-pink-900/20 text-pink-300/90 border border-pink-800/40 shadow-lg shadow-pink-500/10'
                                : 'bg-zinc-900/40 text-zinc-500 border border-zinc-800/40 hover:border-pink-900/30 hover:text-pink-400/60'
                              }`}
                          >
                            {backgroundPattern === pattern && (
                              <motion.div
                                layoutId="patternIndicator"
                                className="absolute inset-0 bg-pink-900/10 rounded-lg"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10 capitalize">
                              {pattern === 'none' && 'Plain'}
                              {pattern === 'stars' && '✦'}
                              {pattern === 'hearts' && '♥'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Text Opacity */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif">
                        Ink Opacity
                      </h3>
                      <div className="px-3 py-2 bg-zinc-900/40 border border-pink-900/20 rounded-lg">
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={textOpacity}
                          onChange={(e) => setTextOpacity(Number(e.target.value))}
                          className="w-full accent-pink-500 cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-zinc-600 mt-1">
                          <span>Faded</span>
                          <span className="text-pink-400/70">{textOpacity}%</span>
                          <span>Bold</span>
                        </div>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="space-y-3">
                      <h3 className="text-xs uppercase tracking-wider text-pink-300/60 font-serif flex items-center gap-2">
                        <span>Journaling Tips</span>
                        <motion.span 
                          animate={{ y: [-2, 2, -2] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-pink-400/60"
                        >
                          ♡
                        </motion.span>
                      </h3>
                      <div className="space-y-2 text-xs text-zinc-600 font-serif">
                        <Tip text="Write without judgment - this is your safe space" />
                        <Tip text="Describe your feelings with specific details" />
                        <Tip text="Reflect on what you learned today" />
                        <Tip text="Express gratitude for small moments" />
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Main Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Cute Haunted Header */}
              <motion.header 
                className="border-b border-pink-900/20 bg-black/90 backdrop-blur-sm relative" 
                style={{ cursor: 'auto' }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                {/* Soft pink glow instead of moving shimmer */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at top, rgba(255, 182, 217, 0.08) 0%, transparent 60%)'
                  }}
                />
                
                <div className="px-8 py-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={onCancel}
                      whileHover={{ x: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-pink-300 transition-colors group"
                    >
                      <span>←</span>
                      <span className="font-serif">Dollhouse</span>
                    </motion.button>
                    <div className="h-4 w-px bg-pink-900/30" />
                    <motion.button
                      onClick={() => setShowSidebar(!showSidebar)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs text-zinc-600 hover:text-pink-400 transition-colors font-serif"
                    >
                      {showSidebar ? '✕ Hide' : '☰ Show'} Tools
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={() => setFocusModeActive(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-xs font-serif text-zinc-500 hover:text-pink-300 transition-colors flex items-center gap-2"
                    >
                      <span>◉</span>
                      <span>Focus Mode</span>
                    </motion.button>
                    <div className="h-4 w-px bg-pink-900/30" />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onCancel}
                      className="px-4 py-2 text-sm font-serif text-zinc-400 hover:text-pink-300 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 182, 217, 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onSave}
                      disabled={!entryText.trim() || isSaving}
                      className="relative px-6 py-2 rounded-lg text-sm font-serif
                               bg-pink-900/40 text-pink-200 border border-pink-800/50
                               hover:bg-pink-900/60 transition-all
                               disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center gap-2">
                        {isSaving ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              ⟳
                            </motion.span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <span>✦</span>
                            Save Entry
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.header>

              {/* Writing Area */}
              <div className="flex-1 overflow-y-auto bg-gradient-to-b from-black via-zinc-950 to-black" style={{ cursor: 'auto' }}>
                <div className="mx-auto max-w-4xl px-12 py-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Enhanced Title with Magical Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative"
                    >
                      {/* Magical underline that appears on focus */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ 
                          background: `linear-gradient(90deg, transparent, ${textColor}60, transparent)`,
                        }}
                        initial={{ scaleX: 0 }}
                        whileFocus={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      <input
                        type="text"
                        value={entryTitle}
                        onChange={(e) => onTitleChange(e.target.value)}
                        placeholder="Dear Diary..."
                        className="w-full px-0 py-3 bg-transparent border-none
                                 text-4xl md:text-5xl font-serif placeholder-zinc-800
                                 focus:outline-none focus:ring-0 transition-all duration-300"
                        style={{ 
                          color: textColor,
                          textShadow: `0 0 30px ${textColor}30, 0 0 60px ${textColor}15`,
                        }}
                        autoFocus
                      />
                      
                      {/* Typing indicator particles */}
                      {entryTitle && (
                        <motion.div
                          className="absolute -right-8 top-1/2 -translate-y-1/2"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <span style={{ color: textColor }}>✦</span>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Enhanced Formatting Toolbar with Wow Factor */}
                    <motion.div 
                      className="flex items-center gap-1 pb-3 border-b border-pink-900/20 relative"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Magical glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <EnhancedToolbarButton 
                        onClick={() => applyFormatting('bold', '**')} 
                        title="Bold (Ctrl+B)"
                        isActive={activeFormats.has('bold')}
                      >
                        <span className="font-bold">B</span>
                      </EnhancedToolbarButton>
                      <EnhancedToolbarButton 
                        onClick={() => applyFormatting('italic', '*')} 
                        title="Italic (Ctrl+I)"
                        isActive={activeFormats.has('italic')}
                      >
                        <span className="italic">I</span>
                      </EnhancedToolbarButton>
                      <EnhancedToolbarButton 
                        onClick={() => applyFormatting('strikethrough', '~~')} 
                        title="Strikethrough"
                        isActive={activeFormats.has('strikethrough')}
                      >
                        <span className="line-through">S</span>
                      </EnhancedToolbarButton>
                      
                      <div className="w-px h-6 bg-pink-900/30 mx-2" />
                      
                      <EnhancedToolbarButton 
                        onClick={() => {
                          const textarea = textareaRef.current;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const newContent = entryText.substring(0, start) + '\n• ' + entryText.substring(start);
                          onContentChange(newContent);
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 3, start + 3);
                          }, 0);
                        }} 
                        title="Bullet List"
                        isActive={false}
                      >
                        <span>•</span>
                      </EnhancedToolbarButton>
                      
                      <EnhancedToolbarButton 
                        onClick={() => {
                          const textarea = textareaRef.current;
                          if (!textarea) return;
                          const start = textarea.selectionStart;
                          const newContent = entryText.substring(0, start) + '\n> ' + entryText.substring(start);
                          onContentChange(newContent);
                          setTimeout(() => {
                            textarea.focus();
                            textarea.setSelectionRange(start + 3, start + 3);
                          }, 0);
                        }} 
                        title="Quote"
                        isActive={false}
                      >
                        <span>"</span>
                      </EnhancedToolbarButton>
                      
                      <div className="flex-1" />
                      
                      {/* Active format indicators */}
                      {activeFormats.size > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center gap-1 px-2 py-1 rounded-md bg-pink-900/20 border border-pink-800/30"
                        >
                          <span className="text-xs text-pink-300/70 font-serif">Active:</span>
                          {Array.from(activeFormats).map(format => (
                            <span key={format} className="text-xs text-pink-300 font-mono">
                              {format === 'bold' && 'B'}
                              {format === 'italic' && 'I'}
                              {format === 'strikethrough' && 'S'}
                            </span>
                          ))}
                        </motion.div>
                      )}
                      
                      <motion.span 
                        className="text-xs text-zinc-700 font-mono"
                        key={stats.words}
                        initial={{ scale: 1.2, color: '#ffb6d9' }}
                        animate={{ scale: 1, color: '#52525b' }}
                        transition={{ duration: 0.3 }}
                      >
                        {stats.words} words
                      </motion.span>
                    </motion.div>

                    {/* Content Editor with Magical Effects */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative"
                    >
                      {/* Cute background pattern */}
                      {backgroundPattern !== 'none' && (
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-5"
                          style={{
                            backgroundImage: backgroundPattern === 'stars' 
                              ? `radial-gradient(circle, ${textColor} 1px, transparent 1px)`
                              : `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='5' y='15' fill='${encodeURIComponent(textColor)}' font-size='12'%3E♥%3C/text%3E%3C/svg%3E")`,
                            backgroundSize: backgroundPattern === 'stars' ? '50px 50px' : '40px 40px',
                          }}
                        />
                      )}
                      
                      {/* Subtle ink glow effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none opacity-20 blur-3xl"
                        style={{
                          background: `radial-gradient(circle at 50% 20%, ${textColor}15 0%, transparent 70%)`,
                        }}
                      />
                      
                      <textarea
                        ref={textareaRef}
                        value={entryText}
                        onChange={(e) => handleContentChange(e.target.value)}
                        onKeyDown={(e) => {
                          // Keyboard shortcuts
                          if (e.ctrlKey || e.metaKey) {
                            if (e.key === 'b') {
                              e.preventDefault();
                              applyFormatting('bold', '**');
                            } else if (e.key === 'i') {
                              e.preventDefault();
                              applyFormatting('italic', '*');
                            }
                          }
                        }}
                        placeholder="Today I felt... The memories flood back as I write..."
                        className={`relative w-full min-h-[700px] px-0 py-4 bg-transparent border-none
                                 leading-relaxed placeholder-zinc-800
                                 focus:outline-none focus:ring-0 resize-none
                                 transition-all duration-300
                                 ${fontSizeClasses[fontSize as keyof typeof fontSizeClasses]}
                                 ${fontFamilyClasses[fontFamily as keyof typeof fontFamilyClasses]}`}
                        style={{
                          color: textColor,
                          opacity: textOpacity / 100,
                          lineHeight: lineHeightValues[lineHeight as keyof typeof lineHeightValues],
                          letterSpacing: letterSpacingValues[letterSpacing as keyof typeof letterSpacingValues],
                          textAlign: textAlign as 'left' | 'center' | 'right',
                          textShadow: `0 0 20px ${textColor}20, 0 0 40px ${textColor}10`,
                        }}
                      />
                    </motion.div>

                    <div className="h-64" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SaveSuccessToast show={showSuccessPreview} />
    </>
  );
};

// Helper Components
const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <motion.div 
    className="px-3 py-2 rounded-lg bg-zinc-900/40 border border-pink-900/20 backdrop-blur-sm relative overflow-hidden group"
    whileHover={{ scale: 1.02, y: -2 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  >
    {/* Cute sparkle on hover */}
    <motion.div
      className="absolute top-1 right-1 text-pink-400/0 group-hover:text-pink-400/60 transition-colors text-xs"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      ✦
    </motion.div>
    <div className="text-xs text-pink-300/50 font-serif mb-1">{label}</div>
    <motion.div 
      className="text-lg font-mono text-pink-300/80"
      key={value}
      initial={{ scale: 1.2, color: '#ffb6d9' }}
      animate={{ scale: 1, color: '#f9a8d4' }}
      transition={{ duration: 0.3 }}
    >
      {value}
    </motion.div>
  </motion.div>
);

const Tip: React.FC<{ text: string }> = ({ text }) => (
  <motion.div 
    className="flex items-start gap-2 group"
    whileHover={{ x: 4 }}
    transition={{ type: "spring", stiffness: 400, damping: 20 }}
  >
    <motion.span 
      className="text-pink-700 mt-0.5"
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
    >
      ♥
    </motion.span>
    <span className="group-hover:text-pink-400/70 transition-colors">{text}</span>
  </motion.div>
);

const EnhancedToolbarButton: React.FC<{
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
}> = ({ onClick, title, children, isActive }) => (
  <motion.button
    type="button"
    onClick={onClick}
    title={title}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`relative px-3 py-1.5 text-sm rounded transition-all cursor-pointer
      ${isActive 
        ? 'text-pink-300 bg-pink-900/30 border border-pink-800/50 shadow-lg shadow-pink-500/20' 
        : 'text-zinc-500 hover:text-pink-300/80 hover:bg-pink-900/10'
      }`}
  >
    {isActive && (
      <motion.div
        layoutId="activeFormat"
        className="absolute inset-0 bg-pink-900/20 rounded"
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
    <span className="relative z-10">{children}</span>
    {isActive && (
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      />
    )}
  </motion.button>
);
