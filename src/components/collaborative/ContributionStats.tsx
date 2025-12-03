import React from 'react';
import { CollaborativeProject } from '../../types/collaborativeStory';

interface ContributionStatsProps {
  project: CollaborativeProject;
  proposals: any[]; // Proposal type
}

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export const ContributionStats: React.FC<ContributionStatsProps> = ({ project, proposals }) => {
  // Calculate stats
  const totalWords = project.currentContent?.split(/\s+/).filter(Boolean).length || 0;
  const totalProposals = proposals.length;
  const mergedProposals = proposals.filter(p => p.status === 'merged' || p.status === 'approved').length;
  const pendingProposals = proposals.filter(p => p.status === 'pending' || p.status === 'voting').length;

  // Calculate per-author stats
  const authorStats = project.coAuthors.map(author => {
    const authorProposals = proposals.filter(p => p.authorId === author.userId);
    const mergedCount = authorProposals.filter(p => p.status === 'merged' || p.status === 'approved').length;
    
    return {
      ...author,
      proposalsSubmitted: authorProposals.length,
      proposalsMerged: mergedCount,
      acceptanceRate: authorProposals.length > 0 
        ? Math.round((mergedCount / authorProposals.length) * 100) 
        : 0,
    };
  });

  // Sort by contribution
  const sortedAuthors = [...authorStats].sort((a, b) => b.proposalsMerged - a.proposalsMerged);
  const topContributor = sortedAuthors[0];

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-stone-800/30 rounded-lg p-4 border border-stone-700/50">
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-1">
            <FileText className="w-4 h-4" />
            Total Words
          </div>
          <div className="text-2xl font-bold text-stone-100">
            {totalWords.toLocaleString()}
          </div>
        </div>

        <div className="bg-stone-800/30 rounded-lg p-4 border border-stone-700/50">
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-1">
            <TrendingUp className="w-4 h-4" />
            Proposals
          </div>
          <div className="text-2xl font-bold text-stone-100">
            {totalProposals}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {mergedProposals} merged, {pendingProposals} pending
          </div>
        </div>

        <div className="bg-stone-800/30 rounded-lg p-4 border border-stone-700/50">
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-1">
            <Award className="w-4 h-4" />
            Acceptance Rate
          </div>
          <div className="text-2xl font-bold text-stone-100">
            {totalProposals > 0 ? Math.round((mergedProposals / totalProposals) * 100) : 0}%
          </div>
        </div>

        <div className="bg-stone-800/30 rounded-lg p-4 border border-stone-700/50">
          <div className="flex items-center gap-2 text-stone-400 text-sm mb-1">
            <Award className="w-4 h-4" />
            Top Contributor
          </div>
          <div className="text-lg font-bold text-lime-400 truncate">
            {topContributor?.displayName || 'None yet'}
          </div>
          <div className="text-xs text-stone-500 mt-1">
            {topContributor?.proposalsMerged || 0} merged
          </div>
        </div>
      </div>

      {/* Per-Author Stats */}
      <div>
        <h3 className="text-lg font-semibold text-stone-200 mb-3">
          Co-Author Contributions
        </h3>
        <div className="space-y-2">
          {sortedAuthors.map((author, index) => (
            <div
              key={author.userId}
              className="bg-stone-800/30 rounded-lg p-4 border border-stone-700/50 hover:border-stone-600/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-lime-500 to-emerald-600 text-white font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-100 flex items-center gap-2">
                      {author.displayName}
                      {author.userId === project.ownerId && (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full border border-amber-500/30">
                          Owner
                        </span>
                      )}
                      {index === 0 && sortedAuthors.length > 1 && (
                        <Award className="w-4 h-4 text-lime-400" />
                      )}
                    </div>
                    <div className="text-sm text-stone-400 capitalize">
                      {author.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-stone-400 text-xs mb-1">Submitted</div>
                    <div className="font-semibold text-stone-200">
                      {author.proposalsSubmitted}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-stone-400 text-xs mb-1">Merged</div>
                    <div className="font-semibold text-lime-400">
                      {author.proposalsMerged}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-stone-400 text-xs mb-1">Rate</div>
                    <div className="font-semibold text-stone-200">
                      {author.acceptanceRate}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              {author.proposalsSubmitted > 0 && (
                <div className="mt-3">
                  <div className="h-2 bg-stone-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-lime-500 to-emerald-500 transition-all duration-500"
                      style={{ width: `${author.acceptanceRate}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
