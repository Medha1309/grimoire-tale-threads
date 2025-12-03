import React from 'react';
import { motion } from 'framer-motion';
import { useFollowing } from '../../hooks/useFollowing';
import { useAuth } from '../../contexts/AuthContext';

interface FollowButtonProps {
  userId: string;
  variant?: 'default' | 'compact' | 'ghost';
  className?: string;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ 
  userId, 
  variant = 'default',
  className = '' 
}) => {
  const { currentUser } = useAuth();
  const { isFollowing, actionLoading, toggleFollow } = useFollowing(userId);

  // Don't show button for own profile
  if (!currentUser || currentUser.uid === userId) {
    return null;
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await toggleFollow();
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const baseClasses = "relative overflow-hidden font-serif transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    default: isFollowing
      ? "px-6 py-2.5 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:border-red-900/50 hover:text-red-400 hover:bg-red-950/20"
      : "px-6 py-2.5 rounded-lg bg-gradient-to-r from-red-900 to-red-800 text-sm text-zinc-100 hover:from-red-800 hover:to-red-700 hover:shadow-lg hover:shadow-red-900/30",
    compact: isFollowing
      ? "px-4 py-1.5 rounded-md border border-zinc-700 text-xs text-zinc-400 hover:border-red-900/50 hover:text-red-400"
      : "px-4 py-1.5 rounded-md bg-gradient-to-r from-red-900 to-red-800 text-xs text-zinc-100 hover:from-red-800 hover:to-red-700",
    ghost: isFollowing
      ? "px-3 py-1 text-xs text-zinc-500 hover:text-red-400"
      : "px-3 py-1 text-xs text-red-600 hover:text-red-500"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      disabled={actionLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {actionLoading ? (
        <span className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          {isFollowing ? 'Unfollowing...' : 'Following...'}
        </span>
      ) : (
        <>
          {isFollowing ? (
            <>
              <span className="inline-block mr-1">✓</span>
              Following
            </>
          ) : (
            <>
              <span className="inline-block mr-1">+</span>
              Follow
            </>
          )}
        </>
      )}
    </motion.button>
  );
};
