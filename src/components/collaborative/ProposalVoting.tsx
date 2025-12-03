import React, { useState } from 'react';
import { Button } from '../shared/Button';
import { useProposalActions } from '../../hooks/useProposalActions';
import { useProposal } from '../../hooks/useProposals';
import { VoteType } from '../../types/collaborativeStory';
import { calculateVotingResult, formatTimeRemaining } from '../../utils/votingAlgorithm';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';

// Icons
const ThumbsUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

const ThumbsDown = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
  </svg>
);

const MinusCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface ProposalVotingProps {
  proposalId: string;
  totalEligibleVoters: number;
  userHasVoted: boolean;
  onVoteSuccess?: () => void;
}

export const ProposalVoting: React.FC<ProposalVotingProps> = ({
  proposalId,
  totalEligibleVoters,
  userHasVoted,
  onVoteSuccess,
}) => {
  const { proposal, votes, loading } = useProposal(proposalId);
  const { submitVote, loading: submitting } = useProposalActions();
  
  const [selectedVote, setSelectedVote] = useState<VoteType | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  if (loading) {
    return <LoadingSkeleton count={3} />;
  }

  if (!proposal) {
    return (
      <div className="text-center text-stone-400 py-8">
        Proposal not found
      </div>
    );
  }

  const votingResult = calculateVotingResult(proposal, votes, totalEligibleVoters);
  const timeRemaining = formatTimeRemaining(proposal);
  const votingClosed = proposal.status !== 'pending';

  const handleVoteClick = (voteType: VoteType) => {
    if (userHasVoted || votingClosed) return;
    
    setSelectedVote(voteType);
    setShowCommentBox(true);
  };

  const handleSubmitVote = async () => {
    if (!selectedVote) return;

    try {
      await submitVote(proposalId, selectedVote, comment.trim() || undefined);
      setSelectedVote(null);
      setComment('');
      setShowCommentBox(false);
      onVoteSuccess?.();
    } catch (error) {
      // Error handled by useProposalActions
    }
  };

  const getVoteButtonClass = (voteType: VoteType) => {
    const base = 'flex-1 flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all';
    const isSelected = selectedVote === voteType;
    
    if (votingClosed || userHasVoted) {
      return `${base} border-stone-700 bg-stone-800/30 cursor-not-allowed opacity-50`;
    }
    
    if (isSelected) {
      if (voteType === 'approve') {
        return `${base} border-emerald-500 bg-emerald-500/20`;
      } else if (voteType === 'reject') {
        return `${base} border-red-500 bg-red-500/20`;
      } else {
        return `${base} border-amber-500 bg-amber-500/20`;
      }
    }
    
    return `${base} border-stone-700 bg-stone-800/50 hover:border-stone-600 cursor-pointer`;
  };

  const getVoteColor = (voteType: VoteType) => {
    if (voteType === 'approve') return 'text-emerald-400';
    if (voteType === 'reject') return 'text-red-400';
    return 'text-amber-400';
  };

  return (
    <div className="space-y-6">
      {/* Voting Status */}
      <div className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg border border-stone-700">
        <div>
          <div className="text-sm text-stone-400">Voting Status</div>
          <div className="text-lg font-semibold text-stone-200">
            {votingClosed ? (
              <span className="text-stone-400">Voting Closed</span>
            ) : (
              timeRemaining
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-stone-400">Participation</div>
          <div className="text-lg font-semibold text-stone-200">
            {votes.length} / {totalEligibleVoters}
            <span className="text-sm text-stone-400 ml-2">
              ({Math.round(votingResult.participationRate * 100)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Vote Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 mb-1">
            <ThumbsUp className="w-5 h-5" />
            <span className="font-semibold">Approve</span>
          </div>
          <div className="text-2xl font-bold text-emerald-300">
            {votingResult.breakdown.approve}
          </div>
        </div>

        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
          <div className="flex items-center gap-2 text-red-400 mb-1">
            <ThumbsDown className="w-5 h-5" />
            <span className="font-semibold">Reject</span>
          </div>
          <div className="text-2xl font-bold text-red-300">
            {votingResult.breakdown.reject}
          </div>
        </div>

        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-400 mb-1">
            <MinusCircle className="w-5 h-5" />
            <span className="font-semibold">Abstain</span>
          </div>
          <div className="text-2xl font-bold text-amber-300">
            {votingResult.breakdown.abstain}
          </div>
        </div>
      </div>

      {/* Voting Score */}
      <div className="p-4 bg-stone-800/50 rounded-lg border border-stone-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-stone-400">Approval Score</span>
          <span className="text-sm text-stone-400">
            Required: {votingResult.requiredScore.toFixed(1)}
          </span>
        </div>
        
        <div className="relative h-4 bg-stone-700 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 rounded-full transition-all ${
              votingResult.approved ? 'bg-emerald-500' : 'bg-amber-500'
            }`}
            style={{
              width: `${Math.min(100, (votingResult.score / votingResult.requiredScore) * 100)}%`,
            }}
          />
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-semibold text-stone-200">
            {votingResult.score.toFixed(1)}
          </span>
          {votingResult.approved && (
            <span className="text-sm font-semibold text-emerald-400">
              ✓ Approved
            </span>
          )}
        </div>
      </div>

      {/* Voting Buttons */}
      {!userHasVoted && !votingClosed && (
        <div className="space-y-4">
          <div className="flex gap-4">
            <button
              onClick={() => handleVoteClick('approve')}
              className={getVoteButtonClass('approve')}
              disabled={submitting}
            >
              <ThumbsUp className={`w-8 h-8 ${getVoteColor('approve')}`} />
              <span className="font-semibold text-stone-200">Approve</span>
            </button>

            <button
              onClick={() => handleVoteClick('reject')}
              className={getVoteButtonClass('reject')}
              disabled={submitting}
            >
              <ThumbsDown className={`w-8 h-8 ${getVoteColor('reject')}`} />
              <span className="font-semibold text-stone-200">Reject</span>
            </button>

            <button
              onClick={() => handleVoteClick('abstain')}
              className={getVoteButtonClass('abstain')}
              disabled={submitting}
            >
              <MinusCircle className={`w-8 h-8 ${getVoteColor('abstain')}`} />
              <span className="font-semibold text-stone-200">Abstain</span>
            </button>
          </div>

          {/* Comment Box */}
          {showCommentBox && selectedVote && (
            <div className="space-y-3 p-4 bg-stone-800/50 rounded-lg border border-stone-700">
              <label className="block text-sm font-medium text-stone-300">
                Add a comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Explain your vote..."
                rows={3}
                className="w-full px-4 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500 resize-none"
              />
              
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedVote(null);
                    setComment('');
                    setShowCommentBox(false);
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmitVote}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Vote'}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* User Has Voted Message */}
      {userHasVoted && (
        <div className="p-4 bg-lime-500/10 rounded-lg border border-lime-500/30 text-center">
          <span className="text-lime-400 font-semibold">
            ✓ You have already voted on this proposal
          </span>
        </div>
      )}

      {/* Voting Closed Message */}
      {votingClosed && proposal.status !== 'pending' && (
        <div className="p-4 bg-stone-700/50 rounded-lg border border-stone-600 text-center">
          <span className="text-stone-300 font-semibold">
            Voting has ended - Proposal {proposal.status}
          </span>
        </div>
      )}

      {/* Vote Comments */}
      {votes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-stone-200">Votes & Comments</h4>
          {votes.map((vote) => (
            <div
              key={vote.id}
              className="p-4 bg-stone-800/50 rounded-lg border border-stone-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-stone-200">
                    {vote.voterName}
                  </span>
                  <span className="text-xs text-stone-400">
                    ({vote.voterRole})
                  </span>
                </div>
                <span className={`text-sm font-semibold ${getVoteColor(vote.type)}`}>
                  {vote.type.charAt(0).toUpperCase() + vote.type.slice(1)}
                </span>
              </div>
              {vote.comment && (
                <p className="text-sm text-stone-300">{vote.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
