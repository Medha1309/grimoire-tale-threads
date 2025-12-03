/**
 * DiaryEntryView Component
 * Displays full diary entry with lock/unlock functionality
 */

import React from 'react';
import { motion } from 'framer-motion';
import { DiaryEntry, MOOD_COLORS, MOOD_LABELS } from '../../types/diary';
import { LockSeal } from './LockSeal';
import { BackButton } from '../shared/BackButton';
import { fadeIn } from '../../utils/animations';

interface DiaryEntryViewProps {
  entry: DiaryEntry;
  onBack?: () => void;
  onToggleLock: () => Promise<boolean>;
  onDelete?: () => Promise<void>;
}

export const DiaryEntryView: React.FC<DiaryEntryViewProps> = ({ 
  entry, 
  onBack,
  onToggleLock,
  onDelete
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete();
      // Parent component should handle navigation after delete
    } catch (error) {
      console.error('Failed to delete entry:', error);
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-3xl mx-auto"
    >
      {/* Back Button */}
      {onBack && (
        <BackButton 
          onClick={onBack} 
          label="Back to Dollhouse"
          variant="minimal"
          className="mb-6"
        />
      )}

      {/* Entry Card - Dark Elegant Style */}
      <div className="bg-gradient-to-br from-zinc-900/95 via-[#2a1820]/95 to-zinc-950/95
                      backdrop-blur-xl
                      border-4 border-doll-pink/30 rounded-3xl 
                      shadow-[0_20px_60px_-15px_rgba(255,182,217,0.6)]
                      p-8 md:p-12 relative overflow-hidden">
        
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-3xl opacity-40">🎀</div>
        <div className="absolute top-4 right-4 text-3xl opacity-40">🎀</div>
        <div className="absolute bottom-4 left-4 text-2xl opacity-30">✨</div>
        <div className="absolute bottom-4 right-4 text-2xl opacity-30">✨</div>

        {/* Opening Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-doll-pink to-doll-rose
                          border-4 border-white shadow-lg
                          flex items-center justify-center">
            <span className="text-4xl">💝</span>
          </div>
        </motion.div>

        {/* Mood Ribbon - Decorative */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-1 w-12 bg-doll-pink/30 rounded-full" />
            <div 
              className="h-4 w-24 rounded-full relative overflow-hidden shadow-inner"
              style={{ backgroundColor: MOOD_COLORS[entry.mood] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
            </div>
            <div className="h-1 w-12 bg-doll-pink/30 rounded-full" />
          </div>
          <p className="text-center text-sm text-doll-accent font-serif">
            feeling: {MOOD_LABELS[entry.mood]}
          </p>
        </div>

        {/* Entry Content - Story Format */}
        <div className="relative mb-8">
          {/* Decorative quote marks */}
          <div className="absolute -left-4 -top-2 text-6xl text-doll-pink/20 font-serif">"</div>
          
          <div className="px-6 py-4 bg-black/30 backdrop-blur-sm rounded-2xl border-2 border-doll-pink/20">
            <p className="text-zinc-200 font-serif text-lg leading-relaxed whitespace-pre-wrap
                         first-letter:text-5xl first-letter:font-serif first-letter:text-doll-pink
                         first-letter:float-left first-letter:mr-2 first-letter:mt-1">
              {entry.content || '🔐 this secret is locked away in a music box...'}
            </p>
          </div>
          
          <div className="absolute -right-4 -bottom-2 text-6xl text-doll-pink/20 font-serif">"</div>
        </div>



        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-doll-pink/30 to-transparent" />
          <span className="text-doll-pink/40">🎀</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-doll-pink/30 to-transparent" />
        </div>

        {/* Lock/Unlock Control */}
        <div className="flex flex-col items-center mb-8">
          <LockSeal
            isLocked={entry.isLocked}
            onToggle={onToggleLock}
          />
        </div>

        {/* Metadata */}
        <div className="text-center">
          <p className="text-xs text-zinc-400 font-serif">
            written on {formatDate(entry.createdAt)}
          </p>
          {entry.updatedAt.getTime() !== entry.createdAt.getTime() && (
            <p className="text-xs text-zinc-500 font-serif mt-1">
              last touched {formatDate(entry.updatedAt)}
            </p>
          )}
        </div>

        {/* Delete Button - Only show for non-sample entries */}
        {onDelete && !entry.id.startsWith('sample-') && (
          <div className="mt-8 pt-6 border-t border-doll-pink/20">
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-2 rounded-lg text-sm font-serif
                         bg-red-900/20 text-red-400 border border-red-800/40
                         hover:bg-red-900/30 hover:border-red-700/60 transition-all"
              >
                🔥 Burn This Secret
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-sm text-zinc-400 font-serif">
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                             bg-zinc-800/50 text-zinc-300 border border-zinc-700/50
                             hover:bg-zinc-800/70 transition-all disabled:opacity-50"
                  >
                    Keep It
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                             bg-red-900/40 text-red-300 border border-red-800/60
                             hover:bg-red-900/60 transition-all disabled:opacity-50"
                  >
                    {isDeleting ? 'Burning...' : 'Burn Forever'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
