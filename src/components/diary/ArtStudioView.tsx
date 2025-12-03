import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArtwork } from '../../hooks/useArtwork';
import { MasonryGallery } from '../art/MasonryGallery';
import { ArtStudioEditor } from '../art/ArtStudioEditor';
import { DollhouseRoomHeader } from './shared/DollhouseRoomHeader';
import { Button } from '../shared/Button';
import { Artwork } from '../../types/artwork';

type DiaryView = 'home' | 'diary' | 'write' | 'library' | 'scrapbook' | 'bookmarks' | 'archive' | 'art';

interface ArtStudioViewProps {
  onNavigateToRoom: (view: DiaryView) => void;
}

type ArtView = 'gallery' | 'paint' | 'advanced';
type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'rectangle' | 'circle' | 'text';

const PALETTE = [
  '#000000', '#808080', '#800000', '#FF0000',
  '#808000', '#FFFF00', '#008000', '#00FF00',
  '#008080', '#00FFFF', '#000080', '#0000FF',
  '#800080', '#FF00FF', '#FFFFFF', '#C0C0C0',
];

const BRUSH_SIZES = [1, 2, 3, 4, 5, 8, 12, 16, 20, 24, 32];

export const ArtStudioView: React.FC<ArtStudioViewProps> = ({ onNavigateToRoom }) => {
  const { artworks, addArtwork, deleteArtwork } = useArtwork();
  const [currentView, setCurrentView] = useState<ArtView>('gallery');
  
  // Paint state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#FF00FF');
  const [brushSize, setBrushSize] = useState(4);
  const [opacity, setOpacity] = useState(1);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyStep, setHistoryStep] = useState(-1);
  const [bgColor, setBgColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, []);

  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push(imageData);
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryStep(historyStep - 1);
      ctx.putImageData(history[historyStep - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      setHistoryStep(historyStep + 1);
      ctx.putImageData(history[historyStep + 1], 0, 0);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
    setStartX(x);
    setStartY(y);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (tool === 'eyedropper') {
      const imageData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b] = imageData.data;
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      setColor(hex.toUpperCase());
      setIsDrawing(false);
      return;
    }

    if (tool === 'fill') {
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      saveToHistory();
      setIsDrawing(false);
      return;
    }

    if (tool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        ctx.font = `${brushSize * 4}px serif`;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fillText(text, x, y);
        ctx.globalAlpha = 1;
        saveToHistory();
      }
      setIsDrawing(false);
      return;
    }

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.fillStyle = tool === 'eraser' ? bgColor : color;
      ctx.globalAlpha = tool === 'eraser' ? 1 : opacity;
      ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
      ctx.globalAlpha = 1;
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (tool === 'eyedropper' || tool === 'fill' || tool === 'text') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.strokeStyle = tool === 'eraser' ? bgColor : color;
      ctx.lineWidth = tool === 'pencil' ? 1 : brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = tool === 'eraser' ? 1 : opacity;
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      
      setLastX(x);
      setLastY(y);
    }
  };

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !e) {
      setIsDrawing(false);
      return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsDrawing(false);
      return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw shapes on mouse up
    if (tool === 'line') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      saveToHistory();
    } else if (tool === 'rectangle') {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = opacity;
      ctx.strokeRect(startX, startY, x - startX, y - startY);
      ctx.globalAlpha = 1;
      saveToHistory();
    } else if (tool === 'circle') {
      const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.globalAlpha = 1;
      saveToHistory();
    } else if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      saveToHistory();
    }
    
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `painting-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const getCursorStyle = () => {
    switch (tool) {
      case 'eyedropper': return 'cursor-crosshair';
      case 'fill': return 'cursor-pointer';
      default: return 'cursor-crosshair';
    }
  };

  const handleSaveFromAdvanced = (artwork: Artwork) => {
    addArtwork(artwork);
    setCurrentView('gallery');
  };

  const handleSaveFromPaint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const newArtwork: Artwork = {
      id: Date.now().toString(),
      userId: 'local',
      title: `Painting ${Date.now()}`,
      dataUrl,
      thumbnail: dataUrl,
      brushType: 'blood',
      canvasSize: 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false,
    };
    
    addArtwork(newArtwork);
    setCurrentView('gallery');
  };

  const handleBack = () => {
    if (currentView === 'gallery') {
      onNavigateToRoom('home');
    } else {
      setCurrentView('gallery');
    }
  };

  const handleDeleteArtwork = (id: string) => {
    if (confirm('Delete this artwork? This cannot be undone.')) {
      deleteArtwork(id);
    }
  };

  // Gallery View
  if (currentView === 'gallery') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
      >
        <DollhouseRoomHeader
          title="Art Studio"
          subtitle="Your Creations"
          onBack={handleBack}
        />

        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <p className="text-pink-300/70 font-serif">
                {artworks.length} {artworks.length === 1 ? 'artwork' : 'artworks'}
              </p>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setCurrentView('paint')}>
                  Paint
                </Button>
                <Button variant="primary" onClick={() => setCurrentView('advanced')}>
                  Gothic Studio
                </Button>
              </div>
            </div>

            {artworks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-pink-300/50 text-lg mb-4">No artworks yet</p>
                <p className="text-pink-300/30 text-sm">Click "Create New Painting" to start</p>
              </div>
            ) : (
              <MasonryGallery
                artworks={artworks}
                onEdit={() => {}}
                onDelete={handleDeleteArtwork}
              />
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Advanced Gothic Editor View
  if (currentView === 'advanced') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ArtStudioEditor
          onBack={handleBack}
          onSave={handleSaveFromAdvanced}
        />
      </motion.div>
    );
  }

  // Haunted Paint View
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Eerie background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,0,139,0.1),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-[shimmer_4s_ease-in-out_infinite]" />
      </div>
      
      <div className="w-full max-w-6xl relative z-10">
        <div className="bg-gradient-to-b from-gray-900 to-black border-2 border-pink-900/30 shadow-[0_0_50px_rgba(139,0,139,0.3)] rounded-sm">
          {/* Gothic Title Bar */}
          <div className="bg-gradient-to-r from-purple-950 via-pink-950 to-purple-950 px-3 py-2 flex items-center justify-between border-b border-pink-900/50">
            <div className="flex items-center gap-3 text-pink-200 font-serif text-sm">
              <span className="text-pink-400">⚝</span>
              <span className="tracking-wider">Cursed Canvas</span>
              <span className="text-pink-500/50 text-xs">- untitled</span>
            </div>
            <div className="flex gap-2">
              <button className="w-6 h-6 bg-black/40 border border-pink-900/50 text-pink-400 text-xs flex items-center justify-center hover:bg-pink-950/50 hover:border-pink-700 transition-all">
                _
              </button>
              <button className="w-6 h-6 bg-black/40 border border-pink-900/50 text-pink-400 text-xs flex items-center justify-center hover:bg-pink-950/50 hover:border-pink-700 transition-all">
                □
              </button>
              <button 
                onClick={handleBack}
                className="w-6 h-6 bg-black/40 border border-pink-900/50 text-pink-400 text-xs flex items-center justify-center hover:bg-red-950 hover:border-red-700 hover:text-red-300 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Gothic Menu Bar */}
          <div className="bg-black/60 px-3 py-2 border-b border-pink-900/30 flex gap-4 text-sm backdrop-blur-sm">
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">File</button>
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">Edit</button>
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">View</button>
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">Image</button>
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">Colors</button>
            <button className="text-pink-300/70 hover:text-pink-200 hover:bg-pink-950/30 px-3 py-1 rounded transition-all font-serif">Help</button>
          </div>

          {/* Main Content Area */}
          <div className="p-3 flex gap-3">
            {/* Gothic Toolbox */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-pink-900/30 p-3 rounded shadow-lg">
              <div className="text-pink-300/50 text-xs font-serif mb-2 tracking-wider">TOOLS</div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { id: 'pencil', icon: '✎', label: 'Pencil' },
                  { id: 'brush', icon: '✒', label: 'Brush' },
                  { id: 'eraser', icon: '⌫', label: 'Eraser' },
                  { id: 'fill', icon: '▨', label: 'Fill' },
                  { id: 'eyedropper', icon: '⊙', label: 'Picker' },
                  { id: 'line', icon: '╱', label: 'Line' },
                  { id: 'rectangle', icon: '▭', label: 'Rectangle' },
                  { id: 'circle', icon: '○', label: 'Circle' },
                  { id: 'text', icon: 'T', label: 'Text' },
                ].map(({ id, icon, label }) => (
                  <button
                    key={id}
                    onClick={() => setTool(id as Tool)}
                    className={`w-10 h-10 flex items-center justify-center text-sm border rounded transition-all ${
                      tool === id
                        ? 'border-pink-500 bg-pink-950/50 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                        : 'border-pink-900/30 bg-black/40 text-pink-400/50 hover:border-pink-700 hover:text-pink-300'
                    }`}
                    title={label}
                  >
                    {icon}
                  </button>
                ))}
              </div>

              {/* Size Control */}
              {(tool === 'brush' || tool === 'eraser' || tool === 'line' || tool === 'rectangle' || tool === 'circle') && (
                <div className="border-t border-pink-900/30 pt-3 mb-3">
                  <div className="text-pink-300/50 text-xs font-serif mb-2">SIZE</div>
                  <select
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full px-2 py-1 text-xs bg-black/60 border border-pink-900/30 text-pink-300 rounded focus:border-pink-700 focus:outline-none"
                  >
                    {BRUSH_SIZES.map(size => (
                      <option key={size} value={size} className="bg-gray-900">{size}px</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Opacity Control */}
              <div className="border-t border-pink-900/30 pt-3">
                <div className="text-pink-300/50 text-xs font-serif mb-2">OPACITY</div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-black/60 rounded-lg appearance-none cursor-pointer accent-pink-500"
                />
                <div className="text-pink-400/70 text-xs text-center mt-1">{Math.round(opacity * 100)}%</div>
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Gothic Toolbar */}
              <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-pink-900/30 p-2 flex items-center gap-3 rounded shadow-lg">
                <button
                  onClick={undo}
                  disabled={historyStep <= 0}
                  className="px-3 py-1.5 text-sm border border-pink-900/30 bg-black/40 text-pink-300 rounded hover:border-pink-700 hover:bg-pink-950/30 transition-all font-serif disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Undo"
                >
                  ↶
                </button>
                <button
                  onClick={redo}
                  disabled={historyStep >= history.length - 1}
                  className="px-3 py-1.5 text-sm border border-pink-900/30 bg-black/40 text-pink-300 rounded hover:border-pink-700 hover:bg-pink-950/30 transition-all font-serif disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Redo"
                >
                  ↷
                </button>
                <div className="h-6 w-px bg-pink-900/30" />
                <button
                  onClick={clearCanvas}
                  className="px-4 py-1.5 text-sm border border-pink-900/30 bg-black/40 text-pink-300 rounded hover:border-pink-700 hover:bg-pink-950/30 transition-all font-serif"
                >
                  Clear
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-pink-300/50 text-xs font-serif">BG:</span>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 bg-black border border-pink-900/50 rounded cursor-pointer"
                    title="Background color"
                  />
                </div>
                <div className="h-6 w-px bg-pink-900/30 ml-auto" />
                <button
                  onClick={saveImage}
                  className="px-4 py-1.5 text-sm border border-pink-900/30 bg-black/40 text-pink-300 rounded hover:border-pink-700 hover:bg-pink-950/30 transition-all font-serif"
                >
                  Download
                </button>
                <button
                  onClick={handleSaveFromPaint}
                  className="px-4 py-1.5 text-sm border border-pink-500 bg-pink-950/50 text-pink-200 rounded hover:bg-pink-900/50 transition-all font-serif shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                >
                  Save to Gallery
                </button>
              </div>

              {/* Haunted Canvas */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-pink-900/30 p-2 flex-1 rounded shadow-[0_0_30px_rgba(139,0,139,0.2)]">
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    width={900}
                    height={500}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className={`bg-black border border-pink-900/50 ${getCursorStyle()} shadow-inner`}
                  />
                  {/* Subtle glow effect around canvas */}
                  <div className="absolute inset-0 pointer-events-none border border-pink-500/10 rounded" />
                </div>
              </div>

              {/* Gothic Color Palette */}
              <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-pink-900/30 p-3 rounded shadow-lg">
                <div className="flex items-center gap-4">
                  {/* Current Color Display */}
                  <div className="flex flex-col gap-2">
                    <div className="text-pink-300/50 text-xs font-serif">CURRENT</div>
                    <div
                      className="w-16 h-16 border-2 border-pink-900/50 rounded shadow-inner relative overflow-hidden"
                      style={{ backgroundColor: color }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    </div>
                    <div className="text-pink-300/70 text-xs text-center font-mono">{color}</div>
                  </div>

                  {/* Preset Palette */}
                  <div className="flex-1">
                    <div className="text-pink-300/50 text-xs font-serif mb-2">PALETTE</div>
                    <div className="grid grid-cols-8 gap-1.5">
                      {PALETTE.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          className={`w-8 h-8 border rounded transition-all ${
                            color === c
                              ? 'border-pink-500 ring-2 ring-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
                              : 'border-pink-900/30 hover:border-pink-700'
                          }`}
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Custom Color Picker */}
                  <div className="flex flex-col gap-2">
                    <div className="text-pink-300/50 text-xs font-serif">CUSTOM</div>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="w-16 h-16 bg-black border-2 border-pink-900/50 rounded cursor-pointer hover:border-pink-700 transition-all"
                      title="Pick custom color"
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^#[0-9A-F]{6}$/i.test(val)) setColor(val);
                      }}
                      className="w-16 px-1 py-0.5 text-xs bg-black/60 border border-pink-900/30 text-pink-300 rounded text-center font-mono focus:border-pink-700 focus:outline-none"
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gothic Status Bar */}
          <div className="bg-gradient-to-r from-purple-950 via-black to-purple-950 border-t border-pink-900/30 px-4 py-2 flex items-center justify-between text-xs">
            <div className="flex gap-6 text-pink-300/70 font-serif">
              <span>Tool: <span className="text-pink-400">{tool.charAt(0).toUpperCase() + tool.slice(1)}</span></span>
              <span>Size: <span className="text-pink-400">{tool === 'pencil' ? 1 : brushSize}px</span></span>
              <span>Color: <span className="text-pink-400 font-mono">{color}</span></span>
            </div>
            <span className="text-pink-300/50">900 × 500 pixels</span>
          </div>
        </div>
      </div>
    </div>
  );
};
