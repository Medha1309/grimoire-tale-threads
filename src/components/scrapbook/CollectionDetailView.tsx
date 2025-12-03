import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useScrapbookItems } from '../../hooks/useScrapbookItems';
import { useScrapbookCollections } from '../../hooks/useScrapbookCollections';
import { ViewMode } from '../../types/scrapbook';
import { ItemMasonryGrid } from './ItemMasonryGrid';
import { ItemListView } from './ItemListView';
import { AddItemModal } from './AddItemModal';
import { BackButton } from '../shared/NavigationButtons';
import { useNavigation } from '../../hooks/useNavigation';

export const CollectionDetailView: React.FC = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const { goTo } = useNavigation();
  const { collections } = useScrapbookCollections();
  const { items, loading, addItem } = useScrapbookItems(collectionId || null);
  
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'title'>('recent');

  const collection = collections.find(c => c.id === collectionId);

  // Filter and sort items
  const filteredItems = items
    .filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'recent':
        default:
          return b.createdAt.getTime() - a.createdAt.getTime();
      }
    });

  const handleAddItem = async (
    imageUrl: string,
    title: string,
    caption?: string,
    notes?: string
  ) => {
    if (!collectionId) return;
    await addItem(collectionId, imageUrl, title, caption, notes);
    setShowAddModal(false);
  };

  if (!collection) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400 font-serif text-xl">Collection not found</p>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 border-b border-zinc-900/40 pb-6">
          <div className="flex items-center justify-between mb-8">
            <BackButton onClick={() => goTo.home()} variant="ghost" />
            <div className="flex-1 text-center">
              <h2 className="font-serif text-3xl tracking-wider text-zinc-300 mb-2">
                {collection.title}
              </h2>
              {collection.description && (
                <p className="text-sm text-zinc-500">{collection.description}</p>
              )}
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#d4af37',
                boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
              }}
            >
              Add Item
            </button>
          </div>

          {/* Controls */}
          {items.length > 0 && (
            <div className="space-y-4">
              {/* Search */}
              <div className="relative group">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search items..."
                  className="w-full px-5 py-3 bg-zinc-900/80 border-2 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none transition-all duration-300 font-serif"
                  style={{
                    borderColor: 'rgba(120, 53, 15, 0.4)',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(120, 53, 15, 0.4)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(0, 0, 0, 0.5)';
                  }}
                />
              </div>

              {/* View mode and sort */}
              <div className="flex items-center justify-between gap-4">
                {/* View toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 ${
                      viewMode === 'masonry' ? 'scale-105' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      background: viewMode === 'masonry'
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))'
                        : 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${viewMode === 'masonry' ? 'rgba(212, 175, 55, 0.4)' : 'rgba(120, 120, 120, 0.3)'}`,
                      color: viewMode === 'masonry' ? '#d4af37' : '#999',
                    }}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-2 rounded-lg font-serif text-sm transition-all duration-200 ${
                      viewMode === 'list' ? 'scale-105' : 'opacity-60 hover:opacity-100'
                    }`}
                    style={{
                      background: viewMode === 'list'
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))'
                        : 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${viewMode === 'list' ? 'rgba(212, 175, 55, 0.4)' : 'rgba(120, 120, 120, 0.3)'}`,
                      color: viewMode === 'list' ? '#d4af37' : '#999',
                    }}
                  >
                    List
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 bg-zinc-900/80 border rounded-lg text-zinc-100 focus:outline-none transition-all duration-200 font-serif appearance-none cursor-pointer"
                  style={{
                    borderColor: 'rgba(120, 53, 15, 0.4)',
                  }}
                >
                  <option value="recent">Recently Added</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Alphabetical</option>
                </select>
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        {loading ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="font-serif text-2xl text-zinc-400">Loading items...</p>
          </motion.div>
        ) : items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="font-serif text-2xl text-zinc-400 mb-4">No items yet</p>
            <p className="text-zinc-500 mb-8">Add your first item to this collection</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 rounded-lg font-serif transition-all duration-200 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1))',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#d4af37',
              }}
            >
              Add Item
            </button>
          </motion.div>
        ) : filteredItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="font-serif text-2xl text-zinc-400 mb-4">No items found</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        ) : viewMode === 'masonry' ? (
          <ItemMasonryGrid items={filteredItems} collectionId={collectionId!} />
        ) : (
          <ItemListView items={filteredItems} collectionId={collectionId!} />
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddItem}
        />
      )}
    </section>
  );
};
