/**
 * Share Artwork Modal
 * Send artwork via email with gothic aesthetic
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../shared/Button';

interface ShareArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  artworkTitle: string;
  artworkDataUrl: string;
  onShare: (email: string, message: string, allowDownload: boolean) => Promise<void>;
}

export const ShareArtworkModal: React.FC<ShareArtworkModalProps> = ({
  isOpen,
  onClose,
  artworkTitle,
  artworkDataUrl,
  onShare,
}) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [allowDownload, setAllowDownload] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleShare = async () => {
    setError('');
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSharing(true);
    try {
      await onShare(email, message, allowDownload);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setEmail('');
        setMessage('');
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError('Failed to send artwork. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = () => {
    // In a real app, this would generate a shareable link
    const link = `${window.location.origin}/art/shared/${Date.now()}`;
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-zinc-900 border-2 border-[#ffb6d9]/30 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              boxShadow: '0 0 40px rgba(255,182,217,0.3)',
            }}
          >
            {success ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center py-12"
              >
                <h3 className="font-serif text-2xl text-[#ffb6d9] mb-2">
                  Artwork Sent!
                </h3>
                <p className="text-zinc-400 font-serif">
                  Your creation has been delivered
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-[#ffb6d9] mb-6 text-center">
                  Share Your Cursed Creation
                </h3>

                {/* Preview */}
                <div className="mb-6 flex justify-center">
                  <img
                    src={artworkDataUrl}
                    alt={artworkTitle}
                    className="max-w-xs rounded-lg border-2 border-[#ffb6d9]/20"
                    style={{
                      boxShadow: '0 0 20px rgba(255,182,217,0.2)',
                    }}
                  />
                </div>

                <p className="text-center text-zinc-400 font-serif mb-6">
                  "{artworkTitle}"
                </p>

                {/* Email Input */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-serif text-[#ffb6d9]/80 mb-2">
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="victim@example.com"
                      className="w-full px-4 py-3 bg-black/50 border border-[#ffb6d9]/30 rounded-lg
                               text-zinc-100 font-serif placeholder-zinc-600
                               focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                               transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-[#ffb6d9]/80 mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Add a haunting message..."
                      rows={3}
                      className="w-full px-4 py-3 bg-black/50 border border-[#ffb6d9]/30 rounded-lg
                               text-zinc-100 font-serif placeholder-zinc-600
                               focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                               transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allowDownload"
                      checked={allowDownload}
                      onChange={(e) => setAllowDownload(e.target.checked)}
                      className="w-4 h-4 rounded border-[#ffb6d9]/30 bg-black/50
                               text-[#ffb6d9] focus:ring-[#ffb6d9]/20 cursor-pointer"
                    />
                    <label
                      htmlFor="allowDownload"
                      className="text-sm font-serif text-zinc-400 cursor-pointer"
                    >
                      Allow recipient to download
                    </label>
                  </div>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-900/20 border border-red-800/40 rounded-lg
                             text-red-400 text-sm font-serif text-center"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    onClick={onClose}
                    className="flex-1"
                    disabled={isSharing}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCopyLink}
                    className="flex-1"
                    disabled={isSharing}
                  >
                    Copy Link
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleShare}
                    className="flex-1"
                    disabled={isSharing}
                  >
                    {isSharing ? 'Sending...' : 'Send Email'}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
