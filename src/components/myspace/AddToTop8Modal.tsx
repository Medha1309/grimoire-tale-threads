import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTop8Friends } from '../../hooks/useTop8Friends';
import { UserProfile } from '../../types';

interface AddToTop8ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess?: () => void;
}

export const AddToTop8Modal: React.FC<AddToTop8ModalProps> = ({
  isOpen,
  onClose,
  userId,
  onSuccess,
}) => {
  const { searchUsers, addToTop8, top8 } = useTop8Friends(userId);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setSearching(true);
    const results = await searchUsers(searchTerm);
    setSearchResults(results);
    setSearching(false);
  };

  const handleAdd = async (user: UserProfile) => {
    setAdding(user.uid);
    const result = await addToTop8(user.uid, user.displayName);
    
    if (result.success) {
      onSuccess?.();
      onClose();
    } else {
      alert(result.error || 'Failed to add friend');
    }
    
    setAdding(null);
  };

  const isInTop8 = (userId: string) => {
    return top8.some(f => f.userId === userId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50"
          >
            <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Glitter effect */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RhcnMiIHg9IjAiIHk9IjAiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iMSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMyIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdGFycykiLz48L3N2Zz4=')] opacity-20" />

              {/* Header */}
              <div className="relative border-b border-zinc-800 bg-zinc-900/40 p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-zinc-400 text-2xl font-bold leading-none"
                >
                  ×
                </button>
                
                <h2 className="font-serif text-2xl text-zinc-200">
                  Add to Inner Circle
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Search for friends to add to your inner circle
                </p>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-6">
                {/* Search */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Search by name..."
                      className="w-full pl-4 pr-4 py-3 rounded-lg border border-zinc-700 bg-black/40 text-zinc-300 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    disabled={searching || !searchTerm.trim()}
                    className="px-6 py-3 rounded-lg bg-zinc-900 text-zinc-300 font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-zinc-700"
                  >
                    {searching ? 'Searching...' : 'Search'}
                  </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500">
                      {searchTerm ? 'No users found' : 'Search for users to add'}
                    </div>
                  ) : (
                    searchResults.map((user) => (
                      <motion.div
                        key={user.uid}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center text-lg font-bold text-zinc-200 shadow-lg ring-1 ring-zinc-600">
                            {user.displayName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-zinc-200">{user.displayName}</p>
                            {user.bio && (
                              <p className="text-sm text-zinc-500 line-clamp-1">{user.bio}</p>
                            )}
                          </div>
                        </div>

                        {isInTop8(user.uid) ? (
                          <span className="text-sm text-zinc-500 italic">Already in circle</span>
                        ) : (
                          <button
                            onClick={() => handleAdd(user)}
                            disabled={adding === user.uid}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-zinc-700"
                          >
                            {adding === user.uid ? 'Adding...' : 'Add'}
                          </button>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
