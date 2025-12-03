import React, { useState } from 'react';
import { StoryBranch, BranchPoint } from '../../types/storyBranch';

interface BranchVisualizerProps {
  branches: StoryBranch[];
  branchPoints: BranchPoint[];
  currentBranchId: string;
  onBranchSelect: (branchId: string) => void;
}

const GitBranch = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const ThumbsUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
  </svg>
);

export const BranchVisualizer: React.FC<BranchVisualizerProps> = ({
  branches,
  branchPoints,
  currentBranchId,
  onBranchSelect,
}) => {
  const [expandedPoints, setExpandedPoints] = useState<Set<string>>(new Set());

  // Build tree structure
  const mainBranch = branches.find(b => b.isCanonical);
  const branchMap = new Map(branches.map(b => [b.id, b]));
  
  const toggleBranchPoint = (pointId: string) => {
    const newExpanded = new Set(expandedPoints);
    if (newExpanded.has(pointId)) {
      newExpanded.delete(pointId);
    } else {
      newExpanded.add(pointId);
    }
    setExpandedPoints(newExpanded);
  };

  const getBranchesForPoint = (pointId: string) => {
    return branches.filter(b => b.branchPointId === pointId);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-lime-400" />
          <h3 className="text-lg font-semibold text-stone-200">Story Branches</h3>
        </div>
        <div className="text-sm text-stone-400">
          {branches.length} {branches.length === 1 ? 'branch' : 'branches'}
        </div>
      </div>

      {/* Main Branch */}
      {mainBranch && (
        <div
          onClick={() => onBranchSelect(mainBranch.id)}
          className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
            currentBranchId === mainBranch.id
              ? 'bg-lime-500/10 border-lime-500'
              : 'bg-stone-800/30 border-stone-700 hover:border-stone-600'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-lime-500/20 text-lime-400 text-xs rounded-full border border-lime-500/30">
                  Main Branch
                </span>
                <h4 className="font-semibold text-stone-100">{mainBranch.title}</h4>
              </div>
              <p className="text-sm text-stone-400 mb-2">{mainBranch.description}</p>
              <div className="flex items-center gap-4 text-xs text-stone-500">
                <span>{mainBranch.wordCount.toLocaleString()} words</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {mainBranch.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" />
                  {mainBranch.voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branch Points */}
      {branchPoints.map((point) => {
        const pointBranches = getBranchesForPoint(point.id);
        const isExpanded = expandedPoints.has(point.id);

        return (
          <div key={point.id} className="ml-8 space-y-2">
            {/* Branch Point */}
            <button
              onClick={() => toggleBranchPoint(point.id)}
              className="w-full text-left p-3 bg-stone-800/50 rounded-lg border border-stone-700 hover:border-stone-600 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center">
                  <span className="text-amber-400 text-xs font-bold">?</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-stone-200">{point.title}</div>
                  <div className="text-sm text-stone-400">{point.question}</div>
                </div>
                <div className="text-xs text-stone-500">
                  {pointBranches.length} {pointBranches.length === 1 ? 'path' : 'paths'}
                </div>
                <svg
                  className={`w-5 h-5 text-stone-400 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Branches from this point */}
            {isExpanded && (
              <div className="ml-8 space-y-2">
                {pointBranches.map((branch) => (
                  <div
                    key={branch.id}
                    onClick={() => onBranchSelect(branch.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      currentBranchId === branch.id
                        ? 'bg-blue-500/10 border-blue-500'
                        : 'bg-stone-800/30 border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <h5 className="font-medium text-stone-100">{branch.title}</h5>
                        </div>
                        <p className="text-sm text-stone-400 mb-2">{branch.description}</p>
                        <div className="flex items-center gap-4 text-xs text-stone-500">
                          <span>{branch.wordCount.toLocaleString()} words</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {branch.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3" />
                            {branch.voteCount}
                          </span>
                          <span className="text-stone-600">by {branch.createdByName}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Empty State */}
      {branchPoints.length === 0 && (
        <div className="text-center py-8 text-stone-500">
          <GitBranch className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No branch points yet</p>
          <p className="text-sm mt-1">Create a branch point to explore alternate paths</p>
        </div>
      )}
    </div>
  );
};
