/**
 * ReplySection Component
 * Displays nested reply threads with max 3 levels
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForumReply } from '../../types/forum';
import { UserCameo } from '../shared/UserCameo';
import { CandleLike } from './CandleLike';
import { useAuth } from '../../contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { staggerItem } from '../../utils/animations';
import { useUndoDelete } from '../../hooks/useUndoDelete';
import { useToast } from '../../hooks/useToast';

interface ReplyNode {
  reply: ForumReply;
  children: ReplyNode[];
}

interface ReplySectionProps {
  postId: string;
  replies: ReplyNode[];
  onReplyAdded?: () => void;
  onReplyDeleted?: (replyId: string) => void;
}

export const ReplySection: React.FC<ReplySectionProps> = ({ 
  postId, 
  replies,
  onReplyAdded,
  onReplyDeleted
}) => {
  const { currentUser, userProfile } = useAuth();
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);

  const handleSubmitReply = async (e: React.FormEvent, parentReplyId?: string) => {
    e.preventDefault();
    
    if (!currentUser || !userProfile) {
      setError('Please sign in to reply.');
      return;
    }

    // Ensure displayName exists
    if (!userProfile.displayName || userProfile.displayName.trim() === '') {
      setError('Your profile is incomplete. Please update your display name in settings.');
      return;
    }

    if (replyContent.trim().length < 3) {
      setError('Your reply must be at least 3 characters.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Import security middleware
      const { checkActionPermission } = await import('../../middleware/securityMiddleware');
      
      // Check rate limit (replies use COMMENT_CREATE limit)
      const rateLimitCheck = checkActionPermission(currentUser.uid, 'COMMENT_CREATE', replyContent.trim());
      if (!rateLimitCheck.allowed) {
        setError(rateLimitCheck.error || 'Rate limit exceeded');
        setSubmitting(false);
        return;
      }

      const replyData = {
        postId,
        parentReplyId: parentReplyId || null,
        authorId: currentUser.uid,
        authorName: userProfile.displayName.trim(),
        authorAvatar: userProfile.photoURL || '',
        content: replyContent.trim(),
        likeCount: 0,
        createdAt: serverTimestamp(),
        depth: parentReplyId ? 1 : 0,
      };

      console.log('Creating reply with data:', replyData);

      await addDoc(collection(db, 'forum_replies'), replyData);
      
      console.log('Reply created successfully');

      // Update post reply count
      const postRef = doc(db, 'forum_posts', postId);
      await updateDoc(postRef, {
        replyCount: increment(1)
      });

      setReplyContent('');
      setReplyingTo(null);
      onReplyAdded?.();
    } catch (err: any) {
      console.error('Error submitting reply:', err);
      console.error('Error code:', err.code);
      console.error('Error message:', err.message);
      
      // Provide more specific error messages
      if (err.code === 'permission-denied') {
        setError('You don\'t have permission to post replies. Please check your account status.');
      } else if (err.code === 'unauthenticated') {
        setError('Please sign in to reply.');
      } else {
        setError('Failed to post reply. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuote = (reply: ForumReply) => {
    setReplyingTo({ id: reply.id, name: reply.authorName });
    setReplyContent(`@${reply.authorName}: "${reply.content.substring(0, 100)}${reply.content.length > 100 ? '...' : ''}"\n\n`);
    // Scroll to reply form
    document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="mt-12">
      {/* Divider */}
      <div className="border-t border-candle-gold/20 mb-8" />

      {/* Replies List */}
      {replies.length > 0 && (
        <div className="space-y-6 mb-12">
          <h3 className="font-serif text-2xl mb-6"
              style={{ color: '#d4af37' }}>
            Replies <span className="text-zinc-400 text-lg">({replies.length})</span>
          </h3>
          
          <AnimatePresence>
            {replies.map(node => (
              <ReplyCard 
                key={node.reply.id} 
                node={node} 
                depth={0}
                onQuote={handleQuote}
                onReply={(replyId, authorName) => {
                  setReplyingTo({ id: replyId, name: authorName });
                  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                onReplyDeleted={onReplyDeleted}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Reply Form - Refined Tea Room Styling */}
      <div className="relative backdrop-blur-sm overflow-hidden"
           style={{
             background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 10, 10, 0.7) 100%)',
             border: '1px solid rgba(212, 175, 55, 0.25)',
             borderRadius: '2px',
             padding: '32px',
           }}>
        
        {/* Ornate corners */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l opacity-30"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r opacity-30"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l opacity-30"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r opacity-30"
             style={{ borderColor: '#d4af37' }} />
        
        {/* Film grain texture (cohesion with Dollhouse) */}
        <div 
          className="absolute inset-0 opacity-[0.01] pointer-events-none rounded-sm"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        
        <h3 className="font-serif text-xl mb-5 tracking-wide"
            style={{ color: '#d4af37' }}>
          {replyingTo ? `Replying to ${replyingTo.name}` : 'Leave a Reply'}
        </h3>
        
        {replyingTo && (
          <div className="mb-4 flex items-center justify-between p-3 rounded-sm"
               style={{
                 background: 'rgba(212, 175, 55, 0.1)',
                 border: '1px solid rgba(212, 175, 55, 0.2)',
               }}>
            <span className="text-sm font-serif" style={{ color: '#d4af37' }}>
              Replying to {replyingTo.name}
            </span>
            <button
              onClick={() => {
                setReplyingTo(null);
                setReplyContent('');
              }}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}
        
        <form onSubmit={(e) => handleSubmitReply(e, replyingTo?.id)} className="space-y-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder={currentUser ? "Share your thoughts..." : "Sign in to reply"}
            rows={4}
            className="w-full px-4 py-3 rounded-sm text-sm font-serif
                       focus:outline-none resize-none transition-all"
            style={{
              background: 'rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              color: '#e5e5e5',
            }}
            disabled={!currentUser || submitting}
          />
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-serif"
              style={{ color: '#8B0000' }}
            >
              {error}
            </motion.p>
          )}
          
          <div className="flex items-center justify-between">
            <p className="text-xs font-serif" style={{ color: '#6a6a6a' }}>
              {replyContent.length > 0 && `${replyContent.length} characters`}
            </p>
            <button
              type="submit"
              disabled={!currentUser || submitting || replyContent.trim().length < 3}
              className="px-6 py-2.5 rounded-sm text-sm font-serif tracking-wide
                         transition-all disabled:opacity-50 disabled:cursor-not-allowed
                         uppercase"
              style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(139, 0, 0, 0.15) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                color: '#d4af37',
              }}
            >
              {submitting ? 'Posting...' : 'Reply'}
            </button>
          </div>
        </form>
      </div>

      {/* Empty State */}
      {replies.length === 0 && (
        <div className="text-center py-8">
          <p className="font-serif italic text-sm" style={{ color: '#6a6a6a' }}>
            No replies yet. Be the first to share your thoughts.
          </p>
        </div>
      )}
    </div>
  );
};

