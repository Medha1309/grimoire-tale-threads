/**
 * Chain Letters Page - Graveyard Redesign
 * Collaborative chain letter stories with cinematic graveyard aesthetic
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChainLetterCard } from '../components/chains/ChainLetterCard';
import { StartChainModal } from '../components/chains/StartChainModal';
import { GraveyardBackground } from '../components/chains/GraveyardBackground';
import { useChainLetters, useMyActiveChain, useChainStats } from '../hooks/useChainLetters';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/shared/Button';
import { BackButton } from '../components/shared/NavigationButtons';
import { ChainFilterType, ChainSortType } from '../types/chainLetter';

export const ChainLetters: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [filterType, setFilterType] = useState<ChainFilterType>('all');
  const [sortType, setSortType] = useState<ChainSortType>('recent');
  const [showStartModal, setShowStartModal] = useState(false);

  const { chains, loading } = useChainLetters(filterType, sortType);
  const { activeChain } = useMyActiveChain();
  const { stats } = useChainStats();

  const handleChainClick = (chainId: string) => {
    navigate(`/chains/${chainId}`);
  };

  const handleStartSuccess = (chainId: string) => {
    navigate(`/chains/${chainId}`);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        <GraveyardBackground />
        <div className="text-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-300 font-serif text-2xl mb-6"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
          >
            The graveyard awaits those who dare...
          </motion.p>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Enter the Cemetery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen text-zinc-100 overflow-hidden" style={{ cursor: 'none' }}>
      {/* Graveyard Background */}
      <GraveyardBackground />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header - Cinematic Title */}
          <header className="mb-16 relative">
            <div className="flex items-center justify-between mb-8">
              <BackButton onClick={() => navigate('/')} variant="ghost" />
              <div className="flex-1" />
              <motion.button
                onClick={() => setShowStartModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg font-serif text-sm transition-all duration-300 cursor-pointer relative overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))',
                  border: '2px solid rgba(139, 92, 246, 0.4)',
                  color: '#c4b5fd',
                  boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.1)',
                }}
              >
                <span className="relative z-10">Start a Chain</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-center mb-6"
            >
              <h1 
                className="font-serif text-7xl tracking-[0.2em] mb-4 relative inline-block"
                style={{
                  background: 'linear-gradient(180deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.9))',
                }}
              >
                CHAINS
              </h1>
              <motion.div
                className="h-px w-64 mx-auto mb-4"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.6), transparent)',
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <p className="text-zinc-400 text-lg font-serif italic max-w-2xl mx-auto leading-relaxed"
                style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.9)' }}
              >
                Collaborative tales of terror, passed from writer to writer...
              </p>
            </motion.div>
          </header>

          {/* Stats - Elegant Minimal */}
          <div className="grid grid-cols-4 gap-6 mb-12">
            {[
              { value: stats.totalChains, label: 'Total Chains', color: 'zinc', rgb: '113, 113, 122' },
              { value: stats.activeChains, label: 'Active', color: 'purple', rgb: '139, 92, 246' },
              { value: stats.completedChains, label: 'Completed', color: 'emerald', rgb: '16, 185, 129' },
              { value: stats.graveyardChains, label: 'Broken', color: 'red', rgb: '239, 68, 68' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative group"
              >
                <div
                  className="relative p-6 rounded-xl overflow-hidden backdrop-blur-sm border-2 transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(39, 39, 42, 0.6) 100%)`,
                    borderColor: `rgba(${stat.rgb}, 0.2)`,
                    boxShadow: `0 4px 24px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.03)`,
                  }}
                >
                  {/* Subtle texture */}
                  <div 
                    className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.5"/%3E%3C/svg%3E")',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div 
                      className="text-4xl font-serif mb-2"
                      style={{ 
                        color: `rgb(${stat.rgb})`,
                        textShadow: `0 0 20px rgba(${stat.rgb}, 0.4)`,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-zinc-500 font-serif uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, rgba(${stat.rgb}, 0.1) 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Chain Alert - Spectral Warning */}
          {activeChain && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12 p-8 rounded-xl border-2 relative overflow-hidden backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1))',
                borderColor: 'rgba(139, 92, 246, 0.5)',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.3), inset 0 2px 8px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Animated glow */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Gothic corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-purple-400/60" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-purple-400/60" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-purple-400/60" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-purple-400/60" />
              
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <motion.h3 
                    className="font-serif text-2xl text-purple-300 mb-3"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Your Turn to Continue the Tale
                  </motion.h3>
                  <p className="text-zinc-300 text-base font-serif">
                    "{activeChain.title}" awaits your contribution
                  </p>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="primary"
                    onClick={() => handleChainClick(activeChain.id)}
                  >
                    Continue Chain
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Filters - Elegant Gothic */}
          <div className="mb-12 space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-zinc-500 font-serif uppercase tracking-wider">Explore:</span>
              {(['all', 'active', 'completed', 'graveyard', 'my-chains'] as ChainFilterType[]).map((filter) => (
                <motion.button
                  key={filter}
                  onClick={() => setFilterType(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-serif capitalize transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                    filterType === filter
                      ? 'text-purple-300 border-2'
                      : 'text-zinc-400 border-2'
                  }`}
                  style={
                    filterType === filter
                      ? {
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                        }
                      : {
                          background: 'rgba(24, 24, 27, 0.7)',
                          borderColor: 'rgba(113, 113, 122, 0.3)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(0, 0, 0, 0.4)',
                        }
                  }
                >
                  {filter.replace('-', ' ')}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-zinc-500 font-serif uppercase tracking-wider">Order:</span>
              {(['recent', 'popular', 'longest', 'cursed'] as ChainSortType[]).map((sort) => (
                <motion.button
                  key={sort}
                  onClick={() => setSortType(sort)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-lg text-sm font-serif capitalize transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                    sortType === sort
                      ? 'text-purple-300 border-2'
                      : 'text-zinc-400 border-2'
                  }`}
                  style={
                    sortType === sort
                      ? {
                          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(168, 85, 247, 0.15))',
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                        }
                      : {
                          background: 'rgba(24, 24, 27, 0.7)',
                          borderColor: 'rgba(113, 113, 122, 0.3)',
                          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6), inset 0 2px 4px rgba(0, 0, 0, 0.4)',
                        }
                  }
                >
                  {sort}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chain List - Cemetery Grid */}
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="text-6xl mb-6"
              >
                ⚰
              </motion.div>
              <p className="text-zinc-400 font-serif text-xl">Loading chains...</p>
            </motion.div>
          ) : chains.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32"
            >
              <div className="text-8xl mb-6">🪦</div>
              <p className="text-zinc-300 font-serif text-2xl mb-3">
                No Chains Found
              </p>
              <p className="text-zinc-500 text-base mb-10 max-w-md mx-auto font-serif">
                Be the first to start a collaborative chain letter story.
              </p>
              <Button variant="primary" onClick={() => setShowStartModal(true)}>
                Start a Chain
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chains.map((chain, index) => (
                <motion.div
                  key={chain.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ChainLetterCard
                    chain={chain}
                    onClick={() => handleChainClick(chain.id)}
                    isOwned={chain.currentHolderId === currentUser?.uid}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Chain Modal */}
      <StartChainModal
        isOpen={showStartModal}
        onClose={() => setShowStartModal(false)}
        onSuccess={handleStartSuccess}
      />
    </section>
  );
};
