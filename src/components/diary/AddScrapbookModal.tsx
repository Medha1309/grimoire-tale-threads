/**
 * AddScrapbookModal Component
 * Enhanced modal for adding scrapbook entries - matches app aesthetic
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrapbookEntry, ScrapbookPhoto, ScrapbookSticker, ScratchOffArea } from '../../types/scrapbook';
import { StickerPicker } from './StickerPicker';
import { PhotoFilter, getFilterStyle } from './PhotoFilterSelector';
import { DragDropUpload } from './DragDropUpload';

interface AddScrapbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ScrapbookEntry) => void;
}

export const AddScrapbookModal: React.FC<AddScrapbookModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [photos, setPhotos] = useState<ScrapbookPhoto[]>([]);
  const [thought, setThought] = useState('');
  const [secretText, setSecretText] = useState('');
  const [stickers, setStickers] = useState<ScrapbookSticker[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [layout, setLayout] = useState<'single' | 'double' | 'triple' | 'quad'>('single');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const maxPhotos = layout === 'single' ? 1 : layout === 'double' ? 2 : layout === 'triple' ? 3 : 4;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const remainingSlots = maxPhotos - photos.length;
    
    files.slice(0, remainingSlots).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: ScrapbookPhoto = {
          id: Date.now().toString() + Math.random(),
          image: reader.result as string,
          filter: 'none',
        };
        setPhotos(prev => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handlePhotoFilterChange = (photoId: string, filter: PhotoFilter) => {
    setPhotos(prev => prev.map(p => 
      p.id === photoId ? { ...p, filter } : p
    ));
  };

  const handleAddSticker = (sticker: Omit<ScrapbookSticker, 'id'>) => {
    setStickers(prev => [...prev, { ...sticker, id: Date.now().toString() }]);
    setShowStickerPicker(false);
  };

  const handleRemoveSticker = (id: string) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = async () => {
    if (photos.length === 0 || !thought.trim()) return;

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const scratchOffs: ScratchOffArea[] = secretText.trim() ? [{
      id: Date.now().toString(),
      text: secretText.trim(),
      isRevealed: false,
      x: 50,
      y: 50,
      width: 200,
      height: 100,
    }] : [];

    const entry: ScrapbookEntry = {
      id: Date.now().toString(),
      date: new Date(),
      thought: thought.trim(),
      photos,
      stickers,
      scratchOffs,
      layout,
      isHaunted: false,
    };

    onSave(entry);

    // Reset form
    setPhotos([]);
    setThought('');
    setSecretText('');
    setStickers([]);
    setLayout('single');
    setIsSaving(false);
  };

  const handleCancel = () => {
    setPhotos([]);
    setThought('');
    setSecretText('');
    setStickers([]);
    setLayout('single');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl my-8"
          >
            {/* Dark modal matching app aesthetic */}
            <div className="bg-gradient-to-br from-zinc-900/95 via-[#1a0a14]/95 to-black/95
                            backdrop-blur-xl border-2 border-[#ffb6d9]/20 rounded-lg
                            shadow-[0_20px_60px_-15px_rgba(255,182,217,0.4)]
                            p-8 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              
              {/* Atmospheric background effects */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle at 20% 30%, rgba(255,182,217,0.06) 0%, transparent 50%)',
                      'radial-gradient(circle at 80% 70%, rgba(255,182,217,0.06) 0%, transparent 50%)',
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </div>

              {/* Close button */}
              <button
                onClick={handleCancel}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full 
                           bg-zinc-800/80 text-zinc-400 hover:text-[#ffb6d9] hover:bg-zinc-700/80
                           transition-colors flex items-center justify-center text-xl"
              >
                ×
              </button>

              {/* Header */}
              <div className="text-center mb-8 relative z-10">
                <motion.h2 
                  className="font-serif text-4xl tracking-wider mb-2"
                  style={{
                    color: '#ffb6d9',
                    textShadow: '0 0 20px rgba(255,182,217,0.3)',
                  }}
                >
                  Capture Memory
                </motion.h2>
                <p className="text-zinc-500 font-serif text-sm">
                  preserve a moment in time
                </p>
              </div>

              {/* Layout selector */}
              <div className="mb-6 relative z-10">
                <label className="block text-sm text-zinc-400 font-serif mb-3">
                  Photo Layout
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['single', 'double', 'triple', 'quad'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLayout(l);
                        const max = l === 'single' ? 1 : l === 'double' ? 2 : l === 'triple' ? 3 : 4;
                        if (photos.length > max) {
                          setPhotos(prev => prev.slice(0, max));
                        }
                      }}
                      className={`px-3 py-2 rounded-lg font-serif text-sm transition-all
                        ${layout === l
                          ? 'bg-[#ffb6d9]/20 text-[#ffb6d9] border border-[#ffb6d9]/50 shadow-lg shadow-[#ffb6d9]/20'
                          : 'bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:border-[#ffb6d9]/30 hover:text-zinc-300'
                        }`}
                    >
                      {l === 'single' ? '1 Photo' : l === 'double' ? '2 Photos' : l === 'triple' ? '3 Photos' : '4 Photos'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo upload area */}
              <div className="mb-6 relative z-10">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple={layout !== 'single'}
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div className={`grid gap-4 ${
                  layout === 'single' ? 'grid-cols-1' :
                  layout === 'double' ? 'grid-cols-2' :
                  layout === 'triple' ? 'grid-cols-3' :
                  'grid-cols-2'
                }`}>
                  {photos.map((photo) => (
                    <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden 
                                                    border-2 border-[#ffb6d9]/20 bg-zinc-900/50 group">
                      <img
                        src={photo.image}
                        alt="Memory"
                        className="w-full h-full object-cover"
                        style={getFilterStyle((photo.filter || 'none') as PhotoFilter)}
                      />
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full 
                                   bg-zinc-900/80 text-zinc-400 hover:text-red-400 hover:bg-zinc-900
                                   transition-colors flex items-center justify-center
                                   opacity-0 group-hover:opacity-100"
                      >
                        ×
                      </button>
                      {/* Mini filter selector */}
                      <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {(['none', 'sepia', 'desaturated', 'vintage', 'horror'] as PhotoFilter[]).map(f => (
                          <button
                            key={f}
                            onClick={() => handlePhotoFilterChange(photo.id, f)}
                            className={`flex-1 h-6 rounded text-xs font-serif transition-all ${
                              photo.filter === f 
                                ? 'bg-[#ffb6d9]/90 text-white' 
                                : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800/80'
                            }`}
                            title={f}
                          >
                            {f[0].toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {photos.length < maxPhotos && (
                    <div onClick={() => fileInputRef.current?.click()}>
                      <DragDropUpload
                        onUpload={processFiles}
                        maxFiles={maxPhotos}
                        currentCount={photos.length}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Stickers section */}
              {photos.length > 0 && (
                <div className="mb-6 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm text-zinc-400 font-serif">
                      Decorations ({stickers.length})
                    </label>
                    <button
                      onClick={() => setShowStickerPicker(true)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50
                                 text-zinc-300 text-xs font-serif hover:bg-zinc-700/50 hover:border-[#ffb6d9]/30
                                 transition-colors"
                    >
                      + Add Stickers
                    </button>
                  </div>
                  {stickers.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                      {stickers.map((sticker) => (
                        <motion.div
                          key={sticker.id}
                          whileHover={{ scale: 1.2 }}
                          className="relative group"
                        >
                          <span className="text-2xl cursor-move">{sticker.emoji}</span>
                          <button
                            onClick={() => handleRemoveSticker(sticker.id)}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500/80 
                                       text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Thought input */}
              <div className="mb-6 relative z-10">
                <label className="block text-sm text-zinc-400 font-serif mb-3">
                  Your thought *
                </label>
                <textarea
                  value={thought}
                  onChange={(e) => setThought(e.target.value)}
                  placeholder="Write a thought about this moment..."
                  maxLength={200}
                  className="w-full h-24 rounded-lg border-2 border-zinc-800/50 bg-zinc-900/30
                             px-4 py-3 text-zinc-200 placeholder-zinc-600
                             font-serif text-lg leading-relaxed
                             focus:border-[#ffb6d9]/50 focus:outline-none focus:ring-2 
                             focus:ring-[#ffb6d9]/20 resize-none transition-colors"
                />
                <p className="mt-2 text-xs text-zinc-600 text-right">
                  {thought.length}/200 characters
                </p>
              </div>

              {/* Secret scratch-off text */}
              <div className="mb-6 relative z-10">
                <label className="block text-sm text-zinc-400 font-serif mb-3">
                  Hidden Secret (optional)
                </label>
                <textarea
                  value={secretText}
                  onChange={(e) => setSecretText(e.target.value)}
                  placeholder="Add a secret that can only be revealed by scratching..."
                  maxLength={100}
                  className="w-full h-20 rounded-lg border-2 border-zinc-800/50 bg-zinc-900/30
                             px-4 py-3 text-zinc-200 placeholder-zinc-600
                             font-serif text-sm leading-relaxed
                             focus:border-[#ffb6d9]/50 focus:outline-none focus:ring-2 
                             focus:ring-[#ffb6d9]/20 resize-none transition-colors"
                />
                <p className="mt-2 text-xs text-zinc-600">
                  {secretText.length}/100 • This will be hidden behind a scratch-off layer
                </p>
              </div>

              {/* Date display */}
              <div className="mb-8 text-center relative z-10">
                <p className="text-sm text-zinc-500 font-serif">
                  📅 {new Date().toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-6 py-3 rounded-lg bg-zinc-800/50 text-zinc-300 font-serif
                             border border-zinc-700/50 hover:bg-zinc-700/50 hover:border-zinc-600/50
                             transition-colors disabled:opacity-50"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={photos.length === 0 || !thought.trim() || isSaving}
                  className="px-8 py-3 rounded-lg bg-[#ffb6d9]/20 text-[#ffb6d9] font-serif
                             border border-[#ffb6d9]/50 hover:bg-[#ffb6d9]/30
                             shadow-lg shadow-[#ffb6d9]/20 hover:shadow-[#ffb6d9]/30
                             transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? 'Capturing...' : 'Capture Memory'}
                </motion.button>
              </div>
            </div>

            {/* Shadow */}
            <div className="absolute inset-0 bg-black/20 blur-xl -z-10 translate-y-2" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Sticker Picker Modal */}
      <StickerPicker
        isOpen={showStickerPicker}
        onClose={() => setShowStickerPicker(false)}
        onAddSticker={handleAddSticker}
      />
    </>
  );
};
