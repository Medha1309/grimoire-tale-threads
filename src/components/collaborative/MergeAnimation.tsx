/**
 * Canonical Haunting - Merge Animation
 * Full-screen searing ritual when proposal is merged into the Chain
 */

import React, { useEffect, useState } from 'react';
import { Proposal } from '../../types/collaborativeStory';

interface MergeAnimationProps {
  proposal: Proposal;
  contentHash: string;
  onComplete: () => void;
}

export const MergeAnimation: React.FC<MergeAnimationProps> = ({
  proposal,
  contentHash,
  onComplete,
}) => {
  const [stage, setStage] = useState<'fade-in' | 'searing' | 'stamping' | 'complete'>('fade-in');
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const timeline = [
      { delay: 500, action: () => setStage('searing') },
      { delay: 2000, action: () => setGlitchActive(true) },
      { delay: 2500, action: () => setGlitchActive(false) },
      { delay: 3000, action: () => setStage('stamping') },
      { delay: 5000, action: () => setStage('complete') },
      { delay: 6000, action: onComplete },
    ];

    const timeouts = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black" />
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
        }}
      />

      {/* Main content */}
      <div className={`
        relative max-w-4xl w-full mx-8 space-y-8 transition-all duration-1000
        ${stage === 'fade-in' ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}>
        {/* Title */}
        <div className="text-center space-y-4">
          <div 
            className={`
              text-4xl font-bold font-mono transition-all duration-500
              ${glitchActive ? 'text-red-500 blur-sm' : 'text-red-400'}
            `}
            style={{
              textShadow: glitchActive 
                ? '3px 3px #ff0000, -3px -3px #00ff00, 0 0 20px rgba(239, 68, 68, 0.8)' 
                : '2px 2px rgba(239, 68, 68, 0.5), 0 0 10px rgba(239, 68, 68, 0.3)',
            }}
          >
            CANONICAL HAUNTING
          </div>
          <div className="text-sm font-mono text-slate-400 tracking-widest">
            SEARING PROPOSAL INTO IMMUTABLE ARCHIVE
          </div>
        </div>

        {/* Content being merged */}
        <div className={`
          bg-slate-900/80 border-2 rounded-lg p-8 transition-all duration-1000
          ${stage === 'searing' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'border-slate-700'}
          ${stage === 'stamping' ? 'border-green-500 shadow-[0_0_30px_rgba(16,185,129,0.5)]' : ''}
        `}>
          {/* Proposal title */}
          <div className="text-xl font-semibold text-slate-200 mb-4 font-mono">
            {proposal.title}
          </div>

          {/* Content preview */}
          <div className={`
            text-slate-300 leading-relaxed mb-6 font-mono text-sm max-h-64 overflow-hidden
            ${glitchActive ? 'blur-sm' : ''}
          `}>
            {proposal.content.substring(0, 500)}
            {proposal.content.length > 500 && '...'}
          </div>

          {/* Hash stamping */}
          <div className={`
            flex items-center justify-between p-4 rounded border transition-all duration-1000
            ${stage === 'stamping' 
              ? 'bg-green-500/20 border-green-500 scale-105' 
              : 'bg-slate-800/50 border-slate-700'
            }
          `}>
            <div className="flex items-center gap-3">
              <div className={`
                text-2xl transition-all duration-500 font-mono font-bold
                ${stage === 'stamping' ? 'animate-pulse text-green-400' : 'text-slate-400'}
              `}>
                {stage === 'stamping' ? 'LOCK' : 'SEAL'}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">CONTENT HASH</div>
                <div className={`
                  text-lg font-mono font-bold transition-all duration-500
                  ${stage === 'stamping' ? 'text-green-400' : 'text-slate-300'}
                `}>
                  #{contentHash}
                </div>
              </div>
            </div>

            {stage === 'stamping' && (
              <div className="text-green-400 font-mono text-sm animate-pulse">
                PERMANENTLY STAMPED
              </div>
            )}
          </div>
        </div>

        {/* Status messages */}
        <div className="text-center space-y-2">
          {stage === 'searing' && (
            <div className="text-red-400 font-mono text-sm animate-pulse">
              Searing content into archive...
            </div>
          )}
          {stage === 'stamping' && (
            <div className="text-green-400 font-mono text-sm animate-pulse">
              Hash verification complete • Content immutable
            </div>
          )}
          {stage === 'complete' && (
            <div className="text-slate-400 font-mono text-sm">
              Merge complete • Returning to archive...
            </div>
          )}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center gap-2">
          {['fade-in', 'searing', 'stamping', 'complete'].map((s, idx) => (
            <div
              key={s}
              className={`
                w-2 h-2 rounded-full transition-all duration-500
                ${['fade-in', 'searing', 'stamping', 'complete'].indexOf(stage) >= idx
                  ? 'bg-red-500 scale-125'
                  : 'bg-slate-700'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-red-500/10 pointer-events-none animate-pulse" />
      )}
    </div>
  );
};

/**
 * Hook to trigger merge animation
 */
export function useMergeAnimation() {
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationData, setAnimationData] = useState<{
    proposal: Proposal;
    contentHash: string;
  } | null>(null);

  const triggerMergeAnimation = (proposal: Proposal, contentHash: string) => {
    setAnimationData({ proposal, contentHash });
    setShowAnimation(true);
  };

  const MergeAnimationComponent = showAnimation && animationData ? (
    <MergeAnimation
      proposal={animationData.proposal}
      contentHash={animationData.contentHash}
      onComplete={() => {
        setShowAnimation(false);
        setAnimationData(null);
      }}
    />
  ) : null;

  return {
    triggerMergeAnimation,
    MergeAnimationComponent,
  };
}
