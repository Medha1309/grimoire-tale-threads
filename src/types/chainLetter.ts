/**
 * Chain Letter Types
 * The "Cursed Chain Letter" collaborative horror writing system
 */

export interface ChainLetter {
  id: string;
  title: string;
  genre: 'horror' | 'thriller' | 'mystery' | 'romance';
  
  // Chain metadata
  originatorId: string;
  originatorName: string;
  currentHolderId: string;
  currentHolderName: string;
  
  // Chain status
  status: 'active' | 'completed' | 'broken' | 'expired';
  chainLength: number; // Number of chapters
  maxChainLength?: number; // Optional limit
  
  // Timing
  createdAt: any;
  lastPassedAt: any;
  expiresAt: any; // 7 days from last pass
  completedAt?: any;
  
  // Content
  chapters: ChainChapter[];
  
  // Stats
  totalWords: number;
  viewCount: number;
  likeCount: number;
  
  // Curse mechanics
  curseLevel: 1 | 2 | 3 | 4 | 5; // Increases with each pass
  cursedBy: string[]; // User IDs who have contributed
}

export interface ChainChapter {
  id: string;
  chainId: string;
  authorId: string;
  authorName: string;
  content: string;
  chapterNumber: number;
  wordCount: number;
  createdAt: any;
  
  // Optional metadata
  timeToWrite?: number; // Milliseconds spent writing
  editCount?: number;
}

export interface ChainInvitation {
  id: string;
  chainId: string;
  chainTitle: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  
  status: 'pending' | 'accepted' | 'declined' | 'expired';
  createdAt: any;
  expiresAt: any; // 48 hours to accept
  respondedAt?: any;
  
  // Preview
  currentChapterCount: number;
  lastChapterPreview: string; // First 200 chars
}

export interface ChainStats {
  userId: string;
  
  // Participation
  chainsStarted: number;
  chainsContributed: number;
  chainsCompleted: number;
  chainsBroken: number; // Chains that expired while in possession
  
  // Writing stats
  totalChaptersWritten: number;
  totalWordsInChains: number;
  averageChapterLength: number;
  fastestChapter: number; // Milliseconds
  
  // Social
  invitationsSent: number;
  invitationsReceived: number;
  invitationsAccepted: number;
  
  // Achievements
  longestChain: number; // Most chapters in a single chain
  curseLevel: number; // Highest curse level achieved
  
  updatedAt: any;
}

export interface ChainGraveyard {
  id: string;
  chainId: string;
  chainTitle: string;
  originatorId: string;
  originatorName: string;
  
  // Death details
  diedAt: any;
  causeOfDeath: 'expired' | 'broken' | 'abandoned';
  lastHolderId: string;
  lastHolderName: string;
  
  // Final stats
  finalChapterCount: number;
  finalWordCount: number;
  totalContributors: number;
  lifespan: number; // Milliseconds from creation to death
  
  // Preserved content
  chapters: ChainChapter[];
}

export type ChainFilterType = 'all' | 'active' | 'completed' | 'graveyard' | 'my-chains';
export type ChainSortType = 'recent' | 'popular' | 'longest' | 'cursed';
