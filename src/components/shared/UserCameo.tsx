/**
 * UserCameo Component
 * Displays user avatar in circular frame with silhouette fallback
 */

import React from 'react';
import { motion } from 'framer-motion';

interface UserCameoProps {
  displayName: string;
  photoURL?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const iconSizes = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

export const UserCameo: React.FC<UserCameoProps> = ({ 
  displayName, 
  photoURL, 
  size = 'md',
  onClick 
}) => {
  return (
    <motion.div
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
      className={`relative ${sizeClasses[size]} rounded-full border-2 border-candle-gold 
                  overflow-hidden bg-navy-depth ${onClick ? 'cursor-pointer' : ''}`}
      title={displayName}
    >
      {photoURL ? (
        <img 
          src={photoURL} 
          alt={displayName} 
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className={`text-candle-gold ${iconSizes[size]}`}>
            👤
          </span>
        </div>
      )}
    </motion.div>
  );
};
