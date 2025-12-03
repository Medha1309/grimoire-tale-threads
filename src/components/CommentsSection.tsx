import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComments } from '../hooks/useComments';
import { CommentComponent } from './Comment';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui';

interface CommentsSectionProps {
  storyId: string;
  onLoginRequired: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  storyId,
  onLoginRequired,
}) => {
  const { currentUser } = useAuth();
  const {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    toggleLike,
    editComment,
    getReplies,
    getTopLevelComments,
  } = useComments(storyId);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const topLevelComments = getTopLevelComments();

  const handleSubmitComment = async () => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      setActionError(null);
      await addComment(newComment);
      setNewComment('');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitReply = async (parentId: string) => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    if (!replyText.trim()) return;

    try {
      setSubmitting(true);
      setActionError(null);
      await addComment(replyText, parentId);
      setReplyText('');
      setReplyingTo(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (parentId: string) => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }
    setReplyingTo(parentId);
  };

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      setActionError(null);
      await deleteComment(commentId);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete comment');
    }
  };

  const handleLike = async (commentId: string) => {
    if (!currentUser) {
      onLoginRequired();
      return;
    }

    try {
      setActionError(null);
      await toggleLike(commentId);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to toggle like');
    }
  };

  const handleEdit = async (commentId: string, text: string) => {
    try {
      setActionError(null);
      await editComment(commentId, text);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to edit comment');
    }
  };

  if (loading) {
    return (
      <div className="p-6 rounded-lg border border-zinc-900/60 bg-zinc-950/80">
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-red-900 border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg border border-zinc-900/60 bg-zinc-950/80">
      <h2 className="mb-6 font-serif text-xl text-zinc-300">
        Comments ({comments.length})
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-900/20 border border-red-900/50 text-red-400 text-sm">
          {error}
        </div>
      )}

      {actionError && (
        <div className="mb-4 p-3 rounded bg-red-900/20 border border-red-900/50 text-red-400 text-sm">
          {actionError}
        </div>
      )}

      {/* New comment form */}
      <div className="mb-6">
        {currentUser ? (
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this story..."
              className="w-full rounded border border-zinc-800 bg-black/40 px-4 py-3 text-sm text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-900/50"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || submitting}
                variant="danger"
                size="sm"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded border border-zinc-900/60 bg-black/40 p-4 text-center">
            <p className="mb-3 text-sm text-zinc-500">
              Sign in to join the discussion
            </p>
            <Button onClick={onLoginRequired} variant="danger" size="sm">
              Sign In
            </Button>
          </div>
        )}
      </div>

      {/* Comments list */}
      {topLevelComments.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-zinc-600">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {topLevelComments.map((comment) => (
              <div key={comment.id}>
                <CommentComponent
                  comment={comment}
                  onReply={handleReply}
                  onDelete={handleDelete}
                  onLike={handleLike}
                  onEdit={handleEdit}
                  replies={getReplies(comment.id)}
                />

                {/* Reply form */}
                {replyingTo === comment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-8 mt-3 space-y-2 border-l-2 border-zinc-900 pl-4"
                  >
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="w-full rounded border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-900/50"
                      rows={2}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyText.trim() || submitting}
                        variant="danger"
                        size="sm"
                      >
                        {submitting ? 'Posting...' : 'Reply'}
                      </Button>
                      <Button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyText('');
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
