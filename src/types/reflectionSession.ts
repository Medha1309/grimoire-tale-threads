/**
 * Reflection Session Types
 * Collaborative reflection sessions with real-time scrapbook and co-writing
 */

import { Timestamp } from 'firebase/firestore';

export type SessionStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';
export type SessionTheme = 'reflection' | 'memory' | 'creative' | 'open';
export type ElementType = 'photo' | 'sticker' | 'text' | 'drawing';

export interface ReflectionSession {
  id: string;
  title: string;
  theme: SessionTheme;
  description?: string;
  
  // Host info
  hostId: string;
  hostName: string;
  
  // Scheduling
  scheduledStart: Timestamp;
  scheduledEnd: Timestamp;
  actualStart?: Timestamp;
  actualEnd?: Timestamp;
  
  // Status
  status: SessionStatus;
  capacity: number; // 2-8 participants
  isPublic: boolean;
  
  // Participants
  participants: SessionParticipant[];
  
  // Artifact
  artifact: SessionArtifact;
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface SessionParticipant {
  userId: string;
  userName: string;
  joinedAt: Timestamp;
  isActive: boolean; // Currently online
  cursorColor: string; // Hex color for their cursor
  contributionCount: number; // Number of elements/edits added
}

export interface SessionArtifact {
  scrapbook: ScrapbookElement[];
  writing: WritingContent;
  metadata: ArtifactMetadata;
}

export interface ScrapbookElement {
  id: string;
  type: ElementType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  rotation: number; // Degrees
  zIndex: number;
  
  // Type-specific content
  content: PhotoContent | StickerContent | TextContent | DrawingContent;
  
  // Attribution
  addedBy: string; // userId
  addedByName: string;
  addedAt: Timestamp;
}

export interface PhotoContent {
  url: string;
  filter?: string; // vintage, sepia, noir, etc.
  caption?: string;
}

export interface StickerContent {
  emoji: string;
  scale: number;
}

export interface TextContent {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;
}

export interface DrawingContent {
  paths: DrawingPath[];
  brushSize: number;
  color: string;
}

export interface DrawingPath {
  points: { x: number; y: number }[];
  timestamp: number;
}

export interface WritingContent {
  text: string; // Rich text HTML
  contributors: string[]; // User IDs who contributed
  wordCount: number;
  lastEditedBy?: string;
  lastEditedAt?: Timestamp;
}

export interface ArtifactMetadata {
  sessionDuration: number; // Milliseconds
  totalElements: number;
  totalWords: number;
  participantCount: number;
  completedAt: Timestamp;
}

export interface CursorPosition {
  userId: string;
  userName: string;
  x: number;
  y: number;
  color: string;
  lastUpdate: number; // Timestamp in ms
}

export interface SessionPresence {
  userId: string;
  userName: string;
  isActive: boolean;
  lastSeen: number; // Timestamp in ms
  cursorPosition?: { x: number; y: number };
}

// Filter and sort types
export type SessionFilter = 'upcoming' | 'past' | 'my-sessions';
export type SessionSort = 'date' | 'participants' | 'recent';

// Stats
export interface SessionStats {
  userId: string;
  sessionsHosted: number;
  sessionsAttended: number;
  sessionsCompleted: number;
  totalArtifacts: number;
  totalCollaborators: number;
  favoriteTheme: SessionTheme;
  updatedAt: Timestamp;
}
