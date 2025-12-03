/**
 * Art Gallery Component
 * Display saved artworks in a haunted gallery
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../../types/artwork';
import { BackButton } from '../shared/NavigationButtons';
import { Button } from '../shared/Button';
import { ArchiveDoor } from '../diary/ArchiveDoor';
import { useHauntedGallery } from './HauntedGalleryEffects';

interface ArtGalleryProps {
  artworks: Artwork[];
  onBack: () => void;
  onCreateNew: () => void;
  onViewArtwork: (artwork: Artwork) => void;
  onDeleteArtwork: (id: string) => void;
  onNavigateToArchive: () => void;
  archivedCount: number;
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({
  artworks,
  onBack,
  onCreateNew,
  onViewArtwork,
  onDeleteArtwork,
  onNavigateToArchive,
  archivedCount,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { isGlitching, isShadowed } = useHauntedGallery(artworks.length);

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(255,182,217,0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 60%, rgba(255,182,217,0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 40%, rgba(255,182,217,0.03) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex items-center justify-between border-b border-zinc-900/40 pb-6">
          <BackButton onClick={onBack} className="relative" />
          <motion.h2
            className="font-serif text-3xl tracking-wider text-[#ffb6d9]/90"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,182,217,0.3)',
                '0 0 20px rgba(255,182,217,0.5)',
                '0 0 10px rgba(255,182,217,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ART GALLERY
          </motion.h2>
          <Button variant="primary" onClick={onCreateNew}>
            Create New
          </Button>
        </header>

        {/* Empty state */}
        {artworks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-zinc-400 text-xl font-serif mb-2">
              Your gallery awaits
            </p>
            <p className="text-zinc-600 text-sm font-serif mb-8">
              Create your first masterpiece
            </p>
            <Button variant="primary" onClick={onCreateNew}>
              Begin Creating
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Gallery grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {artworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(artwork.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative cursor-pointer"
                  onClick={() => onViewArtwork(artwork)}
                >
                  {/* Frame glow */}
                  <motion.div
                    className="absolute -inset-4 rounded-lg pointer-events-none"
                    animate={{
                      opacity: hoveredId === artwork.id ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,182,217,0.4) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Artwork frame */}
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative aspect-[4/3] overflow-hidden rounded-lg border-4 border-[#ffb6d9]/20
                               bg-zinc-900/50 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.6), 0 0 20px rgba(255,182,217,0.2)',
                    }}
                  >
                    {/* Artwork image with haunted effects */}
                    <motion.img
                      src={artwork.thumbnail || artwork.dataUrl}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                      animate={{
                        filter: isGlitching(`artwork-${index}`)
                          ? ['hue-rotate(0deg)', 'hue-rotate(180deg)', 'hue-rotate(0deg)']
                          : 'hue-rotate(0deg)',
                        opacity: isShadowed(`artwork-${index}`) ? 0.3 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Shadow overlay */}
                    {isShadowed(`artwork-${index}`) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black pointer-events-none"
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{
                              scale: [0.8, 1.2, 0.8],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-32 h-32 rounded-full bg-black/80 blur-xl"
                          />
                        </div>
                      </motion.div>
                    )}

                    {/* Published badge */}
                    {artwork.isPublished && (
                      <div className="absolute top-3 right-3 z-10">
                        <div className="px-3 py-1 rounded-full bg-[#ffb6d9]/20 border border-[#ffb6d9]/40
                                      text-[#ffb6d9] text-xs font-serif backdrop-blur-sm">
                          Published
                        </div>
                      </div>
                    )}

                    {/* Overlay on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
                                 flex flex-col justify-end p-6"
                    >
                      <h3 className="font-serif text-xl text-[#ffb6d9] mb-2">
                        {artwork.title}
                      </h3>
                      <p className="text-xs text-zinc-400 font-serif mb-3">
                        {artwork.createdAt.toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this artwork? This cannot be undone.')) {
                              onDeleteArtwork(artwork.id);
                            }
                          }}
                          className="px-3 py-1 rounded bg-red-900/30 border border-red-800/40
                                   text-red-400 text-xs font-serif
                                   hover:bg-red-900/50 hover:border-red-700/60
                                   transition-all duration-200"
                        >
                          Burn
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Title below frame */}
                  <div className="mt-4 text-center">
                    <p className="font-serif text-sm text-zinc-300 truncate">
                      {artwork.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Archive Access */}
            <div className="max-w-md mx-auto">
              <ArchiveDoor
                type="art"
                itemCount={archivedCount}
                onClick={onNavigateToArchive}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};
