import React from "react";
import { motion } from "framer-motion";

interface AuthFormContainerProps {
  children: React.ReactNode;
  shake: boolean;
  glitch: boolean;
}

export const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ children, shake, glitch }) => {
  return (
    <motion.div 
      initial={{ scale: 1.08, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 2.5, ease: 'easeOut' }} 
      className="relative z-20 flex items-center justify-center min-h-screen px-6 py-16"
    >
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }} 
        transition={{ duration: 1.8, ease: 'easeOut', x: { duration: 0.5 } }} 
        className="w-full max-w-md"
      >
        <div 
          className={`relative p-12 rounded-2xl backdrop-blur-xl transition-all ${glitch ? 'translate-x-1 blur-[0.5px]' : ''}`} 
          style={{ 
            background: 'linear-gradient(135deg, rgba(26,20,16,0.85) 0%, rgba(26,20,16,0.65) 100%)', 
            border: '1px solid rgba(245,241,232,0.08)', 
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.03)' 
          }}
        >
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
