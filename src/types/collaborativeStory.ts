import { Timestamp } from 'firebase/firestore';

/**
 * Tale Threads: GitHub-Style Collaborative Stories
 * Simplified types focused on version control workflow
 */

// Status types
export type ProjectStatus = 'recruiting' | 'active' | 'archived';
export type ProposalStatus = 'draft' | 'voting' | 'approved' | 'rejected' | 'merged';
export type CoAuthorRole = 'owner' | 'reviewer' | 'contributor';
export type VoteType = 'approve' | 'request_changes' | 'reject';
export type ProposalType = 'new_chapter' | 'edit' | 'character' | 'plot';

// Collaborative Project (like a GitHub repository)
export interface CollaborativeProject {
  id: string;
  linkedStoryId: string; // Reference to Library story
  ownerId: string;
  ownerName: string;
  title: string; // Synced from story
  genre: string; // Synced from story
  description?: string;
  
  coAuthors: CoAuthor[];
  status: ProjectStatus;
  visibility: 'public' | 'private' | 'invite-only';
  currentVersionId: string; // Current version of the story
  
  // Settings
  maxCoAuthors: number; // Default 10
  requireApproval: boolean; // Default true
  maxOpenProposals: number; // Default 10
  votingDuration: number; // Hours, default 48
  
  // Stats
  stats: {
    proposalCount: number;
    mergedCount: number;
    contributorCount: number;
    versionCount: number;
  };
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Co-Author
export interface CoAuthor {
  userId: string;
  displayName: string;
  role: CoAuthorRole;
  joinedAt: Timestamp;
  contributionCount: number; // Merged proposals
}

// Proposal (like a GitHub Pull Request)
export interface Proposal {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  
  title: string;
  description: string;
  type: ProposalType;
  
  // Content
  content: string; // Full proposed content (Markdown)
  baseVersionId: string; // Version this is based on
  
  // Voting system
  status: ProposalStatus;
  votes: Vote[];
  votingEndsAt?: Timestamp; // Set when submitted for voting
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  submittedAt?: Timestamp; // When moved from draft to voting
  mergedAt?: Timestamp;
  mergedBy?: string;
  mergedByName?: string;
  
  // System Override Veto
  vetoedAt?: Timestamp;
  vetoedBy?: string;
  vetoReason?: string;
  
  // Integrity tracking
  metadata?: {
    rebaseCount?: number;
    lastRebasedAt?: Timestamp;
    contentHash?: string;
  };
}

// Vote (like a GitHub review)
export interface Vote {
  id: string;
  proposalId: string;
  voterId: string;
  voterName: string;
  voterRole: CoAuthorRole;
  type: VoteType;
  comment?: string;
  votedAt: Timestamp;
}

// Version (like a GitHub commit)
export interface Version {
  id: string;
  projectId: string;
  versionNumber: number;
  
  content: string; // Full story content at this version
  
  changes: {
    type: 'initial' | 'proposal_merged' | 'direct_edit';
    proposalId?: string;
    authorId: string;
    authorName: string;
    summary: string;
  };
  
  createdAt: Timestamp;
  createdBy: string;
  createdByName: string;
}

// Diff (for comparing versions)
export interface ContentDiff {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber?: number;
}

// Comment (on proposals)
export interface Comment {
  id: string;
  proposalId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}

// Activity (project activity feed)
export interface Activity {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  type: 
    | 'project_created'
    | 'proposal_created'
    | 'proposal_submitted'
    | 'vote_cast'
    | 'proposal_merged'
    | 'proposal_rejected'
    | 'coauthor_joined'
    | 'coauthor_removed'
    | 'comment_added';
  metadata: Record<string, any>;
  createdAt: Timestamp;
}

// Invitation (to join project)
export interface Invitation {
  id: string;
  projectId: string;
  projectTitle: string;
  inviterId: string;
  inviterName: string;
  inviteeEmail: string;
  inviteeId?: string; // Set when user accepts
  role: CoAuthorRole;
  message?: string;
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: Timestamp;
  respondedAt?: Timestamp;
  expiresAt: Timestamp; // 7 days from creation
}

// Vote Summary (for displaying vote status)
export interface VoteSummary {
  totalVotes: number;
  approveCount: number;
  requestChangesCount: number;
  rejectCount: number;
  approvePercent: number;
  rejectPercent: number;
  canMerge: boolean;
  status: 'voting' | 'approved' | 'rejected' | 'needs_votes';
  missingVoters: string[]; // Names of co-authors who haven't voted
}
