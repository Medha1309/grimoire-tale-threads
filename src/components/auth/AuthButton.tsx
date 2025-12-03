import React from "react";
import { motion } from "framer-motion";

interface AuthButtonProps {
  type?: "submit" | "button";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "google";
}

export const AuthButton: React.FC<AuthButtonProps> = ({ 
  type = "button", 
  disabled = false, 
  loading = false,
  onClick, 
  children,
  variant = "primary"
}) => {
  if (variant === "google") {
    return (
      <button 
        type={type}
        onClick={onClick} 
        disabled={disabled} 
        className="w-full py-3.5 px-4 bg-black/20 border border-[#f5f1e8]/10 rounded-xl text-[#f5f1e8]/70 font-sans text-sm hover:bg-black/30 hover:border-[#d4e8d4]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        {children}
      </button>
    );
  }

  return (
    <motion.button 
      type={type}
      onClick={onClick}
      disabled={disabled || loading} 
      whileHover={{ scale: 1.02, y: -2 }} 
      whileTap={{ scale: 0.98 }} 
      className="relative w-full py-4 px-6 mt-6 rounded-xl overflow-hidden bg-gradient-to-r from-[#6b5d52] to-[#4a3f35] border border-[#f5f1e8]/10 text-[#f5f1e8] font-sans text-sm font-medium tracking-wide uppercase hover:border-[#d4e8d4]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" 
        animate={{ x: ['-200%', '200%'] }} 
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} 
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
