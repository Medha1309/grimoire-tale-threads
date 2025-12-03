import type { Proposal, Vote, VoteSummary, CoAuthor } from '../types/collaborativeStory';

/**
 * Calculate vote summary for a proposal
 */
export const calculateVoteSummary = (
  proposal: Proposal,
  coAuthors: CoAuthor[]
): VoteSummary => {
  const votes = proposal.votes || [];
  const totalCoAuthors = coAuthors.length;

  // Count votes by type
  const approveCount = votes.filter((v) => v.type === 'approve').length;
  const requestChangesCount = votes.filter((v) => v.type === 'request_changes').length;
  const rejectCount = votes.filter((v) => v.type === 'reject').length;
  const totalVotes = votes.length;

  // Calculate percentages
  const approvePercent = totalCoAuthors > 0 ? (approveCount / totalCoAuthors) * 100 : 0;
  const rejectPercent = totalCoAuthors > 0 ? (rejectCount / totalCoAuthors) * 100 : 0;

  // Check for owner/reviewer rejects
  const ownerOrReviewerReject = votes.some(
    (v) => v.type === 'reject' && ['owner', 'reviewer'].includes(v.voterRole)
  );

  // Check for owner reject specifically
  const ownerReject = votes.some((v) => v.type === 'reject' && v.voterRole === 'owner');

  // Determine if can merge
  const canMerge = approvePercent >= 60 && !ownerOrReviewerReject;

  // Determine status
  let status: VoteSummary['status'];
  if (proposal.status === 'approved' || canMerge) {
    status = 'approved';
  } else if (proposal.status === 'rejected' || rejectPercent >= 40 || ownerReject) {
    status = 'rejected';
  } else if (proposal.status === 'voting') {
    status = 'voting';
  } else {
    status = 'needs_votes';
  }

  // Find missing voters
  const voterIds = votes.map((v) => v.voterId);
  const missingVoters = coAuthors
    .filter((ca) => !voterIds.includes(ca.userId) && ca.userId !== proposal.authorId)
    .map((ca) => ca.displayName);

  return {
    totalVotes,
    approveCount,
    requestChangesCount,
    rejectCount,
    approvePercent,
    rejectPercent,
    canMerge,
    status,
    missingVoters,
  };
};

/**
 * Check if a user can vote on a proposal
 */
export const canUserVote = (
  proposal: Proposal,
  userId: string,
  coAuthors: CoAuthor[]
): boolean => {
  // Must be in voting status
  if (proposal.status !== 'voting') return false;

  // Must be a co-author
  const isCoAuthor = coAuthors.some((ca) => ca.userId === userId);
  if (!isCoAuthor) return false;

  // Can't vote on own proposal
  if (proposal.authorId === userId) return false;

  // Check if voting period has ended
  if (proposal.votingEndsAt && proposal.votingEndsAt.toDate() < new Date()) {
    return false;
  }

  return true;
};

/**
 * Check if a user has already voted
 */
export const hasUserVoted = (proposal: Proposal, userId: string): boolean => {
  return proposal.votes.some((v) => v.voterId === userId);
};

/**
 * Get user's vote on a proposal
 */
export const getUserVote = (proposal: Proposal, userId: string): Vote | null => {
  return proposal.votes.find((v) => v.voterId === userId) || null;
};

/**
 * Check if user can merge a proposal
 */
export const canUserMerge = (
  proposal: Proposal,
  userId: string,
  coAuthors: CoAuthor[]
): boolean => {
  // Must be approved or in voting
  if (!['approved', 'voting'].includes(proposal.status)) return false;

  // Find user's role
  const coAuthor = coAuthors.find((ca) => ca.userId === userId);
  if (!coAuthor) return false;

  // Only owner or reviewers can merge
  if (!['owner', 'reviewer'].includes(coAuthor.role)) return false;

  // If still voting, only owner can merge
  if (proposal.status === 'voting' && coAuthor.role !== 'owner') return false;

  return true;
};

/**
 * Format time remaining for voting
 */
export const getVotingTimeRemaining = (proposal: Proposal): string | null => {
  if (!proposal.votingEndsAt) return null;

  const now = new Date();
  const endsAt = proposal.votingEndsAt.toDate();
  const diff = endsAt.getTime() - now.getTime();

  if (diff <= 0) return 'Voting ended';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} remaining`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  return `${minutes}m remaining`;
};
