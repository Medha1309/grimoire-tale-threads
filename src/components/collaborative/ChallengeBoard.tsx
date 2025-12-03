import React, { useState } from 'react';
import { WritingChallenge, ChallengeDifficulty } from '../../types/writingChallenge';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

interface ChallengeBoardProps {
  challenges: WritingChallenge[];
  onChallengeClick: (challenge: WritingChallenge) => void;
  onJoinChallenge: (challengeId: string) => void;
}

const Trophy = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Fire = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
  </svg>
);

const getDifficultyColor = (difficulty: ChallengeDifficulty) => {
  switch (difficulty) {
    case 'easy':
      return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
    case 'medium':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'hard':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'expert':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
};

const getStatusColor = (status: WritingChallenge['status']) => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'active':
      return 'bg-lime-500/20 text-lime-400 border-lime-500/30';
    case 'completed':
      return 'bg-stone-500/20 text-stone-400 border-stone-500/30';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
  }
};

export const ChallengeBoard: React.FC<ChallengeBoardProps> = ({
  challenges,
  onChallengeClick,
  onJoinChallenge,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'upcoming'>('active');

  const filteredChallenges = challenges.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-stone-100">Writing Challenges</h2>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'active', 'upcoming'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === f
                  ? 'bg-lime-500 text-stone-900'
                  : 'bg-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChallenges.map((challenge) => {
          const startDate = challenge.startDate instanceof Timestamp 
            ? challenge.startDate.toDate() 
            : challenge.startDate;
          const endDate = challenge.endDate instanceof Timestamp 
            ? challenge.endDate.toDate() 
            : challenge.endDate;
          
          const isActive = challenge.status === 'active';
          const spotsLeft = challenge.maxParticipants 
            ? challenge.maxParticipants - challenge.participants.length 
            : null;

          return (
            <div
              key={challenge.id}
              className="bg-stone-800/50 rounded-lg border border-stone-700 p-6 hover:border-stone-600 transition-all cursor-pointer"
              onClick={() => onChallengeClick(challenge)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(challenge.status)}`}>
                      {challenge.status}
                    </span>
                    {isActive && (
                      <Fire className="w-4 h-4 text-orange-400 animate-pulse" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-stone-100 mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-sm text-stone-400 line-clamp-2">
                    {challenge.description}
                  </p>
                </div>
              </div>

              {/* Challenge Details */}
              <div className="space-y-2 mb-4">
                {challenge.prompt && (
                  <div className="p-3 bg-stone-900/50 rounded border border-stone-700">
                    <div className="text-xs text-stone-500 mb-1">Prompt</div>
                    <div className="text-sm text-stone-300 italic">"{challenge.prompt}"</div>
                  </div>
                )}

                {challenge.constraints && challenge.constraints.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {challenge.constraints.map((constraint, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs rounded border border-purple-500/30"
                      >
                        {constraint}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                {challenge.wordCountMin && (
                  <div>
                    <div className="text-stone-500 text-xs mb-1">Word Count</div>
                    <div className="text-stone-200 font-semibold">
                      {challenge.wordCountMin}
                      {challenge.wordCountMax && `-${challenge.wordCountMax}`}
                    </div>
                  </div>
                )}
                {challenge.timeLimit && (
                  <div>
                    <div className="text-stone-500 text-xs mb-1">Time Limit</div>
                    <div className="text-stone-200 font-semibold flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {challenge.timeLimit}m
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-stone-500 text-xs mb-1">Participants</div>
                  <div className="text-stone-200 font-semibold flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {challenge.participants.length}
                    {challenge.maxParticipants && `/${challenge.maxParticipants}`}
                  </div>
                </div>
              </div>

              {/* Timing */}
              <div className="text-xs text-stone-500 mb-4">
                {challenge.status === 'upcoming' && (
                  <div>Starts {formatDistanceToNow(startDate, { addSuffix: true })}</div>
                )}
                {challenge.status === 'active' && (
                  <div>Ends {formatDistanceToNow(endDate, { addSuffix: true })}</div>
                )}
                {challenge.status === 'completed' && (
                  <div>Completed {formatDistanceToNow(endDate, { addSuffix: true })}</div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onJoinChallenge(challenge.id);
                }}
                disabled={challenge.status !== 'active' && challenge.status !== 'upcoming'}
                className={`w-full py-2 rounded-lg font-medium transition-colors ${
                  challenge.status === 'active' || challenge.status === 'upcoming'
                    ? 'bg-lime-500 text-stone-900 hover:bg-lime-400'
                    : 'bg-stone-700 text-stone-500 cursor-not-allowed'
                }`}
              >
                {challenge.status === 'active' && 'Join Challenge'}
                {challenge.status === 'upcoming' && 'Register'}
                {challenge.status === 'completed' && 'View Results'}
                {challenge.status === 'cancelled' && 'Cancelled'}
              </button>

              {spotsLeft !== null && spotsLeft <= 5 && spotsLeft > 0 && (
                <div className="text-xs text-amber-400 text-center mt-2">
                  Only {spotsLeft} spots left!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No {filter} challenges</p>
          <p className="text-sm">Check back soon for new writing challenges!</p>
        </div>
      )}
    </div>
  );
};
