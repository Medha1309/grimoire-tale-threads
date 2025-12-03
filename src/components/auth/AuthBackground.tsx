import React from "react";
import { motion } from "framer-motion";

interface AuthBackgroundProps {
  cursorPos: { x: number; y: number };
  delayedCursor: { x: number; y: number };
  isSuccess?: boolean;
  spectralWords?: string[];
}

export const AuthBackground: React.FC<AuthBackgroundProps> = ({
  cursorPos,
  delayedCursor,
  isSuccess = false,
}) => {
  return (
    <>
      {/* Deep horror black gradient */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
        }}
      />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.5' /%3E%3C/svg%3E")`,
        }} 
      />
      
      {/* Neon accent glows - scattered with crimson */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-[70%] right-[20%] w-80 h-80 rounded-full bg-pink-500/10 blur-[120px]" />
        <div className="absolute bottom-[30%] left-[60%] w-56 h-56 rounded-full bg-cyan-400/10 blur-[90px]" />
        <div className="absolute top-[50%] right-[10%] w-72 h-72 rounded-full bg-red-600/8 blur-[110px]" />
      </div>
      
      {/* Vignette */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />
      
      {/* Floating particles with neon colors + crimson */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 24 }).map((_, i) => {
          const colors = ['#a855f7', '#ec4899', '#06b6d4', '#8b5cf6', '#dc2626', '#b91c1c'];
          const color = colors[i % colors.length];
          return (
            <motion.div 
              key={i} 
              className="absolute w-1 h-1 rounded-full" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }} 
              animate={{ 
                y: [0, -400], 
                x: [0, Math.random() * 40 - 20],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0]
              }} 
              transition={{ 
                duration: 20 + Math.random() * 15, 
                repeat: Infinity, 
                ease: 'linear', 
                delay: Math.random() * 10 
              }} 
            />
          );
        })}
      </div>

      {/* Main cursor - bright neon glow with crimson edge */}
      <motion.div 
        className="fixed pointer-events-none z-50" 
        style={{ 
          left: cursorPos.x, 
          top: cursorPos.y, 
          width: 400, 
          height: 400, 
          transform: 'translate(-50%, -50%)', 
        }} 
      >
        <div style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(236, 72, 153, 0.12) 30%, rgba(220, 38, 38, 0.08) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
      </motion.div>

      {/* Floating follower - slowly drifts toward main cursor */}
      <motion.div 
        className="fixed pointer-events-none z-50"
        animate={{ 
          left: delayedCursor.x, 
          top: delayedCursor.y,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50,
          mass: 1.5
        }}
        style={{ 
          width: 250, 
          height: 250, 
          transform: 'translate(-50%, -50%)', 
        }} 
      >
        <motion.div 
          style={{
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(139, 92, 246, 0.12) 50%, transparent 70%)',
            filter: 'blur(35px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Decorative corner flourishes */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <svg className="absolute top-8 left-8 w-16 h-16" viewBox="0 0 100 100">
          <path d="M 10 10 Q 10 50 50 50 Q 10 50 10 90" stroke="#d4c4a8" strokeWidth="1" fill="none" />
          <path d="M 10 10 Q 50 10 50 50 Q 50 10 90 10" stroke="#d4c4a8" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute top-8 right-8 w-16 h-16" viewBox="0 0 100 100">
          <path d="M 90 10 Q 90 50 50 50 Q 90 50 90 90" stroke="#d4c4a8" strokeWidth="1" fill="none" />
          <path d="M 90 10 Q 50 10 50 50 Q 50 10 10 10" stroke="#d4c4a8" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-8 left-8 w-16 h-16" viewBox="0 0 100 100">
          <path d="M 10 90 Q 10 50 50 50 Q 10 50 10 10" stroke="#d4c4a8" strokeWidth="1" fill="none" />
          <path d="M 10 90 Q 50 90 50 50 Q 50 90 90 90" stroke="#d4c4a8" strokeWidth="1" fill="none" />
        </svg>
        <svg className="absolute bottom-8 right-8 w-16 h-16" viewBox="0 0 100 100">
          <path d="M 90 90 Q 90 50 50 50 Q 90 50 90 10" stroke="#d4c4a8" strokeWidth="1" fill="none" />
          <path d="M 90 90 Q 50 90 50 50 Q 50 90 10 90" stroke="#d4c4a8" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Success glow - warm golden */}
      {isSuccess && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 2 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 196, 168, 0.15) 0%, transparent 60%)',
          }}
        />
      )}
    </>
  );
};
