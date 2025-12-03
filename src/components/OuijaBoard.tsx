import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const NUMBERS = "1234567890".split("");
const SPECIAL = ["WRITE", "SEND", "CLEAR"];

const BoardBackground: React.FC<{ children: React.ReactNode; isBackground?: boolean }> = ({ children, isBackground = false }) => {
  return (
    <div
      className={`relative isolate w-full mx-auto rounded-2xl overflow-hidden ${
        isBackground 
          ? 'absolute inset-0 opacity-50' 
          : 'max-w-5xl aspect-[16/9] shadow-2xl border border-white/10'
      }`}
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 20%, rgba(255,255,255,0.06), transparent 60%)," +
          "radial-gradient(800px 500px at 80% 80%, rgba(0, 205, 255, 0.08), transparent 60%)," +
          "linear-gradient(135deg, #2a221b 0%, #1b1612 40%, #0e0b09 100%)",
      }}
    >
      {/* Continuously animated fog layers */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-50">
        <motion.div 
          className="absolute -inset-1 bg-[radial-gradient(60%_40%_at_50%_50%,rgba(180,220,255,0.07),transparent)]"
          animate={{
            x: ['-4%', '4%', '-4%'],
            y: ['-2%', '2%', '-2%'],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -inset-1 bg-[radial-gradient(80%_60%_at_60%_40%,rgba(0,200,255,0.06),transparent)]"
          animate={{
            x: ['4%', '-4%', '4%'],
            y: ['2%', '-2%', '2%'],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      {/* Wood grain overlay texture */}
      <div
        className="absolute inset-0 opacity-[0.25] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(0,0,0,0.07) 0px, rgba(0,0,0,0.07) 1px, transparent 1px, transparent 5px)",
        }}
      />
      {children}
    </div>
  );
};

const Key: React.FC<{
  label: string;
  onSelect: (label: string) => void;
  wide?: boolean;
  isActive?: boolean;
  isBackground?: boolean;
}> = ({ label, onSelect, wide, isActive = false, isBackground = false }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  
  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={isBackground ? -1 : 0}
      aria-label={`Key ${label}`}
      onClick={() => !isBackground && onSelect(label)}
      onKeyDown={(e) => {
        if (!isBackground && (e.key === "Enter" || e.key === " ")) onSelect(label);
      }}
      animate={{
        scale: isActive ? 1.1 : 1,
        backgroundColor: isActive ? 'rgba(0, 200, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
      }}
      transition={{ duration: 0.2 }}
      className={
        "relative select-none text-center uppercase tracking-[0.2em] " +
        "rounded-xl border backdrop-blur-sm transition-all " +
        (isActive 
          ? "border-cyan-400/50 shadow-[0_0_32px_rgba(0,200,255,0.6)]" 
          : "border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]") +
        (isBackground ? " pointer-events-none " : " cursor-pointer hover:bg-white/10 ") +
        (wide ? " col-span-2 py-3 " : " py-3 ")
      }
    >
      <motion.span 
        className="text-sm md:text-base font-semibold text-slate-100"
        animate={{
          textShadow: isActive 
            ? '0 0 16px rgba(0, 255, 255, 0.8), 0 0 32px rgba(0, 200, 255, 0.6)' 
            : '0 0 8px rgba(0, 255, 255, 0.35)',
          color: isActive ? '#00ffff' : '#f1f5f9'
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};



interface OuijaBoardProps {
  message?: string;
  onMessageChange?: (message: string) => void;
  onWrite?: () => void;
  onSend?: () => void;
  isBackground?: boolean;
}

const OuijaBoard: React.FC<OuijaBoardProps> = ({ 
  message = "", 
  onMessageChange,
  onWrite,
  onSend,
  isBackground = false 
}) => {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [activeLetters, setActiveLetters] = useState<Set<string>>(new Set());

  // Update active letters based on message
  useEffect(() => {
    const letters = new Set(message.toUpperCase().split('').filter(char => 
      LETTERS.includes(char) || NUMBERS.includes(char)
    ));
    setActiveLetters(letters);
  }, [message]);

  const handleSelect = (label: string) => {
    if (isBackground) return;
    
    if (label === "CLEAR") {
      onMessageChange?.("");
    } else if (label === "WRITE") {
      onWrite?.();
    } else if (label === "SEND") {
      onSend?.();
    } else if (LETTERS.includes(label) || NUMBERS.includes(label)) {
      onMessageChange?.((message + label).toUpperCase());
    }
  };

  return (
    <div className={`w-full ${isBackground ? 'pointer-events-none' : ''}`}>
      {!isBackground && (
        <div className="mx-auto max-w-5xl mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-300">Spirit Board</h2>
          <div className="text-xs md:text-sm text-white/70">Click letters to compose your message</div>
        </div>
      )}
      <BoardBackground isBackground={isBackground}>
        <div
          ref={boardRef}
          className="absolute inset-0 p-6 md:p-10 grid grid-rows-[auto,1fr,auto]"
          tabIndex={isBackground ? -1 : 0}
          aria-label="Interactive spirit board"
        >
          {/* Alphabet arc rows */}
          <div className="flex gap-2 md:gap-3 justify-center">
            {LETTERS.slice(0, 13).map((l) => (
              <div key={l} className="flex-1 min-w-0">
                <Key 
                  label={l} 
                  onSelect={handleSelect} 
                  isActive={activeLetters.has(l)}
                  isBackground={isBackground}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 md:gap-3 justify-center mt-3">
            {LETTERS.slice(13).map((l) => (
              <div key={l} className="flex-1 min-w-0">
                <Key 
                  label={l} 
                  onSelect={handleSelect} 
                  isActive={activeLetters.has(l)}
                  isBackground={isBackground}
                />
              </div>
            ))}
          </div>
          {/* Numbers and action buttons */}
          <div className="self-end flex flex-wrap gap-2 md:gap-3 justify-center mt-6">
            {NUMBERS.map((n) => (
              <div key={n} className="flex-1 min-w-0">
                <Key 
                  label={n} 
                  onSelect={handleSelect} 
                  isActive={activeLetters.has(n)}
                  isBackground={isBackground}
                />
              </div>
            ))}
            {/* Action buttons */}
            {SPECIAL.map((s) => (
              <div key={s} className="flex-[2] min-w-0">
                <Key 
                  label={s} 
                  onSelect={handleSelect} 
                  wide 
                  isBackground={isBackground}
                />
              </div>
            ))}
          </div>
        </div>
      </BoardBackground>
    </div>
  );
};

export default OuijaBoard;
