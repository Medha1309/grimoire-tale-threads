/**
 * ReportModal Component
 * Formal report modal styled as parchment with gold border
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetType: 'post' | 'reply';
}

type ReportReason = 'spam' | 'harassment' | 'nsfw' | 'other';

export const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  targetId,
  targetType 
}) => {
  const { currentUser, userProfile } = useAuth();
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reasons: { value: ReportReason; label: string; icon: string }[] = [
    { value: 'spam', label: 'Spam or Misleading', icon: '×' },
    { value: 'harassment', label: 'Harassment or Abuse', icon: '!' },
    { value: 'nsfw', label: 'Inappropriate Content', icon: '⊗' },
    { value: 'other', label: 'Other Concern', icon: '?' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser || !userProfile) {
      setError('Please sign in to report content.');
      return;
    }
    
    if (!selectedReason) return;

    try {
      setSubmitting(true);
      setError(null);
      
      // Submit report to Firebase
      await addDoc(collection(db, 'forum_reports'), {
        targetId,
        targetType,
        reporterId: currentUser.uid,
        reporterName: userProfile.displayName,
        reason: selectedReason,
        details: details.trim() || null,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (err) {
      console.error('Failed to submit report:', err);
      setError('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedReason(null);
    setDetails('');
    setSubmitted(false);
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
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
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                       bg-gradient-to-br from-parchment to-parchment/90
                       border-2 border-candle-gold/40 rounded-lg
                       shadow-[0_0_40px_-10px_rgba(184,155,62,0.6)]
                       p-8 w-full max-w-md"
          >
            {submitted ? (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full 
                                bg-candle-gold/20 border-2 border-candle-gold/40
                                flex items-center justify-center">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-playfair text-xl text-candle-gold mb-2">
                  A steward has taken note
                </h3>
                <p className="text-bone-white/70 font-lora text-sm">
                  Your concern will be reviewed promptly.
                </p>
              </motion.div>
            ) : (
              /* Form State */
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-playfair text-xl text-candle-gold">
                    Summon a Steward
                  </h3>
                  <button
                    onClick={handleClose}
                    disabled={submitting}
                    className="text-bone-white/60 hover:text-bone-white transition-colors
                               disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-crimson/20 border border-crimson/40 rounded-md"
                    >
                      <p className="text-crimson text-sm font-inter">{error}</p>
                    </motion.div>
                  )}

                  {/* Reason Selection */}
                  <div>
                    <label className="block text-bone-white/90 font-inter text-sm mb-3">
                      What concerns you?
                    </label>
                    <div className="space-y-2">
                      {reasons.map(reason => (
                        <button
                          key={reason.value}
                          type="button"
                          onClick={() => setSelectedReason(reason.value)}
                          disabled={submitting}
                          className={`w-full px-4 py-3 rounded-md text-left
                                     font-inter text-sm transition-all
                                     flex items-center gap-3
                                     ${selectedReason === reason.value
                                       ? 'bg-candle-gold/20 border-2 border-candle-gold/50 text-candle-gold'
                                       : 'bg-candle-gold/5 border border-candle-gold/20 text-bone-white/70 hover:bg-candle-gold/10'
                                     } disabled:opacity-50`}
                        >
                          <span className="text-lg">{reason.icon}</span>
                          <span>{reason.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Details */}
                  {selectedReason && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label className="block text-bone-white/90 font-inter text-sm mb-2">
                        Additional details (optional)
                      </label>
                      <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Provide any additional context..."
                        rows={3}
                        className="w-full px-4 py-3 bg-navy-depth border border-candle-gold/30 
                                   rounded-md text-bone-white font-lora text-sm
                                   focus:outline-none focus:border-candle-gold/60 
                                   placeholder:text-bone-white/40 resize-none"
                        disabled={submitting}
                        maxLength={500}
                      />
                      <p className="text-xs text-bone-white/40 mt-1 font-inter">
                        {details.length}/500
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={submitting}
                      className="flex-1 px-6 py-3 border border-candle-gold/30 rounded-md 
                                 text-bone-white/80 font-inter text-sm
                                 hover:bg-navy-depth/50 transition-colors
                                 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedReason || submitting}
                      className="flex-1 px-6 py-3 bg-crimson/30 border border-crimson/50 
                                 rounded-md text-bone-white font-inter text-sm
                                 hover:bg-crimson/40 transition-colors
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Submit Report'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
