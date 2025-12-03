import React, { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { BrushSettings, ToolType } from '../../types/artwork';
import { EnhancedBrushPalette } from './EnhancedBrushPalette';
import { ColorPalette } from './ColorPalette';
import { ShapeTools } from './ShapeTools';
import { TextTool } from './TextTool';
import { CanvasControls } from './CanvasControls';

interface EnhancedCanvasProps {
  initialData?: string;
  width?: number;
  height?: number;
}

export const EnhancedCanvas = forwardRef<any, EnhancedCanvasProps>(
  ({ initialData, width = 800, height = 600 }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState<ToolType>('brush');
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
    const [history, setHistory] = useState<ImageData[]>([]);
    const [historyStep, setHistoryStep] = useState(-1);

    // Initialize canvas
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext('2d');
      if (!context) return;

      setCtx(context);

      // Load initial data if provided
      if (initialData) {
        const img = new Image();
        img.onload = () => {
          context.drawImage(img, 0, 0);
          saveToHistory(context);
        };
        img.src = initialData;
      } else {
        // Clear canvas
        context.fillStyle = '#000000';
        context.fillRect(0, 0, width, height);
        saveToHistory(context);
      }
    }, [initialData, width, height]);

    const saveToHistory = (context: CanvasRenderingContext2D) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(0, historyStep + 1), imageData]);
      setHistoryStep((prev) => prev + 1);
    };

    const handleUndo = () => {
      if (historyStep > 0 && ctx && canvasRef.current) {
        const newStep = historyStep - 1;
        ctx.putImageData(history[newStep], 0, 0);
        setHistoryStep(newStep);
      }
    };

    const handleRedo = () => {
      if (historyStep < history.length - 1 && ctx && canvasRef.current) {
        const newStep = historyStep + 1;
        ctx.putImageData(history[newStep], 0, 0);
        setHistoryStep(newStep);
      }
    };

    const handleClear = () => {
      if (!ctx || !canvasRef.current) return;
      if (confirm('Clear the canvas? This cannot be undone.')) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);
        saveToHistory(ctx);
      }
    };

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      exportCanvas: () => {
        if (!canvasRef.current) return { dataUrl: '', thumbnail: '' };

        const dataUrl = canvasRef.current.toDataURL('image/png');

        // Create thumbnail
        const thumbCanvas = document.createElement('canvas');
        thumbCanvas.width = 200;
        thumbCanvas.height = 150;
        const thumbCtx = thumbCanvas.getContext('2d');
        if (thumbCtx) {
          thumbCtx.drawImage(canvasRef.current, 0, 0, 200, 150);
        }
        const thumbnail = thumbCanvas.toDataURL('image/png');

        return { dataUrl, thumbnail };
      },
    }));

    // Drawing handlers
    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!ctx) return;
      setIsDrawing(true);

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === 'brush') {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing || !ctx) return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (currentTool === 'brush') {
        ctx.strokeStyle = brushSettings.color;
        ctx.lineWidth = brushSettings.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha = brushSettings.opacity;

        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };

    const stopDrawing = () => {
      if (isDrawing && ctx) {
        setIsDrawing(false);
        ctx.closePath();
        saveToHistory(ctx);
      }
    };

    return (
      <div className="flex gap-6">
        {/* Left Tools */}
        <div className="w-64 space-y-6">
          <EnhancedBrushPalette
            selectedBrush={brushSettings.type}
            onSelectBrush={(type) => {
              setBrushSettings((prev) => ({ ...prev, type }));
              setCurrentTool('brush');
            }}
          />
          <ColorPalette
            selectedColor={brushSettings.color}
            onSelectColor={(color) =>
              setBrushSettings((prev) => ({ ...prev, color }))
            }
          />
          <ShapeTools
            currentTool={currentTool}
            onSelectTool={setCurrentTool}
            color={brushSettings.color}
            canvasRef={canvasRef}
            onShapeComplete={() => ctx && saveToHistory(ctx)}
          />
        </div>

        {/* Canvas */}
        <div className="flex-1 flex flex-col items-center gap-4">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="border-2 border-pink-300/30 rounded-lg cursor-crosshair"
            style={{
              boxShadow: '0 0 30px rgba(255, 182, 217, 0.2)',
            }}
          />

          <CanvasControls
            brushSize={brushSettings.size}
            brushOpacity={brushSettings.opacity}
            onBrushSizeChange={(size) =>
              setBrushSettings((prev) => ({ ...prev, size }))
            }
            onBrushOpacityChange={(opacity) =>
              setBrushSettings((prev) => ({ ...prev, opacity }))
            }
            onUndo={handleUndo}
            onRedo={handleRedo}
            onClear={handleClear}
            canUndo={historyStep > 0}
            canRedo={historyStep < history.length - 1}
          />
        </div>

        {/* Right Tools */}
        <div className="w-64">
          <TextTool
            canvasRef={canvasRef}
            color={brushSettings.color}
            onTextComplete={() => ctx && saveToHistory(ctx)}
          />
        </div>
      </div>
    );
  }
);

EnhancedCanvas.displayName = 'EnhancedCanvas';
