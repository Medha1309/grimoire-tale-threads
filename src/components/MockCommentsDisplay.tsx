import React from 'react';
import { motion } from 'framer-motion';
import { MOCK_BOOK_DATA } from '../data/mockBookData';

interface MockCommentsDisplayProps {
  storyId: string;
}

export const MockCommentsDisplay: React.FC<MockCommentsDisplayProps> = ({ storyId }) => {
  const mockData = MOCK_BOOK_DATA.find(data => data.storyId === storyId);

  if (!mockData || mockData.comments.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-950/20 px-4 py-2">
        <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm text-amber-300">Demo Comments - These are sample comments for demonstration</span>
      </div>

      <div className="space-y-4">
        {mockData.comments.map((comment, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg border border-zinc-900/60 bg-black/40 p-4"
          >
            <div className="mb-3 flex items-start gap-3">
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                {comment.userAvatar ? (
                  <img src={comment.userAvatar} alt={comment.userName} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                    {comment.userName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium text-purple-300">{comment.userName}</span>
                  <span className="text-xs text-zinc-600">
                    {comment.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <p className="leading-relaxed text-zinc-300">{comment.text}</p>
                <div className="mt-2 flex items-center gap-4 text-sm text-zinc-500">
                  <button className="flex items-center gap-1 transition hover:text-pink-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{comment.likes}</span>
                  </button>
                  {comment.replies && comment.replies.length > 0 && (
                    <span className="text-xs">
                      {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </span>
                  )}
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 space-y-3 border-l-2 border-purple-500/20 pl-4">
                    {comment.replies.map((reply, replyIdx) => (
                      <div key={replyIdx} className="rounded-lg bg-purple-900/10 p-3">
                        <div className="mb-1 flex items-center gap-2">
                          <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-400">
                            {reply.userAvatar ? (
                              <img src={reply.userAvatar} alt={reply.userName} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                                {reply.userName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-purple-400">{reply.userName}</span>
                          <span className="text-xs text-zinc-600">
                            {reply.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-400">{reply.text}</p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{reply.likes}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
