import React, { useState } from 'react';
import { useProposals } from '../../hooks/useProposals';
import { Proposal } from '../../types/collaborativeStory';
import { formatTimeRemaining } from '../../utils/votingAlgorithm';
import { LoadingSkeleton } from '../shared/LoadingSkeleton';
import { formatDistanceToNow } from 'date-fns';

// Icons
const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface ProposalListProps {
  projectId: string;
  onProposalClick: (proposal: Proposal) => void;
}

type FilterStatus = 'all' | 'pending' | 'approved' | 'rejected' | 'expired';

export const ProposalList: React.FC<ProposalListProps> = ({
  projectId,
  onProposalClick,
}) => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  const { proposals, loading } = useProposals({
    projectId,
    status: filterStatus === 'all' ? undefined : filterStatus,
  });

  const getProposalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      minor_edit: 'Minor Edit',
      major_edit: 'Major Edit',
      new_chapter: 'New Chapter',
      character_change: 'Character',
      plot_change: 'Plot',
    };
    return labels[type] || type;
  };

  const getProposalTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      minor_edit: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      major_edit: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      new_chapter: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
      character_change: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      plot_change: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return colors[type] || 'bg-stone-500/20 text-stone-400 border-stone-500/30';
  };

  const getStatusBadge = (proposal: Proposal): JSX.Element | null => {
    switch (proposal.status) {
      case 'pending':
        return (
          <div className="flex items-center gap-1 text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{formatTimeRemaining(proposal)}</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-1 text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-1 text-red-400">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Rejected</span>
          </div>
        );
      case 'expired':
        return (
          <div className="flex items-center gap-1 text-stone-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Expired</span>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <LoadingSkeleton count={3} />;
  }

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-stone-700 pb-2">
        {(['all', 'pending', 'approved', 'rejected', 'expired'] as FilterStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              filterStatus === status
                ? 'bg-stone-700 text-stone-100'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Proposals List */}
      {proposals.length === 0 ? (
        <div className="text-center py-12 text-stone-400">
          <p>No proposals found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <button
              key={proposal.id}
              onClick={() => onProposalClick(proposal)}
              className="w-full p-4 bg-stone-800/50 hover:bg-stone-800 rounded-lg border border-stone-700 hover:border-stone-600 transition-all text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Title and Type */}
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-stone-100 truncate">
                      {proposal.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded border ${getProposalTypeColor(
                        proposal.type
                      )}`}
                    >
                      {getProposalTypeLabel(proposal.type)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-400 line-clamp-2 mb-3">
                    {proposal.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{proposal.authorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDistanceToNow(
                          proposal.createdAt instanceof Date
                            ? proposal.createdAt
                            : proposal.createdAt?.toDate ? proposal.createdAt.toDate() : new Date(),
                          { addSuffix: true }
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  {getStatusBadge(proposal)}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
