import { Timestamp } from 'firebase/firestore';

/**
 * Story Branching Types
 * Allows stories to branch into multiple paths
 */

export interface StoryBranch {
  id: string;
  projectId: string;
  parentBranchId: string | null; // null for main branch
  branchPointId: string; // Where this branch diverged
  
  title: string;
  description: string;
  content: string; // Full content of this branch
  
  // Metadata
  createdBy: string;
  createdByName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  
  // Stats
  wordCount: number;
  viewCount: number;
  voteCount: number;
  
  // Status
  isActive: boolean;
  isCanonical: boolean; // Main/official branch
}

export interface BranchPoint {
  id: string;
  projectId: string;
  position: number; // Character position in story
  
  title: string;
  description: string;
  question: string; // "What happens next?"
  
  // Branches from this point
  branchIds: string[];
  
  createdBy: string;
  createdAt: Timestamp;
}

export interface BranchVote {
  id: string;
  branchId: string;
  userId: string;
  createdAt: Timestamp;
}

export interface BranchTree {
  branches: StoryBranch[];
  branchPoints: BranchPoint[];
  relationships: BranchRelationship[];
}

export interface BranchRelationship {
  parentId: string;
  childId: string;
  branchPointId: string;
}
