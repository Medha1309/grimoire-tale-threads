import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Comment as CommentType } from '../hooks/useComments';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui';

interface CommentProps {
  comment: CommentType;
  onReply: (parentId: string) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  onEdit: (commentId: string, text: string) => void;
  replies?: CommentType[];
  depth?: number;
}

export const CommentComponent: React.FC<CommentProps> = ({
  comment,
  onReply,
  onDelete,
  onLike,
  onEdit,
  replies = [],
  depth = 0,
}) => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(true);

  const isOwner = currentUser?.uid === comment.userId;
  const hasLiked = comment.likedBy.includes(currentUser?.uid || '');
  const timeAgo = getTimeAgo(comment.createdAt);

  const handleEdit = () => {
    if (editText.trim() && editText !== comment.text) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(comment.text);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${depth > 0 ? 'ml-8 border-l-2 border-zinc-900 pl-4' : ''}`}
    >
      <div className="group relative rounded-lg border border-zinc-900/60 bg-black/40 p-4 transition hover:border-zinc-800 hover:bg-black/60">
        {/* User info */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-900 to-zinc-900 flex items-center justify-center text-sm font-serif text-zinc-300">
              {comment.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-300">{comment.userName}</p>
              <p className="text-xs text-zinc-600">
                {timeAgo}
                {comment.updatedAt && ' (edited)'}
              </p>
            </div>
          </div>

          {/* Actions menu */}
          {isOwner && !isEditing && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="text-xs text-red-500 hover:text-red-400 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Comment text */}
        {isEditing ? (
          <div className="mb-3 space-y-2">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full rounded border border-zinc-800 bg-black/40 px-3 py-2 text-sm text-zinc-300 placeholder-zinc-600 transition focus:border-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-900/50"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" variant="danger" onClick={handleEdit}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="mb-3 text-sm leading-relaxed text-zinc-400">{comment.text}</p>
        )}

        {/* Actions */}
        {!isEditing && (
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onLike(comment.id)}
              disabled={!currentUser}
              className={`flex items-center gap-1 transition ${
                hasLiked
                  ? 'text-red-400'
                  : 'text-zinc-600 hover:text-zinc-400'
              } ${!currentUser ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <svg
                className="h-4 w-4"
                fill={hasLiked ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
            </button>

            {depth < 3 && (
              <button
                onClick={() => onReply(comment.id)}
                disabled={!currentUser}
                className={`text-zinc-600 transition hover:text-zinc-400 ${
                  !currentUser ? 'cursor-not-allowed opacity-50' : ''
                }`}
              >
                Reply
              </button>
            )}

            {replies.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-zinc-600 transition hover:text-zinc-400"
              >
                {showReplies ? 'Hide' : 'Show'} {replies.length}{' '}
                {replies.length === 1 ? 'reply' : 'replies'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Replies */}
      <AnimatePresence>
        {showReplies && replies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-3"
          >
            {replies.map((reply) => (
              <CommentComponent
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                onLike={onLike}
                onEdit={onEdit}
                replies={[]}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

function getTimeAgo(timestamp: { toDate?: () => Date }): string {
  if (!timestamp?.toDate) return 'Just now';
  
  const date = timestamp.toDate();
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
}
