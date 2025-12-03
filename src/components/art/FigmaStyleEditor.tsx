import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Artwork } from '../../types/artwork';
import { EnhancedCanvas } from './EnhancedCanvas';
import { Button } from '../shared/Button';

interface FigmaStyleEditorProps {
  artwork: Artwork;
  artworks: Artwork[];
  onBack: () => void;
  onSave: (artwork: Artwork) => void;
  onSelectArtwork: (artwork: Artwork) => void;
}

export const FigmaStyleEditor: React.FC<FigmaStyleEditorProps> = ({
  artwork,
  artworks,
  onBack,
  onSave,
  onSelectArtwork,
}) => {
  const [title, setTitle] = useState(artwork.title);
  const canvasRef = useRef<any>(null);

  const handleSave = () => {
    if (canvasRef.current?.exportCanvas) {
      const { dataUrl, thumbnail } = canvasRef.current.exportCanvas();
      onSave({
        ...artwork,
        title,
        dataUrl,
        thumbnail,
        updatedAt: new Date(),
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex">
      {/* Left Sidebar - Thumbnails */}
      <div className="w-64 bg-zinc-900/50 border-r border-pink-300/20 overflow-y-auto">
        <div className="p-4">
          <h3 className="font-serif text-pink-300 text-sm mb-4 uppercase tracking-wider">
            Your Artworks
          </h3>
          <div className="space-y-3">
            {artworks.map((art) => (
              <motion.div
                key={art.id}
                whileHover={{ scale: 1.05 }}
                className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                  ${
                    art.id === artwork.id
                      ? 'border-pink-300/60 shadow-lg shadow-pink-300/30'
                      : 'border-pink-300/20 hover:border-pink-300/40'
                  }`}
                onClick={() => onSelectArtwork(art)}
              >
                <img
                  src={art.thumbnail || art.dataUrl}
                  alt={art.title}
                  className="w-full h-auto"
                />
                <div className="p-2 bg-black/50">
                  <p className="text-pink-300 text-xs font-serif truncate">
                    {art.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-zinc-900/50 border-b border-pink-300/20 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              ← Back
            </Button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black/50 border border-pink-300/30 rounded px-3 py-1 text-pink-300
                       font-serif focus:outline-none focus:border-pink-300/60"
              placeholder="Artwork title..."
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onBack}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              💾 Save
            </Button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-zinc-950 flex items-center justify-center p-8">
          <EnhancedCanvas
            ref={canvasRef}
            initialData={artwork.dataUrl}
            width={800}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};
