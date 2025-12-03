import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreateCollectionModalProps {
  onClose: () => void;
  onCreate: (title: string, description?: string) => Promise<void>;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsCreating(true);
    try {
      await onCreate(title.trim(), description.trim() || undefined);
    } catch (error) {
      console.error('Failed to create collection:', error);
      alert('Failed to create collection');
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-md rounded-lg border-2 p-8"
          style={{
            background: 'linear-gradient(135deg, #1a1410 0%, #2a2420 100%)',
            borderColor: 'rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
          }}
        >
          <h2 className="font-serif text-2xl text-amber-100 mb-6">
            New Collection
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-serif text-zinc-400 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Dark Romance Ideas"
                maxLength={100}
                required
                autoFocus
                className="w-full px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none transition-all duration-200"
                style={{
                  borderColor: 'rgba(120, 53, 15, 0.4)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(120, 53, 15, 0.4)';
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-serif text-zinc-400 mb-2">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this collection about?"
                maxLength={500}
                rows={3}
                className="w-full px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none transition-all duration-200 resize-none"
                style={{
                  borderColor: 'rgba(120, 53, 15, 0.4)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(120, 53, 15, 0.4)';
                }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isCreating}
                className="flex-1 px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:bg-zinc-800"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(120, 120, 120, 0.3)',
                  color: '#999',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!title.trim() || isCreating}
                className="flex-1 px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: '#d4af37',
                }}
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
