/**
 * ForumList Component
 * Sophisticated magazine-style discussion layout with interactive previews
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ForumThread } from '../../types/forum';
import { ThreadPreview } from './ThreadPreview';
import { useThreadActivity } from '../../hooks/useThreadActivity';

interface ForumListProps {
  posts: ForumThread[];
  loading: boolean;
  onPostClick: (threadId: string) => void;
}

export const ForumList: React.FC<ForumListProps> = ({ posts, loading, onPostClick }) => {
  const [hoveredThread, setHoveredThread] = useState<string | null>(null);
  const [previewReplies, setPreviewReplies] = useState<any[]>([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const { hasNewActivity, markThreadViewed } = useThreadActivity(posts);

  // Fetch preview replies when hovering
  const handleThreadHover = async (threadId: string) => {
    setHoveredThread(threadId);
    setPreviewLoading(true);
    
    try {
      // Fetch real replies from Firebase
      const { collection, query, where, orderBy, limit, getDocs } = await import('firebase/firestore');
      const { db } = await import('../../lib/firebase');
      
      const repliesRef = collection(db, 'forum_replies');
      const repliesQuery = query(
        repliesRef,
        where('threadId', '==', threadId),
        orderBy('createdAt', 'desc'),
        limit(3)
      );
      
      const snapshot = await getDocs(repliesQuery);
      const replies = snapshot.docs.map(doc => ({
        id: doc.id,
        authorName: doc.data().authorName || 'Anonymous',
        content: doc.data().content || '',
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }));
      
      setPreviewReplies(replies);
    } catch (error) {
      console.error('Error fetching preview replies:', error);
      setPreviewReplies([]);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleThreadClick = (threadId: string) => {
    markThreadViewed(threadId);
    onPostClick(threadId);
  };
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="p-8 rounded"
            style={{
              background: 'rgba(30, 20, 15, 0.4)',
              border: '1px solid rgba(139, 115, 85, 0.15)',
            }}
          >
            <div className="h-8 bg-zinc-800/30 rounded w-2/3 mb-4" />
            <div className="h-4 bg-zinc-800/20 rounded w-full mb-2" />
            <div className="h-4 bg-zinc-800/20 rounded w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="text-center max-w-md">
          <p className="text-2xl mb-3 font-serif" style={{ color: '#c9b896' }}>
            No discussions yet
          </p>
          <p className="text-sm" style={{ color: '#8B7355' }}>
            Start a conversation and share your thoughts
          </p>
        </div>
      </div>
    );
  }

  // Magazine-style layout: featured post, then grid
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="space-y-8">
      {/* Featured Discussion - Large format */}
      {featuredPost && (
        <article
          onClick={() => handleThreadClick(featuredPost.id)}
          onMouseEnter={() => handleThreadHover(featuredPost.id)}
          onMouseLeave={() => setHoveredThread(null)}
          className="group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 30, 25, 0.6) 0%, rgba(30, 20, 15, 0.7) 100%)',
            border: '1px solid rgba(139, 115, 85, 0.2)',
            borderLeft: '3px solid rgba(201, 184, 150, 0.4)',
            borderRadius: '2px',
            padding: '48px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Subtle corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none"
               style={{
                 background: 'radial-gradient(circle at top right, rgba(201, 184, 150, 0.4), transparent 70%)',
               }} />
          
          {/* Featured badge */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(201, 184, 150, 0.3), transparent)' }} />
            <span className="text-xs tracking-widest font-medium" style={{ color: '#c9b896' }}>
              FEATURED DISCUSSION
            </span>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(201, 184, 150, 0.3))' }} />
          </div>

          {renderDiscussionContent(featuredPost, true, hasNewActivity(featuredPost.id))}
          
          {/* Thread Preview */}
          <AnimatePresence>
            {hoveredThread === featuredPost.id && (
              <ThreadPreview
                thread={featuredPost}
                replies={previewReplies}
                loading={previewLoading}
              />
            )}
          </AnimatePresence>
        </article>
      )}

      {/* Regular Discussions - Magazine grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {regularPosts.map((thread, idx) => {
          const isLarge = idx % 5 === 0; // Every 5th post is larger
          
          return (
            <article
              key={thread.id}
              onClick={() => handleThreadClick(thread.id)}
              onMouseEnter={() => handleThreadHover(thread.id)}
              onMouseLeave={() => setHoveredThread(null)}
              className={`group relative cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isLarge ? 'lg:col-span-2' : ''
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(35, 25, 20, 0.5) 0%, rgba(25, 18, 15, 0.6) 100%)',
                border: '1px solid rgba(139, 115, 85, 0.15)',
                borderLeft: '2px solid rgba(139, 115, 85, 0.25)',
                borderRadius: '2px',
                padding: isLarge ? '40px' : '32px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(232, 197, 71, 0.4)',
              }}
            >
              {/* Elegant corner accents - subtle */}
              <div className="absolute top-0 left-0 w-12 h-12 opacity-8 pointer-events-none"
                   style={{
                     background: 'linear-gradient(135deg, rgba(201, 184, 150, 0.15), transparent)',
                   }} />
              
              {renderDiscussionContent(thread, isLarge, hasNewActivity(thread.id))}
              
              {/* Thread Preview */}
              <AnimatePresence>
                {hoveredThread === thread.id && (
                  <ThreadPreview
                    thread={thread}
                    replies={previewReplies}
                    loading={previewLoading}
                  />
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to render discussion content
function renderDiscussionContent(thread: ForumThread, isFeatured: boolean, hasNewActivity: boolean) {
  const isPopular = thread.likeCount > 15;
  
  return (
    <>
      {/* Story association */}
      {thread.storySlug && thread.storyTitle && (
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wide font-medium flex items-center gap-2"
             style={{ color: '#8B7355' }}>
            <span style={{ color: '#c9b896' }}>→</span>
            <span>Discussing</span>
            <span style={{ color: '#c9b896' }}>{thread.storyTitle}</span>
          </p>
        </div>
      )}

      {/* Title */}
      <h3 
        className={`font-serif mb-4 line-clamp-2 group-hover:text-[#c9b896] transition-colors duration-300 ${
          isFeatured ? 'text-3xl' : 'text-xl'
        }`}
        style={{
          color: '#e8dcc8',
          lineHeight: '1.3',
        }}
      >
        {thread.title}
      </h3>

      {/* Content preview */}
      <p className={`leading-relaxed mb-6 font-serif ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}
         style={{
           color: '#b8a88a',
           lineHeight: '1.7',
         }}>
        {thread.content}
      </p>

      {/* Tags */}
      {thread.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {thread.tags.slice(0, isFeatured ? 4 : 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1.5 font-medium transition-colors duration-300"
              style={{
                background: 'rgba(139, 115, 85, 0.15)',
                border: '1px solid rgba(139, 115, 85, 0.25)',
                borderRadius: '2px',
                color: '#a89878',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="mb-5 h-px" style={{ 
        background: 'linear-gradient(90deg, transparent 0%, rgba(139, 115, 85, 0.2) 50%, transparent 100%)',
      }} />

      {/* Meta Info */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span style={{ color: '#a89878' }}>{thread.authorName}</span>
          <span style={{ color: '#6a5d4f' }}>·</span>
          <span style={{ color: '#8B7355' }}>{formatDate(thread.createdAt)}</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5" style={{ color: '#8B7355' }}>
            <span>♥</span>
            <span>{thread.likeCount}</span>
          </span>
          <span className="flex items-center gap-1.5" style={{ color: '#8B7355' }}>
            <span>↵</span>
            <span>{thread.replyCount}</span>
          </span>
          <span className="flex items-center gap-1.5" style={{ color: '#6a5d4f' }}>
            <span>{Math.ceil(thread.content.length / 200)} min read</span>
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-6 right-6 flex gap-2">
        {hasNewActivity && (
          <div className="px-3 py-1.5 text-xs tracking-wide font-medium flex items-center gap-1.5"
               style={{
                 background: 'rgba(220, 38, 38, 0.15)',
                 border: '1px solid rgba(220, 38, 38, 0.3)',
                 borderRadius: '2px',
                 color: '#ef4444',
               }}>
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            New
          </div>
        )}
        {isPopular && (
          <div className="px-3 py-1.5 text-xs tracking-wide font-medium"
               style={{
                 background: 'rgba(201, 184, 150, 0.15)',
                 border: '1px solid rgba(201, 184, 150, 0.3)',
                 borderRadius: '2px',
                 color: '#c9b896',
               }}>
            Popular
          </div>
        )}
      </div>
    </>
  );
}

function formatDate(date: Date | any): string {
  try {
    // Handle Firestore Timestamp
    if (date && typeof date.toDate === 'function') {
      date = date.toDate();
    }
    
    // Ensure we have a valid Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return 'Recently';
    }
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
}
