/**
 * EnhancedScrapbookDetail Component
 * Detailed view of scrapbook entry with interactive features
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrapbookEntry } from '../../types/scrapbook';
import { ScratchOffSecret } from './ScratchOffSecret';
import { getFilterStyle } from './PhotoFilterSelector';

interface EnhancedScrapbookDetailProps {
  entry: ScrapbookEntry;
  onClose: () => void;
  onUpdateEntry: (entry: ScrapbookEntry) => void;
  onDeleteEntry?: (entryId: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export const EnhancedScrapbookDetail: React.FC<EnhancedScrapbookDetailProps> = ({
  entry,
  onClose,
  onUpdateEntry,
  onDeleteEntry,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}) => {
  const [localEntry, setLocalEntry] = useState(entry);
  const [hauntedTextVisible, setHauntedTextVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Haunted effect - randomly change text
  useEffect(() => {
    if (!localEntry.isHaunted) return;

    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setHauntedTextVisible(true);
        setTimeout(() => setHauntedTextVisible(false), 2000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [localEntry.isHaunted]);

  const handleRevealSecret = (secretId: string) => {
    const updatedEntry = {
      ...localEntry,
      scratchOffs: localEntry.scratchOffs?.map(s =>
        s.id === secretId ? { ...s, isRevealed: true } : s
      ) || [],
    };
    setLocalEntry(updatedEntry);
    onUpdateEntry(updatedEntry);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900/95 via-[#2a1820]/95 to-zinc-950/95
                    backdrop-blur-xl border-4 border-[#ffb6d9]/30 rounded-3xl 
                    shadow-[0_20px_60px_-15px_rgba(255,182,217,0.6)]
                    p-8 md:p-12 relative overflow-hidden">
      
      {/* Floating flowers background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            style={{
              left: `${(i * 20) % 100}%`,
              top: `${(i * 30) % 100}%`,
              filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.9))',
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            {i % 3 === 0 ? '🌸' : i % 3 === 1 ? '🥀' : '🌺'}
          </motion.div>
        ))}
      </div>
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-zinc-500 hover:text-[#ffb6d9] 
                   transition-colors text-3xl leading-none z-10"
      >
        ×
      </button>

      {/* Navigation arrows */}
      {hasPrevious && onPrevious && (
        <motion.button
          onClick={onPrevious}
          whileHover={{ scale: 1.1, x: -4 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm
                     border border-[#ffb6d9]/30 flex items-center justify-center
                     text-[#ffb6d9] hover:border-[#ffb6d9]/60 hover:bg-zinc-900/90
                     transition-all duration-300"
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,182,217,0.15)',
          }}
          aria-label="Previous memory"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </motion.button>
      )}

      {hasNext && onNext && (
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm
                     border border-[#ffb6d9]/30 flex items-center justify-center
                     text-[#ffb6d9] hover:border-[#ffb6d9]/60 hover:bg-zinc-900/90
                     transition-all duration-300"
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.5), 0 0 20px rgba(255,182,217,0.15)',
          }}
          aria-label="Next memory"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </motion.button>
      )}

      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#ffb6d9]/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#ffb6d9]/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#ffb6d9]/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#ffb6d9]/30 rounded-br-lg" />

      {/* Header */}
      <div className="text-center mb-8 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffb6d9] to-[#ff69b4]
                          border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {localEntry.photos[0] ? (
              <img src={localEntry.photos[0].image} alt="Memory" className="w-full h-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#ffb6d9]" />
            )}
          </div>
        </motion.div>

        <h3 className="font-serif text-3xl text-[#ffb6d9] mb-2">
          Scrapbook Memory
        </h3>
        <p className="text-sm text-zinc-400 font-serif">
          {formatFullDate(localEntry.date)}
        </p>

        {/* Badges */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {localEntry.isLocked && (
            <span className="text-xs bg-pink-900/30 text-pink-400 px-3 py-1 rounded-full border border-pink-600/50">
              🔒 Locked
            </span>
          )}
          {localEntry.isHaunted && (
            <motion.span
              className="text-xs bg-purple-900/30 text-purple-400 px-3 py-1 rounded-full border border-purple-600/50"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(147,51,234,0.3)',
                  '0 0 20px rgba(147,51,234,0.6)',
                  '0 0 10px rgba(147,51,234,0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👻 Haunted
            </motion.span>
          )}
          {localEntry.photos && localEntry.photos.length > 1 && (
            <span className="text-xs bg-zinc-800/50 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700/50">
              📸 {localEntry.photos.length} Photos
            </span>
          )}
        </div>
      </div>

      {/* Photos */}
      <div className="mb-8">
        <div className={`grid gap-4 ${
          localEntry.layout === 'single' ? 'grid-cols-1' :
          localEntry.layout === 'double' ? 'grid-cols-2' :
          localEntry.layout === 'triple' ? 'grid-cols-3' :
          'grid-cols-2'
        }`}>
          {localEntry.photos?.map((photo) => (
            <div key={photo.id} className="relative rounded-2xl overflow-hidden border-4 border-[#ffb6d9]/20">
              <img 
                src={photo.image} 
                alt="Memory" 
                className="w-full h-auto object-contain bg-black"
                style={getFilterStyle((photo.filter || 'none') as any)}
              />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2">
                  <p className="text-xs text-zinc-300 font-serif text-center">{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stickers overlay on first photo */}
        {localEntry.stickers && localEntry.stickers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            {localEntry.stickers.map((sticker) => (
              <motion.span
                key={sticker.id}
                className="text-4xl"
                animate={{
                  rotate: [sticker.rotation || 0, (sticker.rotation || 0) + 10, sticker.rotation || 0],
                  scale: [sticker.scale || 1, (sticker.scale || 1) * 1.1, sticker.scale || 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {sticker.emoji}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Main thought */}
      <div className="relative mb-8">
        <div className="px-6 py-6 bg-black/30 backdrop-blur-sm rounded-2xl border-2 border-[#ffb6d9]/20">
          {localEntry.isLocked ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4 opacity-40">🔐</div>
              <p className="text-zinc-400 font-serif text-lg">
                This entry is locked away
              </p>
            </div>
          ) : (
            <>
              <p className="text-zinc-200 font-serif text-xl leading-relaxed text-center mb-4">
                {hauntedTextVisible && localEntry.hauntedText ? localEntry.hauntedText : localEntry.thought}
              </p>
              {hauntedTextVisible && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-purple-400 font-mono text-xs text-center"
                >
                  [The text seems to shift and change...]
                </motion.p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Scratch-off secrets */}
      {localEntry.scratchOffs && localEntry.scratchOffs.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm text-[#ffb6d9]/60 font-serif text-center mb-4">
            Hidden Secrets
          </h4>
          <div className="space-y-4">
            {localEntry.scratchOffs.map((secret) => (
              <ScratchOffSecret
                key={secret.id}
                text={secret.text}
                isRevealed={secret.isRevealed}
                onReveal={() => handleRevealSecret(secret.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center justify-center gap-3 my-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ffb6d9]/30 to-transparent" />
        <div className="w-2 h-2 rounded-full bg-[#ffb6d9]/40" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ffb6d9]/30 to-transparent" />
      </div>

      {/* Footer */}
      <div className="text-center space-y-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-6 py-3 rounded-full bg-[#ffb6d9]/20 border border-[#ffb6d9]/40
                     text-[#ffb6d9] font-serif text-sm hover:bg-[#ffb6d9]/30 transition-colors"
        >
          Close Memory
        </motion.button>

        {/* Delete Button */}
        {onDeleteEntry && (
          <div className="pt-4 border-t border-[#ffb6d9]/20">
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full px-4 py-2 rounded-lg text-sm font-serif
                         bg-red-900/20 text-red-400 border border-red-800/40
                         hover:bg-red-900/30 hover:border-red-700/60 transition-all"
              >
                🔥 Burn This Memory
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-center text-sm text-zinc-400 font-serif">
                  Are you sure? This memory will be lost forever.
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
                    onClick={async () => {
                      setIsDeleting(true);
                      try {
                        await onDeleteEntry(localEntry.id);
                        onClose();
                      } catch (error) {
                        console.error('Failed to delete:', error);
                        setIsDeleting(false);
                        setShowDeleteConfirm(false);
                      }
                    }}
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
    </div>
  );
};

function formatFullDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
