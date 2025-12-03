/**
 * StoryGrid Component
 * Grid of story cards with real-time stats
 * Clean preview - bookmarking happens on detail page
 */

import React, { useCallback } from 'react';
import { StoryCard } from './StoryCard';
import { useStoryStats } from '../../hooks/useStoryStats';

interface Story {
  slug: string;
  title: string;
  author: string;
  authorId?: string;
  cover?: string;
  coverType?: 'image' | 'gif' | 'video';
  genre?: 'horror' | 'mystery' | 'romance' | 'thriller';
  blurb?: string;
}

interface StoryGridProps {
  stories: Story[];
  bookmarkedSlugs?: Set<string>;
  onStoryClick: (slug: string) => void;
  onBookmarkToggle?: (slug: string) => void;
  currentUserId?: string;
}

const StoryGridItem: React.FC<{
  story: Story;
  index: number;
  onStoryClick: (slug: string) => void;
  onBookmarkToggle?: (slug: string) => void;
  isBookmarked?: boolean;
  isOwnStory?: boolean;
}> = React.memo(({ story, index, onStoryClick, onBookmarkToggle, isBookmarked, isOwnStory }) => {
  const handleClick = useCallback(() => onStoryClick(story.slug), [onStoryClick, story.slug]);
  
  const { stats } = useStoryStats(story.slug);

  return (
    <div className="relative">
      {isOwnStory && (
        <div className="absolute -top-2 -right-2 z-30 px-2 py-1 bg-fog-light/20 border border-fog-light/40 rounded text-xs text-fog-light font-serif backdrop-blur-sm">
          Your story
        </div>
      )}
      <StoryCard
        slug={story.slug}
        title={story.title}
        author={story.author}
        authorId={story.authorId}
        cover={story.cover}
        coverType={story.coverType}
        genre={story.genre}
        blurb={story.blurb}
        reads={stats.views}
        rating={stats.avgRating}
        onClick={handleClick}
        onBookmarkToggle={onBookmarkToggle}
        isBookmarked={isBookmarked}
        index={index}
        showStats={true}
      />
    </div>
  );
});

StoryGridItem.displayName = 'StoryGridItem';

export const StoryGrid: React.FC<StoryGridProps> = React.memo(({
  stories,
  bookmarkedSlugs,
  onStoryClick,
  onBookmarkToggle,
  currentUserId,
}) => {
  if (!stories || stories.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-serif text-xl text-zinc-400">No stories found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
      {stories.map((story, idx) => (
        <StoryGridItem
          key={`story-${story.slug}-${idx}`}
          story={story}
          index={idx}
          onStoryClick={onStoryClick}
          onBookmarkToggle={onBookmarkToggle}
          isBookmarked={bookmarkedSlugs?.has(story.slug)}
          isOwnStory={!!(currentUserId && story.authorId === currentUserId)}
        />
      ))}
    </div>
  );
});

StoryGrid.displayName = 'StoryGrid';
