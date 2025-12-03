/**
 * Diary Module - Editor Component
 * Rich text editor with auto-save and keyboard shortcuts
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DiaryMood } from '../types';
import { MOOD_CONFIG, STICKER_LIBRARY } from '../constants';

interface DiaryEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialMood?: DiaryMood;
  initialStickers?: string[];
  onSave: (title: string, content: string, mood: DiaryMood, stickers: string[]) => void;
  onCancel: () => void;
  onAutoSave?: (title: string, content: string, mood: DiaryMood, stickers: string[]) => void;
  isSaving?: boolean;
}

export const DiaryEditor: React.FC<DiaryEditorProps> = ({
  initialTitle = '',
  initialContent = '',
  initialMood = 'calm',
  initialStickers = [],
  onSave,
  onCancel,
  onAutoSave,
  isSaving = false,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [mood, setMood] = useState<DiaryMood>(initialMood);
  const [selectedStickers, setSelectedStickers] = useState<string[]>(initialStickers);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update word count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(w => w.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Auto-save functionality
  useEffect(() => {
    if (!onAutoSave) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    if (content.trim().length > 0) {
      autoSaveTimerRef.current = setTimeout(() => {
        onAutoSave(title, content, mood, selectedStickers);
        setLastSaved(new Date());
      }, 3000);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [title, content, mood, selectedStickers, onAutoSave]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (content.trim().length > 0) {
          onSave(title, content, mood, selectedStickers);
        }
      }

      // Shift + Enter for new entry (cancel current)
      if (e.shiftKey && e.key === 'Enter' && e.target === contentRef.current) {
        e.preventDefault();
        onCancel();
      }

      // Escape to cancel
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [title, content, mood, selectedStickers, onSave, onCancel]);

  const handleStickerToggle = useCallback((stickerId: string) => {
    setSelectedStickers(prev =>
      prev.includes(stickerId)
        ? prev.filter(id => id !== stickerId)
        : [...prev, stickerId]
    );
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length > 0) {
      onSave(title, content, mood, selectedStickers);
    }
  }, [title, content, mood, selectedStickers, onSave]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">New Entry</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {lastSaved && (
            <span>Saved {lastSaved.toLocaleTimeString()}</span>
          )}
          {isSaving && <span className="text-blue-600">Saving...</span>}
        </div>
      </div>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title (optional)"
        className="w-full px-4 py-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Mood Selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(MOOD_CONFIG) as DiaryMood[]).map((m) => {
          const config = MOOD_CONFIG[m];
          const isSelected = mood === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isSelected
                  ? 'ring-2 ring-offset-2'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{
                backgroundColor: config.bg,
                color: config.color,
                ...(isSelected && { boxShadow: `0 0 0 2px ${config.color}` }),
              }}
            >
              {config.icon} {config.label}
            </button>
          );
        })}
      </div>

      {/* Content Editor */}
      <textarea
        ref={contentRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full h-64 px-4 py-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        autoFocus
      />

      {/* Word Count */}
      <div className="text-sm text-gray-500 text-right">
        {wordCount} {wordCount === 1 ? 'word' : 'words'}
      </div>

      {/* Sticker Picker */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setShowStickerPicker(!showStickerPicker)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showStickerPicker ? '− Hide Stickers' : '+ Add Stickers'}
        </button>

        {showStickerPicker && (
          <div className="grid grid-cols-10 gap-2 p-4 bg-gray-50 rounded-lg">
            {STICKER_LIBRARY.map((sticker) => (
              <button
                key={sticker.id}
                type="button"
                onClick={() => handleStickerToggle(sticker.id)}
                className={`text-2xl p-2 rounded-lg transition-all hover:scale-110 ${
                  selectedStickers.includes(sticker.id)
                    ? 'bg-blue-100 ring-2 ring-blue-500'
                    : 'bg-white hover:bg-gray-100'
                }`}
                title={sticker.label}
              >
                {sticker.emoji}
              </button>
            ))}
          </div>
        )}

        {selectedStickers.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedStickers.map((id) => {
              const sticker = STICKER_LIBRARY.find(s => s.id === id);
              return sticker ? (
                <span key={id} className="text-xl">
                  {sticker.emoji}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-gray-500">
          <kbd className="px-2 py-1 bg-gray-100 rounded">Ctrl+S</kbd> to save •{' '}
          <kbd className="px-2 py-1 bg-gray-100 rounded">Esc</kbd> to cancel
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={content.trim().length === 0 || isSaving}
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Entry'}
          </button>
        </div>
      </div>
    </form>
  );
};
