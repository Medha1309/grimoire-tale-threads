/**
 * Investigation Connection Element
 * Red string connections between evidence
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ConnectionElement, InvestigationElement } from '../../../types/investigationScrapbook';

interface InvestigationConnectionElementProps {
  element: ConnectionElement;
  elements: InvestigationElement[];
  isSelected: boolean;
  zoom: number;
}

export const InvestigationConnectionElement: React.FC<InvestigationConnectionElementProps> = ({
  element,
  elements,
  isSelected,
}) => {
  const startElement = elements.find(el => el.id === element.startElementId);
  const endElement = elements.find(el => el.id === element.endElementId);

  if (!startElement || !endElement) return null;

  // Calculate positions
  const startX = startElement.position.x + (startElement.size.width / 2);
  const startY = startElement.position.y + (startElement.size.height / 2);
  const endX = endElement.position.x + (endElement.size.width / 2);
  const endY = endElement.position.y + (endElement.size.height / 2);

  const getPathD = () => {
    if (element.connectionStyle === 'red-string') {
      // Curved path with slight randomness for organic feel
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;
      const offsetX = (Math.random() - 0.5) * 5;
      const offsetY = (Math.random() - 0.5) * 5;
      return `M ${startX} ${startY} Q ${midX + offsetX} ${midY + offsetY} ${endX} ${endY}`;
    } else {
      // Straight line
      return `M ${startX} ${startY} L ${endX} ${endY}`;
    }
  };

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        zIndex: element.zIndex,
        opacity: element.opacity,
      }}
    >
      {/* Shadow */}
      <motion.path
        d={getPathD()}
        stroke="rgba(0,0,0,0.3)"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={element.connectionStyle === 'dashed' ? '5,5' : undefined}
        style={{
          filter: 'blur(2px)',
          transform: 'translate(2px, 2px)',
        }}
      />

      {/* Main Line */}
      <motion.path
        d={getPathD()}
        stroke={element.color}
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={element.connectionStyle === 'dashed' ? '5,5' : undefined}
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          strokeDashoffset: element.animated ? [0, -10] : 0,
        }}
        transition={{
          pathLength: { duration: 1 },
          strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear' },
        }}
        style={{
          filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,20,147,0.8))' : 'none',
        }}
      />

      {/* Thumbtacks at connection points */}
      {element.connectionStyle === 'red-string' && (
        <>
          <circle
            cx={startX}
            cy={startY}
            r={3}
            fill={element.color}
            stroke="#fff"
            strokeWidth={1}
          />
          <circle
            cx={endX}
            cy={endY}
            r={3}
            fill={element.color}
            stroke="#fff"
            strokeWidth={1}
          />
        </>
      )}

      {/* Arrow head for arrow style */}
      {element.connectionStyle === 'arrow' && (
        <defs>
          <marker
            id={`arrowhead-${element.id}`}
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill={element.color} />
          </marker>
        </defs>
      )}
    </svg>
  );
};
