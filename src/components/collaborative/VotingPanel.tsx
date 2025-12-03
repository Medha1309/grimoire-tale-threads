import React, { useState } from 'react';
import type { Proposal, CoAuthor, VoteType } from '../../types/collaborativeStory';
import { useProposalActions } from '../../hooks/useProposalActions';
import { calculateVoteSummary, canUserVote, hasUserVoted, getUserVote, getVotingTimeRemaining } from '../../utils/votingAlgorithm';
import { useAuth } from '../../contexts/AuthContext';

interface VotingPanelProps {
  proposal: Proposal;
  coAuthors: CoAuthor[];
}

export const VotingPanel: React.FC<VotingPanelProps> = ({ proposal, coAuthors }) => {
  const { currentUser } = useAuth();
  const { castVote, loading } = useProposalActions();
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);

  const summary = calculateVoteSummary(proposal, coAuthors);
  const canVote = currentUser && canUserVote(proposal, currentUser.uid, coAuthors);
  const hasVoted = currentUser && hasUserVoted(proposal, currentUser.uid);
  const userVote = currentUser ? getUserVote(proposal, currentUser.uid) : null;
  const timeRemaining = getVotingTimeRemaining(proposal);

  const handleVote = async (type: VoteType) => {
    if (!currentUser || !canVote) return;

    try {
      await castVote(proposal.id, type, comment || undefined);
      setComment('');
      setShowCommentBox(false);
    } catch (error) {
      console.error('Error casting vote:', error);
    }
  };

  return (
    <div className="border border-slate-700 rounded-lg p-4 space-y-4 bg-slate-900/50">
      {/* Vote Summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-slate-200">Votes ({summary.totalVotes}/{coAuthors.length})</h4>
          {timeRemaining && (
            <span className="text-sm text-slate-400">{timeRemaining}</span>
          )}
        </div>

        {/* Approve Progress */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${summary.approvePercent}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 w-16 text-right">
              {summary.approveCount} ✓
            </span>
          </div>

          {/* Request Changes */}
          {summary.requestChangesCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(summary.requestChangesCount / coAuthors.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-slate-400 w-16 text-right">
                {summary.requestChangesCount} ✎
              </span>
            </div>
          )}

          {/* Reject Progress */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${summary.rejectPercent}%` }}
              />
            </div>
            <span className="text-sm text-slate-400 w-16 text-right">
              {summary.rejectCount} ✕
            </span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      {summary.canMerge && (
        <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
          <p className="text-sm text-green-400 flex items-center gap-2">
            <span>✓</span>
            <span>Ready to merge (60% approval reached)</span>
          </p>
        </div>
      )}

      {/* Missing Voters */}
      {summary.missingVoters.length > 0 && proposal.status === 'voting' && (
        <div className="text-sm text-slate-400">
          <p className="mb-1">Waiting for votes from:</p>
          <p className="text-slate-500">{summary.missingVoters.join(', ')}</p>
        </div>
      )}

      {/* User's Vote Status */}
      {hasVoted && userVote && (
        <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
          <p className="text-sm text-slate-300 mb-1">
            You voted: <span className="font-semibold">
              {userVote.type === 'approve' && '✓ Approve'}
              {userVote.type === 'request_changes' && '✎ Request Changes'}
              {userVote.type === 'reject' && '✕ Reject'}
            </span>
          </p>
          {userVote.comment && (
            <p className="text-sm text-slate-400 italic">"{userVote.comment}"</p>
          )}
        </div>
      )}

      {/* Voting Buttons */}
      {canVote && !hasVoted && (
        <div className="space-y-3">
          {showCommentBox && (
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment (optional)"
              className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-600"
              rows={3}
            />
          )}

          <div className="flex gap-2">
            <button
              onClick={() => handleVote('approve')}
              disabled={loading}
              className="flex-1 bg-green-500/20 border border-green-500/50 text-green-400 rounded px-4 py-2 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => handleVote('request_changes')}
              disabled={loading}
              className="flex-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 rounded px-4 py-2 hover:bg-yellow-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              ✎ Request Changes
            </button>
            <button
              onClick={() => handleVote('reject')}
              disabled={loading}
              className="flex-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded px-4 py-2 hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              ✕ Reject
            </button>
          </div>

          {!showCommentBox && (
            <button
              onClick={() => setShowCommentBox(true)}
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              + Add comment
            </button>
          )}
        </div>
      )}

      {/* Can't Vote Message */}
      {!canVote && !hasVoted && proposal.status === 'voting' && (
        <div className="text-sm text-slate-500 text-center py-2">
          {proposal.authorId === currentUser?.uid
            ? "You can't vote on your own proposal"
            : "You don't have permission to vote"}
        </div>
      )}
    </div>
  );
};
