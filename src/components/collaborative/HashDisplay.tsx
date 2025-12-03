/**
 * Content Hash Display Component
 * Shows cryptographic hash next to committed segments
 */

import React, { useState } from 'react';

interface HashDisplayProps {
  hash: string;
  isFlashing?: boolean;
  size?: 'small' | 'medium' | 'large';
  showCopy?: boolean;
}

export const HashDisplay: React.FC<HashDisplayProps> = ({
  hash,
  isFlashing = false,
  size = 'small',
  showCopy = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-1.5',
    large: 'text-base px-4 py-2',
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div
        className={`
          font-mono rounded border transition-all duration-300
          ${sizeClasses[size]}
          ${isFlashing 
            ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
            : 'bg-slate-900/50 border-slate-700 text-slate-400'
          }
        `}
        style={{
          boxShadow: isFlashing ? '0 0 10px rgba(239, 68, 68, 0.5)' : 'none',
        }}
      >
        <span className="opacity-60">#</span>
        <span className="font-semibold">{hash}</span>
      </div>

      {showCopy && (
        <button
          onClick={handleCopy}
          className="text-slate-500 hover:text-slate-300 transition-colors p-1"
          title="Copy hash"
        >
          {copied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

/**
 * Segment with Hash Display
 */
export const SegmentWithHash: React.FC<{
  content: string;
  hash: string;
  author: string;
  timestamp: Date;
  isFlashing?: boolean;
}> = ({ content, hash, author, timestamp, isFlashing }) => {
  return (
    <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4 space-y-3">
      {/* Content */}
      <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
        {content}
      </div>

      {/* Metadata bar */}
      <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="font-semibold">{author}</span>
          <span className="opacity-60">•</span>
          <span className="opacity-60">{timestamp.toLocaleString()}</span>
        </div>
        
        <HashDisplay hash={hash} isFlashing={isFlashing} />
      </div>
    </div>
  );
};

/**
 * Hash Verification Badge
 */
export const HashVerificationBadge: React.FC<{
  isValid: boolean;
  expectedHash: string;
  actualHash: string;
}> = ({ isValid, expectedHash, actualHash }) => {
  if (isValid) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-mono">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>HASH VERIFIED</span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono animate-pulse">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>HASH MISMATCH DETECTED</span>
      </div>
      <div className="text-xs font-mono space-y-1 bg-red-500/5 border border-red-500/20 rounded p-3">
        <div className="text-slate-400">Expected: <span className="text-red-400">{expectedHash}</span></div>
        <div className="text-slate-400">Actual: <span className="text-red-400">{actualHash}</span></div>
      </div>
    </div>
  );
};
