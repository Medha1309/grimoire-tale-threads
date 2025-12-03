/**
 * Gilded Parlour - Sophisticated Literary Discussion Space
 * A warm, inviting space for mature readers to discuss stories
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavigationProps } from '../types';
import { ForumFilters as ForumFiltersType } from '../types/forum';
import { ForumList } from '../components/forum/ForumList';
import { PostView } from '../components/forum/PostView';
import { ReplySection } from '../components/forum/ReplySection';
import { ForumFilters } from '../components/forum/ForumFilters';
import { UnifiedWritingModal, WritingModalField } from '../components/shared/UnifiedWritingModal';
import { FORUM_TAGS } from '../types/forum';
import { useForumPosts } from '../hooks/useForumPosts';
import { useForumPost } from '../hooks/useForumPost';
import { typography, buttons, backgrounds } from '../utils/themeClasses';

// Elegant entrance curtain
const CurtainReveal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 3.5,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.5,
        }}
        style={{
          background: 'linear-gradient(to right, rgba(80, 25, 35, 0.3), rgba(100, 30, 40, 0.2))',
          backdropFilter: 'blur(8px)',
          boxShadow: '15px 0 60px rgba(120, 40, 50, 0.25), inset -40px 0 100px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0, 0, 0, 0.08) 3px, rgba(0, 0, 0, 0.08) 6px)',
             }} />
        <div className="absolute inset-0 opacity-12"
             style={{
               background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.06) 100%)',
             }} />
        <div className="absolute right-0 top-0 bottom-0 w-1"
             style={{
               background: 'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 55, 0.3) 20%, rgba(212, 175, 55, 0.3) 80%, transparent 100%)',
               boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
             }} />
      </motion.div>

      <motion.div
        className="w-1/2 h-full relative overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{
          duration: 3.5,
          ease: [0.43, 0.13, 0.23, 0.96],
          delay: 0.5,
        }}
        style={{
          background: 'linear-gradient(to left, rgba(80, 25, 35, 0.3), rgba(100, 30, 40, 0.2))',
          backdropFilter: 'blur(8px)',
          boxShadow: '-15px 0 60px rgba(120, 40, 50, 0.25), inset 40px 0 100px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="absolute inset-0 opacity-20"
             style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0, 0, 0, 0.08) 3px, rgba(0, 0, 0, 0.08) 6px)',
             }} />
        <div className="absolute inset-0 opacity-12"
             style={{
               background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.06) 100%)',
             }} />
        <div className="absolute left-0 top-0 bottom-0 w-1"
             style={{
               background: 'linear-gradient(to bottom, transparent 0%, rgba(212, 175, 55, 0.3) 20%, rgba(212, 175, 55, 0.3) 80%, transparent 100%)',
               boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
             }} />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.8, duration: 1.2 }}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-6xl mb-4"
          >
            🕯️
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-zinc-400 font-serif text-lg"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
          >
            Loading...
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface GildedParlourProps extends NavigationProps {
  postId?: string;
}

export const GildedParlour: React.FC<GildedParlourProps> = ({ go, postId }) => {
  const [filters, setFilters] = useState<ForumFiltersType>({ sortBy: 'recent' });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [viewingPostId, setViewingPostId] = useState<string | undefined>(postId);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCurtain, setShowCurtain] = useState(true);

  const { posts: allPosts, loading, hasMore, error, loadMore, createPost, refreshPosts } = useForumPosts(filters);
  const { post, replies, loading: postLoading } = useForumPost(viewingPostId);

  const posts = useMemo(() => {
    if (!searchQuery.trim()) return allPosts;
    const query = searchQuery.toLowerCase();
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.authorName.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [allPosts, searchQuery]);

  const handleCreatePost = useCallback(async (data: any) => {
    await createPost({
      title: data.title as string,
      content: data.content as string,
      tags: data.tags as string[],
    });
    setIsCreateModalOpen(false);
  }, [createPost]);

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

  const handlePostClick = useCallback((id: string) => {
    setViewingPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackToList = useCallback(() => {
    setViewingPostId(undefined);
    refreshPosts();
  }, [refreshPosts]);

  // Single post view
  if (viewingPostId) {
    return (
      <section
        className="relative min-h-screen px-6 py-16"
        style={{
          background: 'linear-gradient(180deg, #1a1410 0%, #0f0b08 100%)',
          color: '#e8dcc8',
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          {postLoading ? (
            <div className="flex items-center justify-center py-20">
              <p style={{ color: '#8B7355' }}>Loading discussion...</p>
            </div>
          ) : post ? (
            <>
              <PostView post={post} onBack={handleBackToList} />
              <div className="mt-12">
                <ReplySection
                  postId={post.id}
                  replies={replies}
                  onReplyAdded={() => window.location.reload()}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p style={{ color: '#8B7355' }}>Discussion not found.</p>
              <button
                onClick={handleBackToList}
                className="mt-4 flex items-center gap-2 transition-colors mx-auto"
                style={{ color: '#8B7355' }}
              >
                <span>←</span>
                <span>Back to Discussions</span>
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Main forum view
  return (
    <>
      <AnimatePresence>
        {showCurtain && <CurtainReveal onComplete={() => setShowCurtain(false)} />}
      </AnimatePresence>

      <section
        className="relative min-h-screen"
        style={{
          background: 'linear-gradient(180deg, #1a1410 0%, #0f0b08 100%)',
        }}
      >
        {/* Warm ambient glow */}
        <div className="fixed inset-0 pointer-events-none opacity-30"
             style={{
               background: 'radial-gradient(ellipse 1200px 800px at 50% 0%, rgba(139, 115, 85, 0.15), transparent 60%)',
             }} />

        {/* Film grain texture */}
        <div 
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" /></filter><rect width="100%" height="100%" filter="url(%23noise)"/></svg>')`,
            opacity: 0.02,
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12">
          {/* Refined header */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => go?.('landing')} 
                className="flex items-center gap-2 transition-colors hover:text-bone-DEFAULT text-bone-dark"
              >
                <span>←</span>
                <span className="text-sm">Back</span>
              </button>
              
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-6 py-2.5 rounded transition-all duration-300 hover:bg-[rgba(139,115,85,0.25)] hover:border-[rgba(201,184,150,0.5)]"
                style={{
                  background: 'rgba(139, 115, 85, 0.15)',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  color: '#c9b896',
                }}
              >
                <span className="text-sm font-medium">New Discussion</span>
              </button>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl sm:text-5xl font-serif mb-3"
                  style={{ color: '#e8dcc8', letterSpacing: '0.02em' }}>
                Discussions
              </h1>
              <p className="text-sm" style={{ color: '#8B7355' }}>
                Share your thoughts on stories and connect with fellow readers
              </p>
            </div>

            {/* Search and filters */}
            <div className="max-w-2xl mx-auto space-y-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions..."
                className="w-full px-4 py-3 rounded transition-all focus:outline-none"
                style={{
                  background: 'rgba(30, 20, 15, 0.5)',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  color: '#e8dcc8',
                }}
              />
              
              <ForumFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </header>

          {/* Error state */}
          {error && (
            <div 
              className="mb-8 p-4 rounded text-center"
              style={{
                background: 'rgba(139, 69, 19, 0.15)',
                border: '1px solid rgba(139, 115, 85, 0.3)',
                color: '#c9b896',
              }}
            >
              {error}
            </div>
          )}

          {/* Search results info */}
          {searchQuery && !loading && (
            <div className="mb-6 text-sm text-center" style={{ color: '#8B7355' }}>
              {posts.length === 0 
                ? `No discussions found for "${searchQuery}"`
                : `Found ${posts.length} discussion${posts.length !== 1 ? 's' : ''}`
              }
            </div>
          )}

          {/* Discussion list */}
          <ForumList
            posts={posts}
            loading={loading}
            onPostClick={handlePostClick}
          />

          {/* Load more */}
          {hasMore && !loading && posts.length > 0 && (
            <div className="flex justify-center mt-12">
              <button
                onClick={loadMore}
                className="px-8 py-3 rounded transition-all hover:scale-105 active:scale-95"
                style={{
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  background: 'rgba(30, 20, 15, 0.4)',
                  color: '#c9b896',
                }}
              >
                Load More
              </button>
            </div>
          )}
        </div>

        <UnifiedWritingModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
          title="New Post"
          submitButtonText="Post"
          submittingText="Posting..."
          fields={forumFields}
          showFormatting={true}
          showWordCount={true}
          minContentLength={10}
          accentColor="#8B7355"
        />
      </section>
    </>
  );
};
