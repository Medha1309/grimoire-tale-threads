/**
 * useBookmarks Hook
 * Manages story bookmarking with localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';

interface Story {
  slug: string;
  [key: string]: any;
}

export const useBookmarks = () => {
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<Set<string>>(new Set());

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
    setBookmarkedSlugs(new Set(bookmarked.map((s: Story) => s.slug)));
  }, []);

  const toggleBookmark = useCallback((story: Story, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setBookmarkedSlugs((prev) => {
      const newBookmarks = new Set(prev);
      
      if (newBookmarks.has(story.slug)) {
        newBookmarks.delete(story.slug);
      } else {
        newBookmarks.add(story.slug);
        // Save to localStorage
        const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
        const exists = bookmarked.find((s: Story) => s.slug === story.slug);
        if (!exists) {
          bookmarked.push(story);
          localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarked));
        }
      }
      
      return newBookmarks;
    });
  }, []);

  return { bookmarkedSlugs, toggleBookmark };
};
