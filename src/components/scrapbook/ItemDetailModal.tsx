import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrapbookItem } from '../../types/scrapbook';
import { useScrapbookItems } from '../../hooks/useScrapbookItems';

interface ItemDetailModalProps {
  item: ScrapbookItem;
  collectionId: string;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  collectionId,
  onClose,
}) => {
  const { updateItem } = useScrapbookItems(collectionId);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [caption, setCaption] = useState(item.caption || '');
  const [notes, setNotes] = useState(item.notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateItem(item.id, {
        title: title.trim(),
        caption: caption.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update item:', error);
      alert('Failed to update item');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle(item.title);
    setCaption(item.caption || '');
    setNotes(item.notes || '');
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        style={{ background: 'rgba(0, 0, 0, 0.9)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl rounded-lg border-2 overflow-hidden my-8"
          style={{
            background: 'linear-gradient(135deg, #1a1410 0%, #2a2420 100%)',
            borderColor: 'rgba(212, 175, 55, 0.3)',
            boxShadow: '0 0 40px rgba(212, 175, 55, 0.2)',
          }}
        >
          <div className="grid md:grid-cols-2 gap-6 p-8">
            {/* Image */}
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-auto rounded-lg"
              />
            </div>

            {/* Details */}
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-serif text-zinc-400 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={200}
                      className="w-full px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 focus:outline-none"
                      style={{ borderColor: 'rgba(120, 53, 15, 0.4)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-zinc-400 mb-2">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      maxLength={500}
                      className="w-full px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 focus:outline-none"
                      style={{ borderColor: 'rgba(120, 53, 15, 0.4)' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-serif text-zinc-400 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      maxLength={2000}
                      rows={6}
                      className="w-full px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 focus:outline-none resize-none"
                      style={{ borderColor: 'rgba(120, 53, 15, 0.4)' }}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
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
                      onClick={handleSave}
                      disabled={!title.trim() || isSaving}
                      className="flex-1 px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:scale-105 disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        color: '#d4af37',
                      }}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="font-serif text-3xl text-amber-100 mb-2">
                      {item.title}
                    </h2>
                    {item.caption && (
                      <p className="text-zinc-400 mb-4">{item.caption}</p>
                    )}
                  </div>

                  {item.notes && (
                    <div>
                      <h3 className="font-serif text-sm text-zinc-500 mb-2">Notes</h3>
                      <p className="text-zinc-300 whitespace-pre-wrap">{item.notes}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-xs text-zinc-600">
                      Added {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    {item.updatedAt.getTime() !== item.createdAt.getTime() && (
                      <p className="text-xs text-zinc-600">
                        Updated {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:bg-zinc-800"
                      style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        border: '1px solid rgba(120, 120, 120, 0.3)',
                        color: '#999',
                      }}
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        color: '#d4af37',
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
