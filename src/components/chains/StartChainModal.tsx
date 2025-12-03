/**
 * Start Chain Modal
 * Modal for creating a new chain letter
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../shared/Button';
import { useChainActions } from '../../hooks/useChainActions';

interface StartChainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (chainId: string) => void;
}

export const StartChainModal: React.FC<StartChainModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState<'horror' | 'thriller' | 'mystery' | 'romance'>('horror');
  const [content, setContent] = useState('');
  const { startChain, loading, error } = useChainActions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    const chainId = await startChain(title, genre, content);
    if (chainId) {
      onSuccess(chainId);
      setTitle('');
      setGenre('horror');
      setContent('');
      onClose();
    }
  };

  const wordCount = content.trim().split(/\s+/).filter(w => w).length;
  const minWords = 100;
  const maxWords = 1000;
  const isValidLength = wordCount >= minWords && wordCount <= maxWords;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #1a1410 0%, #2a2420 100%)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800 p-6 z-10">
                <h2 className="font-serif text-2xl text-zinc-100 mb-2">
                  Start a Cursed Chain
                </h2>
                <p className="text-sm text-zinc-400">
                  Begin a collaborative horror story. Others will continue your tale...
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">
                    Chain Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="The Haunting of..."
                    className="w-full px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50"
                    maxLength={100}
                    required
                  />
                </div>

                {/* Genre */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">
                    Genre
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['horror', 'thriller', 'mystery', 'romance'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGenre(g)}
                        className={`px-4 py-2 rounded-lg text-sm font-serif capitalize transition-all ${
                          genre === g
                            ? 'bg-amber-500/20 text-amber-400 border-2 border-amber-500/40'
                            : 'bg-zinc-800/50 text-zinc-400 border-2 border-zinc-700 hover:border-zinc-600'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-serif text-zinc-300">
                      First Chapter
                    </label>
                    <span
                      className={`text-xs font-serif ${
                        !isValidLength
                          ? 'text-red-400'
                          : 'text-zinc-500'
                      }`}
                    >
                      {wordCount} / {minWords}-{maxWords} words
                    </span>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="It began on a night like any other..."
                    className="w-full h-64 px-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 resize-none font-serif leading-relaxed"
                    required
                  />
                  <p className="text-xs text-zinc-500 mt-2">
                    Write the opening chapter. Others will continue your story.
                  </p>
                </div>

                {/* Warning */}
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-400 font-serif">
                    ⚠️ Warning: Once started, this chain must be passed within 7 days or it will die.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/40">
                    <p className="text-sm text-red-400">{error}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || !title.trim() || !isValidLength}
                  >
                    {loading ? 'Starting Chain...' : 'Start Chain'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
