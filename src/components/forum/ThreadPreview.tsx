/**
 * ThreadPreview Component
 * Shows a preview of thread replies on hover
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ForumThread } from '../../types/forum';

interface ThreadPreviewProps {
  thread: ForumThread;
  replies: any[];
  loading: boolean;
}

export const ThreadPreview: React.FC<ThreadPreviewProps> = ({ replies, loading }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute left-0 right-0 top-full mt-2 p-4 rounded z-50"
        style={{
          background: 'rgba(10, 10, 10, 0.98)',
          border: '1px solid rgba(139, 115, 85, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-zinc-800/50 rounded w-1/4 mb-2" />
              <div className="h-4 bg-zinc-800/30 rounded w-full" />
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (replies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute left-0 right-0 top-full mt-2 p-4 rounded z-50 text-center"
        style={{
          background: 'rgba(10, 10, 10, 0.98)',
          border: '1px solid rgba(139, 115, 85, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <p className="text-sm text-zinc-500 font-serif">No replies yet</p>
      </motion.div>
    );
  }

  const previewReplies = replies.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute left-0 right-0 top-full mt-2 p-4 rounded z-50 max-w-2xl"
      style={{
        background: 'rgba(10, 10, 10, 0.98)',
        border: '1px solid rgba(139, 115, 85, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="mb-3 pb-2 border-b border-zinc-800/50">
        <p className="text-xs text-zinc-500 font-serif">
          Recent Replies ({replies.length})
        </p>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {previewReplies.map((reply, idx) => (
          <div key={reply.id || idx} className="pb-3 border-b border-zinc-900/50 last:border-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-medium text-zinc-400">
                {reply.authorName || 'Anonymous'}
              </span>
              <span className="text-xs text-zinc-700">·</span>
              <span className="text-xs text-zinc-600">
                {formatDate(reply.createdAt)}
              </span>
            </div>
            <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
              {reply.content}
            </p>
          </div>
        ))}
      </div>

      {replies.length > 3 && (
        <div className="mt-3 pt-3 border-t border-zinc-800/50 text-center">
          <p className="text-xs text-zinc-500">
            +{replies.length - 3} more {replies.length - 3 === 1 ? 'reply' : 'replies'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

function formatDate(date: any): string {
  try {
    if (!date) return 'recently';
    
    // Handle Firestore Timestamp
    const d = date.toDate ? date.toDate() : new Date(date);
    
    // Check if date is valid
    if (isNaN(d.getTime())) {
      return 'recently';
    }
    
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'recently';
  }
}
