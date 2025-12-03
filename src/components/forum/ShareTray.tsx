/**
 * ShareTray Component
 * Elegant share options styled as silver card
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareTrayProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  postTitle: string;
}

export const ShareTray: React.FC<ShareTrayProps> = ({ 
  isOpen, 
  onClose, 
  postId, 
  postTitle 
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/tearoom/${postId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareX = () => {
    const text = `${postTitle} - The Tea Room`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
  };

  const handleShareEmail = () => {
    const subject = `${postTitle} - The Tea Room`;
    const body = `I thought you might enjoy this whisper:\n\n${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Share Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                       bg-gradient-to-br from-parchment to-parchment/90
                       border-2 border-candle-gold/40 rounded-lg
                       shadow-[0_0_40px_-10px_rgba(184,155,62,0.6)]
                       p-6 w-full max-w-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair text-lg text-candle-gold">
                Send to the Gazette
              </h3>
              <button
                onClick={onClose}
                className="text-bone-white/60 hover:text-bone-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Share Options */}
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-3 bg-candle-gold/10 border border-candle-gold/30
                           rounded-md text-bone-white/90 font-inter text-sm
                           hover:bg-candle-gold/20 transition-all
                           flex items-center justify-between group"
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">🔗</span>
                  <span>Copy Link</span>
                </span>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-candle-gold text-xs"
                  >
                    Copied!
                  </motion.span>
                )}
              </button>

              <button
                onClick={handleShareX}
                className="w-full px-4 py-3 bg-candle-gold/10 border border-candle-gold/30
                           rounded-md text-bone-white/90 font-inter text-sm
                           hover:bg-candle-gold/20 transition-all
                           flex items-center gap-3"
              >
                <span className="text-lg">𝕏</span>
                <span>Share on X</span>
              </button>

              <button
                onClick={handleShareEmail}
                className="w-full px-4 py-3 bg-candle-gold/10 border border-candle-gold/30
                           rounded-md text-bone-white/90 font-inter text-sm
                           hover:bg-candle-gold/20 transition-all
                           flex items-center gap-3"
              >
                <span className="text-lg">@</span>
                <span>Email</span>
              </button>
            </div>

            {/* Confirmation Toast */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 bg-candle-gold/20 border border-candle-gold/40 
                             rounded-md text-center"
                >
                  <p className="text-candle-gold text-sm font-inter">
                    Link copied to the Gazette
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
