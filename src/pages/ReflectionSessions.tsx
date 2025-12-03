/**
 * Chains - Collaborative Reflection Sessions
 * Scheduled gatherings for shared creation and reflection
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SessionCard } from '../components/sessions/SessionCard';
import { SessionFilters } from '../components/sessions/SessionFilters';
import { CreateSessionModal } from '../components/sessions/CreateSessionModal';
import { useReflectionSessions, useMyActiveSession } from '../hooks/useReflectionSessions';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/shared/Button';
import { BackButton } from '../components/shared/NavigationButtons';
import { SessionFilter, SessionSort } from '../types/reflectionSession';
import { parlourColors } from '../design-system/parlour-tokens';

export const ReflectionSessions: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<SessionFilter>('upcoming');
  const [sort, setSort] = useState<SessionSort>('date');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { sessions, loading } = useReflectionSessions(filter, sort);
  const { activeSession } = useMyActiveSession();

  const handleSessionClick = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
  };

  const handleCreateSuccess = (sessionId: string) => {
    navigate(`/sessions/${sessionId}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-400 font-serif text-lg mb-6"
          >
            Sign in to join reflection sessions
          </motion.p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-black text-zinc-100"
>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <BackButton onClick={() => navigate('/')} variant="ghost" />
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Session
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1
                className="font-serif text-5xl mb-3"
                style={{
                  color: parlourColors.gold[500],
                  textShadow: `0 0 20px rgba(232, 197, 71, 0.3)`,
                }}
              >
                Chains
              </h1>
              <p className="text-zinc-400 font-serif text-base max-w-2xl mx-auto">
                Scheduled reflection sessions for collaborative creation
              </p>
            </motion.div>
          </header>

          {/* Active Session Alert */}
          {activeSession && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-lg border-2"
              style={{
                background: 'rgba(232, 197, 71, 0.05)',
                borderColor: parlourColors.gold[500],
                boxShadow: `0 0 20px rgba(232, 197, 71, 0.2)`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg mb-1" style={{ color: parlourColors.gold[500] }}>
                    Active Session
                  </h3>
                  <p className="text-zinc-400 font-serif text-sm">
                    "{activeSession.title}" is in progress
                  </p>
                </div>
                <Button variant="primary" onClick={() => handleSessionClick(activeSession.id)}>
                  Join
                </Button>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <SessionFilters
            filter={filter}
            sort={sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />

          {/* Session Grid */}
          {loading ? (
            <div className="text-center py-20">
              <motion.p
                className="text-zinc-400 font-serif"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Loading sessions...
              </motion.p>
            </div>
          ) : sessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-zinc-400 font-serif text-lg mb-3">No sessions found</p>
              <p className="text-zinc-500 font-serif text-sm mb-8 max-w-md mx-auto">
                Create the first collaborative reflection session
              </p>
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Session
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <SessionCard
                    session={session}
                    onClick={() => handleSessionClick(session.id)}
                    isOwned={session.hostId === currentUser?.uid}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </section>
  );
};
