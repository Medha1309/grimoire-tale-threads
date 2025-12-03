import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TextToolProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  color: string;
  onTextComplete: () => void;
}

const GOTHIC_FONTS = [
  { name: 'Crimson', value: 'serif', style: 'Classic Gothic' },
  { name: 'Typewriter', value: 'monospace', style: 'Haunted Keys' },
  { name: 'Script', value: 'cursive', style: 'Victorian' },
  { name: 'Sans', value: 'sans-serif', style: 'Modern Dark' },
];

export const TextTool: React.FC<TextToolProps> = ({
  canvasRef,
  color,
  onTextComplete,
}) => {
  const [showTextModal, setShowTextModal] = useState(false);
  const [text, setText] = useState('');
  const [selectedFont, setSelectedFont] = useState(GOTHIC_FONTS[0]);
  const [fontSize, setFontSize] = useState(32);
  const [rotation, setRotation] = useState(0);

  const handleAddText = () => {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save context state
    ctx.save();

    // Set text properties
    ctx.font = `${fontSize}px ${selectedFont.value}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Apply rotation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Draw text
    ctx.fillText(text, 0, 0);

    // Restore context
    ctx.restore();

    // Reset and close
    setText('');
    setShowTextModal(false);
    onTextComplete();
  };

  return (
    <div className="bg-zinc-900/50 border border-pink-300/20 rounded-lg p-4">
      <h3 className="font-serif text-pink-300 text-sm mb-3 uppercase tracking-wider">
        Text Tool
      </h3>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowTextModal(true)}
        className="w-full px-4 py-3 bg-black/30 border-2 border-pink-300/20 text-pink-300/70
                   rounded-lg hover:border-pink-300/40 transition-all font-serif text-sm"
      >
        <span className="text-lg mr-2">T</span>
        Add Text
      </motion.button>

      {/* Text Modal */}
      <AnimatePresence>
        {showTextModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTextModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border-2 border-pink-300/30 rounded-lg p-6 max-w-md w-full mx-4"
              style={{ boxShadow: '0 0 40px rgba(255, 182, 217, 0.3)' }}
            >
              <h3 className="font-serif text-2xl text-pink-300 mb-6 text-center">
                Add Gothic Text
              </h3>

              {/* Text Input */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your haunting words..."
                className="w-full px-4 py-3 bg-black/50 border border-pink-300/30 rounded-lg
                         text-zinc-100 font-serif placeholder-zinc-600 resize-none
                         focus:outline-none focus:border-pink-300/60 focus:ring-2 focus:ring-pink-300/20
                         transition-all duration-200 mb-4"
                rows={3}
                autoFocus
              />

              {/* Font Selection */}
              <div className="mb-4">
                <label className="text-pink-300/70 text-sm font-serif mb-2 block">
                  Font Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GOTHIC_FONTS.map((font) => (
                    <button
                      key={font.name}
                      onClick={() => setSelectedFont(font)}
                      className={`px-3 py-2 rounded-lg border transition-all font-serif text-sm
                        ${
                          selectedFont.name === font.name
                            ? 'bg-pink-900/50 border-pink-300/60 text-pink-300'
                            : 'bg-black/30 border-pink-300/20 text-pink-300/70 hover:border-pink-300/40'
                        }`}
                      style={{ fontFamily: font.value }}
                    >
                      {font.style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="mb-4">
                <label className="text-pink-300/70 text-sm font-serif mb-2 block">
                  Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Rotation */}
              <div className="mb-6">
                <label className="text-pink-300/70 text-sm font-serif mb-2 block">
                  Rotation: {rotation}°
                </label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Preview */}
              <div
                className="mb-6 p-4 bg-black/50 border border-pink-300/20 rounded-lg
                           flex items-center justify-center min-h-[100px]"
              >
                <p
                  style={{
                    fontFamily: selectedFont.value,
                    fontSize: `${fontSize * 0.5}px`,
                    color: color,
                    transform: `rotate(${rotation}deg)`,
                  }}
                  className="transition-all"
                >
                  {text || 'Preview...'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTextModal(false)}
                  className="flex-1 px-4 py-2 bg-black/50 border border-pink-300/30 text-pink-300
                           rounded-lg hover:bg-black/70 transition-colors font-serif"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddText}
                  disabled={!text.trim()}
                  className="flex-1 px-4 py-2 bg-pink-900/50 border border-pink-300/50 text-pink-300
                           rounded-lg hover:bg-pink-900/70 transition-colors font-serif
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add to Canvas
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
