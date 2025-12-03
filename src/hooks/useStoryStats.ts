/**
 * useStoryStats Hook
 * Lightweight hook for fetching story stats without full interactions
 * Used for displaying stats in library grid
 */

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface StoryStats {
  views: number;
  likes: number;
  bookmarks: number;
  avgRating: number;
  totalRatings: number;
}

const DEFAULT_STATS: StoryStats = {
  views: 0,
  likes: 0,
  bookmarks: 0,
  avgRating: 0,
  totalRatings: 0,
};

// Cache to prevent redundant fetches
const statsCache = new Map<string, { stats: StoryStats; timestamp: number }>();
const CACHE_DURATION = 60000; // 1 minute

export const useStoryStats = (storyId: string) => {
  const [stats, setStats] = useState<StoryStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!storyId) return;

    const fetchStats = async () => {
      // Check cache first
      const cached = statsCache.get(storyId);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setStats(cached.stats);
        return;
      }

      setLoading(true);
      try {
        const statsRef = doc(db, 'storyStats', storyId);
        const statsSnap = await getDoc(statsRef);

        if (statsSnap.exists()) {
          const fetchedStats = statsSnap.data() as StoryStats;
          setStats(fetchedStats);
          // Update cache
          statsCache.set(storyId, { stats: fetchedStats, timestamp: Date.now() });
        } else {
          setStats(DEFAULT_STATS);
        }
      } catch (error) {
        console.error('Error fetching story stats:', error);
        setStats(DEFAULT_STATS);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [storyId]);

  return { stats, loading };
};
