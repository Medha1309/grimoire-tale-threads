/**
 * MS Paint Studio - Classic Windows 98 Paint Clone
 * Simple, nostalgic, and functional
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Tool = 'pencil' | 'brush' | 'eraser' | 'fill' | 'eyedropper';

// Classic Windows 98 color palette
const PALETTE = [
  '#000000', '#808080', '#800000', '#FF0000',
  '#808000', '#FFFF00', '#008000', '#00FF00',
  '#008080', '#00FFFF', '#000080', '#0000FF',
  '#800080', '#FF00FF', '#FFFFFF', '#C0C0C0',
];

const BRUSH_SIZES = [1, 2, 3, 4, 5, 8, 12, 16, 20, 24, 32];

export default function MSPaintStudio() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('brush');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  // Initialize white canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setLastX(x);
    setLastY(y);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle eyedropper
    if (tool === 'eyedropper') {
      const imageData = ctx.getImageData(x, y, 1, 1);
      const [r, g, b] = imageData.data;
      const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      setColor(hex.toUpperCase());
      setIsDrawing(false);
      return;
    }

    // Handle fill bucket
    if (tool === 'fill') {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setIsDrawing(false);
      return;
    }

    // Draw single point
    ctx.fillStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.fillRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    if (tool === 'eyedropper' || tool === 'fill') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Draw line from last position to current
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = tool === 'pencil' ? 1 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    setLastX(x);
    setLastY(y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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

  return (
    <div className="min-h-screen bg-[#008080] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Window Frame */}
        <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] shadow-2xl">
          {/* Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 py-1 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>🎨</span>
              <span>Paint - untitled</span>
            </div>
            <div className="flex gap-1">
              <button className="w-5 h-5 bg-[#c0c0c0] border border-white text-black text-xs font-bold hover:bg-[#e0e0e0]">
                _
              </button>
              <button className="w-5 h-5 bg-[#c0c0c0] border border-white text-black text-xs font-bold hover:bg-[#e0e0e0]">
                □
              </button>
              <button 
                onClick={() => navigate(-1)}
                className="w-5 h-5 bg-[#c0c0c0] border border-white text-black text-xs font-bold hover:bg-red-600 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Menu Bar */}
          <div className="bg-[#c0c0c0] px-2 py-1 border-b border-white flex gap-3 text-sm">
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">File</button>
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">Edit</button>
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">View</button>
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">Image</button>
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">Colors</button>
            <button className="hover:bg-[#000080] hover:text-white px-2 py-0.5">Help</button>
          </div>

          {/* Main Content Area */}
          <div className="p-2 flex gap-2">
            {/* Toolbox */}
            <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] p-2">
              <div className="grid grid-cols-2 gap-1 mb-3">
                <button
                  onClick={() => setTool('pencil')}
                  className={`w-8 h-8 flex items-center justify-center text-lg border-2 ${
                    tool === 'pencil'
                      ? 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#a0a0a0]'
                      : 'border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]'
                  }`}
                  title="Pencil (1px)"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setTool('brush')}
                  className={`w-8 h-8 flex items-center justify-center text-lg border-2 ${
                    tool === 'brush'
                      ? 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#a0a0a0]'
                      : 'border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]'
                  }`}
                  title="Brush"
                >
                  🖌️
                </button>
                <button
                  onClick={() => setTool('eraser')}
                  className={`w-8 h-8 flex items-center justify-center text-lg border-2 ${
                    tool === 'eraser'
                      ? 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#a0a0a0]'
                      : 'border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]'
                  }`}
                  title="Eraser"
                >
                  🧹
                </button>
                <button
                  onClick={() => setTool('fill')}
                  className={`w-8 h-8 flex items-center justify-center text-lg border-2 ${
                    tool === 'fill'
                      ? 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#a0a0a0]'
                      : 'border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]'
                  }`}
                  title="Fill Bucket"
                >
                  🪣
                </button>
                <button
                  onClick={() => setTool('eyedropper')}
                  className={`w-8 h-8 flex items-center justify-center text-lg border-2 ${
                    tool === 'eyedropper'
                      ? 'border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#a0a0a0]'
                      : 'border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0]'
                  }`}
                  title="Color Picker"
                >
                  💧
                </button>
              </div>

              {/* Brush Size Selector */}
              {(tool === 'brush' || tool === 'eraser') && (
                <div className="border-t border-[#808080] pt-2">
                  <div className="text-xs mb-1">Size:</div>
                  <select
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full px-1 py-0.5 text-xs border border-[#808080]"
                  >
                    {BRUSH_SIZES.map(size => (
                      <option key={size} value={size}>{size}px</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Toolbar */}
              <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] p-2 flex items-center gap-2">
                <button
                  onClick={clearCanvas}
                  className="px-3 py-1 text-sm border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0] active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white"
                >
                  Clear
                </button>
                <button
                  onClick={saveImage}
                  className="px-3 py-1 text-sm border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] hover:bg-[#d0d0d0] active:border-t-[#404040] active:border-l-[#404040] active:border-r-white active:border-b-white"
                >
                  Save as PNG
                </button>
              </div>

              {/* Canvas */}
              <div className="bg-[#c0c0c0] border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white p-1 flex-1">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={500}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className={`bg-white border border-black ${getCursorStyle()}`}
                />
              </div>

              {/* Color Palette */}
              <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] p-2">
                <div className="flex items-center gap-3">
                  {/* Current Color Display */}
                  <div className="flex flex-col gap-1">
                    <div
                      className="w-12 h-12 border-2 border-black"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-xs text-center">{color}</div>
                  </div>

                  {/* Color Grid */}
                  <div className="grid grid-cols-8 gap-1">
                    {PALETTE.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-7 h-7 border-2 ${
                          color === c
                            ? 'border-white ring-2 ring-black'
                            : 'border-[#808080]'
                        }`}
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-[#c0c0c0] border-t-2 border-t-white px-2 py-1 flex items-center justify-between text-xs">
            <div className="flex gap-4">
              <span>Tool: {tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
              <span>Size: {tool === 'pencil' ? 1 : brushSize}px</span>
              <span>Color: {color}</span>
            </div>
            <span>900 x 500 pixels</span>
          </div>
        </div>
      </div>
    </div>
  );
}
