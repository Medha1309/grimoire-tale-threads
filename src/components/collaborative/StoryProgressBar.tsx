import React from 'react';

interface StoryProgressBarProps {
  currentWords: number;
  targetWords?: number;
  showDetails?: boolean;
}

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export const StoryProgressBar: React.FC<StoryProgressBarProps> = ({
  currentWords,
  targetWords = 50000, // Default to NaNoWriMo goal
  showDetails = true,
}) => {
  const progress = Math.min((currentWords / targetWords) * 100, 100);
  const isComplete = currentWords >= targetWords;
  const remaining = Math.max(targetWords - currentWords, 0);

  // Milestone markers
  const milestones = [
    { percent: 25, label: '25%', words: targetWords * 0.25 },
    { percent: 50, label: '50%', words: targetWords * 0.5 },
    { percent: 75, label: '75%', words: targetWords * 0.75 },
    { percent: 100, label: 'Goal', words: targetWords },
  ];

  const getProgressColor = () => {
    if (isComplete) return 'from-lime-500 to-emerald-500';
    if (progress >= 75) return 'from-blue-500 to-cyan-500';
    if (progress >= 50) return 'from-purple-500 to-pink-500';
    if (progress >= 25) return 'from-amber-500 to-orange-500';
    return 'from-stone-500 to-stone-600';
  };

  const getProgressMessage = () => {
    if (isComplete) return 'Goal reached!';
    if (progress >= 75) return 'Almost there!';
    if (progress >= 50) return 'Halfway there!';
    if (progress >= 25) return 'Good progress!';
    return 'Just getting started!';
  };

  return (
    <div className="space-y-3">
      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-stone-400" />
            <span className="text-stone-300">Story Progress</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <span className="font-mono font-semibold text-stone-200">
              {currentWords.toLocaleString()}
            </span>
            <span>/</span>
            <span className="font-mono">
              {targetWords.toLocaleString()} words
            </span>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative">
        {/* Background track */}
        <div className="h-4 bg-stone-800/50 rounded-full overflow-hidden border border-stone-700/50">
          {/* Progress fill */}
          <div
            className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-700 ease-out relative`}
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Milestone markers */}
        <div className="absolute inset-0 flex items-center">
          {milestones.map((milestone) => (
            <div
              key={milestone.percent}
              className="absolute flex flex-col items-center"
              style={{ left: `${milestone.percent}%`, transform: 'translateX(-50%)' }}
            >
              {/* Marker dot */}
              <div
                className={`w-2 h-2 rounded-full border-2 transition-colors ${
                  progress >= milestone.percent
                    ? 'bg-lime-400 border-lime-300'
                    : 'bg-stone-700 border-stone-600'
                }`}
              />
              {/* Label */}
              <div
                className={`text-xs mt-1 transition-colors ${
                  progress >= milestone.percent ? 'text-lime-400' : 'text-stone-500'
                }`}
              >
                {milestone.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetails && (
        <div className="flex items-center justify-between text-sm">
          <div className="text-stone-400">
            {getProgressMessage()}
          </div>
          {!isComplete && (
            <div className="flex items-center gap-2 text-stone-500">
              <Target className="w-4 h-4" />
              <span>{remaining.toLocaleString()} words to go</span>
            </div>
          )}
          {isComplete && (
            <div className="flex items-center gap-2 text-lime-400 font-semibold">
              <Target className="w-4 h-4" />
              <span>Target achieved!</span>
            </div>
          )}
        </div>
      )}

      {/* Percentage display */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/50 rounded-full border border-stone-700/50">
          <div className="text-2xl font-bold text-stone-100">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-stone-400">complete</div>
        </div>
      </div>
    </div>
  );
};

// Add shimmer animation to your global CSS or tailwind config
// @keyframes shimmer {
//   0% { transform: translateX(-100%); }
//   100% { transform: translateX(100%); }
// }
// .animate-shimmer {
//   animation: shimmer 2s infinite;
// }
