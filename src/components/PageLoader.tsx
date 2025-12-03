import React from 'react';
import { motion } from 'framer-motion';

/**
 * Loading component shown during page transitions
 */
export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mb-4"
        >
          <div className="w-16 h-16 border-4 border-gothic-candlelight/20 border-t-gothic-candlelight rounded-full animate-spin" />
        </motion.div>
        <p className="text-zinc-500 font-serif text-sm tracking-wider">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};
