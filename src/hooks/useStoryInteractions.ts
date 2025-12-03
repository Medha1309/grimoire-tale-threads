import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

export interface StoryStats {
  views: number;
  likes: number;
  bookmarks: number;
  avgRating: number;
  totalRatings: number;
}

export interface UserInteraction {
  liked: boolean;
  bookmarked: boolean;
  rating: number | null;
}

const DEFAULT_STATS: StoryStats = {
  views: 0,
  likes: 0,
  bookmarks: 0,
  avgRating: 0,
  totalRatings: 0,
};

const DEFAULT_INTERACTION: UserInteraction = {
  liked: false,
  bookmarked: false,
  rating: null,
};

/**
 * Hook for managing story statistics and user interactions
 * 
 * Separates concerns:
 * - Public stats (always loaded, non-blocking)
 * - User interactions (only loaded if authenticated)
 */
export const useStoryInteractions = (storyId: string) => {
  const { currentUser } = useAuth();
  
  // Public data - always available
  const [stats, setStats] = useState<StoryStats>(DEFAULT_STATS);
  const [commentsCount, setCommentsCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);
  
  // User-specific data - only relevant if logged in
  const [userInteraction, setUserInteraction] = useState<UserInteraction>(DEFAULT_INTERACTION);
  const [interactionLoading, setInteractionLoading] = useState(false);

  // Fetch public stats (non-blocking, always runs)
  useEffect(() => {
    if (!storyId) {
      setStatsLoading(false);
      return;
    }

    let mounted = true;

    const fetchStats = async () => {
      try {
        const statsRef = doc(db, 'storyStats', storyId);
        const statsSnap = await getDoc(statsRef);

        if (!mounted) return;

        if (statsSnap.exists()) {
          setStats(statsSnap.data() as StoryStats);
        } else {
          // Initialize stats if they don't exist
          const initialStats: StoryStats = DEFAULT_STATS;
          await setDoc(statsRef, initialStats);
          if (mounted) setStats(initialStats);
        }

        // Get comments count
        const commentsQuery = query(
          collection(db, 'comments'),
          where('storyId', '==', storyId)
        );
        const commentsSnap = await getDocs(commentsQuery);
        if (mounted) setCommentsCount(commentsSnap.size);

        // Increment view count (fire and forget - don't wait)
        updateDoc(statsRef, { views: increment(1) }).then(() => {
          if (mounted) {
            setStats(prev => ({ ...prev, views: prev.views + 1 }));
          }
        }).catch(err => console.error('Error incrementing views:', err));

      } catch (error) {
        console.error('Error fetching story stats:', error);
      } finally {
        if (mounted) setStatsLoading(false);
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [storyId]);

  // Fetch user interactions (only if logged in)
  useEffect(() => {
    if (!storyId) return;

    // Not logged in - reset to defaults
    if (!currentUser) {
      setUserInteraction(DEFAULT_INTERACTION);
      setInteractionLoading(false);
      return;
    }

    let mounted = true;
    setInteractionLoading(true);

    const fetchUserInteraction = async () => {
      try {
        const interactionRef = doc(db, 'userInteractions', currentUser.uid);
        const interactionSnap = await getDoc(interactionRef);

        if (!mounted) return;

        if (interactionSnap.exists()) {
          const data = interactionSnap.data();
          setUserInteraction({
            liked: data.likedStories?.includes(storyId) || false,
            bookmarked: data.bookmarkedStories?.includes(storyId) || false,
            rating: data.ratings?.[storyId] || null,
          });
        } else {
          setUserInteraction(DEFAULT_INTERACTION);
        }
      } catch (error) {
        console.error('Error fetching user interaction:', error);
        if (mounted) setUserInteraction(DEFAULT_INTERACTION);
      } finally {
        if (mounted) setInteractionLoading(false);
      }
    };

    fetchUserInteraction();

    return () => {
      mounted = false;
    };
  }, [currentUser, storyId]);

  // Toggle like
  const toggleLike = async () => {
    if (!currentUser) {
      throw new Error('Must be logged in to like');
    }

    const interactionRef = doc(db, 'userInteractions', currentUser.uid);
    const statsRef = doc(db, 'storyStats', storyId);
    const wasLiked = userInteraction.liked;

    // Optimistic update
    setUserInteraction(prev => ({ ...prev, liked: !wasLiked }));
    setStats(prev => ({ ...prev, likes: wasLiked ? prev.likes - 1 : prev.likes + 1 }));

    try {
      if (wasLiked) {
        await updateDoc(interactionRef, {
          likedStories: arrayRemove(storyId),
        });
        await updateDoc(statsRef, {
          likes: increment(-1),
        });
      } else {
        await setDoc(
          interactionRef,
          { likedStories: arrayUnion(storyId) },
          { merge: true }
        );
        await updateDoc(statsRef, {
          likes: increment(1),
        });
      }
    } catch (error) {
      // Revert on error
      setUserInteraction(prev => ({ ...prev, liked: wasLiked }));
      setStats(prev => ({ ...prev, likes: wasLiked ? prev.likes + 1 : prev.likes - 1 }));
      console.error('Error toggling like:', error);
      throw error;
    }
  };

  // Toggle bookmark
  const toggleBookmark = async () => {
    if (!currentUser) {
      throw new Error('Must be logged in to bookmark');
    }

    const interactionRef = doc(db, 'userInteractions', currentUser.uid);
    const statsRef = doc(db, 'storyStats', storyId);
    const wasBookmarked = userInteraction.bookmarked;

    // Optimistic update
    setUserInteraction(prev => ({ ...prev, bookmarked: !wasBookmarked }));
    setStats(prev => ({ ...prev, bookmarks: wasBookmarked ? prev.bookmarks - 1 : prev.bookmarks + 1 }));

    try {
      if (wasBookmarked) {
        await updateDoc(interactionRef, {
          bookmarkedStories: arrayRemove(storyId),
        });
        await updateDoc(statsRef, {
          bookmarks: increment(-1),
        });
      } else {
        await setDoc(
          interactionRef,
          { bookmarkedStories: arrayUnion(storyId) },
          { merge: true }
        );
        await updateDoc(statsRef, {
          bookmarks: increment(1),
        });
      }
    } catch (error) {
      // Revert on error
      setUserInteraction(prev => ({ ...prev, bookmarked: wasBookmarked }));
      setStats(prev => ({ ...prev, bookmarks: wasBookmarked ? prev.bookmarks + 1 : prev.bookmarks - 1 }));
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  };

  // Rate story
  const rateStory = async (rating: number) => {
    if (!currentUser) {
      throw new Error('Must be logged in to rate');
    }
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const interactionRef = doc(db, 'userInteractions', currentUser.uid);
    const statsRef = doc(db, 'storyStats', storyId);
    const oldRating = userInteraction.rating;

    try {
      // Update user's rating
      await setDoc(
        interactionRef,
        { ratings: { [storyId]: rating } },
        { merge: true }
      );

      // Update story stats
      const statsSnap = await getDoc(statsRef);
      const currentStats = statsSnap.data() as StoryStats;

      let newTotalRatings = currentStats.totalRatings;
      let newAvgRating = currentStats.avgRating;

      if (oldRating) {
        // Update existing rating
        const totalScore = currentStats.avgRating * currentStats.totalRatings;
        const newTotalScore = totalScore - oldRating + rating;
        newAvgRating = newTotalScore / newTotalRatings;
      } else {
        // New rating
        newTotalRatings += 1;
        const totalScore = currentStats.avgRating * currentStats.totalRatings + rating;
        newAvgRating = totalScore / newTotalRatings;
      }

      await updateDoc(statsRef, {
        avgRating: newAvgRating,
        totalRatings: newTotalRatings,
      });

      setUserInteraction(prev => ({ ...prev, rating }));
      setStats(prev => ({
        ...prev,
        avgRating: newAvgRating,
        totalRatings: newTotalRatings,
      }));
    } catch (error) {
      console.error('Error rating story:', error);
      throw error;
    }
  };

  return {
    // Public data
    stats,
    commentsCount,
    statsLoading,
    
    // User-specific data
    userInteraction,
    interactionLoading,
    
    // Actions (require auth)
    toggleLike,
    toggleBookmark,
    rateStory,
  };
};
