/**
 * ActiveSession - Full-screen collaborative session experience
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../hooks/useReflectionSessions';
import { useSessionPresence } from '../hooks/useSessionPresence';
import { useLiveCursors } from '../hooks/useLiveCursors';
import { useSessionActions } from '../hooks/useSessionActions';
import { useAuth } from '../contexts/AuthContext';
import { ParticipantBar } from '../components/sessions/ParticipantBar';
import { LiveCursor } from '../components/sessions/LiveCursor';
import { SharedEditor } from '../components/sessions/SharedEditor';
import { SharedScrapbook } from '../components/sessions/SharedScrapbook';
import { Button } from '../components/shared/Button';
import { getTimeRemaining, formatTimeRemaining } from '../utils/sessionHelpers';
import { parlourColors } from '../design-system/parlour-tokens';

export const ActiveSession: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { session, loading: sessionLoading } = useSession(sessionId);
  const { participants } = useSessionPresence(sessionId);
  
  // Get current user's cursor color
  const currentParticipant = session?.participants.find(p => p.userId === currentUser?.uid);
  const { cursors, updateCursor } = useLiveCursors(sessionId, currentParticipant?.cursorColor || '#e8c547');

  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mode, setMode] = useState<'writing' | 'scrapbook'>('writing');
  const { completeSession, loading: actionLoading } = useSessionActions();

  // Update time remaining
  useEffect(() => {
    if (!session) return;

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(session);
      setTimeRemaining(remaining * 60 * 1000); // Convert to ms
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      updateCursor(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [updateCursor]);

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.p
          className="text-zinc-400 font-serif"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading session...
        </motion.p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 font-serif mb-4">Session not found</p>
          <Button variant="ghost" onClick={() => navigate('/chains')}>
            Back to Sessions
          </Button>
        </div>
      </div>
    );
  }

  const isHost = session.hostId === currentUser?.uid;

  const handleComplete = async () => {
    if (!session) return;
    const success = await completeSession(session);
    if (success) {
      navigate('/chains');
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      {/* Header */}
      <header
        className="border-b px-6 py-4"
        style={{ borderColor: parlourColors.neutral[800] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Session info */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/chains')}>
              Leave
            </Button>
            <div>
              <h1 className="font-serif text-lg" style={{ color: parlourColors.gold[500] }}>
                {session.title}
              </h1>
              <p className="text-xs text-zinc-500 font-serif capitalize">{session.theme}</p>
            </div>
          </div>

          {/* Center: Timer */}
          <div className="text-center">
            <div
              className="text-2xl font-serif tabular-nums"
              style={{
                color:
                  timeRemaining < 5 * 60 * 1000
                    ? parlourColors.error
                    : timeRemaining < 10 * 60 * 1000
                      ? parlourColors.warning
                      : parlourColors.gold[500],
              }}
            >
              {formatTimeRemaining(timeRemaining)}
            </div>
            <p className="text-xs text-zinc-600 font-serif">remaining</p>
          </div>

          {/* Right: Participants */}
          <ParticipantBar participants={participants} currentUserId={currentUser?.uid} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col p-6">
          {/* Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setMode('writing')}
                className="px-4 py-2 rounded font-serif text-sm transition-all border"
                style={{
                  background: mode === 'writing' ? 'rgba(232, 197, 71, 0.1)' : 'rgba(0, 0, 0, 0.4)',
                  borderColor: mode === 'writing' ? parlourColors.gold[500] : parlourColors.neutral[800],
                  color: mode === 'writing' ? parlourColors.gold[500] : parlourColors.neutral[400],
                }}
              >
                Writing
              </button>
              <button
                onClick={() => setMode('scrapbook')}
                className="px-4 py-2 rounded font-serif text-sm transition-all border"
                style={{
                  background: mode === 'scrapbook' ? 'rgba(232, 197, 71, 0.1)' : 'rgba(0, 0, 0, 0.4)',
                  borderColor: mode === 'scrapbook' ? parlourColors.gold[500] : parlourColors.neutral[800],
                  color: mode === 'scrapbook' ? parlourColors.gold[500] : parlourColors.neutral[400],
                }}
              >
                Scrapbook
              </button>
            </div>

            {isHost && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleComplete}
                disabled={actionLoading}
              >
                Complete Session
              </Button>
            )}
          </div>

          {/* Collaboration Area */}
          <div
            className="flex-1 rounded-lg border overflow-hidden"
            style={{
              borderColor: parlourColors.neutral[800],
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            {mode === 'writing' ? (
              <SharedEditor sessionId={sessionId!} />
            ) : (
              <SharedScrapbook sessionId={sessionId!} />
            )}
          </div>
        </div>
      </main>

      {/* Live Cursors */}
      <AnimatePresence>
        {Object.values(cursors).map((cursor) => (
          <LiveCursor
            key={cursor.userId}
            cursor={cursor}
            isCurrentUser={cursor.userId === currentUser?.uid}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
