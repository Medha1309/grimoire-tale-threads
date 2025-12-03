/**
 * ParticipantBar - Shows active participants in session header
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SessionPresence } from '../../types/reflectionSession';
import { parlourColors } from '../../design-system/parlour-tokens';

interface ParticipantBarProps {
  participants: Record<string, SessionPresence>;
  currentUserId?: string;
}

export const ParticipantBar: React.FC<ParticipantBarProps> = ({ participants, currentUserId }) => {
  const participantList = Object.values(participants);

  if (participantList.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-zinc-600 font-serif mr-1">Present:</span>
      <div className="flex -space-x-2">
        {participantList.map((participant) => {
          const isCurrentUser = participant.userId === currentUserId;
          const isActive = participant.isActive;

          return (
            <motion.div
              key={participant.userId}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="relative"
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-xs font-serif transition-all duration-200"
                style={{
                  backgroundColor: isActive ? parlourColors.gold[500] : parlourColors.neutral[700],
                  color: isActive ? '#000' : parlourColors.neutral[400],
                  boxShadow: isActive ? `0 0 12px ${parlourColors.gold[500]}40` : 'none',
                }}
                title={`${participant.userName}${isCurrentUser ? ' (You)' : ''}${isActive ? ' - Active' : ' - Idle'}`}
              >
                {participant.userName.charAt(0).toUpperCase()}
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: parlourColors.success }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
      <span className="text-xs text-zinc-600 font-serif ml-1">
        {participantList.length} {participantList.length === 1 ? 'person' : 'people'}
      </span>
    </div>
  );
};
