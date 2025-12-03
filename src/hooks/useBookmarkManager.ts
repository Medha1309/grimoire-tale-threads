/**
 * useBookmarkManager Hook
 * Manages bookmarking with Firebase and localStorage sync
 * Provides intuitive bookmark state management
 */

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Story {
  slug: string;
  title: string;
  author: string;
  cover?: string;
  genre?: string;
  blurb?: string;
  [key: string]: any;
}

export const useBookmarkManager = (story: Story) => {
  const { currentUser } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if story is bookmarked
  useEffect(() => {
    const checkBookmark = async () => {
      if (!currentUser) {
        // Check localStorage for non-authenticated users
        try {
          const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
          setIsBookmarked(bookmarked.some((s: Story) => s.slug === story.slug));
        } catch (error) {
          console.error('Error parsing bookmarks from localStorage:', error);
          setIsBookmarked(false);
        }
        return;
      }

      try {
        const interactionRef = doc(db, 'userInteractions', currentUser.uid);
        const interactionSnap = await getDoc(interactionRef);

        if (interactionSnap.exists()) {
          const data = interactionSnap.data();
          setIsBookmarked(data.bookmarkedStories?.includes(story.slug) || false);
        }
      } catch (error) {
        console.error('Error checking bookmark:', error);
      }
    };

    checkBookmark();
  }, [currentUser, story.slug]);

  // Toggle bookmark
  const toggleBookmark = useCallback(async () => {
    setIsLoading(true);

    try {
      if (!currentUser) {
        // Handle localStorage for non-authenticated users
        try {
          const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
          
          if (isBookmarked) {
            // Remove bookmark
            const filtered = bookmarked.filter((s: Story) => s.slug !== story.slug);
            localStorage.setItem('bookmarkedStories', JSON.stringify(filtered));
            setIsBookmarked(false);
          } else {
            // Add bookmark
            bookmarked.push({
              slug: story.slug,
              title: story.title,
              author: story.author,
              cover: story.cover,
              genre: story.genre,
              blurb: story.blurb,
            });
            localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarked));
            setIsBookmarked(true);
          }
          
          // Trigger storage event for Dollhouse sync
          window.dispatchEvent(new Event('storage'));
        } catch (error) {
          console.error('Error toggling bookmark:', error);
        } finally {
          setIsLoading(false);
        }
        return;
      }

      // Handle Firebase for authenticated users
      const interactionRef = doc(db, 'userInteractions', currentUser.uid);
      const statsRef = doc(db, 'storyStats', story.slug);

      if (isBookmarked) {
        // Remove bookmark
        await updateDoc(interactionRef, {
          bookmarkedStories: arrayRemove(story.slug),
        });
        await updateDoc(statsRef, {
          bookmarks: increment(-1),
        });
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await setDoc(
          interactionRef,
          { bookmarkedStories: arrayUnion(story.slug) },
          { merge: true }
        );
        
        // Update or create stats
        const statsSnap = await getDoc(statsRef);
        if (statsSnap.exists()) {
          await updateDoc(statsRef, {
            bookmarks: increment(1),
          });
        } else {
          await setDoc(statsRef, {
            views: 0,
            likes: 0,
            bookmarks: 1,
            avgRating: 0,
            totalRatings: 0,
          });
        }
        
        setIsBookmarked(true);
      }

      // Also sync to localStorage for Dollhouse
      const bookmarked = JSON.parse(localStorage.getItem('bookmarkedStories') || '[]');
      if (!isBookmarked) {
        const exists = bookmarked.find((s: Story) => s.slug === story.slug);
        if (!exists) {
          bookmarked.push({
            slug: story.slug,
            title: story.title,
            author: story.author,
            cover: story.cover,
            genre: story.genre,
            blurb: story.blurb,
          });
          localStorage.setItem('bookmarkedStories', JSON.stringify(bookmarked));
        }
      } else {
        const filtered = bookmarked.filter((s: Story) => s.slug !== story.slug);
        localStorage.setItem('bookmarkedStories', JSON.stringify(filtered));
      }
      
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, story, isBookmarked]);

  return {
    isBookmarked,
    isLoading,
    toggleBookmark,
  };
};
