import { Timestamp } from 'firebase/firestore';

export type ChallengeType = 'word_count' | 'time_limit' | 'prompt' | 'constraint' | 'sprint';
export type ChallengeStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface WritingChallenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  difficulty: ChallengeDifficulty;
  
  // Constraints
  prompt?: string;
  genre?: string;
  wordCountMin?: number;
  wordCountMax?: number;
  timeLimit?: number; // minutes
  constraints?: string[]; // ["only dialogue", "no adjectives", etc.]
  
  // Participation
  maxParticipants?: number;
  minParticipants?: number;
  participants: ChallengeParticipant[];
  
  // Timing
  startDate: Timestamp;
  endDate: Timestamp;
  status: ChallengeStatus;
  
  // Rewards
  badge?: string;
  points?: number;
  
  // Creator
  createdBy: string;
  createdByName: string;
  createdAt: Timestamp;
  
  // Stats
  submissionCount: number;
  completionRate: number;
}

export interface ChallengeParticipant {
  userId: string;
  userName: string;
  joinedAt: Timestamp;
  submissionId?: string;
  completed: boolean;
  wordCount?: number;
  timeSpent?: number; // minutes
  score?: number;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  
  title: string;
  content: string;
  wordCount: number;
  timeSpent: number; // minutes
  
  submittedAt: Timestamp;
  
  // Voting/Rating
  votes: number;
  rating: number;
  
  // Metadata
  meetsRequirements: boolean;
  feedback?: string;
}

export interface ChallengeLeaderboard {
  challengeId: string;
  entries: LeaderboardEntry[];
  updatedAt: Timestamp;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  score: number;
  wordCount: number;
  timeSpent: number;
  votes: number;
  submissionId: string;
}

export interface UserChallengeStats {
  userId: string;
  challengesJoined: number;
  challengesCompleted: number;
  totalWords: number;
  totalTimeSpent: number;
  badges: string[];
  totalPoints: number;
  rank: number;
  updatedAt: Timestamp;
}
