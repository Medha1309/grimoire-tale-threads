import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../../types/artwork';

interface MasonryGalleryProps {
  artworks: Artwork[];
  onEdit: (artwork: Artwork) => void;
  onDelete: (id: string) => void;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({
  artworks,
  onEdit,
  onDelete,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (artworks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-pink-300/50 font-serif text-lg mb-4">
          Your atelier is empty...
        </p>
        <p className="text-pink-300/30 font-serif text-sm">
          Create your first haunting masterpiece
        </p>
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      {artworks.map((artwork, index) => (
        <motion.div
          key={artwork.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="break-inside-avoid mb-6"
          onMouseEnter={() => setHoveredId(artwork.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            className="relative group cursor-pointer bg-zinc-900/50 border border-pink-300/20 rounded-lg overflow-hidden
                       transition-all duration-300 hover:border-pink-300/60"
            style={{
              boxShadow:
                hoveredId === artwork.id
                  ? '0 0 30px rgba(255, 182, 217, 0.3)'
                  : '0 0 10px rgba(255, 182, 217, 0.1)',
            }}
            onClick={() => onEdit(artwork)}
          >
            {/* Artwork Image */}
            <div className="relative">
              <img
                src={artwork.thumbnail || artwork.dataUrl}
                alt={artwork.title}
                className="w-full h-auto"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300 flex items-center justify-center"
              >
                <div className="text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(artwork);
                    }}
                    className="px-4 py-2 bg-pink-900/50 border border-pink-300/50 text-pink-300
                             rounded-lg hover:bg-pink-900/70 transition-colors mb-2 font-serif text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(artwork.id);
                    }}
                    className="px-4 py-2 bg-red-900/50 border border-red-300/50 text-red-300
                             rounded-lg hover:bg-red-900/70 transition-colors font-serif text-sm ml-2"
                  >
                    Burn
                  </button>
                </div>
              </div>
            </div>

            {/* Artwork Info */}
            <div className="p-4">
              <h3 className="font-serif text-pink-300 text-lg mb-1 truncate">
                {artwork.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-pink-300/50">
                <span>{new Date(artwork.createdAt).toLocaleDateString()}</span>
                <span className="capitalize">{artwork.brushType}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
