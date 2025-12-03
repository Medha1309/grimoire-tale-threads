import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ScrapbookCollection } from '../../types/scrapbook';
import { useScrapbookCollections } from '../../hooks/useScrapbookCollections';

interface CollectionCardProps {
  collection: ScrapbookCollection;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({ collection }) => {
  const navigate = useNavigate();
  const { deleteCollection } = useScrapbookCollections();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this collection? This cannot be undone.')) return;
    
    setIsDeleting(true);
    try {
      await deleteCollection(collection.id);
    } catch (error) {
      console.error('Failed to delete collection:', error);
      alert('Failed to delete collection');
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    navigate(`/scrapbook/${collection.id}`);
  };

  // Random rotation for natural scrapbook look
  const randomRotation = React.useMemo(() => (Math.random() - 0.5) * 4, []);
  const randomTapeColor = React.useMemo(() => 
    ['rgba(251, 191, 36, 0.3)', 'rgba(245, 158, 11, 0.3)', 'rgba(217, 119, 6, 0.3)'][Math.floor(Math.random() * 3)],
    []
  );

  return (
    <motion.article
      onClick={handleClick}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      initial={{ opacity: 0, y: 20, rotate: randomRotation }}
      animate={{ opacity: 1, y: 0, rotate: randomRotation }}
      whileHover={{ 
        scale: 1.05, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="group relative cursor-pointer"
      style={{ transformOrigin: 'center center' }}
    >
      {/* Polaroid frame */}
      <div className="relative p-4 bg-white/95 shadow-2xl" style={{
        boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
      }}>
        {/* Washi tape at top */}
        <div 
          className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 opacity-80"
          style={{
            background: randomTapeColor,
            transform: 'translateX(-50%) rotate(-2deg)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 16px)',
          }}
        />

        {/* Photo area */}
        <div
          className="relative aspect-square overflow-hidden bg-zinc-900"
          style={{
            background: collection.coverImage
              ? `url(${collection.coverImage})`
              : 'linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Delete button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showMenu ? 1 : 0 }}
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-2 right-2 z-10 px-2 py-1 rounded text-xs font-serif transition-all"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(220, 38, 38, 0.6)',
              color: '#ef4444',
            }}
          >
            {isDeleting ? '...' : '✕'}
          </motion.button>

          {/* Item count badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded text-xs font-serif"
            style={{
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fbbf24',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            {collection.itemCount} items
          </div>
        </div>

        {/* Polaroid caption area */}
        <div className="pt-4 pb-2 px-2 min-h-[80px]">
          <h3
            className="font-serif text-lg leading-tight text-zinc-800 mb-1"
            style={{
              fontFamily: '"Brush Script MT", cursive',
            }}
          >
            {collection.title}
          </h3>
          
          {collection.description && (
            <p className="text-xs text-zinc-600 line-clamp-2 font-serif">
              {collection.description}
            </p>
          )}

          <p className="text-xs text-zinc-400 mt-2 font-serif">
            {new Date(collection.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Decorative pin */}
        <div 
          className="absolute -top-1 left-8 w-3 h-3 rounded-full shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.4)',
          }}
        />
      </div>

      {/* Hover glow */}
      <div
        className="absolute -inset-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.4) 0%, transparent 70%)',
        }}
      />
    </motion.article>
  );
};
