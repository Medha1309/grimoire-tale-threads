/**
 * Investigation Note Element
 * Sticky notes, typewriter text, handwritten notes
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NoteElement } from '../../../types/investigationScrapbook';

interface InvestigationNoteElementProps {
  element: NoteElement;
  isSelected: boolean;
  zoom: number;
  onUpdate: (updates: Partial<NoteElement>) => void;
  onSelect: (addToSelection: boolean) => void;
}

export const InvestigationNoteElement: React.FC<InvestigationNoteElementProps> = ({
  element,
  isSelected,
  onUpdate,
  onSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (element.locked || isEditing) return;
    e.stopPropagation();
    onSelect(e.shiftKey);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - (element.position.x * window.innerWidth / 100),
      y: e.clientY - (element.position.y * window.innerHeight / 100),
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || element.locked) return;
    const newX = ((e.clientX - dragStart.x) / window.innerWidth) * 100;
    const newY = ((e.clientY - dragStart.y) / window.innerHeight) * 100;
    onUpdate({
      position: {
        x: Math.max(0, Math.min(100, newX)),
        y: Math.max(0, Math.min(100, newY)),
      },
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleDoubleClick = () => {
    if (!element.locked) {
      setIsEditing(true);
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const getNoteStyle = () => {
    switch (element.noteStyle) {
      case 'sticky':
        return {
          background: element.color,
          fontFamily: 'Arial, sans-serif',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        };
      case 'typewriter':
        return {
          background: '#f5f5dc',
          fontFamily: 'Courier New, monospace',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          borderTop: '2px solid #333',
          borderBottom: '2px solid #333',
        };
      case 'handwritten':
        return {
          background: 'transparent',
          fontFamily: 'cursive',
          padding: '12px',
          color: '#333',
        };
      case 'redacted':
        return {
          background: '#000',
          fontFamily: 'monospace',
          padding: '16px',
          color: '#fff',
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${element.position.x}%`,
        top: `${element.position.y}%`,
        width: `${element.size.width}%`,
        height: `${element.size.height}%`,
        transform: `rotate(${element.rotation}deg)`,
        zIndex: element.zIndex,
        opacity: element.opacity,
        cursor: element.locked ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: element.locked ? 1 : 1.02 }}
    >
      <div
        className="w-full h-full relative"
        style={getNoteStyle()}
      >
        {isEditing ? (
          <textarea
            value={element.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="w-full h-full bg-transparent border-none outline-none resize-none"
            style={{
              fontSize: `${element.fontSize}px`,
              fontFamily: getNoteStyle().fontFamily,
              color: getNoteStyle().color,
            }}
          />
        ) : (
          <p
            className="w-full h-full overflow-auto whitespace-pre-wrap"
            style={{
              fontSize: `${element.fontSize}px`,
            }}
          >
            {element.noteStyle === 'redacted' ? (
              <>
                {element.content.split(' ').map((word, i) => (
                  <span key={i}>
                    {Math.random() > 0.3 ? word : '█'.repeat(word.length)}{' '}
                  </span>
                ))}
              </>
            ) : (
              element.content
            )}
          </p>
        )}

        {/* Selection Border */}
        {isSelected && (
          <motion.div
            className="absolute inset-0 border-4 border-[#ff1493] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ boxShadow: '0 0 20px rgba(255,20,147,0.6)' }}
          />
        )}
      </div>
    </motion.div>
  );
};
