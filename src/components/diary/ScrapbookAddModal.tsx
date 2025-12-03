/**
 * Scrapbook Add Modal
 * Form to create new memory entries
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrapbookEntry, ScrapbookPhoto } from '../../types/scrapbook';
import { dollhouseTokens } from '../../design-system/dollhouse-tokens';

interface ScrapbookAddModalProps {
  onClose: () => void;
  onSave: (entry: Omit<ScrapbookEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const ScrapbookAddModal: React.FC<ScrapbookAddModalProps> = ({
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [thought, setThought] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [mood, setMood] = useState('');
  const [location, setLocation] = useState('');
  const [photos, setPhotos] = useState<ScrapbookPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsUploading(true);

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;

        const newPhoto: ScrapbookPhoto = {
          id: `photo-${Date.now()}-${Math.random()}`,
          image: url,
          filter: 'none',
        };

        setPhotos((prev) => [...prev, newPhoto]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  const handleSubmit = () => {
    if (!title.trim() || !thought.trim()) {
      alert('Please fill in title and thoughts');
      return;
    }

    if (photos.length === 0) {
      alert('Please add at least one photo');
      return;
    }

    const entryData = {
      title: title.trim(),
      thought: thought.trim(),
      date: new Date(date),
      tags,
      mood: mood.trim() || undefined,
      location: location.trim() || undefined,
      photos,
      stickers: [],
    };

    console.log('💾 Saving scrapbook entry:', entryData);
    onSave(entryData);
    
    // Reset form
    setTitle('');
    setThought('');
    setDate(new Date().toISOString().split('T')[0]);
    setTags([]);
    setMood('');
    setLocation('');
    setPhotos([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-2xl w-full my-8 rounded-2xl border"
        style={{
          backgroundColor: 'rgba(10, 10, 10, 0.95)',
          borderColor: dollhouseTokens.colors.pink.border,
          boxShadow: dollhouseTokens.shadows.card.hover,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b"
             style={{ borderColor: dollhouseTokens.colors.pink.border }}>
          <h2 className="text-2xl font-serif" style={{ color: dollhouseTokens.colors.pink.primary }}>
            Add Memory
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Date */}
          <div>
            <label className="block text-sm font-serif mb-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 border focus:outline-none transition-colors"
              style={{ borderColor: dollhouseTokens.colors.pink.border }}
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-serif mb-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A memorable moment..."
              className="w-full px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 border focus:outline-none transition-colors"
              style={{ borderColor: dollhouseTokens.colors.pink.border }}
            />
          </div>

          {/* Thought */}
          <div>
            <label className="block text-sm font-serif mb-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
              Thoughts
            </label>
            <textarea
              value={thought}
              onChange={(e) => setThought(e.target.value)}
              placeholder="What made this moment special..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 border focus:outline-none transition-colors resize-none"
              style={{ borderColor: dollhouseTokens.colors.pink.border }}
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-serif mb-2" style={{ color: dollhouseTokens.colors.pink.primary }}>
              Media (Photos, GIFs, Videos)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="media-upload"
            />
            <label
              htmlFor="media-upload"
              className="block w-full px-4 py-8 rounded-lg border-2 border-dashed text-center cursor-pointer hover:bg-zinc-900/40 transition-colors"
              style={{ borderColor: dollhouseTokens.colors.pink.border }}
            >
              <div className="text-sm font-serif" style={{ color: dollhouseTokens.colors.pink.primary }}>
                {isUploading ? 'Uploading...' : 'Click to upload or drag files here'}
              </div>
              <div className="text-xs font-serif text-zinc-500 mt-1">
                Supports images, GIFs, and videos
              </div>
            </label>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-zinc-900/50">
                      <img src={photo.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => handleRemovePhoto(photo.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mood & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-serif mb-2 text-zinc-400">
                Mood (optional)
              </label>
              <input
                type="text"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                placeholder="happy, nostalgic..."
                className="w-full px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 border focus:outline-none transition-colors"
                style={{ borderColor: dollhouseTokens.colors.pink.border }}
              />
            </div>
            <div>
              <label className="block text-sm font-serif mb-2 text-zinc-400">
                Location (optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Where was this..."
                className="w-full px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 border focus:outline-none transition-colors"
                style={{ borderColor: dollhouseTokens.colors.pink.border }}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-serif mb-2 text-zinc-400">
              Tags (optional)
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add a tag..."
                className="flex-1 px-4 py-2.5 rounded-lg font-serif text-sm bg-zinc-900/60 text-zinc-100 placeholder-zinc-500 border focus:outline-none transition-colors"
                style={{ borderColor: dollhouseTokens.colors.pink.border }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddTag}
                className="px-4 py-2.5 rounded-lg font-serif text-sm border transition-colors"
                style={{
                  backgroundColor: 'rgba(255, 182, 217, 0.1)',
                  color: dollhouseTokens.colors.pink.primary,
                  borderColor: dollhouseTokens.colors.pink.border,
                }}
              >
                Add
              </motion.button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md text-sm font-serif flex items-center gap-2"
                    style={{
                      backgroundColor: 'rgba(255, 182, 217, 0.1)',
                      color: dollhouseTokens.colors.pink.primary,
                      border: `1px solid ${dollhouseTokens.colors.pink.border}`,
                    }}
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t" style={{ borderColor: dollhouseTokens.colors.pink.border }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 rounded-lg font-serif text-sm transition-colors"
            style={{
              backgroundColor: 'rgba(255, 182, 217, 0.2)',
              color: dollhouseTokens.colors.pink.primary,
              border: `1px solid ${dollhouseTokens.colors.pink.border}`,
            }}
          >
            Save Memory
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-serif text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
