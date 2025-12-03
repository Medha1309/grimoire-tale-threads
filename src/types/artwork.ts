/**
 * Artwork Types
 * Types for the gothic art studio
 */

export type BrushType = 'blood' | 'charcoal' | 'ink' | 'scratch' | 'decay' | 'ethereal' | 'watercolor' | 'oil' | 'neon' | 'smoke';
export type CanvasSize = 'small' | 'medium' | 'large' | 'portrait' | 'landscape';
export type BlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'difference' | 'lighten' | 'darken';
export type ToolType = 'brush' | 'eraser' | 'fill' | 'eyedropper' | 'smudge' | 'blur' | 'rectangle' | 'circle' | 'line' | 'text';

export interface Artwork {
  id: string;
  userId: string;
  title: string;
  dataUrl: string; // Canvas as base64 image
  thumbnail?: string;
  brushType: BrushType;
  canvasSize: CanvasSize;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  tags?: string[];
  description?: string;
  sharedWith?: string[]; // Email addresses
  isArchived?: boolean;
  archivedAt?: Date;
}

export interface DrawingState {
  isDrawing: boolean;
  lastX: number;
  lastY: number;
}

export interface BrushSettings {
  type: BrushType;
  size: number;
  opacity: number;
  color: string;
  blendMode: BlendMode;
  smoothing: number;
  scatter: number;
  flow: number;
}

export interface CanvasHistory {
  past: ImageData[];
  future: ImageData[];
}

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  blendMode: BlendMode;
  imageData: ImageData | null;
}

export interface ShareArtworkData {
  artworkId: string;
  recipientEmail: string;
  message?: string;
  allowDownload: boolean;
}
