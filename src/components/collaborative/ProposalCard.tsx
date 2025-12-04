import React from 'react';
import { Link } from 'react-router-dom';
import type { Proposal, CoAuthor } from '../../types/collaborativeStory';
import { calculateVoteSummary, getVotingTimeRemaining } from '../../utils/votingAlgorithm';
import { formatDistanceToNow } from 'date-fns';

interface ProposalCardProps {
  proposal: Proposal;
  coAuthors: CoAuthor[];
  projectId: string;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, coAuthors, projectId }) => {
  const summary = calculateVoteSummary(proposal, coAuthors);
  const timeRemaining = getVotingTimeRemaining(proposal);

  const statusConfig = {
    draft: { label: 'Draft', color: 'slate', icon: 'D' },
    voting: { label: 'Voting', color: 'blue', icon: 'V' },
    approved: { label: 'Approved', color: 'green', icon: 'A' },
    rejected: { label: 'Rejected', color: 'red', icon: 'R' },
    merged: { label: 'Merged', color: 'purple', icon: 'M' },
    pending: { label: 'Pending', color: 'yellow', icon: 'P' },
    expired: { label: 'Expired', color: 'gray', icon: 'E' },
  };

  const config = statusConfig[proposal.status];
  const typeLabels: Record<string, string> = {
    new_chapter: 'New Chapter',
    edit: 'Edit',
    character: 'Character',
    plot: 'Plot',
    minor_edit: 'Minor Edit',
  };

  return (
    <Link
      to={`/chains/projects/${projectId}/proposals/${proposal.id}`}
      className="block border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-colors bg-slate-900/30"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-${config.color}-400 text-sm`}>{config.icon}</span>
            <h3 className="font-semibold text-slate-200 truncate">{proposal.title}</h3>
          </div>
          <p className="text-sm text-slate-400 line-clamp-2">{proposal.description}</p>
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className={`px-2 py-1 rounded text-xs font-medium bg-${config.color}-500/20 text-${config.color}-400 border border-${config.color}-500/30`}
          >
            {config.label}
          </span>
          <span className="px-2 py-1 rounded text-xs bg-slate-800 text-slate-400">
            {typeLabels[proposal.type]}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500 mt-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <span>by {proposal.authorName}</span>
          <span>•</span>
          <span>{formatDistanceToNow(proposal.createdAt.toDate(), { addSuffix: true })}</span>
        </div>

        {proposal.status === 'voting' && (
          <div className="flex items-center gap-3">
            {timeRemaining && <span className="text-slate-400">{timeRemaining}</span>}
            <div className="flex items-center gap-2">
              <span className="text-green-400">{summary.approveCount} approve</span>
              <span className="text-red-400">{summary.rejectCount} reject</span>
            </div>
          </div>
        )}

        {proposal.status === 'merged' && proposal.mergedAt && (
          <span className="text-purple-400">
            Merged {formatDistanceToNow(proposal.mergedAt.toDate(), { addSuffix: true })}
          </span>
        )}
      </div>

      {summary.canMerge && proposal.status === 'voting' && (
        <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
          <span>Ready to merge</span>
        </div>
      )}
    </Link>
  );
};
