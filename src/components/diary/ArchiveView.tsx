/**
 * ArchiveView Component
 * Polished archive view with intelligent design and easter eggs
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveContentType, ArchiveItem } from '../../types/archive';
import { useArchive } from '../../hooks/useArchive';
import { PinkMatrixRainBackground } from './PinkMatrixRainBackground';
import { DollhouseRoomHeader } from './shared/DollhouseRoomHeader';

interface ArchiveViewProps {
  type: ArchiveContentType;
  onBack: () => void;
  onRestore: (item: ArchiveItem) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({ type, onBack, onRestore }) => {
  const { loading, restoreItem, permanentlyDelete, getItemsWithDeletion } = useArchive(type);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const itemsWithDeletion = getItemsWithDeletion();

  const titles = {
    diary: 'Confessions Archive',
    reading: 'Reading Archive',
    scrapbook: 'Memories Archive',
    art: 'Artwork Archive',
  };

  const handleRestore = (item: ArchiveItem) => {
    const restored = restoreItem(item.id);
    if (restored) {
      setTimeout(() => {
        onRestore(restored);
      }, 600);
    }
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDelete(id);
    setShowDeleteConfirm(null);
  };

  const renderItemContent = (item: ArchiveItem) => {
    switch (item.type) {
      case 'diary':
        return (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-zinc-500 font-serif uppercase">
                {item.mood}
              </span>
              {item.isLocked && <span className="text-xs text-zinc-500 font-serif">[Locked]</span>}
            </div>
            <p className="text-zinc-300 line-clamp-3 font-serif">
              {item.isLocked ? '****** locked content ******' : item.content}
            </p>
          </div>
        );

      case 'reading':
        return (
          <div className="flex gap-4">
            {item.storyCover && (
              <img
                src={item.storyCover}
                alt={item.storyTitle}
                className="w-16 h-24 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="text-lg font-serif text-zinc-200 mb-1">{item.storyTitle}</h4>
              <p className="text-sm text-zinc-400 mb-2">by {item.storyAuthor}</p>
              {item.rating && (
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xs" style={{ color: i < item.rating! ? '#fbbf24' : '#3f3f46' }}>
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'scrapbook':
        return (
          <div>
            {item.photos.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                {item.photos.slice(0, 4).map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.image}
                    alt="Memory"
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
            <p className="text-zinc-300 line-clamp-2 font-serif">{item.thought}</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#ffb6d9] font-serif text-xl">Loading archive...</div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16 overflow-hidden">
      {/* Pink Matrix Background */}
      <PinkMatrixRainBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <DollhouseRoomHeader
          title={titles[type]}
          subtitle="items auto-delete after 30 days"
          onBack={onBack}
          theme="pink"
        />

        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-lg bg-[#ffb6d9]/10 border border-[#ffb6d9]/30"
        >
          <p className="text-[#ffb6d9] text-sm font-serif text-center">
            Warning: Archived items are permanently deleted after 30 days
          </p>
        </motion.div>

        {/* Empty State */}
        {itemsWithDeletion.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">Archive is empty</p>
            <p className="text-zinc-600 text-sm font-serif">
              Deleted items will appear here for 30 days before permanent deletion
            </p>
          </motion.div>
        ) : (
          /* Archive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {itemsWithDeletion.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative p-6 rounded-lg bg-zinc-900/50 border border-zinc-800
                         hover:border-[#ffb6d9]/40 transition-all duration-300"
              >
                {/* Days until deletion badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-serif
                              bg-red-500/20 text-red-400 border border-red-500/30">
                  {item.daysUntilDeletion} {item.daysUntilDeletion === 1 ? 'day' : 'days'} left
                </div>

                {/* Content */}
                <div className="mb-4 mt-6">
                  {renderItemContent(item)}
                </div>

                {/* Metadata */}
                <div className="text-xs text-zinc-500 font-serif mb-4">
                  Archived {item.archivedAt.toLocaleDateString()}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRestore(item)}
                    className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                             bg-[#ffb6d9]/10 text-[#ffb6d9] border border-[#ffb6d9]/40
                             hover:bg-[#ffb6d9]/20 hover:border-[#ffb6d9]/60 transition-all"
                  >
                    Restore
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowDeleteConfirm(item.id)}
                    className="px-4 py-2 rounded-lg text-sm font-serif
                             bg-red-500/10 text-red-400 border border-red-500/40
                             hover:bg-red-500/20 hover:border-red-500/60 transition-all"
                  >
                    Delete Forever
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full p-6 rounded-lg bg-zinc-900 border border-red-500/30"
            >
              <h3 className="text-xl font-serif text-red-400 mb-3">Permanent Deletion</h3>
              <p className="text-zinc-300 font-serif mb-6">
                This action cannot be undone. The item will be permanently deleted.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                           bg-zinc-800 text-zinc-300 border border-zinc-700
                           hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePermanentDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif
                           bg-red-500/20 text-red-400 border border-red-500/40
                           hover:bg-red-500/30 hover:border-red-500/60 transition-all"
                >
                  Delete Forever
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
