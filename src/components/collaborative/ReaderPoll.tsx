import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[]; // user IDs
}

export interface ReaderPoll {
  id: string;
  projectId: string;
  question: string;
  description?: string;
  options: PollOption[];
  createdBy: string;
  createdAt: Timestamp;
  endsAt: Timestamp;
  isActive: boolean;
  totalVotes: number;
}

interface ReaderPollProps {
  poll: ReaderPoll;
  currentUserId: string | null;
  onVote: (pollId: string, optionId: string) => void;
}

const BarChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const ReaderPoll: React.FC<ReaderPollProps> = ({ poll, currentUserId, onVote }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(
    currentUserId ? poll.options.some(opt => opt.voters.includes(currentUserId)) : false
  );

  const handleVote = () => {
    if (!selectedOption || !currentUserId) return;
    onVote(poll.id, selectedOption);
    setHasVoted(true);
  };

  const getWinningOption = () => {
    return poll.options.reduce((max, opt) => opt.votes > max.votes ? opt : max, poll.options[0]);
  };

  const winningOption = getWinningOption();

  return (
    <div className="bg-stone-800/50 rounded-lg border border-stone-700 p-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <BarChart className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-stone-100 mb-1">{poll.question}</h3>
          {poll.description && (
            <p className="text-sm text-stone-400">{poll.description}</p>
          )}
        </div>
        {poll.isActive && (
          <span className="px-3 py-1 bg-lime-500/20 text-lime-400 text-xs rounded-full border border-lime-500/30">
            Active
          </span>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-4">
        {poll.options.map((option) => {
          const percentage = poll.totalVotes > 0 
            ? Math.round((option.votes / poll.totalVotes) * 100) 
            : 0;
          const isWinning = option.id === winningOption.id && poll.totalVotes > 0;
          const userVoted = currentUserId && option.voters.includes(currentUserId);

          return (
            <div key={option.id} className="relative">
              {/* Background bar */}
              {hasVoted && (
                <div
                  className={`absolute inset-0 rounded-lg transition-all duration-500 ${
                    isWinning ? 'bg-lime-500/20' : 'bg-blue-500/10'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              )}

              {/* Option content */}
              <button
                onClick={() => !hasVoted && setSelectedOption(option.id)}
                disabled={hasVoted || !poll.isActive}
                className={`relative w-full p-4 rounded-lg border-2 transition-all text-left ${
                  hasVoted
                    ? 'cursor-default'
                    : selectedOption === option.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-stone-700 hover:border-stone-600'
                } ${!poll.isActive && 'opacity-60'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {userVoted && (
                      <CheckCircle className="w-5 h-5 text-lime-400" />
                    )}
                    <span className="font-medium text-stone-200">{option.text}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasVoted && (
                      <>
                        <span className="text-sm text-stone-400">
                          {option.votes} {option.votes === 1 ? 'vote' : 'votes'}
                        </span>
                        <span className="text-lg font-bold text-stone-200 min-w-[3rem] text-right">
                          {percentage}%
                        </span>
                      </>
                    )}
                    {!hasVoted && selectedOption === option.id && (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-500" />
                    )}
                    {!hasVoted && selectedOption !== option.id && (
                      <div className="w-5 h-5 rounded-full border-2 border-stone-600" />
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-700">
        <div className="text-sm text-stone-500">
          {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'} total
        </div>

        {!hasVoted && poll.isActive && (
          <button
            onClick={handleVote}
            disabled={!selectedOption || !currentUserId}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-400 disabled:bg-stone-700 disabled:text-stone-500 text-white rounded-lg font-medium transition-colors"
          >
            {currentUserId ? 'Cast Vote' : 'Sign in to vote'}
          </button>
        )}

        {hasVoted && (
          <div className="text-sm text-lime-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            You voted
          </div>
        )}

        {!poll.isActive && (
          <div className="text-sm text-stone-500">
            Poll closed
          </div>
        )}
      </div>
    </div>
  );
};

// Component for displaying multiple polls
interface ReaderPollsProps {
  polls: ReaderPoll[];
  currentUserId: string | null;
  onVote: (pollId: string, optionId: string) => void;
  onCreatePoll?: () => void;
}

export const ReaderPolls: React.FC<ReaderPollsProps> = ({
  polls,
  currentUserId,
  onVote,
  onCreatePoll,
}) => {
  const activePolls = polls.filter(p => p.isActive);
  const closedPolls = polls.filter(p => !p.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-100 mb-1">Reader Polls</h2>
          <p className="text-sm text-stone-400">
            Help shape the story by voting on key decisions
          </p>
        </div>
        {onCreatePoll && (
          <button
            onClick={onCreatePoll}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          >
            Create Poll
          </button>
        )}
      </div>

      {/* Active Polls */}
      {activePolls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-stone-200">Active Polls</h3>
          {activePolls.map(poll => (
            <ReaderPoll
              key={poll.id}
              poll={poll}
              currentUserId={currentUserId}
              onVote={onVote}
            />
          ))}
        </div>
      )}

      {/* Closed Polls */}
      {closedPolls.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-stone-200">Past Polls</h3>
          {closedPolls.map(poll => (
            <ReaderPoll
              key={poll.id}
              poll={poll}
              currentUserId={currentUserId}
              onVote={onVote}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {polls.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <BarChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No polls yet</p>
          <p className="text-sm">Create a poll to let readers influence the story</p>
        </div>
      )}
    </div>
  );
};
