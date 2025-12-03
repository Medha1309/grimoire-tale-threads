import React, { useEffect, useState, useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";

// Optimized blood splat with minimal re-renders
const BloodSplat = memo<{ x: number; y: number }>(({ x, y }) => {
  const drips = useMemo(() => [
    { x: 0, y: 0, h: 8 },
    { x: 8, y: 0, h: 12 },
    { x: 0, y: 8, h: 8 },
    { x: -8, y: 0, h: 12 }
  ], []);
  
  return (
    <div className="absolute" style={{ left: x, top: y, willChange: 'transform' }}>
      <span 
        className="absolute block w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blood-DEFAULT" 
        style={{ 
          animation: "bloodSplat 1.2s cubic-bezier(.2,.65,.3,1) forwards", 
          boxShadow: "0 0 0 6px rgba(60,0,0,.5), 0 0 30px rgba(80,0,0,.4)" 
        }} 
      />
      {drips.map((d, i) => (
        <span 
          key={i} 
          className="absolute block w-1 rounded-full bg-blood-dark" 
          style={{ 
            left: `${d.x}px`, 
            top: `${d.y + 6}px`,
            height: `${d.h}px`,
            animation: `bloodDrip 1.2s ease-out ${i * 0.1}s forwards`, 
            transformOrigin: "top",
            opacity: 0.8
          }} 
        />
      ))}
    </div>
  );
});

BloodSplat.displayName = 'BloodSplat';

// Highly optimized Blood cursor with RAF throttling
export const BloodCursor: React.FC = () => {
  const [splats, setSplats] = useState<{ id: number; x: number; y: number }[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  const MAX_SPLATS = 3;
  
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateRef.current < 16) return; // 60fps throttle
      
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setCursorPos({ x: e.clientX, y: e.clientY });
        lastUpdateRef.current = now;
      });
    };
    
    const onClick = (e: MouseEvent) => {
      setSplats((s) => {
        const newSplats = [...s, { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY }];
        return newSplats.slice(-MAX_SPLATS);
      });
    };
    
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("click", onClick);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);
  
  useEffect(() => {
    if (splats.length === 0) return;
    const timer = setTimeout(() => setSplats((s) => s.slice(1)), 1200);
    return () => clearTimeout(timer);
  }, [splats.length]);
  
  const cursorSVG = useMemo(() => (
    <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow-[0_0_8px_rgba(0,0,0,0.6)]">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#d4a88c" />
          <stop offset="50%" stopColor="#c89b7e" />
          <stop offset="100%" stopColor="#b88968" />
        </linearGradient>
        <linearGradient id="bloodGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B0000" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5a0000" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <ellipse cx="20" cy="14" rx="4.5" ry="11" fill="url(#skinGrad)" />
      <path d="M16 16 Q20 16.5 24 16" stroke="#a88060" strokeWidth="0.4" opacity="0.5" fill="none" />
      <ellipse cx="20" cy="7" rx="3.5" ry="3" fill="#f5e6d3" opacity="0.95" />
      <ellipse cx="20" cy="7" rx="3" ry="2.5" fill="#ffe8d6" opacity="0.9" />
      <ellipse cx="20" cy="23" rx="2.5" ry="1.8" fill="#4a0000" opacity="0.7" />
      <rect x="18.5" y="23" width="3" height="6" fill="#f0ead0" rx="1.5" />
      <ellipse cx="20" cy="23" rx="2" ry="1.3" fill="#fffef5" />
      <path d="M16 22 Q17 24 18.5 23.5 Q19.5 24 20 23.5 Q20.5 24 21.5 23.5 Q23 24 24 22" 
            fill="url(#bloodGrad)" opacity="0.85" />
      <ellipse cx="20" cy="30" rx="0.8" ry="2.5" fill="#4a0000" opacity="0.7">
        <animate attributeName="ry" values="2.5;3.2;2.5" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <path d="M18.5 10 Q19 13 19 16" stroke="#9b7a5e" strokeWidth="0.3" opacity="0.25" fill="none" />
      <path d="M21.5 11 Q21 14 21 17" stroke="#9b7a5e" strokeWidth="0.3" opacity="0.25" fill="none" />
    </svg>
  ), []);
  
  return (
    <>
      <div 
        className="pointer-events-none fixed z-[70]"
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform'
        }}
      >
        <div 
          className="absolute"
          style={{
            left: '20px',
            top: '6px',
            transform: 'translate(-50%, -50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(220, 220, 240, 0.4) 40%, transparent 70%)',
            boxShadow: '0 0 8px rgba(255, 255, 255, 0.5), 0 0 4px rgba(200, 200, 220, 0.6)',
            animation: 'subtlePulse 2s ease-in-out infinite'
          }}
        />
        {cursorSVG}
      </div>
      
      <div className="pointer-events-none fixed inset-0 z-[60]">
        {splats.map((s) => (
          <BloodSplat key={s.id} x={s.x} y={s.y} />
        ))}
        <style>{`
          * { cursor: none !important; }
          @keyframes bloodSplat { 
            0%{ transform: translate(-50%, -50%) scale(.1); opacity:1 } 
            30%{ transform: translate(-50%, -50%) scale(1.6); opacity:.95 } 
            100%{ transform: translate(-50%, -50%) scale(2.8); opacity:0; filter: blur(4px) } 
          }
          @keyframes bloodDrip {
            0%{ transform: scaleY(0) translateY(0); opacity: 1 }
            50%{ transform: scaleY(2) translateY(8px); opacity: .8 }
            100%{ transform: scaleY(3) translateY(15px); opacity: 0 }
          }
          @keyframes subtlePulse {
            0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.15); }
          }
        `}</style>
      </div>
    </>
  );
};

// Optimized page tear
export const PageTearOverlay: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  useEffect(() => { 
    const t = setTimeout(onDone, 520); 
    return () => clearTimeout(t); 
  }, [onDone]);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.52 }} 
      className="fixed inset-0 z-[70]"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.6))",
        WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 66%)",
        maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 66%)",
      }}
    >
      <div 
        className="absolute inset-0 opacity-60 animate-[tear_520ms_linear_forwards]" 
        style={{ backgroundImage: "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.9) 0 4px, transparent 4px 8px)" }} 
      />
      <style>{`
        @keyframes tear { 
          0% { -webkit-mask-position: 50% 50%; mask-position: 50% 50%; } 
          100% { -webkit-mask-position: -120% 160%; mask-position: -120% 160%; } 
        }
      `}</style>
    </motion.div>
  );
};

// Optimized title bar scare
export const TitleBarScare: React.FC = () => {
  useEffect(() => {
    const QUOTES = [
      "Do you like scary movies?",
      "We all float down here.",
      "Whatever you do, don't fall asleep.",
      "I see dead people.",
      "They're here.",
      "Who will survive, and what will be left of them?",
    ];
    
    const original = document.title || "GRIMOIRE"; 
    let i = 0;
    const onVis = () => { 
      document.title = document.hidden ? QUOTES[i++ % QUOTES.length] : original; 
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);
  return null;
};
