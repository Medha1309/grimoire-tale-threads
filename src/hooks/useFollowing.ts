import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc,
  serverTimestamp,
  onSnapshot,
  writeBatch,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { Follow, FollowStats } from '../types';

export const useFollowing = (targetUserId?: string) => {
  const { currentUser, userProfile } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followStats, setFollowStats] = useState<FollowStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Check if current user follows target user
  useEffect(() => {
    if (!currentUser || !targetUserId || currentUser.uid === targetUserId) {
      setLoading(false);
      return;
    }

    const checkFollowing = async () => {
      try {
        const followsRef = collection(db, 'follows');
        const q = query(
          followsRef,
          where('followerId', '==', currentUser.uid),
          where('followingId', '==', targetUserId)
        );
        const snapshot = await getDocs(q);
        setIsFollowing(!snapshot.empty);
      } catch (error) {
        console.error('Error checking follow status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkFollowing();
  }, [currentUser, targetUserId]);

  // Load follow stats for target user
  useEffect(() => {
    if (!targetUserId) {
      setLoading(false);
      return;
    }

    const statsRef = doc(db, 'followStats', targetUserId);
    const unsubscribe = onSnapshot(statsRef, (snapshot) => {
      if (snapshot.exists()) {
        setFollowStats(snapshot.data() as FollowStats);
      } else {
        setFollowStats({
          userId: targetUserId,
          followersCount: 0,
          followingCount: 0,
          updatedAt: serverTimestamp()
        });
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading follow stats:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [targetUserId]);

  const followUser = async () => {
    if (!currentUser || !targetUserId || !userProfile) return;
    if (currentUser.uid === targetUserId) return;

    setActionLoading(true);
    try {
      // Import security middleware
      const { checkActionPermission } = await import('../middleware/securityMiddleware');
      
      // Check rate limit
      const rateLimitCheck = checkActionPermission(currentUser.uid, 'FOLLOW_ACTION');
      if (!rateLimitCheck.allowed) {
        throw new Error(rateLimitCheck.error || 'Rate limit exceeded');
      }

      const batch = writeBatch(db);

      // Add follow relationship
      const followRef = doc(collection(db, 'follows'));
      batch.set(followRef, {
        followerId: currentUser.uid,
        followerName: userProfile.displayName,
        followingId: targetUserId,
        followingName: '', // Will be filled by cloud function or client
        createdAt: serverTimestamp()
      });

      // Update follower's stats
      const followerStatsRef = doc(db, 'followStats', currentUser.uid);
      batch.set(followerStatsRef, {
        userId: currentUser.uid,
        followingCount: increment(1),
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update following's stats
      const followingStatsRef = doc(db, 'followStats', targetUserId);
      batch.set(followingStatsRef, {
        userId: targetUserId,
        followersCount: increment(1),
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Create notification for the followed user
      const notificationRef = doc(collection(db, 'notifications'));
      batch.set(notificationRef, {
        userId: targetUserId,
        type: 'new_follower',
        title: 'New Follower',
        message: `${userProfile.displayName} started following you`,
        read: false,
        createdAt: serverTimestamp(),
        actorId: currentUser.uid,
        actorName: userProfile.displayName,
        actorPhotoURL: userProfile.photoURL || null
      });

      await batch.commit();
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const unfollowUser = async () => {
    if (!currentUser || !targetUserId) return;

    setActionLoading(true);
    try {
      const batch = writeBatch(db);

      // Find and delete follow relationship
      const followsRef = collection(db, 'follows');
      const q = query(
        followsRef,
        where('followerId', '==', currentUser.uid),
        where('followingId', '==', targetUserId)
      );
      const snapshot = await getDocs(q);
      
      snapshot.forEach((docSnap) => {
        batch.delete(doc(db, 'follows', docSnap.id));
      });

      // Update follower's stats
      const followerStatsRef = doc(db, 'followStats', currentUser.uid);
      batch.set(followerStatsRef, {
        userId: currentUser.uid,
        followingCount: increment(-1),
        updatedAt: serverTimestamp()
      }, { merge: true });

      // Update following's stats
      const followingStatsRef = doc(db, 'followStats', targetUserId);
      batch.set(followingStatsRef, {
        userId: targetUserId,
        followersCount: increment(-1),
        updatedAt: serverTimestamp()
      }, { merge: true });

      await batch.commit();
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user:', error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };

  const toggleFollow = async () => {
    if (isFollowing) {
      await unfollowUser();
    } else {
      await followUser();
    }
  };

  return {
    isFollowing,
    followStats,
    loading,
    actionLoading,
    followUser,
    unfollowUser,
    toggleFollow
  };
};

// Hook to get list of followers
export const useFollowers = (userId: string) => {
  const [followers, setFollowers] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const followsRef = collection(db, 'follows');
    const q = query(followsRef, where('followingId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const followersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Follow[];
      setFollowers(followersData);
      setLoading(false);
    }, (error) => {
      console.error('Error loading followers:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { followers, loading };
};

// Hook to get list of following
export const useFollowingList = (userId: string) => {
  const [following, setFollowing] = useState<Follow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const followsRef = collection(db, 'follows');
    const q = query(followsRef, where('followerId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const followingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Follow[];
      setFollowing(followingData);
      setLoading(false);
    }, (error) => {
      console.error('Error loading following:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  return { following, loading };
};
