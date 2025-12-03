import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SaveSuccessToastProps {
  show: boolean;
}

export const SaveSuccessToast: React.FC<SaveSuccessToastProps> = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-zinc-900/95 border border-[#ffb6d9]/40 rounded-lg p-8 max-w-md mx-4 shadow-2xl"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#ffb6d9]/10 border-2 border-[#ffb6d9]/40 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#ffb6d9]" fill="none">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </svg>
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-serif text-[#ffb6d9] mb-2"
              >
                Entry Saved
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-zinc-400 font-serif"
              >
                Taking you to your diary...
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
