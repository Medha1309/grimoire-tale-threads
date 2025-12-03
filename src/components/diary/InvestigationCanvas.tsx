/**
 * Investigation Canvas Component
 * Main canvas where elements are rendered and manipulated
 */

import React, { forwardRef, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { InvestigationBoard, ViewportState, InvestigationElement, PhotoElement, GifElement, NoteElement } from '../../types/investigationScrapbook';
import { InvestigationPhotoElement } from './elements/InvestigationPhotoElement';
import { InvestigationGifElement } from './elements/InvestigationGifElement';
import { InvestigationNoteElement } from './elements/InvestigationNoteElement';
import { InvestigationConnectionElement } from './elements/InvestigationConnectionElement';

interface InvestigationCanvasProps {
  board: InvestigationBoard;
  viewport: ViewportState;
  actions: any;
}

export const InvestigationCanvas = forwardRef<HTMLDivElement, InvestigationCanvasProps>(
  ({ board, viewport, actions }, ref) => {
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
      if (viewport.tool === 'pan' || e.button === 1) { // Middle mouse button
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.pan.x, y: e.clientY - viewport.pan.y });
      } else if (viewport.tool === 'select' && e.target === e.currentTarget) {
        // Clicked on empty canvas - clear selection
        actions.clearSelection();
      }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isPanning) {
        actions.setPan({
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        actions.setZoom(viewport.zoom + delta);
      }
    };

    // Sort elements by z-index
    const sortedElements = [...board.elements].sort((a, b) => a.zIndex - b.zIndex);

    const renderElement = (element: InvestigationElement) => {
      if (!element.visible) return null;

      const isSelected = viewport.selectedIds.includes(element.id);

      switch (element.type) {
        case 'photo':
          return (
            <InvestigationPhotoElement
              key={element.id}
              element={element as PhotoElement}
              isSelected={isSelected}
              zoom={viewport.zoom}
              onUpdate={(updates) => actions.updateElement(element.id, updates)}
              onSelect={(addToSelection) => actions.selectElements([element.id], addToSelection)}
            />
          );
        
        case 'gif':
          return (
            <InvestigationGifElement
              key={element.id}
              element={element as GifElement}
              isSelected={isSelected}
              zoom={viewport.zoom}
              onUpdate={(updates) => actions.updateElement(element.id, updates)}
              onSelect={(addToSelection) => actions.selectElements([element.id], addToSelection)}
            />
          );
        
        case 'note':
          return (
            <InvestigationNoteElement
              key={element.id}
              element={element as NoteElement}
              isSelected={isSelected}
              zoom={viewport.zoom}
              onUpdate={(updates) => actions.updateElement(element.id, updates)}
              onSelect={(addToSelection) => actions.selectElements([element.id], addToSelection)}
            />
          );
        
        case 'connection':
          return (
            <InvestigationConnectionElement
              key={element.id}
              element={element as any}
              elements={board.elements}
              isSelected={isSelected}
              zoom={viewport.zoom}
            />
          );
        
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className="w-full h-full relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{
          cursor: isPanning ? 'grabbing' : viewport.tool === 'pan' ? 'grab' : 'default',
        }}
      >
        {/* Canvas Content */}
        <div
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            transform: `translate(${viewport.pan.x}px, ${viewport.pan.y}px) scale(${viewport.zoom})`,
            transformOrigin: '0 0',
          }}
        >
          {/* Grid (optional) */}
          {viewport.zoom > 0.5 && (
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, rgba(255,20,147,0.1) 0px, rgba(255,20,147,0.1) 1px, transparent 1px, transparent 50px),
                  repeating-linear-gradient(90deg, rgba(255,20,147,0.1) 0px, rgba(255,20,147,0.1) 1px, transparent 1px, transparent 50px)
                `,
              }}
            />
          )}

          {/* Render all elements */}
          {sortedElements.map(renderElement)}

          {/* Selection Box (for multi-select drag) */}
          {/* TODO: Implement selection box */}
        </div>

        {/* Keyboard Shortcuts Help */}
        {viewport.selectedIds.length === 0 && board.elements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-2xl p-8 max-w-md">
              <h3 className="text-xl font-serif text-[#ff1493] mb-4 text-center">
                🔍 Investigation Board
              </h3>
              <div className="space-y-2 text-sm text-zinc-400">
                <p>📷 Click "Add Photo" to upload evidence</p>
                <p>🎬 Add GIFs for surveillance footage</p>
                <p>📝 Add notes for investigation thoughts</p>
                <p>🔴 Draw red string connections</p>
                <p className="pt-4 text-xs text-zinc-500">
                  Ctrl+Z to undo • Drag to move • Scroll to zoom
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

InvestigationCanvas.displayName = 'InvestigationCanvas';
