import { useState } from 'react';
import { 
  collection, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { AdminLogger } from '../utils/adminLogger';
import { exportAndDownloadJSON, exportAndDownloadCSV } from '../utils/dataExport';

export interface AdminActionResult {
  success: boolean;
  message: string;
  error?: any;
}

export function useAdminActions() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);

  const isAdmin = userProfile?.isAdmin === true;

  /**
   * Update user profile
   */
  const updateUser = async (
    userId: string,
    updates: Record<string, any>
  ): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', userId), {
        ...updates,
        updatedAt: serverTimestamp(),
      });

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'user_update',
        'user',
        userId,
        updates
      );

      setLoading(false);
      return { success: true, message: 'User updated successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to update user', error };
    }
  };

  /**
   * Suspend user account
   */
  const suspendUser = async (
    userId: string,
    reason: string,
    duration?: number // days
  ): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      const suspendedUntil = duration 
        ? new Date(Date.now() + duration * 24 * 60 * 60 * 1000)
        : null;

      await updateDoc(doc(db, 'users', userId), {
        accountStatus: 'suspended',
        suspensionReason: reason,
        suspendedUntil: suspendedUntil,
        suspendedBy: currentUser.uid,
        suspendedAt: serverTimestamp(),
      });

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'user_suspend',
        'user',
        userId,
        { reason, duration }
      );

      setLoading(false);
      return { success: true, message: 'User suspended successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to suspend user', error };
    }
  };

  /**
   * Reactivate suspended user
   */
  const reactivateUser = async (userId: string): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', userId), {
        accountStatus: 'active',
        suspensionReason: null,
        suspendedUntil: null,
        reactivatedBy: currentUser.uid,
        reactivatedAt: serverTimestamp(),
      });

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'user_reactivate',
        'user',
        userId,
        {}
      );

      setLoading(false);
      return { success: true, message: 'User reactivated successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to reactivate user', error };
    }
  };

  /**
   * Delete user and all associated data (FIPPA right to be forgotten)
   */
  const deleteUser = async (
    userId: string,
    reason: string,
    anonymize: boolean = false
  ): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      const batch = writeBatch(db);

      if (anonymize) {
        // Anonymize instead of delete - keep content but remove personal info
        batch.update(doc(db, 'users', userId), {
          email: `deleted_${userId}@anonymized.local`,
          displayName: 'Deleted User',
          photoURL: null,
          bio: null,
          accountStatus: 'deleted',
          deletedAt: serverTimestamp(),
          deletedBy: currentUser.uid,
          deletionReason: reason,
        });
      } else {
        // Full deletion
        batch.delete(doc(db, 'users', userId));

        // Delete user's diary entries
        const diaryQuery = query(collection(db, 'diary_entries'), where('userId', '==', userId));
        const diarySnap = await getDocs(diaryQuery);
        diarySnap.forEach(doc => batch.delete(doc.ref));

        // Delete user interactions
        const interactionsDoc = doc(db, 'userInteractions', userId);
        batch.delete(interactionsDoc);
      }

      await batch.commit();

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'user_delete',
        'user',
        userId,
        { reason, anonymize }
      );

      setLoading(false);
      return { 
        success: true, 
        message: anonymize ? 'User anonymized successfully' : 'User deleted successfully' 
      };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to delete user', error };
    }
  };

  /**
   * Delete content (forum post, diary entry, etc.)
   */
  const deleteContent = async (
    contentType: 'forum_post' | 'diary_entry' | 'comment' | 'story',
    contentId: string,
    reason: string
  ): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      const collectionMap = {
        forum_post: 'forum_posts',
        diary_entry: 'diary_entries',
        comment: 'comments',
        story: 'userStories',
      };

      await deleteDoc(doc(db, collectionMap[contentType], contentId));

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'content_delete',
        'content',
        contentId,
        { contentType, reason }
      );

      setLoading(false);
      return { success: true, message: 'Content deleted successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to delete content', error };
    }
  };

  /**
   * Export user data (FIPPA data portability)
   */
  const exportUserDataJSON = async (userId: string, userName: string): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      await exportAndDownloadJSON(userId, userName);

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'data_export',
        'data',
        userId,
        { format: 'json' }
      );

      setLoading(false);
      return { success: true, message: 'Data exported successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to export data', error };
    }
  };

  /**
   * Export user data as CSV
   */
  const exportUserDataCSV = async (userId: string, userName: string): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      await exportAndDownloadCSV(userId, userName);

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'data_export',
        'data',
        userId,
        { format: 'csv' }
      );

      setLoading(false);
      return { success: true, message: 'Data exported successfully' };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to export data', error };
    }
  };

  /**
   * Get user statistics
   */
  const getUserStats = async (userId: string) => {
    try {
      const [storiesSnap, postsSnap, diarySnap, commentsSnap] = await Promise.all([
        getDocs(query(collection(db, 'userStories'), where('authorId', '==', userId))),
        getDocs(query(collection(db, 'forum_posts'), where('authorId', '==', userId))),
        getDocs(query(collection(db, 'diary_entries'), where('userId', '==', userId))),
        getDocs(query(collection(db, 'comments'), where('userId', '==', userId))),
      ]);

      return {
        storiesCount: storiesSnap.size,
        forumPostsCount: postsSnap.size,
        diaryEntriesCount: diarySnap.size,
        commentsCount: commentsSnap.size,
      };
    } catch (error) {
      console.error('Failed to get user stats:', error);
      return null;
    }
  };

  /**
   * Bulk update users
   */
  const bulkUpdateUsers = async (
    userIds: string[],
    updates: Record<string, any>
  ): Promise<AdminActionResult> => {
    if (!isAdmin || !currentUser) {
      return { success: false, message: 'Unauthorized' };
    }

    setLoading(true);
    try {
      const batch = writeBatch(db);
      
      userIds.forEach(userId => {
        batch.update(doc(db, 'users', userId), {
          ...updates,
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();

      await AdminLogger.log(
        currentUser.uid,
        currentUser.email!,
        'bulk_user_update',
        'user',
        'multiple',
        { userIds, updates }
      );

      setLoading(false);
      return { success: true, message: `${userIds.length} users updated successfully` };
    } catch (error) {
      setLoading(false);
      return { success: false, message: 'Failed to bulk update users', error };
    }
  };

  return {
    loading,
    isAdmin,
    updateUser,
    suspendUser,
    reactivateUser,
    deleteUser,
    deleteContent,
    exportUserDataJSON,
    exportUserDataCSV,
    getUserStats,
    bulkUpdateUsers,
  };
}
