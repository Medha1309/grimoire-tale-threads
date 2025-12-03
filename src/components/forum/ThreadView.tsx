/**
 * ThreadView Component
 * Displays full forum thread with clean, readable layout
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ForumThread } from '../../types/forum';
import { UserCameo } from '../shared/UserCameo';
import { CandleLike } from './CandleLike';
import { ShareTray } from './ShareTray';
import { ReportModal } from './ReportModal';
import { BackButton } from '../shared/BackButton';
import { fadeIn } from '../../utils/animations';

interface ThreadViewProps {
  thread: ForumThread;
  onBack?: () => void;
}

export const ThreadView: React.FC<ThreadViewProps> = ({ thread, onBack }) => {
  const [showShareTray, setShowShareTray] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto"
    >
      {/* Back Button */}
      {onBack && (
        <BackButton 
          onClick={onBack} 
          label="Back to Forum"
          variant="minimal"
          className="mb-6"
        />
      )}

      {/* Thread Card */}
      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-lg 
                      shadow-xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm">
        
        {/* Story Link (if associated with a story) */}
        {thread.storySlug && thread.storyTitle && (
          <div className="mb-6 pb-6 border-b border-zinc-800/40">
            <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
              Discussing
            </p>
            <p className="text-amber-300 font-serif text-lg">
              {thread.storyTitle}
            </p>
          </div>
        )}

        {/* Thread Title */}
        <h1 className="font-serif text-3xl md:text-4xl text-amber-200/90 
                       mb-6 leading-tight">
          {thread.title}
        </h1>

        {/* Tags */}
        {thread.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {thread.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-amber-900/20 
                           text-amber-300/80 border border-amber-700/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Thread Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-zinc-300 text-base md:text-lg 
                        leading-relaxed whitespace-pre-wrap">
            {thread.content}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/40 my-8" />

        {/* Actions Row */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <CandleLike
            targetId={thread.id}
            targetType="post"
            initialLikeCount={thread.likeCount}
          />
          
          <button
            onClick={() => setShowShareTray(true)}
            className="flex flex-col items-center gap-1 group"
            title="Share"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">↗</span>
            <span className="text-xs text-zinc-500 group-hover:text-amber-300 
                           transition-colors uppercase tracking-wide">
              Share
            </span>
          </button>

          <button
            onClick={() => setShowReportModal(true)}
            className="flex flex-col items-center gap-1 group"
            title="Report"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">!</span>
            <span className="text-xs text-zinc-500 group-hover:text-red-400 
                           transition-colors uppercase tracking-wide">
              Report
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/40 my-8" />

        {/* Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCameo
              displayName={thread.authorName}
              photoURL={thread.authorAvatar}
              size="md"
            />
            <div>
              <p className="text-zinc-300 text-sm">
                {thread.authorName}
              </p>
              <p className="text-zinc-500 text-xs">
                {formatDate(thread.createdAt)}
              </p>
            </div>
          </div>

          {/* Reply Count */}
          <div className="text-right">
            <p className="text-zinc-500 text-sm">
              {thread.replyCount} {thread.replyCount === 1 ? 'Reply' : 'Replies'}
            </p>
          </div>
        </div>
      </div>

      {/* Share Tray */}
      <ShareTray
        isOpen={showShareTray}
        onClose={() => setShowShareTray(false)}
        postId={thread.id}
        postTitle={thread.title}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetId={thread.id}
        targetType="post"
      />
    </motion.div>
  );
};

// Alias for backward compatibility
export const PostView = ThreadView;

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
