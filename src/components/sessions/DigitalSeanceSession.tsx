/**
 * Digital Séance Session - Real-time collaborative writing with Turn Curse
 * 5-minute timer with escalating tension and visual distortion
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChainSession, ChainSegment } from '../../types/reflectionSession';
import { useAuth } from '../../contexts/AuthContext';
import { HashDisplay, SegmentWithHash } from '../collaborative/HashDisplay';
import { Button } from '../shared/Button';

interface DigitalSeanceSessionProps {
  session: ChainSession;
  onAddSegment: (content: string) => Promise<void>;
  onLeaveSession: () => void;
}

const TURN_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes in milliseconds
const GHOST_SEGMENT_CHANCE = 0.1; // 10% chance

const GHOST_FRAGMENTS = [
  'but then',
  'suddenly',
  'never again',
  'in the dark',
  'blood red',
  'whispered softly',
  'too late',
  'behind you',
  'forgotten now',
  'cold hands',
];

export const DigitalSeanceSession: React.FC<DigitalSeanceSessionProps> = ({
  session,
  onAddSegment,
  onLeaveSession,
}) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(TURN_TIME_LIMIT);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [lostParticipants, setLostParticipants] = useState<Set<string>>(new Set());
  const [distortionLevel, setDistortionLevel] = useState(0);
  const [showGhostSegment, setShowGhostSegment] = useState(false);
  const [ghostFragment, setGhostFragment] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Determine current turn
  useEffect(() => {
    if (!session.currentTurn) {
      setIsMyTurn(false);
      return;
    }

    const myTurn = session.currentTurn === currentUser?.uid;
    setIsMyTurn(myTurn);

    if (myTurn) {
      // Start timer
      setTimeRemaining(TURN_TIME_LIMIT);
      
      // Check for ghost segment
      if (Math.random() < GHOST_SEGMENT_CHANCE) {
        const fragment = GHOST_FRAGMENTS[Math.floor(Math.random() * GHOST_FRAGMENTS.length)];
        setGhostFragment(fragment);
        setShowGhostSegment(true);
        setContent(fragment + ' ');
      }

      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1000;
          
          // Calculate distortion based on time remaining
          const percentRemaining = newTime / TURN_TIME_LIMIT;
          if (percentRemaining < 0.3) {
            setDistortionLevel(Math.min(1, (0.3 - percentRemaining) / 0.3));
          }

          if (newTime <= 0) {
            handleTurnTimeout();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setDistortionLevel(0);
    };
  }, [session.currentTurn, currentUser?.uid]);

  const handleTurnTimeout = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Mark user as lost
    if (currentUser?.uid) {
      setLostParticipants(prev => new Set(prev).add(currentUser.uid));
    }

    // Move to next participant
    // This would be handled by the backend in production
  };

  const handleSubmit = async () => {
    if (!content.trim() || !isMyTurn) return;

    try {
      await onAddSegment(content);
      setContent('');
      setShowGhostSegment(false);
      setGhostFragment('');
      setDistortionLevel(0);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } catch (error) {
      console.error('Failed to submit segment:', error);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    const percentRemaining = timeRemaining / TURN_TIME_LIMIT;
    if (percentRemaining > 0.5) return '#10b981'; // Green
    if (percentRemaining > 0.3) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header with session info */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100 font-mono">
                DIGITAL SEANCE
              </h1>
              <p className="text-sm text-slate-400 mt-1">{session.title}</p>
            </div>
            <Button variant="ghost" onClick={onLeaveSession} className="text-red-400">
              EXIT SESSION
            </Button>
          </div>

          {/* Participants */}
          <div className="flex flex-wrap gap-2">
            {session.participants.map(p => {
              const isLost = lostParticipants.has(p.userId);
              const isCurrent = session.currentTurn === p.userId;
              
              return (
                <div
                  key={p.userId}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-mono border transition-all
                    ${isLost 
                      ? 'bg-slate-800/50 border-slate-700 text-slate-600 line-through opacity-50' 
                      : isCurrent
                      ? 'bg-green-500/20 border-green-500/50 text-green-400 animate-pulse'
                      : 'bg-slate-800/50 border-slate-700 text-slate-400'
                    }
                  `}
                >
                  {p.displayName}
                  {isCurrent && ' [writing]'}
                </div>
              );
            })}
          </div>
        </div>

        {/* Turn timer (only show when it's user's turn) */}
        {isMyTurn && (
          <div className="bg-slate-900/50 border rounded-lg p-6" style={{ borderColor: getTimerColor() }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-slate-400">YOUR TURN</span>
              <span 
                className="text-2xl font-mono font-bold"
                style={{ color: getTimerColor() }}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(timeRemaining / TURN_TIME_LIMIT) * 100}%`,
                  backgroundColor: getTimerColor(),
                }}
              />
            </div>

            {timeRemaining < 60000 && (
              <p className="text-xs text-red-400 mt-2 font-mono animate-pulse">
                WARNING: Less than 1 minute remaining
              </p>
            )}
          </div>
        )}

        {/* Ghost segment notification */}
        {showGhostSegment && isMyTurn && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-purple-400 text-2xl font-mono font-bold">GHOST</span>
              <div className="flex-1">
                <p className="text-purple-400 font-mono text-sm font-semibold mb-1">
                  GHOST SEGMENT INJECTED
                </p>
                <p className="text-slate-400 text-xs">
                  The system has inserted a fragment. You must continue from: 
                  <span className="text-purple-300 font-semibold ml-1">"{ghostFragment}"</span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Writing area */}
        {isMyTurn ? (
          <div 
            className="relative"
            style={{
              filter: `blur(${distortionLevel * 2}px) hue-rotate(${distortionLevel * 30}deg)`,
              transform: `scale(${1 + distortionLevel * 0.02})`,
              transition: 'all 0.3s ease-out',
            }}
          >
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your segment... The clock is ticking."
              className="w-full h-64 bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-slate-200 font-mono text-sm resize-none focus:outline-none focus:border-green-500/50"
              style={{
                backgroundImage: distortionLevel > 0.5 
                  ? 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239, 68, 68, 0.05) 2px, rgba(239, 68, 68, 0.05) 4px)'
                  : 'none',
              }}
            />
            
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-500 font-mono">
                {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
              </span>
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!content.trim()}
                className="bg-green-600 hover:bg-green-700 border-green-500"
              >
                SUBMIT SEGMENT
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-8 text-center">
            <p className="text-slate-400 font-mono text-sm">
              {session.currentTurn 
                ? 'Waiting for current writer to complete their turn...'
                : 'Waiting for session to start...'
              }
            </p>
          </div>
        )}

        {/* Segment history */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-300 font-mono">CHAIN HISTORY</h3>
          {session.segments.map((segment, idx) => (
            <SegmentWithHash
              key={segment.id}
              content={segment.content}
              hash={segment.hash}
              author={segment.authorName}
              timestamp={segment.createdAt.toDate()}
            />
          ))}
        </div>

        {/* Lost participants notification */}
        {lostParticipants.size > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 font-mono text-sm">
              WARNING: {lostParticipants.size} participant(s) lost to the chain
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
