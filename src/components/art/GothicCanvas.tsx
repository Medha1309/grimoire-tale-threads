/**
 * Gothic Canvas Component
 * Main drawing canvas with gothic horror aesthetic
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrushType, BrushSettings, DrawingState, CanvasHistory } from '../../types/artwork';

interface GothicCanvasProps {
  width: number;
  height: number;
  brushSettings: BrushSettings;
  currentTool: import('../../types/artwork').ToolType;
  showGrid: boolean;
  showSymmetry: boolean;
  onSave: (dataUrl: string, thumbnail: string) => void;
  isPossessed: boolean;
}

export interface GothicCanvasRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  export: () => void;
}

const BRUSH_CONFIGS: Record<BrushType, { color: string; pattern: string; glow: string }> = {
  blood: { color: '#8B0000', pattern: 'splatter', glow: 'rgba(139, 0, 0, 0.5)' },
  charcoal: { color: '#2a2a2a', pattern: 'rough', glow: 'rgba(42, 42, 42, 0.3)' },
  ink: { color: '#000000', pattern: 'smooth', glow: 'rgba(0, 0, 0, 0.4)' },
  scratch: { color: '#ffffff', pattern: 'jagged', glow: 'rgba(255, 255, 255, 0.6)' },
  decay: { color: '#4a5a3a', pattern: 'mold', glow: 'rgba(74, 90, 58, 0.4)' },
  ethereal: { color: '#ffb6d9', pattern: 'glow', glow: 'rgba(255, 182, 217, 0.7)' },
  watercolor: { color: '#4682B4', pattern: 'wash', glow: 'rgba(70, 130, 180, 0.4)' },
  oil: { color: '#8B4513', pattern: 'thick', glow: 'rgba(139, 69, 19, 0.4)' },
  neon: { color: '#00FF00', pattern: 'electric', glow: 'rgba(0, 255, 0, 0.8)' },
  smoke: { color: '#696969', pattern: 'wispy', glow: 'rgba(105, 105, 105, 0.3)' },
};

export const GothicCanvas = React.forwardRef<HTMLCanvasElement, GothicCanvasProps>(({
  width,
  height,
  brushSettings,
  currentTool,
  showSymmetry,
  onSave,
  isPossessed,
}, ref) => {
  const canvasRef = (ref as React.RefObject<HTMLCanvasElement>) || useRef<HTMLCanvasElement>(null);
  const [drawingState, setDrawingState] = useState<DrawingState>({
    isDrawing: false,
    lastX: 0,
    lastY: 0,
  });
  const [history, setHistory] = useState<CanvasHistory>({ past: [], future: [] });
  const [showPossessedEffect, setShowPossessedEffect] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle texture
    ctx.globalAlpha = 0.03;
    for (let i = 0; i < 1000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#ffffff' : '#000000';
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        1,
        1
      );
    }
    ctx.globalAlpha = 1;
  }, [width, height]);

  // Possessed brush effect with haunted distortions
  useEffect(() => {
    if (!isPossessed) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setShowPossessedEffect(true);

    // Import distortions dynamically
    import('./CanvasDistortions').then(({ CanvasDistortions }) => {
      const distortions = new CanvasDistortions(canvas);

      // Random haunted effects
      const effects = [
        () => distortions.spectralInterference(),
        () => distortions.realityTear(),
        () => distortions.cursedBrushStroke(
          Math.random() * width,
          Math.random() * height,
          BRUSH_CONFIGS[brushSettings.type].color
        ),
        () => distortions.addStaticNoise(0.03),
        () => distortions.applyBleeding(),
      ];

      // Apply random effect
      const randomEffect = effects[Math.floor(Math.random() * effects.length)];
      randomEffect();
    });

    // Random autonomous strokes
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const endX = x + (Math.random() - 0.5) * 100;
        const endY = y + (Math.random() - 0.5) * 100;

        ctx.strokeStyle = BRUSH_CONFIGS[brushSettings.type].color;
        ctx.lineWidth = brushSettings.size * 0.5;
        ctx.globalAlpha = 0.1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }, 2000);

    setTimeout(() => setShowPossessedEffect(false), 3000);

    return () => clearInterval(interval);
  }, [isPossessed, width, height, brushSettings]);

  // Save current state to history
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    setHistory(prev => ({
      past: [...prev.past.slice(-19), imageData], // Keep last 20 states
      future: [],
    }));
  }, [width, height]);

  // Undo
  const undo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.past.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, width, height);
    const previousState = history.past[history.past.length - 1];

    ctx.putImageData(previousState, 0, 0);

    setHistory(prev => ({
      past: prev.past.slice(0, -1),
      future: [currentState, ...prev.future],
    }));
  }, [history, width, height]);

  // Redo
  const redo = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || history.future.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, width, height);
    const nextState = history.future[0];

    ctx.putImageData(nextState, 0, 0);

    setHistory(prev => ({
      past: [...prev.past, currentState],
      future: prev.future.slice(1),
    }));
  }, [history, width, height]);

  // Clear canvas
  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveToHistory();
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, width, height);
  }, [width, height, saveToHistory]);

  // Drawing functions
  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    saveToHistory();
    setDrawingState({ isDrawing: true, lastX: x, lastY: y });
  }, [saveToHistory]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawingState.isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const config = BRUSH_CONFIGS[brushSettings.type];

    // Apply blend mode
    ctx.globalCompositeOperation = brushSettings.blendMode === 'normal' ? 'source-over' : brushSettings.blendMode;

    // Tool-specific behavior
    if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.strokeStyle = brushSettings.color || config.color;
    }

    // Apply flow (opacity variation)
    const flowOpacity = brushSettings.opacity * (brushSettings.flow / 100);
    ctx.globalAlpha = flowOpacity;

    // Apply smoothing
    const smoothFactor = brushSettings.smoothing / 100;
    const smoothX = drawingState.lastX + (x - drawingState.lastX) * (1 - smoothFactor);
    const smoothY = drawingState.lastY + (y - drawingState.lastY) * (1 - smoothFactor);

    ctx.lineWidth = brushSettings.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Apply scatter
    const scatterAmount = brushSettings.scatter / 100 * brushSettings.size;
    const scatterX = smoothX + (Math.random() - 0.5) * scatterAmount;
    const scatterY = smoothY + (Math.random() - 0.5) * scatterAmount;

    // Apply brush-specific effects with UNIQUE behaviors
    if (brushSettings.type === 'blood') {
      // Blood: Drips downward, random splatters
      ctx.shadowBlur = 15;
      ctx.shadowColor = config.glow;
      // Random drip effect
      if (Math.random() < 0.15) {
        ctx.lineWidth = brushSettings.size * (1.2 + Math.random() * 0.8);
        // Draw drip downward
        const dripLength = 5 + Math.random() * 15;
        ctx.beginPath();
        ctx.moveTo(scatterX, scatterY);
        ctx.lineTo(scatterX + (Math.random() - 0.5) * 3, scatterY + dripLength);
        ctx.stroke();
      }
      // Random splatter
      if (Math.random() < 0.08) {
        for (let i = 0; i < 5; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * brushSettings.size * 2;
          ctx.fillStyle = ctx.strokeStyle;
          ctx.beginPath();
          ctx.arc(
            scatterX + Math.cos(angle) * dist,
            scatterY + Math.sin(angle) * dist,
            Math.random() * 2 + 1,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    } else if (brushSettings.type === 'charcoal') {
      // Charcoal: Grainy, variable width, textured
      ctx.lineWidth = brushSettings.size + (Math.random() - 0.5) * brushSettings.size * 0.4;
      // Add grain texture
      for (let i = 0; i < 3; i++) {
        const grainX = scatterX + (Math.random() - 0.5) * brushSettings.size;
        const grainY = scatterY + (Math.random() - 0.5) * brushSettings.size;
        ctx.globalAlpha = flowOpacity * (0.1 + Math.random() * 0.2);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fillRect(grainX, grainY, 1, 1);
      }
      ctx.globalAlpha = flowOpacity;
    } else if (brushSettings.type === 'ink') {
      // Ink: Smooth, consistent, precise
      ctx.shadowBlur = 0;
      ctx.lineWidth = brushSettings.size;
      // Slight feathering at edges
      ctx.shadowBlur = 1;
      ctx.shadowColor = ctx.strokeStyle;
    } else if (brushSettings.type === 'scratch') {
      // Scratch: Inverts colors, jagged
      ctx.globalCompositeOperation = 'difference';
      ctx.lineWidth = brushSettings.size * 0.8;
      // Jagged effect
      if (Math.random() < 0.3) {
        const offsetX = (Math.random() - 0.5) * brushSettings.size * 0.5;
        const offsetY = (Math.random() - 0.5) * brushSettings.size * 0.5;
        ctx.lineTo(scatterX + offsetX, scatterY + offsetY);
      }
    } else if (brushSettings.type === 'decay') {
      // Decay: Organic spread, multiple dots
      ctx.globalAlpha = flowOpacity * 0.6;
      // Create organic spread pattern
      const spreadCount = 5 + Math.floor(Math.random() * 5);
      for (let i = 0; i < spreadCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * brushSettings.size * 1.5;
        const size = Math.random() * brushSettings.size * 0.3 + 1;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.globalAlpha = flowOpacity * (0.2 + Math.random() * 0.4);
        ctx.beginPath();
        ctx.arc(
          scatterX + Math.cos(angle) * dist,
          scatterY + Math.sin(angle) * dist,
          size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
      ctx.globalAlpha = flowOpacity;
    } else if (brushSettings.type === 'ethereal') {
      // Ethereal: Soft glow, fades at edges
      ctx.shadowBlur = 25;
      ctx.shadowColor = config.glow;
      ctx.globalAlpha = flowOpacity * 0.7;
      // Add outer glow
      ctx.strokeStyle = config.glow;
      ctx.lineWidth = brushSettings.size * 1.5;
      ctx.globalAlpha = flowOpacity * 0.2;
      ctx.stroke();
      ctx.strokeStyle = brushSettings.color || config.color;
      ctx.lineWidth = brushSettings.size;
      ctx.globalAlpha = flowOpacity;
    } else if (brushSettings.type === 'watercolor') {
      // Watercolor: Bleeds, transparent layers, soft edges
      ctx.globalAlpha = flowOpacity * 0.25;
      ctx.shadowBlur = 8;
      ctx.shadowColor = ctx.strokeStyle;
      // Create bleeding effect
      const bleedRadius = brushSettings.size * 1.3;
      const gradient = ctx.createRadialGradient(scatterX, scatterY, 0, scatterX, scatterY, bleedRadius);
      gradient.addColorStop(0, ctx.strokeStyle);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(scatterX, scatterY, bleedRadius, 0, Math.PI * 2);
      ctx.fill();
    } else if (brushSettings.type === 'oil') {
      // Oil: Thick, textured, visible strokes
      ctx.lineWidth = brushSettings.size * 1.2;
      ctx.shadowBlur = 2;
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      // Add texture with multiple strokes
      for (let i = 0; i < 2; i++) {
        const offset = (Math.random() - 0.5) * 2;
        ctx.globalAlpha = flowOpacity * (0.8 + Math.random() * 0.2);
        ctx.beginPath();
        ctx.moveTo(drawingState.lastX + offset, drawingState.lastY + offset);
        ctx.lineTo(scatterX + offset, scatterY + offset);
        ctx.stroke();
      }
      ctx.globalAlpha = flowOpacity;
    } else if (brushSettings.type === 'neon') {
      // Neon: Bright electric glow, sharp core
      ctx.shadowBlur = 30;
      ctx.shadowColor = config.glow;
      ctx.globalAlpha = flowOpacity;
      // Outer glow
      ctx.lineWidth = brushSettings.size * 2;
      ctx.globalAlpha = flowOpacity * 0.3;
      ctx.stroke();
      // Inner bright core
      ctx.shadowBlur = 15;
      ctx.lineWidth = brushSettings.size * 0.5;
      ctx.globalAlpha = flowOpacity;
      ctx.stroke();
    } else if (brushSettings.type === 'smoke') {
      // Smoke: Wispy, fades quickly, drifts
      ctx.globalAlpha = flowOpacity * 0.15;
      ctx.shadowBlur = 20;
      ctx.shadowColor = config.glow;
      // Create wispy effect with curves
      const drift = (Math.random() - 0.5) * brushSettings.size * 0.5;
      ctx.bezierCurveTo(
        drawingState.lastX + drift,
        drawingState.lastY,
        scatterX - drift,
        scatterY,
        scatterX,
        scatterY
      );
      // Add particles
      if (Math.random() < 0.2) {
        ctx.globalAlpha = flowOpacity * 0.1;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(scatterX + (Math.random() - 0.5) * brushSettings.size * 2, scatterY + (Math.random() - 0.5) * brushSettings.size * 2, Math.random() * 3 + 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.beginPath();
    ctx.moveTo(drawingState.lastX, drawingState.lastY);
    ctx.lineTo(scatterX, scatterY);
    ctx.stroke();

    // Symmetry mode
    if (showSymmetry) {
      const centerX = width / 2;
      const mirrorX = centerX - (scatterX - centerX);
      ctx.beginPath();
      ctx.moveTo(centerX - (drawingState.lastX - centerX), drawingState.lastY);
      ctx.lineTo(mirrorX, scatterY);
      ctx.stroke();
    }

    // Reset effects
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    setDrawingState(prev => ({ ...prev, lastX: x, lastY: y }));
  }, [drawingState, brushSettings, currentTool, showSymmetry, width]);

  const stopDrawing = useCallback(() => {
    setDrawingState(prev => ({ ...prev, isDrawing: false }));
  }, []);

  // Export canvas
  const exportCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Full size
    const dataUrl = canvas.toDataURL('image/png');

    // Thumbnail
    const thumbCanvas = document.createElement('canvas');
    thumbCanvas.width = 200;
    thumbCanvas.height = 200;
    const thumbCtx = thumbCanvas.getContext('2d');
    if (thumbCtx) {
      thumbCtx.drawImage(canvas, 0, 0, 200, 200);
    }
    const thumbnail = thumbCanvas.toDataURL('image/png');

    onSave(dataUrl, thumbnail);
  }, [onSave]);

  // Expose methods to parent
  useEffect(() => {
    if (canvasRef.current) {
      (canvasRef.current as any).undo = undo;
      (canvasRef.current as any).redo = redo;
      (canvasRef.current as any).clear = clear;
      (canvasRef.current as any).export = exportCanvas;
    }
  }, [undo, redo, clear, exportCanvas]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showPossessedEffect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, repeat: 2 }}
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${BRUSH_CONFIGS[brushSettings.type].glow} 0%, transparent 70%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="border-2 border-[#ffb6d9]/20 rounded-lg shadow-2xl cursor-crosshair"
        style={{
          boxShadow: '0 0 30px rgba(255, 182, 217, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      />
    </div>
  );
});

GothicCanvas.displayName = 'GothicCanvas';
