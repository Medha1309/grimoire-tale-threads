/**
 * History Log Panel - Left Side with CRUD Operations
 * Secure chronological record with digital flicker on older entries
 * Features: View, Edit, Delete actions
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiaryEntry } from '../../types/diary';
import { ArrowLeft, Search, Lock, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';

interface HistoryLogPanelProps {
  entries: DiaryEntry[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEntryClick: (entry: DiaryEntry) => void;
  onEntryEdit: (entry: DiaryEntry) => void;
  onEntryDelete: (entryId: string) => void;
  onBack: () => void;
}

export const HistoryLogPanel: React.FC<HistoryLogPanelProps> = ({
  entries,
  searchQuery,
  onSearchChange,
  onEntryClick,
  onEntryEdit,
  onEntryDelete,
  onBack,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Calculate age of entry for flicker effect
  const getEntryAge = (entry: DiaryEntry): number => {
    const now = new Date().getTime();
    const created = new Date(entry.createdAt).getTime();
    const daysDiff = (now - created) / (1000 * 60 * 60 * 24);
    return daysDiff;
  };

  // Determine flicker intensity based on age
  const getFlickerClass = (age: number): string => {
    if (age > 30) return 'flicker-heavy'; // Over 30 days
    if (age > 14) return 'flicker-medium'; // Over 2 weeks
    if (age > 7) return 'flicker-light'; // Over 1 week
    return ''; // Recent entries don't flicker
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date(date));
  };

  const truncateTitle = (content: string, maxLength: number = 50): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleDelete = (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation();
    if (confirm('Delete this entry permanently? This action cannot be undone.')) {
      onEntryDelete(entryId);
      setActiveMenu(null);
    }
  };

  const handleEdit = (e: React.MouseEvent, entry: DiaryEntry) => {
    e.stopPropagation();
    onEntryEdit(entry);
    setActiveMenu(null);
  };

  const handleView = (e: React.MouseEvent, entry: DiaryEntry) => {
    e.stopPropagation();
    onEntryClick(entry);
    setActiveMenu(null);
  };

  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-96 bg-zinc-950 border-r border-zinc-800/50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-800/50 bg-zinc-900/50">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-400 hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono">EXIT</span>
          </button>
          <div className="text-xs font-mono text-zinc-600">
            {entries.length} RECORDS
          </div>
        </div>

        <h2 className="text-lg font-mono text-cyan-400 mb-1 tracking-wider">
          HISTORY LOG
        </h2>
        <p className="text-xs text-zinc-500 font-mono">
          Secure Chronological Record
        </p>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search entries..."
            className="w-full bg-black/50 border border-zinc-800 rounded px-10 py-2 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-cyan-800 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Entries List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-zinc-700 font-mono text-sm mb-2">
              NO RECORDS FOUND
            </div>
            <div className="text-zinc-800 text-xs font-mono">
              {searchQuery ? 'Try a different search' : 'Begin your first confession'}
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {entries.map((entry, index) => {
              const age = getEntryAge(entry);
              const flickerClass = getFlickerClass(age);
              const isMenuOpen = activeMenu === entry.id;

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative"
                >
                  <button
                    onClick={() => onEntryClick(entry)}
                    className={`w-full text-left p-3 rounded border border-zinc-800/50 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-cyan-800/50 transition-all group ${flickerClass}`}
                  >
                    {/* Date & Time */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-cyan-500 transition-colors">
                        {formatDate(entry.createdAt)}
                      </span>
                      <div className="flex items-center gap-2">
                        {entry.isLocked && (
                          <Lock className="w-3 h-3 text-red-500/70" />
                        )}
                        {/* CRUD Menu Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenu(isMenuOpen ? null : entry.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-zinc-800/50 rounded"
                        >
                          <MoreVertical className="w-3 h-3 text-zinc-500" />
                        </button>
                      </div>
                    </div>

                    {/* Truncated Content */}
                    <div className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors font-mono leading-relaxed">
                      {truncateTitle(entry.content)}
                    </div>

                    {/* Mood Indicator */}
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          entry.mood === 'joy' ? 'bg-yellow-500' :
                          entry.mood === 'sorrow' ? 'bg-blue-500' :
                          entry.mood === 'calm' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}
                      />
                      <span className="text-xs text-zinc-600 uppercase font-mono">
                        {entry.mood}
                      </span>
                    </div>
                  </button>

                  {/* CRUD Actions Menu */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-1 z-10 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl shadow-black/50 overflow-hidden"
                        style={{ minWidth: '160px' }}
                      >
                        <button
                          onClick={(e) => handleView(e, entry)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-cyan-950/30 hover:text-cyan-400 transition-colors font-mono"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={(e) => handleEdit(e, entry)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-cyan-950/30 hover:text-cyan-400 transition-colors font-mono"
                        >
                          <Edit2 className="w-4 h-4" />
                          <span>Edit</span>
                        </button>
                        <div className="border-t border-zinc-800" />
                        <button
                          onClick={(e) => handleDelete(e, entry.id)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors font-mono"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        /* Digital Flicker Effects */
        @keyframes flicker-light {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        @keyframes flicker-medium {
          0%, 100% { opacity: 1; }
          25% { opacity: 0.9; }
          50% { opacity: 0.95; }
          75% { opacity: 0.85; }
        }

        @keyframes flicker-heavy {
          0%, 100% { opacity: 1; }
          10% { opacity: 0.8; }
          20% { opacity: 0.95; }
          30% { opacity: 0.7; }
          40% { opacity: 0.9; }
          50% { opacity: 0.75; }
          60% { opacity: 0.85; }
          70% { opacity: 0.8; }
          80% { opacity: 0.9; }
          90% { opacity: 0.75; }
        }

        .flicker-light {
          animation: flicker-light 3s infinite;
        }

        .flicker-medium {
          animation: flicker-medium 2s infinite;
        }

        .flicker-heavy {
          animation: flicker-heavy 1.5s infinite;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.2);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.4);
        }
      `}</style>
    </motion.div>
  );
};
