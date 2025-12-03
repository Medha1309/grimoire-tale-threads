/**
 * Chain Session Types - Digital Séance Mode
 * Real-time collaborative writing with Turn Curse mechanics
 */

import { Timestamp } from 'firebase/firestore';

export interface ChainSession {
  id: string;
  title: string;
  description?: string;
  genre?: string;
  
  // Participants
  participants: ChainParticipant[];
  maxParticipants: number;
  
  // Content
  segments: ChainSegment[];
  
  // Status
  status: 'waiting' | 'active' | 'completed';
  
  // Digital Séance features
  currentTurn?: string; // userId of current writer
  turnStartedAt?: Timestamp;
  turnTimeLimit: number; // milliseconds (default 5 minutes = 300000)
  lostParticipants: string[]; // userIds of participants who timed out
  
  // Settings
  isPublic: boolean;
  requireApproval: boolean;
  enableGhostSegments: boolean; // 10% chance of system-injected fragments
  
  // Metadata
  createdBy: string;
  createdByName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastSegmentAt?: Timestamp;
  completedAt?: Timestamp;
}

export interface ChainParticipant {
  userId: string;
  displayName: string;
  joinedAt: Timestamp;
  segmentCount: number;
  isLost?: boolean; // Lost to the Turn Curse
  lostAt?: Timestamp;
  lostReason?: 'timeout' | 'disconnected' | 'abandoned';
}

export interface ChainSegment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
  hash: string; // Content integrity hash (djb2)
  isGhostSegment?: boolean; // System-injected fragment
  ghostFragment?: string; // The 2-3 word fragment if ghost segment
  wordCount: number;
  characterCount: number;
}

// Ghost segment fragments (system-injected)
export const GHOST_FRAGMENTS = [
  'but then',
  'suddenly',
  'never again',
  'in the dark',
  'blood red',
  'whispered softly',
  'too late',
  'behind you',
  'forgotten now',
  'cold hands',
  'the mirror',
  'at midnight',
  'without warning',
  'from below',
  'eyes watching',
] as const;

export type GhostFragment = typeof GHOST_FRAGMENTS[number];

// Turn Curse constants
export const TURN_CURSE_CONFIG = {
  timeLimit: 5 * 60 * 1000, // 5 minutes
  warningThreshold: 60 * 1000, // 1 minute
  ghostSegmentChance: 0.1, // 10%
  distortionStartThreshold: 0.3, // Start visual distortion at 30% time remaining
} as const;
