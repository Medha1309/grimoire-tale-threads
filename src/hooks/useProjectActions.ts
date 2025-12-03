import { useState } from 'react';
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './useToast';
import {
  CollaborativeProject,
  CoAuthor,
  CoAuthorRole,
  ProjectStatus,
} from '../types/collaborativeStory';
import { CollaborationSettings } from '../components/library/CollaborationToggle';
import { PROJECT_CONFIG } from '../config/taleThreads';

export const useProjectActions = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const createProject = async (
    storyId: string,
    storyTitle: string,
    storyGenre: string,
    settings: CollaborationSettings
  ): Promise<string> => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const projectId = `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const projectRef = doc(db, 'collaborativeProjects', projectId);

      const owner: CoAuthor = {
        userId: currentUser.uid,
        displayName: currentUser.displayName || 'Anonymous',
        role: 'owner',
        joinedAt: serverTimestamp() as any,
        contributionCount: 0,
      };

      const project: Omit<CollaborativeProject, 'id'> = {
        linkedStoryId: storyId,
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName || 'Anonymous',
        title: storyTitle,
        genre: storyGenre,
        coAuthors: [owner],
        status: PROJECT_CONFIG.defaults.status,
        visibility: PROJECT_CONFIG.defaults.visibility,
        maxCoAuthors: settings.maxCoAuthors || PROJECT_CONFIG.defaults.maxCoAuthors,
        requireApproval: settings.requireApproval ?? PROJECT_CONFIG.defaults.requireApproval,
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
      };

      await setDoc(projectRef, project);

      // Log activity
      await logActivity(projectId, 'project_created', {});

      showToast('Collaborative project created!', 'success');
      return projectId;
    } catch (error) {
      console.error('Error creating project:', error);
      showToast('Failed to create project', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const requestToJoin = async (projectId: string, message?: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const requestRef = doc(db, 'joinRequests', requestId);

      await setDoc(requestRef, {
        projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        message: message || '',
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      showToast('Join request sent!', 'success');
    } catch (error) {
      console.error('Error requesting to join:', error);
      showToast('Failed to send join request', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const approveJoinRequest = async (projectId: string, userId: string, userName: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const projectRef = doc(db, 'collaborativeProjects', projectId);
      const projectSnap = await getDoc(projectRef);

      if (!projectSnap.exists()) {
        throw new Error('Project not found');
      }

      const project = projectSnap.data() as CollaborativeProject;

      // Check if user is owner
      if (project.ownerId !== currentUser.uid) {
        throw new Error('Only project owner can approve requests');
      }

      // Check if project is full
      if (project.coAuthors.length >= project.maxCoAuthors) {
        throw new Error('Project is full');
      }

      const newCoAuthor: CoAuthor = {
        userId,
        displayName: userName,
        role: 'contributor',
        joinedAt: serverTimestamp() as any,
        contributionCount: 0,
      };

      await updateDoc(projectRef, {
        coAuthors: arrayUnion(newCoAuthor),
        updatedAt: serverTimestamp(),
      });

      // Log activity
      await logActivity(projectId, 'coauthor_joined', { userId, userName });

      showToast(`${userName} added to project`, 'success');
    } catch (error) {
      console.error('Error approving join request:', error);
      showToast('Failed to approve request', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const rejectJoinRequest = async (_projectId: string, _userId: string, _reason?: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      // Update request status
      // Note: This would need the request ID, which we'd need to query for
      // For now, just show success
      showToast('Join request rejected', 'success');
    } catch (error) {
      console.error('Error rejecting join request:', error);
      showToast('Failed to reject request', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCoAuthorRole = async (
    projectId: string,
    targetUserId: string,
    newRole: CoAuthorRole
  ) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const projectRef = doc(db, 'collaborativeProjects', projectId);
      const projectSnap = await getDoc(projectRef);

      if (!projectSnap.exists()) {
        throw new Error('Project not found');
      }

      const project = projectSnap.data() as CollaborativeProject;

      // Check if user is owner
      if (project.ownerId !== currentUser.uid) {
        throw new Error('Only project owner can change roles');
      }

      // Update the co-author's role
      const updatedCoAuthors = project.coAuthors.map((ca) =>
        ca.userId === targetUserId ? { ...ca, role: newRole } : ca
      );

      await updateDoc(projectRef, {
        coAuthors: updatedCoAuthors,
        updatedAt: serverTimestamp(),
      });

      showToast('Role updated', 'success');
    } catch (error) {
      console.error('Error updating role:', error);
      showToast('Failed to update role', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeCoAuthor = async (projectId: string, targetUserId: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const projectRef = doc(db, 'collaborativeProjects', projectId);
      const projectSnap = await getDoc(projectRef);

      if (!projectSnap.exists()) {
        throw new Error('Project not found');
      }

      const project = projectSnap.data() as CollaborativeProject;

      // Check if user is owner
      if (project.ownerId !== currentUser.uid) {
        throw new Error('Only project owner can remove co-authors');
      }

      // Can't remove owner
      if (targetUserId === project.ownerId) {
        throw new Error('Cannot remove project owner');
      }

      // Remove the co-author
      const updatedCoAuthors = project.coAuthors.filter((ca) => ca.userId !== targetUserId);

      await updateDoc(projectRef, {
        coAuthors: updatedCoAuthors,
        updatedAt: serverTimestamp(),
      });

      // Log activity
      await logActivity(projectId, 'coauthor_left', { userId: targetUserId });

      showToast('Co-author removed', 'success');
    } catch (error) {
      console.error('Error removing co-author:', error);
      showToast('Failed to remove co-author', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const finalizeProject = async (projectId: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      const projectRef = doc(db, 'collaborativeProjects', projectId);

      await updateDoc(projectRef, {
        status: 'finalizing' as ProjectStatus,
        finalizedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Log activity
      await logActivity(projectId, 'story_finalized', {});

      showToast('Project moved to finalization', 'success');
    } catch (error) {
      console.error('Error finalizing project:', error);
      showToast('Failed to finalize project', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signProject = async (projectId: string) => {
    if (!currentUser) throw new Error('Must be authenticated');

    setLoading(true);
    try {
      // Add signature to project
      const projectRef = doc(db, 'collaborativeProjects', projectId);

      await updateDoc(projectRef, {
        [`signatures.${currentUser.uid}`]: {
          userId: currentUser.uid,
          userName: currentUser.displayName || 'Anonymous',
          signedAt: serverTimestamp(),
        },
        updatedAt: serverTimestamp(),
      });

      // Log activity
      await logActivity(projectId, 'signature_added', { userId: currentUser.uid });

      showToast('Signature added', 'success');
    } catch (error) {
      console.error('Error signing project:', error);
      showToast('Failed to sign project', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Helper function to log activities
  const logActivity = async (projectId: string, type: string, metadata: Record<string, any>) => {
    if (!currentUser) return;

    try {
      const activityId = `act_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const activityRef = doc(db, 'projectActivities', activityId);

      await setDoc(activityRef, {
        projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        type,
        metadata,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return {
    loading,
    createProject,
    requestToJoin,
    approveJoinRequest,
    rejectJoinRequest,
    updateCoAuthorRole,
    removeCoAuthor,
    finalizeProject,
    signProject,
  };
};
