/**
 * CreateSessionModal - Modal for creating a new reflection session
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SessionTheme } from '../../types/reflectionSession';
import { useSessionActions } from '../../hooks/useSessionActions';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { getThemeIcon } from '../../utils/sessionHelpers';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sessionId: string) => void;
}

export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createSession, loading } = useSessionActions();
  
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState<SessionTheme>('reflection');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60); // minutes
  const [capacity, setCapacity] = useState(4);
  const [isPublic, setIsPublic] = useState(true);

  const themes: { value: SessionTheme; label: string; description: string }[] = [
    { value: 'reflection', label: 'Reflection', description: 'Deep thoughts and introspection' },
    { value: 'memory', label: 'Memory', description: 'Share and preserve memories' },
    { value: 'creative', label: 'Creative', description: 'Artistic expression and creation' },
    { value: 'open', label: 'Open', description: 'Free-form collaboration' },
  ];

  const durations = [
    { value: 30, label: '30 minutes' },
    { value: 60, label: '1 hour' },
    { value: 120, label: '2 hours' },
    { value: 180, label: '3 hours' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      return;
    }

    // Combine date and time
    const scheduledStart = new Date(`${date}T${time}`);

    const sessionId = await createSession({
      title,
      theme,
      description: description || undefined,
      scheduledStart,
      duration,
      capacity,
      isPublic,
    });

    if (sessionId) {
      onSuccess(sessionId);
      handleClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setTheme('reflection');
    setDescription('');
    setDate('');
    setTime('');
    setDuration(60);
    setCapacity(4);
    setIsPublic(true);
    onClose();
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.95) 0%, rgba(39, 39, 42, 0.95) 100%)',
                border: '2px solid rgba(139, 92, 246, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(139, 92, 246, 0.2)',
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-800">
                <h2 className="text-2xl font-serif text-zinc-100 mb-2">Create Reflection Session</h2>
                <p className="text-sm text-zinc-400 font-serif">
                  Schedule a collaborative space for reflection and creation
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">
                    Session Title *
                  </label>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Evening Reflections"
                    required
                    maxLength={100}
                  />
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-3">Theme *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {themes.map((t) => (
                      <motion.button
                        key={t.value}
                        type="button"
                        onClick={() => setTheme(t.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-4 rounded-lg border-2 transition-all duration-300 text-left"
                        style={{
                          background:
                            theme === t.value
                              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))'
                              : 'rgba(24, 24, 27, 0.5)',
                          borderColor:
                            theme === t.value ? 'rgba(139, 92, 246, 0.5)' : 'rgba(113, 113, 122, 0.3)',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-serif text-purple-400">{getThemeIcon(t.value)}</span>
                          <span className="font-serif text-zinc-200">{t.label}</span>
                        </div>
                        <p className="text-xs text-zinc-500 font-serif">{t.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">
                    Description (optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What will you explore together?"
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-zinc-700 text-zinc-100 font-serif text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-serif text-zinc-300 mb-2">Date *</label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={getMinDate()}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif text-zinc-300 mb-2">Time *</label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">Duration *</label>
                  <div className="grid grid-cols-4 gap-2">
                    {durations.map((d) => (
                      <motion.button
                        key={d.value}
                        type="button"
                        onClick={() => setDuration(d.value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 rounded-lg border-2 text-sm font-serif transition-all duration-300"
                        style={{
                          background:
                            duration === d.value
                              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))'
                              : 'rgba(24, 24, 27, 0.5)',
                          borderColor:
                            duration === d.value ? 'rgba(139, 92, 246, 0.5)' : 'rgba(113, 113, 122, 0.3)',
                          color: duration === d.value ? '#c4b5fd' : '#a1a1aa',
                        }}
                      >
                        {d.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-serif text-zinc-300 mb-2">
                    Capacity (2-8 participants) *
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="2"
                      max="8"
                      value={capacity}
                      onChange={(e) => setCapacity(parseInt(e.target.value))}
                      className="flex-1"
                      style={{
                        accentColor: '#8b5cf6',
                      }}
                    />
                    <span className="text-lg font-serif text-purple-400 w-8 text-center">
                      {capacity}
                    </span>
                  </div>
                </div>

                {/* Public/Private */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="w-5 h-5 rounded border-zinc-700 bg-zinc-900 text-purple-500 focus:ring-purple-500"
                    />
                    <span className="text-sm font-serif text-zinc-300">
                      Public session (anyone can join)
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                  <Button variant="ghost" onClick={handleClose} disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Session'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
