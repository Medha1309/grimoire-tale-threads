import React, { useEffect, useState } from 'react';
import { Modal } from '../shared/Modal';

interface Milestone {
  id: string;
  type: 'word_count' | 'chapter' | 'proposal' | 'collaborator' | 'completion';
  title: string;
  description: string;
  value: number;
  icon: string;
  color: string;
}

interface MilestoneCelebrationProps {
  milestone: Milestone | null;
  projectTitle: string;
  collaborators: string[];
  onClose: () => void;
}

export const MilestoneCelebration: React.FC<MilestoneCelebrationProps> = ({
  milestone,
  projectTitle,
  collaborators,
  onClose,
}) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    if (milestone) {
      // Generate confetti
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(pieces);

      // Auto-close after 5 seconds
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [milestone, onClose]);

  if (!milestone) return null;

  return (
    <Modal
      isOpen={!!milestone}
      onClose={onClose}
      title=""
      size="lg"
    >
      <div className="relative overflow-hidden">
        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none">
          {confetti.map((piece) => (
            <div
              key={piece.id}
              className="absolute w-2 h-2 animate-confetti"
              style={{
                left: `${piece.left}%`,
                top: '-10px',
                backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'][
                  Math.floor(Math.random() * 5)
                ],
                animationDelay: `${piece.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center py-8 relative z-10">
          {/* Icon */}
          <div className="text-8xl mb-4 animate-bounce">{milestone.icon}</div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-stone-100 mb-2">
            Milestone Achieved!
          </h2>

          {/* Milestone Details */}
          <div className={`inline-block px-6 py-3 rounded-lg mb-4 ${milestone.color}`}>
            <div className="text-2xl font-bold">{milestone.title}</div>
            <div className="text-sm opacity-90">{milestone.description}</div>
          </div>

          {/* Project Info */}
          <div className="text-stone-400 mb-6">
            <div className="text-lg font-semibold text-stone-200 mb-2">{projectTitle}</div>
            <div className="text-sm">
              Achieved by {collaborators.length} {collaborators.length === 1 ? 'collaborator' : 'collaborators'}
            </div>
          </div>

          {/* Collaborators */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {collaborators.map((name, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-stone-800 text-stone-300 rounded-full text-sm border border-stone-700"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Share Button */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-lime-500 hover:bg-lime-400 text-stone-900 rounded-lg font-medium transition-colors"
            >
              Keep Writing!
            </button>
            <button
              onClick={() => {
                // Share functionality
                navigator.clipboard.writeText(
                  `We just hit ${milestone.title} on "${projectTitle}"!`
                );
                onClose();
              }}
              className="px-6 py-2 bg-stone-700 hover:bg-stone-600 text-stone-200 rounded-lg font-medium transition-colors"
            >
              Share Achievement
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s linear forwards;
        }
      `}</style>
    </Modal>
  );
};

// Hook to detect and trigger milestones
export const useMilestoneDetection = (
  wordCount: number,
  proposalCount: number,
  collaboratorCount: number,
  isCompleted: boolean
) => {
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  const [achievedMilestones, setAchievedMilestones] = useState<Set<string>>(new Set());

  useEffect(() => {
    const milestones: Milestone[] = [
      {
        id: 'words_1000',
        type: 'word_count',
        title: '1,000 Words',
        description: 'First thousand words written!',
        value: 1000,
        icon: '1K',
        color: 'bg-blue-500/20 text-blue-400',
      },
      {
        id: 'words_5000',
        type: 'word_count',
        title: '5,000 Words',
        description: 'Five thousand words milestone!',
        value: 5000,
        icon: '5K',
        color: 'bg-purple-500/20 text-purple-400',
      },
      {
        id: 'words_10000',
        type: 'word_count',
        title: '10,000 Words',
        description: 'Ten thousand words achieved!',
        value: 10000,
        icon: '10K',
        color: 'bg-amber-500/20 text-amber-400',
      },
      {
        id: 'words_50000',
        type: 'word_count',
        title: '50,000 Words',
        description: 'NaNoWriMo goal reached!',
        value: 50000,
        icon: '50K',
        color: 'bg-lime-500/20 text-lime-400',
      },
      {
        id: 'proposals_10',
        type: 'proposal',
        title: '10 Proposals',
        description: 'Ten collaborative proposals!',
        value: 10,
        icon: 'P10',
        color: 'bg-cyan-500/20 text-cyan-400',
      },
      {
        id: 'collaborators_5',
        type: 'collaborator',
        title: '5 Collaborators',
        description: 'Five writers working together!',
        value: 5,
        icon: 'C5',
        color: 'bg-pink-500/20 text-pink-400',
      },
    ];

    // Check for new milestones
    for (const m of milestones) {
      if (achievedMilestones.has(m.id)) continue;

      let achieved = false;
      if (m.type === 'word_count' && wordCount >= m.value) achieved = true;
      if (m.type === 'proposal' && proposalCount >= m.value) achieved = true;
      if (m.type === 'collaborator' && collaboratorCount >= m.value) achieved = true;

      if (achieved) {
        setMilestone(m);
        setAchievedMilestones(prev => new Set([...prev, m.id]));
        break;
      }
    }

    // Check for completion
    if (isCompleted && !achievedMilestones.has('completion')) {
      setMilestone({
        id: 'completion',
        type: 'completion',
        title: 'Story Complete!',
        description: 'The collaborative story is finished!',
        value: 1,
        icon: 'DONE',
        color: 'bg-gradient-to-r from-lime-500 to-emerald-500 text-white',
      });
      setAchievedMilestones(prev => new Set([...prev, 'completion']));
    }
  }, [wordCount, proposalCount, collaboratorCount, isCompleted, achievedMilestones]);

  return {
    milestone,
    clearMilestone: () => setMilestone(null),
  };
};
