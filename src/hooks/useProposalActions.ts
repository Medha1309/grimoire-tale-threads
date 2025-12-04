import { useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  Timestamp,
  arrayUnion,
  increment,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../services/firebase.service';
import { useAuth } from '../contexts/AuthContext';
import type {
  Proposal,
  ProposalType,
  Vote,
  VoteType,
  CoAuthor,
  CollaborativeProject,
} from '../types/collaborativeStory';

export const useProposalActions = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProposal = async (
    projectId: string,
    data: {
      title: string;
      description: string;
      type: ProposalType;
      content: string;
    }
  ): Promise<string> => {
    if (!currentUser) throw new Error('Must be logged in');

    setLoading(true);
    setError(null);

    try {
      const projectDoc = await getDoc(doc(db, 'collaborativeProjects', projectId));
      if (!projectDoc.exists()) {
        throw new Error('Project not found');
      }
      const project = projectDoc.data() as CollaborativeProject;

      // Check if user is co-author
      const isCoAuthor = project.coAuthors.some(
        (ca: CoAuthor) => ca.userId === currentUser.uid
      );
      if (!isCoAuthor) {
        throw new Error('Only co-authors can create proposals');
      }

      // Check open proposal limit
      const openProposals = await getDocs(
        query(
          collection(db, 'proposals'),
          where('projectId', '==', projectId),
          where('status', 'in', ['draft', 'voting'])
        )
      );

      if (project.maxOpenProposals && openProposals.size >= project.maxOpenProposals) {
        throw new Error('Maximum open proposals reached');
      }

      // Create proposal
      const proposalData: Omit<Proposal, 'id'> = {
        projectId,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous',
        title: data.title,
        description: data.description,
        type: data.type,
        content: data.content,
        baseVersionId: project.currentVersionId,
        status: 'draft',
        votes: [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const proposalRef = await addDoc(collection(db, 'proposals'), proposalData);

      // Update project stats
      await updateDoc(doc(db, 'collaborativeProjects', projectId), {
        'stats.proposalCount': increment(1),
        updatedAt: Timestamp.now(),
      });

      // Log activity
      await addDoc(collection(db, 'activities'), {
        projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        type: 'proposal_created',
        metadata: { proposalId: proposalRef.id, title: data.title },
        createdAt: Timestamp.now(),
      });

      return proposalRef.id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create proposal';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const submitForVoting = async (proposalId: string): Promise<void> => {
    if (!currentUser) throw new Error('Must be logged in');

    setLoading(true);
    setError(null);

    try {
      const proposalDoc = await getDoc(doc(db, 'proposals', proposalId));
      if (!proposalDoc.exists()) {
        throw new Error('Proposal not found');
      }
      const propData = proposalDoc.data() as Proposal;

      // Only author can submit
      if (propData.authorId !== currentUser.uid) {
        throw new Error('Only author can submit proposal');
      }

      // Must be in draft status
      if (propData.status !== 'draft') {
        throw new Error('Proposal must be in draft status');
      }

      // Calculate voting end time
      const projectDoc = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
      const project = projectDoc.data() as CollaborativeProject;
      const votingDuration = project.votingDuration || 48;
      const votingEndsAt = Timestamp.fromDate(
        new Date(Date.now() + votingDuration * 60 * 60 * 1000)
      );

      // Update proposal
      await updateDoc(proposalDoc.ref, {
        status: 'voting',
        submittedAt: Timestamp.now(),
        votingEndsAt,
        updatedAt: Timestamp.now(),
      });

      // Log activity
      await addDoc(collection(db, 'activities'), {
        projectId: propData.projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        type: 'proposal_submitted',
        metadata: { proposalId, title: propData.title },
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to submit proposal';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (
    proposalId: string,
    voteType: VoteType,
    comment?: string
  ): Promise<void> => {
    if (!currentUser) throw new Error('Must be logged in');

    setLoading(true);
    setError(null);

    try {
      const proposalDoc = await getDoc(doc(db, 'proposals', proposalId));
      if (!proposalDoc.exists()) {
        throw new Error('Proposal not found');
      }
      const propData = proposalDoc.data() as Proposal;

      // Check if proposal is in voting status
      if (propData.status !== 'voting') {
        throw new Error('Proposal is not open for voting');
      }

      // Check if voting period has ended
      if (propData.votingEndsAt && propData.votingEndsAt.toDate() < new Date()) {
        throw new Error('Voting period has ended');
      }

      // Check if user is co-author
      const projectDoc = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
      const project = projectDoc.data() as CollaborativeProject;
      const coAuthor = project.coAuthors.find(
        (ca: CoAuthor) => ca.userId === currentUser.uid
      );

      if (!coAuthor) {
        throw new Error('Only co-authors can vote');
      }

      // Check if user already voted
      const existingVoteIndex = propData.votes.findIndex(
        (v: Vote) => v.voterId === currentUser.uid
      );

      if (existingVoteIndex >= 0) {
        // Update existing vote
        const updatedVotes = [...propData.votes];
        updatedVotes[existingVoteIndex] = {
          ...updatedVotes[existingVoteIndex],
          type: voteType,
          comment,
          votedAt: Timestamp.now(),
        };

        await updateDoc(proposalDoc.ref, {
          votes: updatedVotes,
          updatedAt: Timestamp.now(),
        });
      } else {
        // Add new vote
        const vote: Vote = {
          id: `${proposalId}_${currentUser.uid}`,
          proposalId,
          voterId: currentUser.uid,
          voterName: currentUser.displayName || 'Anonymous',
          voterRole: coAuthor.role,
          type: voteType,
          comment,
          votedAt: Timestamp.now(),
        };

        await updateDoc(proposalDoc.ref, {
          votes: arrayUnion(vote),
          updatedAt: Timestamp.now(),
        });
      }

      // Check if voting is complete and update status
      await checkVotingStatus(proposalId);

      // Log activity
      await addDoc(collection(db, 'activities'), {
        projectId: propData.projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        type: 'vote_cast',
        metadata: { proposalId, voteType },
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cast vote';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkVotingStatus = async (proposalId: string): Promise<void> => {
    const proposalDoc = await getDoc(doc(db, 'proposals', proposalId));
    if (!proposalDoc.exists()) return;

    const propData = proposalDoc.data() as Proposal;
    if (propData.status !== 'voting') return;

    const projectDoc = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
    const project = projectDoc.data() as CollaborativeProject;
    const coAuthors = project.coAuthors;

    // Calculate vote counts
    const approveCount = propData.votes.filter((v: Vote) => v.type === 'approve').length;
    const rejectCount = propData.votes.filter((v: Vote) => v.type === 'reject').length;
    const totalCoAuthors = coAuthors.length;

    // Auto-approve if:
    // - 60%+ of co-authors approved
    // - No rejects from owner/reviewers
    const approvePercent = (approveCount / totalCoAuthors) * 100;
    const ownerOrReviewerReject = propData.votes.some(
      (v: Vote) => v.type === 'reject' && ['owner', 'reviewer'].includes(v.voterRole)
    );

    if (approvePercent >= 60 && !ownerOrReviewerReject) {
      await updateDoc(proposalDoc.ref, {
        status: 'approved',
        updatedAt: Timestamp.now(),
      });
      return;
    }

    // Auto-reject if:
    // - 40%+ rejected
    // - Owner rejected
    const rejectPercent = (rejectCount / totalCoAuthors) * 100;
    const ownerReject = propData.votes.some(
      (v: Vote) => v.type === 'reject' && v.voterRole === 'owner'
    );

    if (rejectPercent >= 40 || ownerReject) {
      await updateDoc(proposalDoc.ref, {
        status: 'rejected',
        updatedAt: Timestamp.now(),
      });

      await addDoc(collection(db, 'activities'), {
        projectId: propData.projectId,
        userId: 'system',
        userName: 'System',
        type: 'proposal_rejected',
        metadata: { proposalId, reason: 'voting' },
        createdAt: Timestamp.now(),
      });
    }
  };

  const mergeProposal = async (proposalId: string): Promise<void> => {
    if (!currentUser) throw new Error('Must be logged in');

    setLoading(true);
    setError(null);

    try {
      const proposalDoc = await getDoc(doc(db, 'proposals', proposalId));
      if (!proposalDoc.exists()) {
        throw new Error('Proposal not found');
      }
      const propData = proposalDoc.data() as Proposal;

      // Check permissions
      const projectDoc = await getDoc(doc(db, 'collaborativeProjects', propData.projectId));
      const project = projectDoc.data() as CollaborativeProject;
      const coAuthor = project.coAuthors.find(
        (ca: CoAuthor) => ca.userId === currentUser.uid
      );

      if (!coAuthor || !['owner', 'reviewer'].includes(coAuthor.role)) {
        throw new Error('Only owner or reviewers can merge proposals');
      }

      // Check status
      if (!['approved', 'voting'].includes(propData.status)) {
        throw new Error('Proposal must be approved or in voting');
      }

      // If still voting, only owner can merge
      if (propData.status === 'voting' && coAuthor.role !== 'owner') {
        throw new Error('Only owner can merge during voting period');
      }

      // Get current version
      const currentVersionDoc = project.currentVersionId 
        ? await getDoc(doc(db, 'versions', project.currentVersionId))
        : null;
      const currentVersion = currentVersionDoc?.data();

      // Create new version
      const newVersionData = {
        projectId: propData.projectId,
        versionNumber: (currentVersion?.versionNumber || 0) + 1,
        content: propData.content,
        changes: {
          type: 'proposal_merged' as const,
          proposalId,
          authorId: propData.authorId,
          authorName: propData.authorName,
          summary: propData.title,
        },
        createdAt: Timestamp.now(),
        createdBy: currentUser.uid,
        createdByName: currentUser.displayName || 'Anonymous',
      };

      const newVersionRef = await addDoc(collection(db, 'versions'), newVersionData);

      // Update proposal
      await updateDoc(proposalDoc.ref, {
        status: 'merged',
        mergedAt: Timestamp.now(),
        mergedBy: currentUser.uid,
        mergedByName: currentUser.displayName || 'Anonymous',
        updatedAt: Timestamp.now(),
      });

      // Update project
      await updateDoc(doc(db, 'collaborativeProjects', propData.projectId), {
        currentVersionId: newVersionRef.id,
        'stats.mergedCount': increment(1),
        'stats.versionCount': increment(1),
        updatedAt: Timestamp.now(),
      });

      // Update author's contribution count
      const updatedCoAuthors = project.coAuthors.map((ca: CoAuthor) =>
        ca.userId === propData.authorId
          ? { ...ca, contributionCount: ca.contributionCount + 1 }
          : ca
      );

      await updateDoc(doc(db, 'collaborativeProjects', propData.projectId), {
        coAuthors: updatedCoAuthors,
      });

      // Log activity
      await addDoc(collection(db, 'activities'), {
        projectId: propData.projectId,
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        type: 'proposal_merged',
        metadata: { proposalId, title: propData.title },
        createdAt: Timestamp.now(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to merge proposal';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProposal,
    submitForVoting,
    castVote,
    mergeProposal,
    loading,
    error,
  };
};
