/**
 * useThreadActivity Hook
 * Tracks which threads have new activity since user last viewed them
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ThreadActivity {
  [threadId: string]: {
    lastViewed: number;
    hasNewReplies: boolean;
  };
}

export const useThreadActivity = (threads: any[]) => {
  const { currentUser } = useAuth();
  const [activity, setActivity] = useState<ThreadActivity>({});

  // Load activity from localStorage
  useEffect(() => {
    if (!currentUser) return;

    const key = `threadActivity_${currentUser.uid}`;
    const saved = localStorage.getItem(key);
    
    if (saved) {
      try {
        setActivity(JSON.parse(saved));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [currentUser]);

  // Check for new replies
  useEffect(() => {
    if (!currentUser || threads.length === 0) return;

    const newActivity: ThreadActivity = { ...activity };
    let hasChanges = false;

    threads.forEach(thread => {
      const lastViewed = activity[thread.id]?.lastViewed || 0;
      const threadUpdated = thread.updatedAt?.toMillis?.() || thread.createdAt?.toMillis?.() || 0;
      
      if (threadUpdated > lastViewed) {
        newActivity[thread.id] = {
          lastViewed,
          hasNewReplies: true,
        };
        hasChanges = true;
      }
    });

    if (hasChanges) {
      setActivity(newActivity);
    }
  }, [threads, currentUser]);

  // Mark thread as viewed
  const markThreadViewed = (threadId: string) => {
    if (!currentUser) return;

    const newActivity = {
      ...activity,
      [threadId]: {
        lastViewed: Date.now(),
        hasNewReplies: false,
      },
    };

    setActivity(newActivity);
    
    const key = `threadActivity_${currentUser.uid}`;
    localStorage.setItem(key, JSON.stringify(newActivity));
  };

  // Check if thread has new activity
  const hasNewActivity = (threadId: string): boolean => {
    return activity[threadId]?.hasNewReplies || false;
  };

  // Get count of threads with new activity
  const newActivityCount = Object.values(activity).filter(a => a.hasNewReplies).length;

  return {
    hasNewActivity,
    markThreadViewed,
    newActivityCount,
  };
};
