import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ToolType } from '../../types/artwork';

interface ShapeToolsProps {
  currentTool: ToolType;
  onSelectTool: (tool: ToolType) => void;
  color: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onShapeComplete: () => void;
}

export const ShapeTools: React.FC<ShapeToolsProps> = ({
  currentTool,
  onSelectTool,
  color,
  canvasRef,
  onShapeComplete,
}) => {
  const [isDrawingShape, setIsDrawingShape] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });

  const shapes: { type: ToolType; icon: string; label: string }[] = [
    { type: 'rectangle', icon: '▭', label: 'Rectangle' },
    { type: 'circle', icon: '○', label: 'Circle' },
    { type: 'line', icon: '╱', label: 'Line' },
  ];

  // Handle shape drawing
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (!['rectangle', 'circle', 'line'].includes(currentTool)) return;

      const rect = canvas.getBoundingClientRect();
      startPos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDrawingShape(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingShape) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      // Redraw canvas (this is simplified - in production you'd save/restore state)
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      if (currentTool === 'rectangle') {
        const width = currentX - startPos.current.x;
        const height = currentY - startPos.current.y;
        ctx.strokeRect(startPos.current.x, startPos.current.y, width, height);
      } else if (currentTool === 'circle') {
        const radius = Math.sqrt(
          Math.pow(currentX - startPos.current.x, 2) +
            Math.pow(currentY - startPos.current.y, 2)
        );
        ctx.beginPath();
        ctx.arc(startPos.current.x, startPos.current.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (currentTool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startPos.current.x, startPos.current.y);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();
      }
    };

    const handleMouseUp = () => {
      if (isDrawingShape) {
        setIsDrawingShape(false);
        onShapeComplete();
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [currentTool, isDrawingShape, color, canvasRef, onShapeComplete]);

  return (
    <div className="bg-zinc-900/50 border border-pink-300/20 rounded-lg p-4">
      <h3 className="font-serif text-pink-300 text-sm mb-3 uppercase tracking-wider">
        Shape Tools
      </h3>
      <div className="space-y-2">
        {shapes.map((shape) => (
          <motion.button
            key={shape.type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTool(shape.type)}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all font-serif text-sm
              ${
                currentTool === shape.type
                  ? 'bg-pink-900/50 border-pink-300/60 text-pink-300 shadow-lg shadow-pink-300/30'
                  : 'bg-black/30 border-pink-300/20 text-pink-300/70 hover:border-pink-300/40'
              }`}
          >
            <span className="text-lg mr-2">{shape.icon}</span>
            {shape.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
