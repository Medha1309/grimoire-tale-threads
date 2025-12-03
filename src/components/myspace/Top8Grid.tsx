import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Top8Friend } from '../../types/myspace';

interface Top8GridProps {
  friends: Top8Friend[];
  canEdit?: boolean;
  onRemove?: (userId: string) => void;
}

export const Top8Grid: React.FC<Top8GridProps> = ({ friends, canEdit = false, onRemove }) => {
  const navigate = useNavigate();

  // Fill empty slots
  const slots = Array.from({ length: 8 }, (_, i) => friends[i] || null);

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="font-serif text-3xl text-zinc-200 mb-2">
          Inner Circle
        </h2>
        <div className="h-px w-32 mx-auto bg-zinc-700" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {slots.map((friend, index) => (
          <motion.div
            key={friend?.userId || `empty-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative aspect-square"
          >
            {friend ? (
              <div className="relative h-full group">
                {/* Friend card */}
                <button
                  onClick={() => navigate(`/user/${friend.userId}`)}
                  className="relative h-full w-full rounded-lg border border-zinc-700 bg-gradient-to-br from-zinc-900/80 to-black/80 backdrop-blur-sm overflow-hidden transition-all hover:border-zinc-600 hover:shadow-lg hover:shadow-black/50 hover:scale-105"
                >
                  {/* Position badge */}
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-lg z-10">
                    {friend.position}
                  </div>

                  {/* Avatar */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-2xl font-bold text-zinc-200 shadow-xl ring-1 ring-zinc-600">
                      {friend.displayName.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-xs text-white font-medium text-center truncate">
                      {friend.displayName}
                    </p>
                  </div>

                  {/* Sparkle effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Remove button */}
                {canEdit && onRemove && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(friend.userId);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center shadow-lg z-20 transition-colors text-white font-bold text-xs"
                  >
                    ×
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="h-full rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-900/30 flex flex-col items-center justify-center text-zinc-600">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-2xl mb-2">
                  ?
                </div>
                <p className="text-xs">Empty Slot</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* MySpace-style footer */}
      {canEdit && friends.length < 8 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-center text-sm text-zinc-500 italic"
        >
          {8 - friends.length} slot{8 - friends.length !== 1 ? 's' : ''} remaining
        </motion.p>
      )}
    </div>
  );
};
