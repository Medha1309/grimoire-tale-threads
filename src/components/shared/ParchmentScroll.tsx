import React from 'react';
import { motion } from 'framer-motion';

interface ParchmentScrollProps {
  children: React.ReactNode;
  className?: string;
}

export const ParchmentScroll: React.FC<ParchmentScrollProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`parchment-scroll ${className}`}
    >
      {/* Wax seal at top */}
      <div className="parchment-seal">
        <div className="seal-wax" />
      </div>

      {/* Scroll content */}
      <div className="parchment-content">
        {children}
      </div>

      {/* Torn bottom edge */}
      <div className="parchment-tear" />
    </motion.div>
  );
};
