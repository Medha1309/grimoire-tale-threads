/**
 * SharedScrapbook - Simple collaborative scrapbook
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { parlourColors } from '../../design-system/parlour-tokens';
import { Button } from '../shared/Button';

interface SharedScrapbookProps {
  sessionId: string;
}

export const SharedScrapbook: React.FC<SharedScrapbookProps> = () => {
  const [notes, setNotes] = useState<Array<{ id: string; text: string; author: string }>>([]);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now().toString(),
      text: newNote,
      author: 'You',
    };

    setNotes([...notes, note]);
    setNewNote('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: parlourColors.neutral[800] }}
      >
        <span className="text-xs text-zinc-600 font-serif">Shared Scrapbook</span>
        <span className="text-xs text-zinc-600 font-serif">{notes.length} notes</span>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-serif text-sm mb-2">No notes yet</p>
            <p className="text-zinc-600 font-serif text-xs">Add your first note below</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-lg border"
                style={{
                  background: 'rgba(232, 197, 71, 0.05)',
                  borderColor: parlourColors.neutral[800],
                }}
              >
                <p className="text-sm text-zinc-300 font-serif mb-2">{note.text}</p>
                <p className="text-xs text-zinc-600 font-serif">— {note.author}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Note */}
      <div
        className="p-4 border-t"
        style={{ borderColor: parlourColors.neutral[800] }}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
            placeholder="Add a note..."
            className="flex-1 px-3 py-2 rounded bg-black/40 border text-zinc-100 font-serif text-sm focus:outline-none"
            style={{ borderColor: parlourColors.neutral[800] }}
          />
          <Button variant="primary" size="sm" onClick={handleAddNote}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
