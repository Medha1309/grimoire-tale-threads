/**
 * CandleLike Component
 * Like button with candle icon and glow animation
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useForumLikes } from '../../hooks/useForumLikes';

interface CandleLikeProps {
  targetId: string;
  targetType: 'post' | 'reply';
  initialLikeCount?: number;
}

export const CandleLike: React.FC<CandleLikeProps> = ({ 
  targetId, 
  targetType,
  initialLikeCount = 0
}) => {
  const { isLiked, likeCount, loading, error, toggleLike, setLikeCount } = useForumLikes(targetId, targetType);

  // Set initial count if provided
  React.useEffect(() => {
    if (initialLikeCount > 0 && likeCount === 0) {
      setLikeCount(initialLikeCount);
    }
  }, [initialLikeCount, likeCount, setLikeCount]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click handlers
    toggleLike();
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        disabled={loading}
        aria-label={isLiked ? 'Unlike' : 'Like'}
        aria-pressed={isLiked}
        className="flex items-center gap-2 group disabled:opacity-50"
      >
        <motion.div
          animate={{ 
            scale: isLiked ? 1.1 : 1,
            color: isLiked ? '#d4af37' : '#a8a29e'
          }}
          transition={{ duration: 0.3 }}
          className="text-base font-serif"
        >
          {isLiked ? '★' : '☆'}
        </motion.div>
        <span 
          className={`text-sm font-inter transition-colors ${
            isLiked ? 'text-candle-gold' : 'text-bone-white/60'
          }`}
        >
          {likeCount}
        </span>
      </motion.button>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs text-crimson mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
