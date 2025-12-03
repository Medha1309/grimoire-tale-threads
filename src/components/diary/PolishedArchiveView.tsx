/**
 * Polished Archive View
 * Beautiful, intelligent archive with easter eggs and smooth UX
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArchiveContentType, ArchiveItem } from '../../types/archive';
import { useArchive } from '../../hooks/useArchive';
import { PinkMatrixRainBackground } from './PinkMatrixRainBackground';
import { BackButton } from '../shared/NavigationButtons';

interface PolishedArchiveViewProps {
  type: ArchiveContentType;
  onBack: () => void;
  onRestore: (item: ArchiveItem) => void;
}

export const PolishedArchiveView: React.FC<PolishedArchiveViewProps> = ({ 
  type, 
  onBack, 
  onRestore 
}) => {
  const { loading, restoreItem, permanentlyDelete, getItemsWithDeletion } = useArchive(type);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showBulkConfirm, setShowBulkConfirm] = useState<'restore' | 'delete' | null>(null);
  const [restoringId, setRestoringId] = useState<string | null>(null);

  const itemsWithDeletion = getItemsWithDeletion();

  const titles = {
    diary: 'Confessions Archive',
    reading: 'Reading Archive',
    scrapbook: 'Memories Archive',
    art: 'Artwork Archive',
  };

  // Intelligent urgency detection
  const getUrgency = (days: number) => {
    if (days <= 3) return { level: 'danger', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' };
    if (days <= 10) return { level: 'warning', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)' };
    return { level: 'safe', color: '#ffb6d9', glow: 'rgba(255, 182, 217, 0.3)' };
  };

  const handleRestore = (item: ArchiveItem) => {
    setRestoringId(item.id);
    setTimeout(() => {
      const restored = restoreItem(item.id);
      if (restored) {
        onRestore(restored);
      }
      setRestoringId(null);
    }, 600);
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDelete(id);
    setShowDeleteConfirm(null);
  };

  const handleRestoreAll = () => {
    itemsWithDeletion.forEach(item => {
      const restored = restoreItem(item.id);
      if (restored) onRestore(restored);
    });
    setShowBulkConfirm(null);
  };

  const handleEmptyArchive = () => {
    itemsWithDeletion.forEach(item => permanentlyDelete(item.id));
    setShowBulkConfirm(null);
  };

  const renderItemContent = (item: ArchiveItem) => {
    switch (item.type) {
      case 'diary':
        return (
          <div>
            <p className="text-zinc-300 line-clamp-3 font-serif text-sm leading-relaxed">
              {item.isLocked ? '[Locked confession]' : item.content}
            </p>
            <div className="mt-2 text-xs text-zinc-500 font-serif">
              {item.mood} • {item.isLocked ? 'Private' : 'Unlocked'}
            </div>
          </div>
        );

      case 'reading':
        return (
          <div>
            <h4 className="text-base font-serif text-zinc-200 mb-1">{item.storyTitle}</h4>
            <p className="text-sm text-zinc-400 mb-2">by {item.storyAuthor}</p>
            {item.rating && (
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xs" style={{ color: i < item.rating! ? '#fbbf24' : '#3f3f46' }}>
                    ★
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      case 'scrapbook':
        return (
          <div>
            <p className="text-zinc-300 line-clamp-2 font-serif text-sm">{item.thought}</p>
            {item.photos.length > 0 && (
              <div className="mt-2 text-xs text-zinc-500">
                {item.photos.length} {item.photos.length === 1 ? 'photo' : 'photos'}
              </div>
            )}
          </div>
        );

      case 'art':
        return (
          <div className="flex gap-3">
            {item.thumbnail && (
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-16 h-16 object-cover rounded border border-[#ffb6d9]/20"
              />
            )}
            <div className="flex-1">
              <h4 className="text-base font-serif text-zinc-200 mb-1">{item.title}</h4>
              <p className="text-xs text-zinc-500 font-serif">
                {item.brushType} brush
              </p>
            </div>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#ffb6d9] font-serif text-lg"
        >
          Loading archive...
        </motion.div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
      <PinkMatrixRainBackground />

      <div className="relative z-20 max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between border-b pb-6"
                style={{ borderColor: 'rgba(255, 182, 217, 0.2)' }}>
          <BackButton onClick={onBack} className="relative" />
          <div className="text-center flex-1">
            <h1 className="font-serif text-3xl tracking-wider mb-1" style={{ color: '#ffb6d9' }}>
              {titles[type]}
            </h1>
            <p className="text-xs text-zinc-500 font-serif">
              {itemsWithDeletion.length} {itemsWithDeletion.length === 1 ? 'item' : 'items'} • Auto-delete after 30 days
            </p>
          </div>
          <div className="w-20" />
        </header>

        {/* Bulk Actions */}
        {itemsWithDeletion.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex gap-3 justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBulkConfirm('restore')}
              className="px-4 py-2 rounded-lg text-xs font-serif transition-all"
              style={{
                backgroundColor: 'rgba(255, 182, 217, 0.1)',
                border: '1px solid rgba(255, 182, 217, 0.3)',
                color: '#ffb6d9',
              }}
            >
              Restore All
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowBulkConfirm('delete')}
              className="px-4 py-2 rounded-lg text-xs font-serif transition-all"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
              }}
            >
              Empty Archive
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {itemsWithDeletion.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">Archive is empty</p>
            <p className="text-zinc-600 text-sm font-serif max-w-md mx-auto">
              Deleted items appear here for 30 days before vanishing forever
            </p>
          </motion.div>
        ) : (
          /* Archive Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {itemsWithDeletion.map((item, index) => {
                const urgency = getUrgency(item.daysUntilDeletion);
                const isRestoring = restoringId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isRestoring ? 0 : 1, 
                      y: isRestoring ? -50 : 0,
                      scale: isRestoring ? 0.9 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="relative p-5 rounded-lg backdrop-blur-sm transition-all duration-300"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${urgency.color}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${urgency.color}80`;
                      e.currentTarget.style.boxShadow = `0 0 20px ${urgency.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${urgency.color}40`;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Urgency Badge */}
                    <div 
                      className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-serif"
                      style={{
                        backgroundColor: `${urgency.color}20`,
                        border: `1px solid ${urgency.color}40`,
                        color: urgency.color,
                      }}
                    >
                      {item.daysUntilDeletion === 0 ? 'Last day!' : 
                       item.daysUntilDeletion === 1 ? '1 day left' :
                       `${item.daysUntilDeletion} days`}
                    </div>

                    {/* Content */}
                    <div className="mb-4 mt-6">
                      {renderItemContent(item)}
                    </div>

                    {/* Metadata */}
                    <div className="text-xs text-zinc-600 font-serif mb-4">
                      Archived {item.archivedAt.toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRestore(item)}
                        className="flex-1 px-3 py-2 rounded-lg text-xs font-serif transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 182, 217, 0.1)',
                          border: '1px solid rgba(255, 182, 217, 0.3)',
                          color: '#ffb6d9',
                        }}
                      >
                        Restore
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDeleteConfirm(item.id)}
                        className="px-3 py-2 rounded-lg text-xs font-serif transition-all"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          color: '#ef4444',
                        }}
                      >
                        Delete
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full p-6 rounded-lg"
              style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid rgba(239, 68, 68, 0.3)',
              }}
            >
              <h3 className="text-xl font-serif mb-3" style={{ color: '#ef4444' }}>
                Permanent Deletion
              </h3>
              <p className="text-zinc-300 font-serif text-sm mb-6">
                This cannot be undone. The item will vanish forever.
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif"
                  style={{
                    backgroundColor: 'rgba(63, 63, 70, 0.5)',
                    border: '1px solid rgba(63, 63, 70, 0.8)',
                    color: '#d4d4d8',
                  }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePermanentDelete(showDeleteConfirm)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#ef4444',
                  }}
                >
                  Delete Forever
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Confirmation Modal */}
      <AnimatePresence>
        {showBulkConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBulkConfirm(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full p-6 rounded-lg"
              style={{
                backgroundColor: '#0a0a0a',
                border: `1px solid ${showBulkConfirm === 'delete' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(255, 182, 217, 0.3)'}`,
              }}
            >
              <h3 className="text-xl font-serif mb-3" style={{ 
                color: showBulkConfirm === 'delete' ? '#ef4444' : '#ffb6d9' 
              }}>
                {showBulkConfirm === 'delete' ? 'Empty Archive?' : 'Restore All?'}
              </h3>
              <p className="text-zinc-300 font-serif text-sm mb-6">
                {showBulkConfirm === 'delete' 
                  ? `This will permanently delete all ${itemsWithDeletion.length} items. This cannot be undone.`
                  : `This will restore all ${itemsWithDeletion.length} items to their original locations.`
                }
              </p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBulkConfirm(null)}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif"
                  style={{
                    backgroundColor: 'rgba(63, 63, 70, 0.5)',
                    border: '1px solid rgba(63, 63, 70, 0.8)',
                    color: '#d4d4d8',
                  }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={showBulkConfirm === 'delete' ? handleEmptyArchive : handleRestoreAll}
                  className="flex-1 px-4 py-2 rounded-lg text-sm font-serif"
                  style={{
                    backgroundColor: showBulkConfirm === 'delete' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 182, 217, 0.2)',
                    border: showBulkConfirm === 'delete' ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 182, 217, 0.5)',
                    color: showBulkConfirm === 'delete' ? '#ef4444' : '#ffb6d9',
                  }}
                >
                  {showBulkConfirm === 'delete' ? 'Delete All' : 'Restore All'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
