import React from 'react';
import { motion } from 'framer-motion';

interface StoryStatsProps {
  views: number;
  likes: number;
  bookmarks: number;
  avgRating: number;
  totalRatings: number;
  commentsCount: number;
}

export const StoryStats: React.FC<StoryStatsProps> = ({
  views,
  likes,
  bookmarks,
  avgRating,
  totalRatings,
  commentsCount,
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow-500">★</span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow-500">⯨</span>
        );
      } else {
        stars.push(
          <span key={i} className="text-zinc-700">★</span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-6">
      <h3 className="mb-4 font-serif text-xl text-zinc-300">Story Statistics</h3>
      
      <div className="space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Rating</span>
          <div className="flex items-center gap-2">
            <div className="flex">{renderStars(avgRating)}</div>
            <span className="text-sm text-zinc-400">
              {avgRating.toFixed(1)} ({totalRatings})
            </span>
          </div>
        </div>

        {/* Views */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Views</span>
          <span className="text-sm text-zinc-300">{formatNumber(views)}</span>
        </div>

        {/* Likes */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Likes</span>
          <span className="text-sm text-zinc-300">{formatNumber(likes)}</span>
        </div>

        {/* Bookmarks */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Bookmarks</span>
          <span className="text-sm text-zinc-300">{formatNumber(bookmarks)}</span>
        </div>

        {/* Comments */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Comments</span>
          <span className="text-sm text-zinc-300">{formatNumber(commentsCount)}</span>
        </div>
      </div>

      {/* Engagement bar */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-zinc-500">
          <span>Engagement</span>
          <span>{Math.round((likes / views) * 100)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((likes / views) * 100, 100)}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-red-900 to-red-600"
          />
        </div>
      </div>
    </div>
  );
};
