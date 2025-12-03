/**
 * PostView Component
 * Displays full forum post/thread in clean layout
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForumThread } from '../../types/forum';
import { UserCameo } from '../shared/UserCameo';
import { CandleLike } from './CandleLike';
import { ShareTray } from './ShareTray';
import { ReportModal } from './ReportModal';
import { BackButton } from '../shared/BackButton';
import { fadeIn } from '../../utils/animations';
import { useAuth } from '../../contexts/AuthContext';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UnifiedWritingModal, WritingModalField } from '../shared/UnifiedWritingModal';
import { FORUM_TAGS } from '../../types/forum';
import { useUndoDelete } from '../../hooks/useUndoDelete';
import { useToast } from '../../hooks/useToast';

interface PostViewProps {
  post: ForumThread;
  onBack?: () => void;
  onDeleted?: () => void;
  onUpdated?: () => void;
}

// Alias for new naming
export interface ThreadViewProps {
  thread: ForumThread;
  onBack?: () => void;
}

export const PostView: React.FC<PostViewProps> = ({ post, onBack, onDeleted, onUpdated }) => {
  const { currentUser } = useAuth();
  const [showShareTray, setShowShareTray] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { softDelete, undo } = useUndoDelete();
  const { showSuccess, showError } = useToast();
  
  const isAuthor = currentUser?.uid === post.authorId;

  const handleDelete = async () => {
    if (!isAuthor) return;
    
    setShowDeleteConfirm(false);
    
    // Soft delete with undo option
    softDelete(
      { id: post.id, type: 'thread', data: post },
      async () => {
        // Actually delete after 5 seconds
        try {
          await deleteDoc(doc(db, 'forum_posts', post.id));
          onDeleted?.();
          onBack?.();
        } catch (err) {
          console.error('Failed to delete post:', err);
          showError('Failed to delete thread');
        }
      }
    );
    
    // Show toast with undo button
    showSuccess('Thread deleted', {
      action: { label: 'Undo', onClick: undo },
      duration: 5000,
    });
  };

  const handleEdit = async (data: any) => {
    if (!isAuthor) return;
    
    try {
      await updateDoc(doc(db, 'forum_posts', post.id), {
        title: data.title,
        content: data.content,
        tags: data.tags || [],
        updatedAt: new Date(),
      });
      onUpdated?.();
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update post:', err);
      throw err;
    }
  };

  const editFields: WritingModalField[] = [
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

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Back Button */}
      {onBack && (
        <BackButton 
          onClick={onBack} 
          label="Back to Tea Room"
          className="mb-8"
        />
      )}

      {/* Post Card - Gatsby-Level Refined Styling */}
      <motion.div 
        className="relative backdrop-blur-md overflow-hidden transition-all duration-500"
        animate={{
          boxShadow: isHovered 
            ? '0 12px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(212, 175, 55, 0.08), 0 0 60px rgba(212, 175, 55, 0.05)'
            : '0 8px 32px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(212, 175, 55, 0.05)',
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.88) 0%, rgba(20, 10, 10, 0.88) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.22)',
          borderRadius: '2px',
          padding: '56px 64px',
        }}>
        
        {/* Sophisticated corner brackets */}
        <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 opacity-40 transition-opacity duration-300"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 opacity-40 transition-opacity duration-300"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 opacity-40 transition-opacity duration-300"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 opacity-40 transition-opacity duration-300"
             style={{ borderColor: '#d4af37' }} />
        
        {/* Refined corner embellishments */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-[#d4af37]/25 rounded-full" />
        <div className="absolute top-4 right-4 w-2 h-2 bg-[#d4af37]/25 rounded-full" />
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#d4af37]/25 rounded-full" />
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#d4af37]/25 rounded-full" />
        
        {/* Additional decorative lines */}
        <div className="absolute top-4 left-14 w-8 h-px bg-[#d4af37]/20" />
        <div className="absolute top-4 right-14 w-8 h-px bg-[#d4af37]/20" />
        <div className="absolute bottom-4 left-14 w-8 h-px bg-[#d4af37]/20" />
        <div className="absolute bottom-4 right-14 w-8 h-px bg-[#d4af37]/20" />
        
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/8 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6a0000]/8 blur-3xl rounded-full pointer-events-none" />
        
        {/* Film grain texture (cohesion with Dollhouse) */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        
        {/* Refined top ornament */}
        <div className="relative flex justify-center items-center mb-12">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <div className="mx-5 flex items-center gap-2">
            <div className="text-[#d4af37]/40 text-xs">✦</div>
            <div className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
            <div className="text-[#d4af37]/40 text-xs">✦</div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        </div>

        {/* Post Title - Enhanced Typography */}
        <h1 
          className="relative font-serif text-4xl md:text-5xl text-center mb-8 leading-tight
                     tracking-wide"
          style={{
            color: '#f5f5f5',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1)',
            letterSpacing: '0.02em',
          }}
        >
          {post.title}
        </h1>

        {/* Tags - Refined Styling */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-4 py-2 font-serif tracking-wider
                           transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(139, 0, 0, 0.08) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '2px',
                  color: '#d4af37',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Content - Enhanced Readability */}
        <div className="relative prose prose-invert max-w-none mb-12">
          <div 
            className="text-base md:text-lg leading-relaxed whitespace-pre-wrap
                       max-w-[68ch] mx-auto font-serif"
            style={{
              color: '#e5e5e5',
              lineHeight: '1.9',
              letterSpacing: '0.01em',
            }}
          >
            {post.content}
          </div>
        </div>

        {/* Elegant divider */}
        <div className="relative flex justify-center items-center my-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
          <div className="absolute text-[#d4af37]/40 text-xs bg-black/80 px-3">✦</div>
        </div>

        {/* Actions Row - Refined Buttons */}
        <div className="flex items-center justify-center gap-8 mb-10">
          <CandleLike
            targetId={post.id}
            targetType="post"
            initialLikeCount={post.likeCount}
          />
          
          <button
            onClick={() => setShowShareTray(true)}
            className="flex flex-col items-center gap-2 group relative"
            title="Share this post"
          >
            <div className="relative">
              <span className="text-2xl group-hover:scale-110 transition-all duration-300"
                    style={{ color: '#d4af37' }}>
                ↗
              </span>
              <div className="absolute inset-0 bg-[#d4af37]/20 blur-lg opacity-0 
                            group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xs font-serif tracking-widest uppercase
                           transition-colors duration-300"
                  style={{ color: '#a1a1a1' }}>
              Share
            </span>
          </button>

          {isAuthor && (
            <>
              <button
                onClick={() => setShowEditModal(true)}
                className="flex flex-col items-center gap-2 group relative"
                title="Edit this post"
              >
                <div className="relative">
                  <span className="text-2xl group-hover:scale-110 transition-all duration-300"
                        style={{ color: '#d4af37' }}>
                    ✎
                  </span>
                  <div className="absolute inset-0 bg-[#d4af37]/20 blur-lg opacity-0 
                                group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-serif tracking-widest uppercase
                               transition-colors duration-300"
                      style={{ color: '#a1a1a1' }}>
                  Edit
                </span>
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex flex-col items-center gap-2 group relative"
                title="Delete this post"
              >
                <div className="relative">
                  <span className="text-2xl group-hover:scale-110 transition-all duration-300"
                        style={{ color: '#8B0000' }}>
                    ×
                  </span>
                  <div className="absolute inset-0 bg-[#8B0000]/20 blur-lg opacity-0 
                                group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-xs font-serif tracking-widest uppercase
                               transition-colors duration-300"
                      style={{ color: '#a1a1a1' }}>
                  Delete
                </span>
              </button>
            </>
          )}

          {!isAuthor && (
            <button
              onClick={() => setShowReportModal(true)}
              className="flex flex-col items-center gap-2 group relative"
              title="Report this post"
            >
              <div className="relative">
                <span className="text-2xl group-hover:scale-110 transition-all duration-300"
                      style={{ color: '#8B0000' }}>
                  !
                </span>
                <div className="absolute inset-0 bg-[#8B0000]/20 blur-lg opacity-0 
                              group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-xs font-serif tracking-widest uppercase
                             transition-colors duration-300"
                    style={{ color: '#a1a1a1' }}>
                Report
              </span>
            </button>
          )}
        </div>

        {/* Elegant divider */}
        <div className="relative flex justify-center items-center my-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent" />
        </div>

        {/* Author Signature - Enhanced Layout */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserCameo
              displayName={post.authorName}
              photoURL={post.authorAvatar}
              size="md"
              onClick={() => window.location.href = `/profile/${post.authorId}`}
            />
            <div>
              <button
                onClick={() => window.location.href = `/profile/${post.authorId}`}
                className="font-serif tracking-wide hover:underline transition-all"
                style={{ color: '#d4af37', fontSize: '0.95rem' }}
              >
                {post.authorName}
              </button>
              <p className="text-xs font-serif tracking-wider mt-1"
                 style={{ color: '#6a6a6a' }}>
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          {/* Reply Count - Refined */}
          <div className="text-right">
            <p className="text-sm font-serif tracking-wide"
               style={{ color: '#8a8a8a' }}>
              {post.replyCount} {post.replyCount === 1 ? 'Reply' : 'Replies'}
            </p>
          </div>
        </div>

        {/* Refined bottom ornament */}
        <div className="relative flex justify-center items-center mt-12">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
          <div className="mx-5 flex items-center gap-2">
            <div className="text-[#d4af37]/40 text-xs">✦</div>
            <div className="w-1 h-1 rounded-full bg-[#d4af37]/30" />
            <div className="text-[#d4af37]/40 text-xs">✦</div>
          </div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
        </div>
      </motion.div>

      {/* Share Tray */}
      <ShareTray
        isOpen={showShareTray}
        onClose={() => setShowShareTray(false)}
        postId={post.id}
        postTitle={post.title}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetId={post.id}
        targetType="post"
      />

      {/* Edit Modal */}
      <UnifiedWritingModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEdit}
        title="Edit Post"
        submitButtonText="Save Changes"
        submittingText="Saving..."
        fields={editFields}
        initialValues={{
          title: post.title,
          content: post.content,
          tags: post.tags,
        }}
        showFormatting={true}
        showWordCount={true}
        minContentLength={10}
        accentColor="#6a0000"
      />

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteConfirm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                         p-8 w-full max-w-md rounded-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 10, 10, 0.95) 100%)',
                border: '2px solid rgba(139, 0, 0, 0.5)',
                boxShadow: '0 0 40px rgba(139, 0, 0, 0.3)',
              }}
            >
              <h3 className="font-serif text-2xl mb-4" style={{ color: '#8B0000' }}>
                Delete Post?
              </h3>
              <p className="text-zinc-300 font-serif mb-6">
                This action cannot be undone. Your post and all its replies will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 border border-zinc-700 rounded-md 
                             text-zinc-300 font-serif text-sm
                             hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 px-6 py-3 bg-[#8B0000]/30 border border-[#8B0000]/50 
                             rounded-md text-white font-serif text-sm
                             hover:bg-[#8B0000]/40 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
    
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
}

/**
 * ThreadView - Preferred name going forward
 * Alias of PostView for consistency with ForumThread naming
 * 
 * Use this component name in new code for clarity.
 */
export const ThreadView: React.FC<ThreadViewProps> = ({ thread, onBack }) => {
  return <PostView post={thread} onBack={onBack} onDeleted={onBack} />;
};
