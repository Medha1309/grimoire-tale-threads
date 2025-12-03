/**
 * SessionCard - Tombstone-shaped card for displaying session info
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ReflectionSession } from '../../types/reflectionSession';
import {
  getSessionStatusText,
  getTimeUntilStart,
  getTimeRemaining,
  getThemeIcon,
  formatDuration,
} from '../../utils/sessionHelpers';
import { format } from 'date-fns';
import { parlourColors } from '../../design-system/parlour-tokens';

interface SessionCardProps {
  session: ReflectionSession;
  onClick: () => void;
  isOwned?: boolean;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onClick, isOwned }) => {
  const statusText = getSessionStatusText(session);
  const themeIcon = getThemeIcon(session.theme);
  const isFull = session.participants.length >= session.capacity;
  const isScheduled = session.status === 'scheduled';
  const isActive = session.status === 'active';
  const isCompleted = session.status === 'completed';

  // Calculate time info
  const timeUntilStart = isScheduled ? getTimeUntilStart(session) : 0;
  const timeRemaining = isActive ? getTimeRemaining(session) : 0;

  // Status colors using parlour tokens
  const getStatusColor = () => {
    if (isCompleted) return parlourColors.success;
    if (isActive) return parlourColors.gold[500];
    if (isScheduled) return parlourColors.neutral[500];
    return parlourColors.error;
  };

  const statusColor = getStatusColor();

  return (
    <motion.article
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="relative cursor-pointer group"
    >
      <div
        className="p-6 rounded-lg border-2 transition-all duration-300"
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          borderColor: isActive ? statusColor : parlourColors.neutral[800],
          boxShadow: isActive
            ? `0 0 20px ${statusColor}40`
            : '0 4px 20px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Content */}
        <div className="space-y-4">
          {/* Theme icon and title */}
          <div className="flex items-start gap-3">
            <div
              className="text-2xl font-serif flex-shrink-0"
              style={{ color: isActive ? statusColor : parlourColors.neutral[400] }}
            >
              {themeIcon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-serif text-lg text-zinc-100 mb-1 truncate">{session.title}</h3>
              <p className="text-xs text-zinc-500 font-serif">
                by {session.hostName}
                {isOwned && <span className="text-gold-500 ml-1">(You)</span>}
              </p>
            </div>
          </div>

          {/* Date/Time */}
          <div className="space-y-1">
            <p className="text-sm text-zinc-300 font-serif">
              {format(session.scheduledStart.toDate(), 'MMM d, yyyy')}
            </p>
            <p className="text-xs text-zinc-500 font-serif">
              {format(session.scheduledStart.toDate(), 'h:mm a')} •{' '}
              {formatDuration(session.scheduledEnd.toMillis() - session.scheduledStart.toMillis())}
            </p>
          </div>

          {/* Time info */}
          {isScheduled && timeUntilStart > 0 && (
            <p className="text-xs text-zinc-400 font-serif">
              Starts in {timeUntilStart < 60 ? `${timeUntilStart}m` : `${Math.floor(timeUntilStart / 60)}h`}
            </p>
          )}
          {isActive && (
            <p className="text-xs font-serif" style={{ color: statusColor }}>
              In Progress • {timeRemaining}m remaining
            </p>
          )}

          {/* Participants and Status */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-serif">
                {session.participants.length}/{session.capacity}
              </span>
              {isFull && <span className="text-xs text-red-400 font-serif">Full</span>}
            </div>
            <span
              className="text-xs font-serif capitalize"
              style={{ color: statusColor }}
            >
              {statusText}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
