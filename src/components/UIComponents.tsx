import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// Eerie candle component
export const EerieCandle: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => (
  <div className="relative">
    <div className="h-28 w-7 rounded-sm bg-gradient-to-b from-[#e8d4b8] via-[#d4c4a8] to-[#c4b498] shadow-2xl">
      <div className="absolute left-1 top-8 h-10 w-0.5 rounded-full bg-[#c4b498] opacity-50" />
      <div className="absolute right-1.5 top-14 h-6 w-0.5 rounded-full bg-[#b4a488] opacity-40" />
    </div>
    
    <motion.div
      className="absolute -top-10 left-1/2 -translate-x-1/2"
      animate={{ 
        scale: [intensity, intensity * 1.08, intensity * 0.94, intensity],
        y: [0, -1.5, 0.8, 0],
        x: [0, 1, -0.5, 0]
      }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative h-12 w-9">
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-lg" style={{ opacity: intensity }} />
        <svg viewBox="0 0 100 140" className="relative h-full w-full">
          <defs>
            <radialGradient id="eerieFlame" cx="50%" cy="65%">
              <stop offset="0%" stopColor="#fffacd" />
              <stop offset="40%" stopColor="#ffa500" />
              <stop offset="100%" stopColor="#8b0000" stopOpacity="0.5" />
            </radialGradient>
          </defs>
          <path 
            d="M50 10 Q32 45 36 72 Q39 88 50 96 Q61 88 64 72 Q68 45 50 10 Z" 
            fill="url(#eerieFlame)"
            opacity={intensity}
          />
          <ellipse cx="50" cy="78" rx="7" ry="12" fill="#fffacd" opacity={intensity * 0.8} />
        </svg>
      </div>
    </motion.div>
    
    <div className="absolute -bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-orange-500/15 blur-lg" style={{ opacity: intensity }} />
  </div>
);

// Swinging lamp with flies for Contact page
export const SwingingLamp: React.FC = () => {
  const [lightIntensity, setLightIntensity] = useState(1);
  
  useEffect(() => {
    const flicker = setInterval(() => {
      if (Math.random() > 0.85) {
        setLightIntensity(0.3 + Math.random() * 0.4);
        setTimeout(() => setLightIntensity(0.85 + Math.random() * 0.15), 60 + Math.random() * 100);
      } else {
        setLightIntensity(0.85 + Math.random() * 0.15);
      }
    }, 150 + Math.random() * 200);
    return () => clearInterval(flicker);
  }, []);
  
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
      <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-zinc-800" />
      
      <motion.div
        className="absolute left-1/2 top-2 origin-top"
        animate={{ rotate: [-8, 8, -8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="h-32 w-0.5 bg-zinc-700" style={{ transformOrigin: "top" }} />
        
        <div className="relative -ml-8 mt-0">
          <svg width="64" height="48" viewBox="0 0 64 48" className="drop-shadow-2xl">
            <defs>
              <radialGradient id="lampGlow" cx="50%" cy="80%">
                <stop offset="0%" stopColor="#fffacd" stopOpacity={lightIntensity} />
                <stop offset="50%" stopColor="#ffa500" stopOpacity={lightIntensity * 0.6} />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M12 8 L52 8 L58 32 L6 32 Z" fill="#1a1a1a" stroke="#0a0a0a" strokeWidth="1" />
            <path d="M14 10 L50 10 L56 30 L8 30 Z" fill="#2a2a2a" opacity="0.5" />
            <ellipse cx="32" cy="28" rx="24" ry="16" fill="url(#lampGlow)" />
            <ellipse cx="32" cy="22" rx="6" ry="8" fill="#4a4a4a" opacity={lightIntensity} />
          </svg>
          
          <motion.div
            className="absolute left-1/2 top-8 -translate-x-1/2"
            animate={{
              opacity: [lightIntensity * 0.35, lightIntensity * 0.5, lightIntensity * 0.35]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div 
              className="h-[70vh] w-64 rounded-b-full"
              style={{
                background: `radial-gradient(ellipse at top, rgba(255,250,205,${lightIntensity * 0.35}) 0%, rgba(255,220,150,${lightIntensity * 0.25}) 20%, rgba(255,165,0,${lightIntensity * 0.15}) 40%, transparent 70%)`,
                filter: 'blur(8px)'
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Realistic fly for Contact page
export const RealisticFly: React.FC<{ lampX: number; lampY: number; avoidCenter?: boolean }> = ({ 
  lampX, 
  lampY, 
  avoidCenter = true 
}) => {
  const startX = useMemo(() => Math.random() * 100, []);
  const startY = useMemo(() => Math.random() * 100, []);
  const speed = useMemo(() => 3 + Math.random() * 4, []);
  const size = useMemo(() => 1.5 + Math.random() * 1.5, []);
  const flyId = useMemo(() => Math.random(), []);
  
  const path = useMemo(() => {
    const angle = Math.random() * Math.PI * 2;
    const radius = avoidCenter ? 25 + Math.random() * 20 : 15 + Math.random() * 25;
    return {
      points: Array.from({ length: 8 }).map((_, i) => {
        const a = angle + (i / 8) * Math.PI * 2;
        let x = lampX + Math.cos(a) * radius + (Math.random() - 0.5) * 8;
        let y = lampY + Math.sin(a) * radius * 0.6 + (Math.random() - 0.5) * 8;
        
        if (avoidCenter && y > 35 && y < 75 && x > 25 && x < 75) {
          y = y < 50 ? 30 : 80;
        }
        
        return { x, y };
      })
    };
  }, [lampX, lampY, avoidCenter]);
  
  return (
    <motion.div
      className="pointer-events-none fixed z-[35]"
      initial={{ x: `${startX}vw`, y: `${startY}vh` }}
      animate={{
        x: path.points.map(p => `${p.x}vw`),
        y: path.points.map(p => `${p.y}vh`),
        rotate: [0, 360]
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
        rotate: { duration: speed / 4, repeat: Infinity, ease: "linear" }
      }}
    >
      <svg width={size * 4} height={size * 4} viewBox="0 0 24 24" className="opacity-80 [filter:drop-shadow(0_0_1px_rgba(255,255,255,0.5))]">
        <defs>
          <radialGradient id={`flyBody${flyId}`}>
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
        </defs>
        <ellipse cx="12" cy="12" rx="3" ry="5" fill={`url(#flyBody${flyId})`} />
        <circle cx="12" cy="8" r="2" fill="#2a2a2a" />
        <g opacity="0.5">
          <ellipse cx="10" cy="11" rx="5" ry="2" fill="#fff" transform="rotate(-30 10 11)" />
          <ellipse cx="14" cy="11" rx="5" ry="2" fill="#fff" transform="rotate(30 14 11)" />
        </g>
        <g stroke="#2a2a2a" strokeWidth="0.8" fill="none">
          <path d="M10 14 L8 18" />
          <path d="M12 15 L12 19" />
          <path d="M14 14 L16 18" />
        </g>
      </svg>
    </motion.div>
  );
};

export const FliesAroundLamp: React.FC<{ count?: number }> = React.memo(({ count = 10 }) => {
  const lampX = 50;
  const lampY = 15;
  
  const flies = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({ id: i })),
    [count]
  );
  
  return (
    <>
      {flies.map((fly) => (
        <RealisticFly key={fly.id} lampX={lampX} lampY={lampY} avoidCenter={true} />
      ))}
    </>
  );
});
