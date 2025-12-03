/**
 * DiaryEntryModal Component
 * Modal for creating and editing diary entries
 */

import { memo, useState, useEffect } from 'react';
import { DiaryEntry, DiaryMood, CreateEntryData, UpdateEntryData, MOOD_ICONS, MOOD_LABELS } from '../../types/diary';
import { Modal } from '../shared/Modal';

interface DiaryEntryModalProps {
  isOpen?: boolean;
  entry?: DiaryEntry;
  onClose: () => void;
  onSave?: (data: CreateEntryData | UpdateEntryData) => Promise<void>;
  onDelete?: (entryId: string) => Promise<void>;
  mode?: 'view' | 'edit' | 'create';
}

const MOODS: DiaryMood[] = ['joy', 'sorrow', 'calm', 'unrest', 'secret'];

export const DiaryEntryModal = memo<DiaryEntryModalProps>(({
  isOpen = true,
  entry,
  onClose,
  onSave,
  onDelete,
  mode = 'view',
}) => {
  const [viewMode, setViewMode] = useState<'view' | 'edit' | 'create'>(mode);
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<DiaryMood>('calm');
  const [isLocked, setIsLocked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Initialize form with entry data when editing
  useEffect(() => {
    setViewMode(mode);
    if (entry) {
      setContent(entry.content);
      setMood(entry.mood);
      setIsLocked(entry.isLocked);
      setIsHidden(entry.isHidden || false);
      setIsFavorite(entry.isFavorite || false);
      setTags(entry.tags || []);
    } else {
      // Reset form for new entry
      setContent('');
      setMood('calm');
      setIsLocked(false);
      setIsHidden(false);
      setIsFavorite(false);
      setTags([]);
    }
  }, [entry, isOpen, mode]);

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    if (!content.trim()) {
      alert('Please write something in your diary entry.');
      return;
    }

    setSaving(true);
    try {
      if (entry) {
        // Update existing entry
        const updateData: UpdateEntryData = {
          content,
          mood,
          isLocked,
          isHidden,
          isFavorite,
          tags,
        };
        await onSave(updateData);
      } else {
        // Create new entry
        const createData: CreateEntryData = {
          content,
          mood,
          isLocked,
          isHidden,
          isFavorite,
          tags,
          enableAI: false,
        };
        await onSave(createData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving entry:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete || !entry) return;
    
    setDeleting(true);
    try {
      await onDelete(entry.id);
      onClose();
    } catch (error) {
      console.error('Error deleting entry:', error);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // View mode - just display the entry
  if (viewMode === 'view' && entry) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title=""
        size="lg"
      >
        <div className="space-y-6">
          {/* Header with mood */}
          <div className="flex items-center justify-between pb-4 border-b border-[#ffb6d9]/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffb6d9]/10 to-transparent border border-[#ffb6d9]/20 flex items-center justify-center">
                <span className="text-2xl opacity-40">{MOOD_ICONS[entry.mood]}</span>
              </div>
              <div>
                <p className="text-sm font-serif text-[#ffb6d9]/80 uppercase tracking-wider">{MOOD_LABELS[entry.mood]}</p>
                <p className="text-xs text-zinc-500 font-serif mt-0.5">
                  {entry.createdAt.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            {entry.isLocked && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffb6d9]/5 border border-[#ffb6d9]/20">
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-[#ffb6d9]/60">
                  <rect x="3" y="5" width="6" height="5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.1" />
                  <path d="M4 5 V3 C4 1.5 5 1 6 1 C7 1 8 1.5 8 3 V5" stroke="currentColor" strokeWidth="1" fill="none" />
                </svg>
                <span className="text-xs text-[#ffb6d9]/60 font-serif">Encrypted</span>
              </div>
            )}
          </div>

          {/* Entry Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed font-serif text-base">
              {entry.content}
            </p>
          </div>

          {/* Tags */}
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#ffb6d9]/10">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-[#ffb6d9]/5 border border-[#ffb6d9]/20 text-[#ffb6d9]/70 text-xs font-serif"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-6 border-t border-[#ffb6d9]/10">
            <div className="flex gap-3">
              {onSave && (
                <button
                  onClick={() => setViewMode('edit')}
                  className="px-4 py-2 rounded-lg text-sm font-serif
                           bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/30
                           hover:bg-[#ffb6d9]/20 transition-all"
                >
                  Edit Entry
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-serif
                       bg-zinc-800/50 text-zinc-300 border border-zinc-700/50
                       hover:bg-zinc-800/70 transition-all"
            >
              Close
            </button>
          </div>

          {/* Delete Section */}
          {onDelete && !entry.id.startsWith('sample-') && (
            <div className="pt-6 border-t border-red-900/20">
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full px-4 py-2.5 rounded-lg text-sm font-serif
                           bg-red-900/10 text-red-400/90 border border-red-800/30
                           hover:bg-red-900/20 hover:border-red-700/50 transition-all"
                >
                  Delete Entry
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-center text-sm text-zinc-400 font-serif">
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                               bg-zinc-800/50 text-zinc-300 border border-zinc-700/50
                               hover:bg-zinc-800/70 transition-all disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                               bg-red-900/30 text-red-300 border border-red-800/50
                               hover:bg-red-900/50 transition-all disabled:opacity-50"
                    >
                      {deleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={entry ? 'Edit Entry' : 'New Diary Entry'}
      size="lg"
    >
      <div className="space-y-6">
        {/* Content Editor */}
        <div>
          <label className="block text-sm font-serif text-zinc-400 mb-2">
            Entry
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts..."
            rows={12}
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-zinc-800/50 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#ffb6d9]/50 focus:ring-1 focus:ring-[#ffb6d9]/20 transition-all resize-none font-serif leading-relaxed"
          />
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block text-sm font-serif text-zinc-400 mb-3">
            Mood
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((moodOption) => (
              <button
                key={moodOption}
                onClick={() => setMood(moodOption)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all font-serif text-sm ${
                  mood === moodOption
                    ? 'bg-[#ffb6d9]/15 border-[#ffb6d9]/50 text-[#ffb6d9]'
                    : 'bg-black/30 border-zinc-800/50 text-zinc-400 hover:border-[#ffb6d9]/30 hover:text-zinc-300'
                }`}
              >
                <span className="text-lg opacity-40">{MOOD_ICONS[moodOption]}</span>
                <span className="capitalize">{MOOD_LABELS[moodOption]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-serif text-zinc-400 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tag..."
              className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-zinc-800/50 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-[#ffb6d9]/50 focus:ring-1 focus:ring-[#ffb6d9]/20 transition-all font-serif text-sm"
            />
            <button
              onClick={handleAddTag}
              className="px-4 py-2 rounded-lg text-sm font-serif
                       bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/30
                       hover:bg-[#ffb6d9]/20 transition-all"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffb6d9]/10 border border-[#ffb6d9]/20 text-[#ffb6d9]/80 text-xs font-serif"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 transition-colors text-sm"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Toggles */}
        <div className="space-y-2.5">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isLocked}
              onChange={(e) => setIsLocked(e.target.checked)}
              className="w-4 h-4 rounded border-[#ffb6d9]/30 bg-black/40 text-[#ffb6d9] focus:ring-[#ffb6d9]/20"
            />
            <span className="text-sm text-zinc-400 font-serif group-hover:text-zinc-300 transition-colors">
              Encrypt this entry
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isHidden}
              onChange={(e) => setIsHidden(e.target.checked)}
              className="w-4 h-4 rounded border-[#ffb6d9]/30 bg-black/40 text-[#ffb6d9] focus:ring-[#ffb6d9]/20"
            />
            <span className="text-sm text-zinc-400 font-serif group-hover:text-zinc-300 transition-colors">
              Hide from main view
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="w-4 h-4 rounded border-[#ffb6d9]/30 bg-black/40 text-[#ffb6d9] focus:ring-[#ffb6d9]/20"
            />
            <span className="text-sm text-zinc-400 font-serif group-hover:text-zinc-300 transition-colors">
              Mark as favorite
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-[#ffb6d9]/10">
          <button
            onClick={onClose}
            disabled={saving}
            className="px-5 py-2.5 rounded-lg text-sm font-serif
                     bg-zinc-800/50 text-zinc-300 border border-zinc-700/50
                     hover:bg-zinc-800/70 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !content.trim()}
            className="px-5 py-2.5 rounded-lg text-sm font-serif
                     bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/40
                     hover:bg-[#ffb6d9]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : entry ? 'Update Entry' : 'Save Entry'}
          </button>
        </div>
      </div>
    </Modal>
  );
});

DiaryEntryModal.displayName = 'DiaryEntryModal';
