import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrapbookCollections } from '../../hooks/useScrapbookCollections';
import { CollectionGrid } from './CollectionGrid';
import { CreateCollectionModal } from './CreateCollectionModal';
import { BackButton } from '../shared/NavigationButtons';
import { useNavigation } from '../../hooks/useNavigation';
import { ScrapbookCursor } from '../cursors/ScrapbookCursor';

export const ScrapbookView: React.FC = () => {
  const { goTo } = useNavigation();
  const { collections, loading, createCollection } = useScrapbookCollections();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = collections.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCollection = async (title: string, description?: string) => {
    await createCollection(title, description);
    setShowCreateModal(false);
  };

  return (
    <section className="relative min-h-screen px-6 py-16 text-zinc-100" style={{
      background: 'linear-gradient(135deg, #2d1810 0%, #1a0f0a 50%, #0f0805 100%)',
      cursor: 'none',
    }}>
      <ScrapbookCursor />
      
      {/* Cork board texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Vintage paper texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 69, 19, 0.03) 2px, rgba(139, 69, 19, 0.03) 4px)`,
        }}
      />
      <div className="mx-auto max-w-7xl relative">
        {/* Decorative polaroid frame in corner */}
        <motion.div
          initial={{ rotate: -5, opacity: 0 }}
          animate={{ rotate: -3, opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="fixed top-8 right-8 w-32 h-40 bg-white/5 border-8 border-white/10 shadow-2xl pointer-events-none"
          style={{
            transform: 'rotate(-3deg)',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600/40" />
        </motion.div>

        {/* Header with scrapbook aesthetic */}
        <header className="mb-12 pb-6 relative">
          <div className="flex items-center justify-between mb-8">
            <BackButton onClick={goTo.home} variant="ghost" />
            
            {/* Handwritten-style title */}
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl tracking-wide relative"
              style={{
                color: '#d4af37',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
                fontFamily: '"Brush Script MT", cursive',
              }}
            >
              My Collections
              {/* Decorative underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent origin-left"
              />
            </motion.h2>
            
            {/* Washi tape style button */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="relative px-6 py-3 font-serif text-sm transition-all duration-200 overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.1))',
                border: '2px dashed rgba(251, 191, 36, 0.4)',
                color: '#fbbf24',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.2), inset 0 1px 3px rgba(255,255,255,0.1)',
                borderRadius: '4px',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>✂</span> New Collection
              </span>
              {/* Tape texture */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                }}
              />
            </motion.button>
          </div>

          {/* Search with vintage label aesthetic */}
          {collections.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Vintage label background */}
              <div className="relative p-4 rounded-lg" style={{
                background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15), rgba(101, 67, 33, 0.1))',
                border: '1px solid rgba(139, 69, 19, 0.3)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.4)',
              }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your memories..."
                  className="w-full px-5 py-3 bg-black/30 border-2 rounded 
                           text-amber-100 placeholder-amber-900/50 
                           focus:outline-none focus:border-amber-600/60
                           transition-all duration-300 font-serif"
                  style={{
                    borderColor: 'rgba(139, 69, 19, 0.4)',
                    boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)',
                  }}
                />
                
                {/* Decorative pins */}
                <div className="absolute -top-2 left-8 w-3 h-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg" 
                  style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)' }} 
                />
                <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 shadow-lg"
                  style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)' }}
                />
              </div>
            </motion.div>
          )}
        </header>

        {/* Content with scrapbook styling */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-serif text-2xl text-amber-600/70"
            >
              Gathering memories...
            </motion.p>
          </motion.div>
        ) : collections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 relative"
          >
            {/* Empty scrapbook page */}
            <div className="max-w-md mx-auto p-12 rounded-lg relative" style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(101, 67, 33, 0.05))',
              border: '2px dashed rgba(139, 69, 19, 0.3)',
              boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.3)',
            }}>
              <p className="font-serif text-3xl text-amber-600/80 mb-4" style={{
                fontFamily: '"Brush Script MT", cursive',
              }}>
                Your Story Begins Here
              </p>
              <p className="text-amber-800/60 mb-8 font-serif">
                Start your first collection and preserve your favorite moments
              </p>
              <motion.button
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-8 py-4 rounded font-serif text-lg transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.15))',
                  border: '2px dashed rgba(251, 191, 36, 0.5)',
                  color: '#fbbf24',
                  boxShadow: '0 6px 20px rgba(251, 191, 36, 0.3)',
                }}
              >
                ✂ Create Your First Collection
              </motion.button>
              
              {/* Decorative corner pins */}
              <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg" />
              <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg" />
              <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg" />
              <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg" />
            </div>
          </motion.div>
        ) : filteredCollections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-serif text-2xl text-amber-600/70 mb-4">
              No collections found
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 rounded transition-colors font-serif"
              style={{
                background: 'rgba(139, 69, 19, 0.2)',
                border: '1px solid rgba(139, 69, 19, 0.4)',
                color: '#d4af37',
              }}
            >
              Clear Search
            </motion.button>
          </motion.div>
        ) : (
          <CollectionGrid collections={filteredCollections} />
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCollectionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCollection}
        />
      )}
    </section>
  );
};