interface ReplyCardProps {
  node: ReplyNode;
  depth: number;
  onQuote: (reply: ForumReply) => void;
  onReply: (replyId: string, authorName: string) => void;
  onReplyDeleted?: (replyId: string) => void;
}

const ReplyCard: React.FC<ReplyCardProps> = ({ node, depth, onQuote, onReply, onReplyDeleted }) => {
  const { currentUser } = useAuth();
  const [showChildren, setShowChildren] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { softDelete, undo } = useUndoDelete();
  const { showSuccess, showError } = useToast();
  const { reply, children } = node;
  
  const isAuthor = currentUser?.uid === reply.authorId;

  const handleDelete = async () => {
    if (!isAuthor) return;
    
    setShowDeleteConfirm(false);
    
    // Soft delete with undo option
    softDelete(
      { id: reply.id, type: 'reply', data: reply },
      async () => {
        // Actually delete after 5 seconds
        try {
          await deleteDoc(doc(db, 'forum_replies', reply.id));
          if (onReplyDeleted) {
            onReplyDeleted(reply.id);
          }
        } catch (err) {
          console.error('Failed to delete reply:', err);
          showError('Failed to delete reply');
        }
      }
    );
    
    // Show toast with undo button
    showSuccess('Reply deleted', {
      action: { label: 'Undo', onClick: undo },
      duration: 5000,
    });
  };

  return (
    <motion.div
      variants={staggerItem}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ marginLeft: depth > 0 ? `${depth * 32}px` : '0' }}
      className={depth > 0 ? "border-l border-candle-gold/20 pl-6" : ""}
    >
      {/* Refined reply card */}
      <motion.div 
        className="group relative backdrop-blur-sm rounded-sm p-6
                   transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(20, 10, 10, 0.6) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.18)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(232, 197, 71, 0.4)',
        }}
        whileHover={{
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(232, 197, 71, 0.4)',
        }}
      >
        {/* Subtle corner accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t border-l opacity-20 group-hover:opacity-35 transition-opacity"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute top-1 right-1 w-3 h-3 border-t border-r opacity-20 group-hover:opacity-35 transition-opacity"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b border-l opacity-20 group-hover:opacity-35 transition-opacity"
             style={{ borderColor: '#d4af37' }} />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b border-r opacity-20 group-hover:opacity-35 transition-opacity"
             style={{ borderColor: '#d4af37' }} />
        {/* Refined reply header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <UserCameo
              displayName={reply.authorName}
              photoURL={reply.authorAvatar}
              size="sm"
              onClick={() => window.location.href = `/profile/${reply.authorId}`}
            />
            <div>
              <button
                onClick={() => window.location.href = `/profile/${reply.authorId}`}
                className="font-serif text-sm tracking-wide hover:underline transition-all"
                style={{ color: '#d4af37' }}
              >
                {reply.authorName}
              </button>
              <p className="font-serif text-xs mt-0.5" style={{ color: '#6a6a6a' }}>
                {formatDate(reply.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CandleLike
              targetId={reply.id}
              targetType="reply"
              initialLikeCount={reply.likeCount}
            />
            {currentUser && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuote(reply);
                  }}
                  className="text-bone-white/40 hover:text-candle-gold text-xs
                             font-inter transition-colors"
                  title="Quote this reply"
                >
                  Quote
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReply(reply.id, reply.authorName);
                  }}
                  className="text-bone-white/40 hover:text-candle-gold text-xs
                             font-inter transition-colors"
                  title="Reply to this"
                >
                  Reply
                </button>
              </>
            )}
            {isAuthor && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirm(true);
                }}
                className="text-bone-white/40 hover:text-crimson text-xs
                           font-inter transition-colors"
                title="Delete this reply"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Refined reply content */}
        <p className="font-serif text-sm leading-relaxed whitespace-pre-wrap pl-11"
           style={{
             color: '#d5d5d5',
             lineHeight: '1.8',
           }}>
          {reply.content}
        </p>

        {/* Refined toggle button */}
        {children.length > 0 && (
          <button
            onClick={() => setShowChildren(!showChildren)}
            className="mt-5 ml-11 text-xs font-serif tracking-wider transition-all duration-300 
                       flex items-center gap-2 hover:gap-3"
            style={{ color: '#8a8a8a' }}
          >
            <span className="text-[#d4af37] opacity-60">{showChildren ? '▼' : '▶'}</span>
            <span>{children.length} {children.length === 1 ? 'reply' : 'replies'}</span>
          </button>
        )}
      </motion.div>

      {/* Nested Replies - Flat list, no deep nesting */}
      {showChildren && children.length > 0 && (
        <div className="mt-4 space-y-4">
          {children.map(childNode => (
            <ReplyCard 
              key={childNode.reply.id} 
              node={childNode} 
              depth={0}
              onQuote={onQuote}
              onReply={onReply}
              onReplyDeleted={onReplyDeleted}
            />
          ))}
        </div>
      )}

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
                Delete Reply?
              </h3>
              <p className="text-zinc-300 font-serif mb-6">
                This action cannot be undone. Your reply will be permanently removed.
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
    
    const now = new Date();
    const diff = now.getTime() - dateObj.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Recently';
  }
}
