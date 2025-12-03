/**
 * Forum Page - The Tea Room (Redesigned)
 * A haunting séance chamber where messages float like spirits
 */

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavigationProps } from '../types';
import { ForumFilters as ForumFiltersType } from '../types/forum';

import { ForumList } from '../components/forum/ForumList';
import { ThreadView } from '../components/forum/PostView';
import { ReplySection } from '../components/forum/ReplySection';
import { FilterChips } from '../components/forum/FilterChips';
import { UnifiedWritingModal, WritingModalField } from '../components/shared/UnifiedWritingModal';
import { FORUM_TAGS } from '../types/forum';
import { useForumPosts } from '../hooks/useForumPosts';
import { useForumPost } from '../hooks/useForumPost';
import { pageVariants } from '../utils/animations';
import { BackButton } from '../components/shared/NavigationButtons';
import { logError } from '../utils/errorHandler';

// Floating candles that react to mouse
const FloatingCandle: React.FC<{ index: number; mouseRef: React.MutableRefObject<{ x: number; y: number }> }> = ({ index, mouseRef }) => {
  const baseX = 10 + (index % 4) * 25;
  const baseY = 15 + Math.floor(index / 4) * 30;
  
  const offsetX = (mouseRef.current.x - 50) * 0.02 * (index % 2 === 0 ? 1 : -1);
  const offsetY = (mouseRef.current.y - 50) * 0.02 * (index % 2 === 0 ? 1 : -1);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
      }}
      animate={{
        x: offsetX,
        y: offsetY,
        scale: [1, 1.05, 1],
      }}
      transition={{
        x: { duration: 0.5 },
        y: { duration: 0.5 },
        scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="relative">
        {/* Flame */}
        <motion.div
          className="w-2 h-4 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255, 200, 100, 0.9) 0%, rgba(255, 100, 0, 0.6) 50%, rgba(139, 0, 0, 0.3) 100%)',
            filter: 'blur(2px)',
            boxShadow: '0 0 20px rgba(255, 150, 0, 0.6)',
          }}
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.8, 1, 0.7, 0.9, 0.8],
          }}
          transition={{
            duration: 1.5 + index * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 -m-4"
          style={{
            background: 'radial-gradient(circle, rgba(255, 150, 0, 0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </div>
    </motion.div>
  );
};

interface ForumProps extends NavigationProps {
  threadId?: string;
  storySlug?: string;
}

const LoadingState = () => (
  <div className="flex items-center justify-center py-20">
    <motion.p
      className="text-zinc-400 font-serif italic"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      Loading...
    </motion.p>
  </div>
);

const NotFoundState = ({ onBack }: { onBack: () => void }) => (
  <div className="text-center py-20">
    <p className="text-zinc-400 font-serif mb-4">Discussion not found.</p>
    <button
      onClick={onBack}
      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-candlelight transition-colors mx-auto"
    >
      <span>←</span>
      <span>Back to Discussions</span>
    </button>
  </div>
);

export const Forum: React.FC<ForumProps> = ({ go, threadId, storySlug }) => {
  const [filters, setFilters] = useState<ForumFiltersType>({ sortBy: 'recent', storySlug });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingThreadId, setViewingThreadId] = useState<string | undefined>(threadId);
  const [searchQuery, setSearchQuery] = useState('');
  const mouseRef = useRef({ x: 50, y: 50 });
  const rafRef = useRef<number | null>(null);
  const [, forceUpdate] = useState({});

  const { posts: allThreads, loading, hasMore, error, loadMore, createPost, refreshPosts } = useForumPosts(filters);
  const { post: thread, replies, loading: threadLoading } = useForumPost(viewingThreadId);

  // Track mouse for candle movement (throttled with RAF)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      
      // Throttle updates to 60fps max
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          forceUpdate({}); // Trigger re-render
          rafRef.current = null;
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const filteredThreads = useMemo(() => {
    if (!searchQuery.trim()) return allThreads;
    const query = searchQuery.toLowerCase();
    return allThreads.filter(t => 
      t.title.toLowerCase().includes(query) ||
      t.content.toLowerCase().includes(query) ||
      t.authorName.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query)) ||
      t.storyTitle?.toLowerCase().includes(query)
    );
  }, [allThreads, searchQuery]);

  const handleCreateThread = useCallback(async (data: any) => {
    try {
      await createPost({
        title: data.title as string,
        content: data.content as string,
        tags: data.tags as string[],
        storySlug: storySlug,
      });
    } catch (err: any) {
      logError('Forum.handleCreatePost', err);
      throw err; // Re-throw to let modal handle it
    }
  }, [createPost, storySlug]);

  // Define forum post fields
  const forumFields: WritingModalField[] = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      placeholder: 'A captivating title for your discussion...',
      required: true,
      maxLength: 100,
    },
    {
      type: 'textarea',
      name: 'content',
      label: 'Content',
      placeholder: 'Share your thoughts, theories, or questions...',
      required: true,
      maxLength: 5000,
      rows: 10,
    },
    {
      type: 'multiselect',
      name: 'tags',
      label: 'Genre Tags (optional)',
      options: FORUM_TAGS,
    },
  ];

  const handleThreadClick = useCallback((id: string) => {
    setViewingThreadId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToList = useCallback(() => {
    setViewingThreadId(undefined);
    refreshPosts();
  }, [refreshPosts]);

  // Thread Detail View
  if (viewingThreadId) {
    return (
      <motion.section
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="relative min-h-screen text-zinc-100 px-6 py-16 overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
        }}
      >
        {/* Ambient fog */}
        <div className="fixed inset-0 pointer-events-none opacity-30">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {threadLoading ? (
            <LoadingState />
          ) : thread ? (
            <>
              <ThreadView thread={thread} onBack={handleBackToList} />
              <div className="mt-12">
                <ReplySection postId={thread.id} replies={replies} onReplyAdded={refreshPosts} />
              </div>
            </>
          ) : (
            <NotFoundState onBack={handleBackToList} />
          )}
        </div>
      </motion.section>
    );
  }

  // Forum List View - Séance Circle
  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen text-zinc-100 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
      }}
    >
      {/* Floating candles around the room */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {[...Array(12)].map((_, i) => (
          <FloatingCandle key={i} index={i} mouseRef={mouseRef} />
        ))}
      </div>

      {/* Ambient fog effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-20"
        animate={{
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 1200px 800px at 50% 50%, rgba(139, 0, 0, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between pb-6 border-b border-zinc-800/30">
          <BackButton 
            onClick={() => go?.('landing')} 
            variant="ghost"
            className="text-zinc-400 hover:text-zinc-100"
          />
          
          <div className="relative group">
            <motion.h2 
              className="font-serif text-3xl sm:text-5xl tracking-[0.3em] relative z-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                color: '#e8c547',
                textShadow: '0 0 40px rgba(232, 197, 71, 0.9), 0 0 80px rgba(232, 197, 71, 0.5)',
              }}
            >
              THE TEA ROOM
            </motion.h2>
            
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-px"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.6) 50%, transparent 100%)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
              }}
            />
          </div>
          
          {/* New Post Button */}
          <motion.button
            onClick={() => setIsCreateModalOpen(true)}
            className="hidden sm:inline-block relative px-8 py-3
                       font-serif text-sm tracking-wider backdrop-blur-md
                       transition-all duration-300
                       overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(20, 10, 10, 0.3) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '2px',
              color: '#d4af37',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3), 0 0 15px rgba(212, 175, 55, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
              textShadow: '0 0 15px rgba(212, 175, 55, 0.5)',
            }}
            whileHover={{ 
              scale: 1.03,
              borderColor: 'rgba(212, 175, 55, 0.7)',
              boxShadow: '0 4px 20px rgba(106, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.4)',
              textShadow: '0 0 20px rgba(212, 175, 55, 0.8)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Ornate corner accents with neon glow */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#d4af37', filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))' }} />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#d4af37', filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))' }} />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#d4af37', filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))' }} />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r opacity-40 group-hover:opacity-70 transition-opacity"
                 style={{ borderColor: '#d4af37', filter: 'drop-shadow(0 0 3px rgba(212, 175, 55, 0.5))' }} />
            
            {/* Neon pulse effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                border: '1px solid rgba(212, 175, 55, 0.6)',
                borderRadius: '2px',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.2)',
              }}
            />
            <span className="relative z-10">New Post</span>
          </motion.button>
          
          <div className="w-20 sm:hidden" />
        </header>

        {/* Search */}
        <div className="mb-6 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions..."
            className="w-full px-4 py-3 rounded-lg text-sm font-medium
                       text-white placeholder-zinc-500
                       focus:outline-none transition-all duration-300"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              border: '2px solid rgba(232, 197, 71, 0.25)',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(232, 197, 71, 0.5)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 20px rgba(232, 197, 71, 0.2)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(232, 197, 71, 0.25)';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.5)';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterChips filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Mobile Create Button */}
        <div className="sm:hidden flex justify-center mb-8">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full max-w-sm px-8 py-3 rounded border font-serif text-sm backdrop-blur 
                       transition-all duration-300"
            style={{
              borderColor: 'rgba(212, 175, 55, 0.3)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#d4af37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.1)',
              textShadow: '0 0 10px rgba(212, 175, 55, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.7)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.3)';
              e.currentTarget.style.textShadow = '0 0 15px rgba(212, 175, 55, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.15)';
              e.currentTarget.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.4)';
            }}
          >
            New Post
          </button>
        </div>

        {/* Error */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-900/10 border border-red-900/40 rounded"
          >
            <p className="text-red-400 text-sm text-center">{error}</p>
          </motion.div>
        )}

        {/* Search Results */}
        {searchQuery && !loading && (
          <div className="mb-4 text-sm text-zinc-500">
            {filteredThreads.length === 0 ? (
              <p>No discussions found for "{searchQuery}"</p>
            ) : (
              <p>Found {filteredThreads.length} discussion{filteredThreads.length !== 1 ? 's' : ''}</p>
            )}
          </div>
        )}

        {/* Thread List */}
        <ForumList posts={filteredThreads} loading={loading} onPostClick={handleThreadClick} />

        {/* Load More */}
        {hasMore && !loading && filteredThreads.length > 0 && (
          <div className="flex justify-center mt-16 mb-8">
            <button
              onClick={loadMore}
              className="px-10 py-3 border-2 rounded text-zinc-100 text-sm
                         hover:bg-blood-dark/10 transition"
              style={{
                borderColor: 'rgba(212, 175, 55, 0.3)',
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      <UnifiedWritingModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateThread}
        title="New Post"
        submitButtonText="Post"
        submittingText="Posting..."
        fields={forumFields}
        showFormatting={true}
        showWordCount={true}
        minContentLength={10}
        accentColor="#d4af37"
      />
    </motion.section>
  );
};

export const GildedParlour = Forum;
