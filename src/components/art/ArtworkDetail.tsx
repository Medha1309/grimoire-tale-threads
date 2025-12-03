/**
 * Artwork Detail Component
 * Full-screen view of a single artwork
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../../types/artwork';
import { BackButton } from '../shared/NavigationButtons';
import { Button, ButtonGroup } from '../shared/Button';
import { ShareArtworkModal } from './ShareArtworkModal';

interface ArtworkDetailProps {
  artwork: Artwork;
  onBack: () => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
}

const BRUSH_NAMES: Record<string, string> = {
  blood: 'Blood',
  charcoal: 'Charcoal',
  ink: 'Ink',
  scratch: 'Scratch',
  decay: 'Decay',
  ethereal: 'Ethereal',
};

export const ArtworkDetail: React.FC<ArtworkDetailProps> = ({
  artwork,
  onBack,
  onDelete,
  onArchive,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = artwork.dataUrl;
    link.download = `${artwork.title}.png`;
    link.click();
  };

  const handleDelete = () => {
    if (confirm('Burn this artwork? This cannot be undone.')) {
      onDelete(artwork.id);
    }
  };

  const handleArchive = () => {
    if (confirm('Archive this artwork? You can restore it later.')) {
      onArchive(artwork.id);
    }
  };

  const handleShare = async (email: string, message: string, allowDownload: boolean) => {
    // Store share info
    const shareData = {
      artworkId: artwork.id,
      artworkTitle: artwork.title,
      recipientEmail: email,
      message,
      allowDownload,
      sharedAt: new Date().toISOString(),
    };
    
    const existingShares = JSON.parse(localStorage.getItem('artworkShares') || '[]');
    localStorage.setItem('artworkShares', JSON.stringify([...existingShares, shareData]));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, rgba(255,182,217,0.05) 0%, transparent 60%)',
              'radial-gradient(circle at 50% 50%, rgba(255,182,217,0.08) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 50%, rgba(255,182,217,0.05) 0%, transparent 60%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b border-zinc-900/40 pb-6">
          <BackButton onClick={onBack} className="relative" />
          <motion.h2
            className="font-serif text-2xl tracking-wider text-[#ffb6d9]/90"
            animate={{
              textShadow: [
                '0 0 10px rgba(255,182,217,0.3)',
                '0 0 20px rgba(255,182,217,0.5)',
                '0 0 10px rgba(255,182,217,0.3)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {artwork.title}
          </motion.h2>
          <div className="w-20" />
        </header>

        {/* Main artwork display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Glow effect */}
            <motion.div
              className="absolute -inset-8 rounded-lg pointer-events-none"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                background: 'radial-gradient(circle at center, rgba(255,182,217,0.3) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
            />

            {/* Artwork frame */}
            <div
              className="relative border-8 border-[#ffb6d9]/20 rounded-lg overflow-hidden
                         bg-zinc-900/50 backdrop-blur-sm"
              style={{
                boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(255,182,217,0.3)',
              }}
            >
              <img
                src={artwork.dataUrl}
                alt={artwork.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* Artwork info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Metadata */}
          <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-4 text-sm font-serif">
              <div>
                <p className="text-zinc-500 mb-1">Created</p>
                <p className="text-zinc-300">
                  {artwork.createdAt.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Brush</p>
                <p className="text-zinc-300">
                  {BRUSH_NAMES[artwork.brushType] || artwork.brushType}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Last Modified</p>
                <p className="text-zinc-300">
                  {artwork.updatedAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-zinc-500 mb-1">Status</p>
                <p className="text-zinc-300">
                  {artwork.isPublished ? '✓ Published' : 'Private'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <ButtonGroup layout="centered">
            <Button
              variant={artwork.isPublished ? 'primary' : 'secondary'}
              onClick={() => {
                // Toggle publish status
                const updatedArtwork = { ...artwork, isPublished: !artwork.isPublished };
                // Save to localStorage
                const artworks = JSON.parse(localStorage.getItem('grimoire_artworks') || '[]');
                const updated = artworks.map((art: any) =>
                  art.id === artwork.id ? updatedArtwork : art
                );
                localStorage.setItem('grimoire_artworks', JSON.stringify(updated));
                // Refresh page to show updated status
                window.location.reload();
              }}
            >
              {artwork.isPublished ? 'Published' : 'Publish to Tea Room'}
            </Button>
            <Button variant="secondary" onClick={() => setShowShareModal(true)}>
              Share
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              Download
            </Button>
            <Button variant="secondary" onClick={handleArchive}>
              Archive
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ButtonGroup>
        </motion.div>
      </div>

      {/* Share Modal */}
      <ShareArtworkModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        artworkTitle={artwork.title}
        artworkDataUrl={artwork.dataUrl}
        onShare={handleShare}
      />
    </section>
  );
};
