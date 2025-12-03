/**
 * Art Studio Editor
 * Main drawing interface with gothic aesthetic
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GothicCanvas } from './GothicCanvas';
import { EnhancedBrushPalette } from './EnhancedBrushPalette';
import { ColorPalette } from './ColorPalette';
import { CanvasControls } from './CanvasControls';
import { AdvancedToolbar } from './AdvancedToolbar';
import { ShareArtworkModal } from './ShareArtworkModal';
import { HauntedEffects } from './HauntedEffects';
import { BrushSettings, BrushType, Artwork, ToolType, BlendMode } from '../../types/artwork';
import { BackButton } from '../shared/NavigationButtons';
import { Button } from '../shared/Button';

interface ArtStudioEditorProps {
  onBack: () => void;
  onSave: (artwork: Artwork) => void;
}

export const ArtStudioEditor: React.FC<ArtStudioEditorProps> = ({
  onBack,
  onSave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    type: 'blood',
    size: 10,
    opacity: 1,
    color: '#8B0000',
    blendMode: 'normal',
    smoothing: 50,
    scatter: 0,
    flow: 100,
  });
  const [currentTool, setCurrentTool] = useState<ToolType>('brush');
  const [title, setTitle] = useState('');
  const [isPossessed, setIsPossessed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showSymmetry, setShowSymmetry] = useState(false);
  const [canUndo] = useState(false);
  const [canRedo] = useState(false);
  const [savedArtworkData, setSavedArtworkData] = useState<{ dataUrl: string; thumbnail: string } | null>(null);

  // Random possession and haunted effects
  useEffect(() => {
    const possessionInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setIsPossessed(true);
        setTimeout(() => setIsPossessed(false), 3000);
      }
    }, 15000);

    // Random canvas distortions
    const distortionInterval = setInterval(() => {
      if (!canvasRef.current || Math.random() > 0.15) return;

      import('./CanvasDistortions').then(({ CanvasDistortions }) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const distortions = new CanvasDistortions(canvas);
        const effects = [
          () => distortions.mirrorFlip(1500),
          () => distortions.invertColors(800),
          () => distortions.applyVignette(0.2),
          () => distortions.realityTear(),
        ];

        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
      });
    }, 25000);

    return () => {
      clearInterval(possessionInterval);
      clearInterval(distortionInterval);
    };
  }, []);

  const handleBrushChange = useCallback((type: BrushType) => {
    setBrushSettings(prev => ({ ...prev, type }));
  }, []);

  const handleColorChange = useCallback((color: string) => {
    setBrushSettings(prev => ({ ...prev, color }));
  }, []);

  const handleSizeChange = useCallback((size: number) => {
    setBrushSettings(prev => ({ ...prev, size }));
  }, []);

  const handleOpacityChange = useCallback((opacity: number) => {
    setBrushSettings(prev => ({ ...prev, opacity }));
  }, []);

  const handleBlendModeChange = useCallback((blendMode: BlendMode) => {
    setBrushSettings(prev => ({ ...prev, blendMode }));
  }, []);

  const handleSmoothingChange = useCallback((smoothing: number) => {
    setBrushSettings(prev => ({ ...prev, smoothing }));
  }, []);

  const handleScatterChange = useCallback((scatter: number) => {
    setBrushSettings(prev => ({ ...prev, scatter }));
  }, []);

  const handleFlowChange = useCallback((flow: number) => {
    setBrushSettings(prev => ({ ...prev, flow }));
  }, []);

  const handleUndo = useCallback(() => {
    if (canvasRef.current && (canvasRef.current as any).undo) {
      (canvasRef.current as any).undo();
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (canvasRef.current && (canvasRef.current as any).redo) {
      (canvasRef.current as any).redo();
    }
  }, []);

  const handleClear = useCallback(() => {
    if (confirm('Clear the canvas? This cannot be undone.')) {
      if (canvasRef.current && (canvasRef.current as any).clear) {
        (canvasRef.current as any).clear();
      }
    }
  }, []);

  const handleSaveClick = useCallback(() => {
    setShowSaveModal(true);
  }, []);

  const handleSaveConfirm = useCallback((dataUrl: string, thumbnail: string) => {
    if (!title.trim()) {
      alert('Please enter a title for your artwork');
      return;
    }

    setIsSaving(true);
    setSavedArtworkData({ dataUrl, thumbnail });

    const artwork: Artwork = {
      id: Date.now().toString(),
      userId: 'current-user',
      title: title.trim(),
      dataUrl,
      thumbnail,
      brushType: brushSettings.type,
      canvasSize: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false,
    };

    setTimeout(() => {
      onSave(artwork);
      setIsSaving(false);
      setShowSaveModal(false);
    }, 1000);
  }, [title, brushSettings.type, onSave]);

  const handleShare = useCallback(async (email: string, message: string, allowDownload: boolean) => {
    // In a real app, this would call an API to send the email
    console.log('Sharing artwork:', { email, message, allowDownload });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store share info in localStorage for demo
    const shareData = {
      artworkTitle: title,
      recipientEmail: email,
      message,
      allowDownload,
      sharedAt: new Date().toISOString(),
    };
    
    const existingShares = JSON.parse(localStorage.getItem('artworkShares') || '[]');
    localStorage.setItem('artworkShares', JSON.stringify([...existingShares, shareData]));
  }, [title]);

  const handleExport = useCallback(() => {
    if (canvasRef.current && (canvasRef.current as any).export) {
      (canvasRef.current as any).export();
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-zinc-100 px-6 py-16">
      {/* Atmospheric background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255,182,217,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(255,182,217,0.05) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, rgba(255,182,217,0.05) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between border-b border-zinc-900/40 pb-6">
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
            ART STUDIO
          </motion.h2>
          <div className="w-20" />
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
          {/* Left sidebar - Brushes & Colors */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <EnhancedBrushPalette
              selectedBrush={brushSettings.type}
              onSelectBrush={handleBrushChange}
            />
            <ColorPalette
              selectedColor={brushSettings.color}
              onSelectColor={handleColorChange}
            />
          </motion.div>

          {/* Center - Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative">
              <GothicCanvas
                ref={canvasRef}
                width={800}
                height={600}
                brushSettings={brushSettings}
                currentTool={currentTool}
                showGrid={showGrid}
                showSymmetry={showSymmetry}
                onSave={handleSaveConfirm}
                isPossessed={isPossessed}
              />
              
              {/* Grid overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,182,217,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,182,217,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }}
                />
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 w-full max-w-2xl">
              <Button
                variant="primary"
                onClick={handleSaveClick}
                className="flex-1"
              >
                Save to Gallery
              </Button>
              <Button
                variant="secondary"
                onClick={handleExport}
                className="flex-1"
              >
                Download PNG
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  if (!savedArtworkData) {
                    alert('Please save your artwork first');
                    return;
                  }
                  setShowShareModal(true);
                }}
                className="flex-1"
              >
                Share
              </Button>
            </div>
          </motion.div>

          {/* Right sidebar - Advanced Tools & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <AdvancedToolbar
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              blendMode={brushSettings.blendMode}
              onBlendModeChange={handleBlendModeChange}
              smoothing={brushSettings.smoothing}
              onSmoothingChange={handleSmoothingChange}
              scatter={brushSettings.scatter}
              onScatterChange={handleScatterChange}
              flow={brushSettings.flow}
              onFlowChange={handleFlowChange}
              showGrid={showGrid}
              onToggleGrid={() => setShowGrid(!showGrid)}
              showSymmetry={showSymmetry}
              onToggleSymmetry={() => setShowSymmetry(!showSymmetry)}
            />
            
            <CanvasControls
              brushSize={brushSettings.size}
              brushOpacity={brushSettings.opacity}
              onBrushSizeChange={handleSizeChange}
              onBrushOpacityChange={handleOpacityChange}
              onUndo={handleUndo}
              onRedo={handleRedo}
              onClear={handleClear}
              canUndo={canUndo}
              canRedo={canRedo}
            />
          </motion.div>
        </div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border-2 border-[#ffb6d9]/30 rounded-lg p-8 max-w-md w-full"
              style={{
                boxShadow: '0 0 40px rgba(255,182,217,0.3)',
              }}
            >
              <h3 className="font-serif text-2xl text-[#ffb6d9] mb-6 text-center">
                Name Your Creation
              </h3>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter artwork title..."
                className="w-full px-4 py-3 bg-black/50 border border-[#ffb6d9]/30 rounded-lg
                         text-zinc-100 font-serif placeholder-zinc-600
                         focus:outline-none focus:border-[#ffb6d9]/60 focus:ring-2 focus:ring-[#ffb6d9]/20
                         transition-all duration-200"
                autoFocus
              />

              <div className="mt-6 flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (canvasRef.current && (canvasRef.current as any).export) {
                      (canvasRef.current as any).export();
                    }
                  }}
                  className="flex-1"
                  disabled={isSaving || !title.trim()}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      {savedArtworkData && (
        <ShareArtworkModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          artworkTitle={title || 'Untitled Artwork'}
          artworkDataUrl={savedArtworkData.dataUrl}
          onShare={handleShare}
        />
      )}

      {/* Haunted Effects Overlay */}
      <HauntedEffects canvasRef={canvasRef} isActive={true} />

      {/* Possession warning */}
      <AnimatePresence>
        {isPossessed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50
                       bg-red-900/90 border border-red-700 rounded-lg px-6 py-3
                       backdrop-blur-sm"
            style={{
              boxShadow: '0 0 30px rgba(139, 0, 0, 0.5)',
            }}
          >
            <p className="font-serif text-sm text-red-100">
              The canvas is possessed...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
