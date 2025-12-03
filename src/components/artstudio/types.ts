/**
 * Type definitions for Art Studio
 */

export type Tool = 
  | 'brush' 
  | 'eraser' 
  | 'line' 
  | 'rect' 
  | 'ellipse' 
  | 'bucket' 
  | 'text' 
  | 'picker' 
  | 'select';

export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  opacity: number;
  data: ImageData | null;
}

export interface ProjectData {
  version: string;
  layers: Layer[];
  width: number;
  height: number;
  metadata: {
    createdAt: string;
    updatedAt: string;
  };
}

export interface DrawingState {
  isDrawing: boolean;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
}

export interface HistoryState {
  past: ImageData[];
  future: ImageData[];
}
