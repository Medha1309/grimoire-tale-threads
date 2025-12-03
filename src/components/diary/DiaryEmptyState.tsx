import React from 'react';
import { motion } from 'framer-motion';

interface DiaryEmptyStateProps {
  onWrite: () => void;
}

export const DiaryEmptyState: React.FC<DiaryEmptyStateProps> = ({ onWrite }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <p className="text-zinc-400 text-xl font-serif mb-2">your diary awaits</p>
      <p className="text-zinc-600 text-sm font-serif mb-8">write your first entry</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onWrite}
        className="px-6 py-3 border border-[#ffb6d9]/40 rounded-lg 
                 text-[#ffb6d9] font-serif text-sm
                 hover:bg-[#ffb6d9]/10 transition-colors"
      >
        Write Your First Entry
      </motion.button>
    </div>
  );
};
