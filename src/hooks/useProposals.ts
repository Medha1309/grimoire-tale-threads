import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Proposal, Vote } from '../types/collaborativeStory';

interface UseProposalsOptions {
  projectId: string;
  status?: 'pending' | 'approved' | 'rejected' | 'expired';
  authorId?: string;
}

export const useProposals = (options: UseProposalsOptions) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!options.projectId) {
      setProposals([]);
      setLoading(false);
      return;
    }

    const constraints = [
      where('projectId', '==', options.projectId),
      orderBy('createdAt', 'desc'),
    ];

    // Add status filter if specified
    if (options.status) {
      constraints.splice(1, 0, where('status', '==', options.status));
    }

    // Add author filter if specified
    if (options.authorId) {
      constraints.splice(-1, 0, where('authorId', '==', options.authorId));
    }

    const q = query(collection(db, 'proposals'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const proposalsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Proposal[];

        setProposals(proposalsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching proposals:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [options.projectId, options.status, options.authorId]);

  return { proposals, loading, error };
};

/**
 * Hook to get a single proposal with its votes
 */
export const useProposal = (proposalId: string) => {
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!proposalId) {
      setProposal(null);
      setVotes([]);
      setLoading(false);
      return;
    }

    // Subscribe to proposal
    const proposalRef = doc(db, 'proposals', proposalId);
    const unsubscribeProposal = onSnapshot(
      proposalRef,
      (doc) => {
        if (doc.exists()) {
          setProposal({ id: doc.id, ...doc.data() } as Proposal);
        } else {
          setProposal(null);
        }
      },
      (err) => {
        console.error('Error fetching proposal:', err);
        setError(err as Error);
      }
    );

    // Subscribe to votes for this proposal
    const votesQuery = query(
      collection(db, 'votes'),
      where('proposalId', '==', proposalId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeVotes = onSnapshot(
      votesQuery,
      (snapshot) => {
        const votesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vote[];

        setVotes(votesData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching votes:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => {
      unsubscribeProposal();
      unsubscribeVotes();
    };
  }, [proposalId]);

  return { proposal, votes, loading, error };
};

/**
 * Hook to get proposals that need user's attention (pending votes)
 */
export const usePendingVotes = (userId: string, projectIds: string[]) => {
  const [pendingProposals, setPendingProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId || projectIds.length === 0) {
      setPendingProposals([]);
      setLoading(false);
      return;
    }

    // Get all pending proposals from user's projects
    const q = query(
      collection(db, 'proposals'),
      where('projectId', 'in', projectIds),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const proposals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Proposal[];

        // Filter out proposals where user has already voted or is the author
        const pendingForUser: Proposal[] = [];

        for (const proposal of proposals) {
          // Skip if user is the author
          if (proposal.authorId === userId) {
            continue;
          }

          // Check if user has already voted
          const votesSnapshot = await getDoc(
            doc(db, 'votes', `${proposal.id}_${userId}`)
          );

          if (!votesSnapshot.exists()) {
            pendingForUser.push(proposal);
          }
        }

        setPendingProposals(pendingForUser);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching pending votes:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId, projectIds]);

  return { pendingProposals, loading, error };
};

/**
 * Hook to get proposal statistics for a project
 */
export const useProposalStats = (projectId: string) => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    expired: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) {
      setStats({ total: 0, pending: 0, approved: 0, rejected: 0, expired: 0 });
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'proposals'), where('projectId', '==', projectId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const proposals = snapshot.docs.map((doc) => doc.data()) as Proposal[];

      const newStats = {
        total: proposals.length,
        pending: proposals.filter((p) => p.status === 'pending').length,
        approved: proposals.filter((p) => p.status === 'approved').length,
        rejected: proposals.filter((p) => p.status === 'rejected').length,
        expired: proposals.filter((p) => p.status === 'expired').length,
      };

      setStats(newStats);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [projectId]);

  return { stats, loading };
};
