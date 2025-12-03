/**
 * Investigation Scrapbook Types
 * Figma-inspired + Evidence Board aesthetic
 */

export type ElementType = 'photo' | 'gif' | 'note' | 'annotation' | 'connection';

export interface Position {
  x: number; // percentage
  y: number; // percentage
}

export interface Size {
  width: number; // percentage
  height: number; // percentage
}

export interface BaseElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  rotation: number; // degrees
  zIndex: number;
  locked: boolean;
  visible: boolean;
  opacity: number;
  groupId?: string;
}

export interface PhotoElement extends BaseElement {
  type: 'photo';
  imageUrl: string;
  filter?: 'none' | 'sepia' | 'desaturated' | 'vintage' | 'horror' | 'vhs';
  evidenceTag?: string; // "EXHIBIT A", "WITNESS PHOTO"
  timestamp?: Date;
  caption?: string;
  hasThumbTack: boolean;
  thumbTackColor: string;
}

export interface GifElement extends BaseElement {
  type: 'gif';
  gifUrl: string;
  hasVHSEffect: boolean;
  hasTimestamp: boolean;
  surveillanceLabel?: string; // "CAM 01", "SECURITY FOOTAGE"
}

export interface NoteElement extends BaseElement {
  type: 'note';
  content: string;
  noteStyle: 'sticky' | 'typewriter' | 'handwritten' | 'redacted';
  color: string;
  fontSize: number;
}

export interface AnnotationElement extends BaseElement {
  type: 'annotation';
  annotationType: 'circle' | 'arrow' | 'highlight' | 'cross';
  color: string;
  thickness: number;
  targetElementId?: string;
}

export interface ConnectionElement extends BaseElement {
  type: 'connection';
  startElementId: string;
  endElementId: string;
  connectionStyle: 'red-string' | 'arrow' | 'dashed';
  color: string;
  animated: boolean;
}

export interface ElementGroup {
  id: string;
  name: string;
  elementIds: string[];
  locked: boolean;
  collapsed: boolean;
}

export interface Comment {
  id: string;
  position: Position;
  content: string;
  author: string;
  timestamp: Date;
  resolved: boolean;
  replies: Comment[];
}

export interface HistoryState {
  id: string;
  timestamp: Date;
  action: string;
  elements: InvestigationElement[];
}

export type InvestigationElement = 
  | PhotoElement 
  | GifElement 
  | NoteElement 
  | AnnotationElement 
  | ConnectionElement;

export interface InvestigationBoard {
  id: string;
  title: string;
  date: Date;
  thought: string; // Main investigation notes
  elements: InvestigationElement[];
  groups: ElementGroup[];
  comments: Comment[];
  connections: ConnectionElement[];
  backgroundColor: string;
  backgroundTexture: 'cork' | 'wood' | 'concrete' | 'paper';
  zoom: number;
  pan: Position;
}

export interface ViewportState {
  zoom: number;
  pan: Position;
  selectedIds: string[];
  clipboardIds: string[];
  isDragging: boolean;
  isConnecting: boolean;
  tool: 'select' | 'pan' | 'annotate' | 'connect' | 'comment';
}

// Figma-inspired keyboard shortcuts
export const SHORTCUTS = {
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
  DELETE: 'delete',
  DUPLICATE: 'ctrl+d',
  GROUP: 'ctrl+g',
  UNGROUP: 'ctrl+shift+g',
  LOCK: 'ctrl+l',
  HIDE: 'ctrl+h',
  SELECT_ALL: 'ctrl+a',
  ZOOM_IN: 'ctrl+=',
  ZOOM_OUT: 'ctrl+-',
  ZOOM_FIT: 'ctrl+0',
  PAN: 'space',
} as const;

// Evidence tag templates
export const EVIDENCE_TAGS = [
  'EXHIBIT A',
  'EXHIBIT B',
  'EXHIBIT C',
  'WITNESS PHOTO',
  'CRIME SCENE',
  'SURVEILLANCE',
  'EVIDENCE #',
  'CLASSIFIED',
  'CONFIDENTIAL',
  'CASE FILE',
] as const;

// Surveillance camera labels
export const SURVEILLANCE_LABELS = [
  'CAM 01',
  'CAM 02',
  'CAM 03',
  'SECURITY FOOTAGE',
  'CCTV',
  'DOORBELL CAM',
  'DASH CAM',
] as const;
