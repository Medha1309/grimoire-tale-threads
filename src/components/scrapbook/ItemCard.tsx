import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrapbookItem } from '../../types/scrapbook';
import { useScrapbookItems } from '../../hooks/useScrapbookItems';
import { ItemDetailModal } from './ItemDetailModal';

interface ItemCardProps {
  item: ScrapbookItem;
  collectionId: string;
  listView?: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, collectionId, listView = false }) => {
  const { deleteItem } = useScrapbookItems(collectionId);
  const [showDetail, setShowDetail] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this item? This cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      await deleteItem(item.id, collectionId);
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete item');
      setIsDeleting(false);
    }
  };

  if (listView) {
    return (
      <>
        <motion.article
          onClick={() => setShowDetail(true)}
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          className="group relative cursor-pointer transition-all duration-300 hover:scale-[1.01]"
        >
          <div
            className="flex gap-4 p-4 rounded-lg border-2"
            style={{
              background: 'linear-gradient(135deg, #1a1410 0%, #2a2420 100%)',
              borderColor: 'rgba(120, 53, 15, 0.4)',
              boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
            }}
          >
            {/* Image */}
            <div className="w-32 h-32 flex-shrink-0 rounded overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-xl text-amber-100 mb-2 truncate">
                {item.title}
              </h3>
              {item.caption && (
                <p className="text-sm text-zinc-400 mb-2 line-clamp-2">
                  {item.caption}
                </p>
              )}
              <p className="text-xs text-zinc-600">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Delete button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: showMenu ? 1 : 0 }}
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-3 py-1 h-fit rounded text-xs font-serif transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(220, 38, 38, 0.4)',
                color: '#ef4444',
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </motion.button>
          </div>
        </motion.article>

        {showDetail && (
          <ItemDetailModal
            item={item}
            collectionId={collectionId}
            onClose={() => setShowDetail(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <motion.article
        onClick={() => setShowDetail(true)}
        onMouseEnter={() => setShowMenu(true)}
        onMouseLeave={() => setShowMenu(false)}
        className="group relative cursor-pointer transition-transform duration-300 hover:-translate-y-2"
        whileHover={{ scale: 1.02 }}
      >
        {/* Glow effect */}
        <div
          className="absolute -inset-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
          }}
        />

        <div
          className="relative overflow-hidden rounded-lg border-2 shadow-2xl"
          style={{
            borderColor: 'rgba(120, 53, 15, 0.4)',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
          }}
        >
          {/* Delete button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showMenu ? 1 : 0 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-3 right-3 z-10 px-3 py-1 rounded text-xs font-serif transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(220, 38, 38, 0.4)',
              color: '#ef4444',
            }}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </motion.button>

          {/* Image */}
          <div className="relative">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3
              className="font-serif text-lg leading-tight text-amber-100/90 mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
              style={{
                textShadow: '2px 2px 6px rgba(0,0,0,0.95)',
              }}
            >
              {item.title}
            </h3>
            {item.caption && (
              <p className="text-xs text-amber-200/80 line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-1">
                {item.caption}
              </p>
            )}
            <p 
              className="text-xs text-amber-600/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: '"Brush Script MT", cursive',
              }}
            >
              {new Date(item.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </p>
          </div>

          {/* Hover overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
            }}
          />
        </div>
      </motion.article>

      {showDetail && (
        <ItemDetailModal
          item={item}
          collectionId={collectionId}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
};
