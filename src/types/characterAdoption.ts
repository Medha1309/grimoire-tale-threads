import { Timestamp } from 'firebase/firestore';

export interface Character {
  id: string;
  projectId: string;
  
  name: string;
  role: 'protagonist' | 'antagonist' | 'supporting' | 'minor';
  description: string;
  traits: string[];
  
  // Ownership
  ownerId: string | null; // null if unassigned
  ownerName: string | null;
  assignedAt: Timestamp | null;
  
  // Appearance tracking
  firstAppearance: number; // Chapter/section number
  lastAppearance: number;
  totalAppearances: number;
  
  // Relationships
  relationships: CharacterRelationship[];
  
  // Development
  arc: string; // Character arc description
  goals: string[];
  conflicts: string[];
  
  // Metadata
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Stats
  dialogueCount: number;
  sceneCount: number;
}

export interface CharacterRelationship {
  characterId: string;
  characterName: string;
  type: 'ally' | 'enemy' | 'family' | 'romantic' | 'neutral';
  description: string;
  strength: number; // 1-10
}

export interface CharacterAction {
  id: string;
  characterId: string;
  projectId: string;
  proposalId: string;
  
  type: 'dialogue' | 'action' | 'appearance' | 'development';
  description: string;
  content: string;
  
  // Approval
  needsApproval: boolean;
  approvedBy: string | null;
  approvedAt: Timestamp | null;
  
  submittedBy: string;
  submittedAt: Timestamp;
}

export interface CharacterVeto {
  id: string;
  characterId: string;
  proposalId: string;
  
  reason: string;
  vetoedBy: string; // Character owner
  vetoedAt: Timestamp;
  
  resolved: boolean;
  resolution?: string;
}

export interface CharacterConsistencyCheck {
  characterId: string;
  issues: ConsistencyIssue[];
  lastChecked: Timestamp;
}

export interface ConsistencyIssue {
  type: 'trait_violation' | 'relationship_conflict' | 'arc_deviation' | 'timeline_error';
  severity: 'low' | 'medium' | 'high';
  description: string;
  location: string; // Chapter/section
  suggestion: string;
}

export interface CharacterStats {
  characterId: string;
  projectId: string;
  
  totalWords: number;
  totalDialogue: number;
  totalActions: number;
  totalScenes: number;
  
  emotionalRange: string[]; // emotions expressed
  keyMoments: string[]; // important scenes
  
  updatedAt: Timestamp;
}
