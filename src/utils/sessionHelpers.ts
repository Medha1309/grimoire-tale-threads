/**
 * Session Helper Utilities
 */

import { Timestamp } from 'firebase/firestore';
import { ReflectionSession } from '../types/reflectionSession';

// Participant colors for cursors/contributions
const PARTICIPANT_COLORS = [
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#ef4444', // Red
  '#06b6d4', // Cyan
  '#8b5cf6', // Violet
];

/**
 * Generate a unique session ID
 */
export const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Calculate session duration in milliseconds
 */
export const calculateSessionDuration = (
  start: Timestamp,
  end: Timestamp
): number => {
  return end.toMillis() - start.toMillis();
};

/**
 * Check if a session is currently active
 */
export const isSessionActive = (session: ReflectionSession): boolean => {
  if (session.status !== 'active') return false;
  
  const now = Date.now();
  const start = session.scheduledStart.toMillis();
  const end = session.scheduledEnd.toMillis();
  
  return now >= start && now <= end;
};

/**
 * Check if a user can join a session
 */
export const canJoinSession = (
  session: ReflectionSession,
  userId: string
): { canJoin: boolean; reason?: string } => {
  // Already a participant
  if (session.participants.some(p => p.userId === userId)) {
    return { canJoin: true };
  }
  
  // Session is full
  if (session.participants.length >= session.capacity) {
    return { canJoin: false, reason: 'Session is full' };
  }
  
  // Session is cancelled
  if (session.status === 'cancelled') {
    return { canJoin: false, reason: 'Session is cancelled' };
  }
  
  // Session is completed
  if (session.status === 'completed') {
    return { canJoin: false, reason: 'Session has ended' };
  }
  
  // Session hasn't started yet (can join if scheduled)
  if (session.status === 'scheduled') {
    return { canJoin: true };
  }
  
  // Session is active - check if within late join window (15 min)
  if (session.status === 'active' && session.actualStart) {
    const now = Date.now();
    const sessionStart = session.actualStart.toMillis();
    const lateJoinWindow = 15 * 60 * 1000; // 15 minutes
    
    if (now - sessionStart > lateJoinWindow) {
      return { canJoin: false, reason: 'Too late to join (session started >15 min ago)' };
    }
  }
  
  return { canJoin: true };
};

/**
 * Assign a color to a participant based on their index
 */
export const assignParticipantColor = (participantIndex: number): string => {
  return PARTICIPANT_COLORS[participantIndex % PARTICIPANT_COLORS.length];
};

/**
 * Get session status display text
 */
export const getSessionStatusText = (session: ReflectionSession): string => {
  switch (session.status) {
    case 'scheduled':
      return 'Scheduled';
    case 'active':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

/**
 * Get time until session starts (in minutes)
 */
export const getTimeUntilStart = (session: ReflectionSession): number => {
  const now = Date.now();
  const start = session.scheduledStart.toMillis();
  return Math.floor((start - now) / (1000 * 60));
};

/**
 * Get time remaining in session (in minutes)
 */
export const getTimeRemaining = (session: ReflectionSession): number => {
  const now = Date.now();
  const end = session.scheduledEnd.toMillis();
  return Math.max(0, Math.floor((end - now) / (1000 * 60)));
};

/**
 * Format duration for display (e.g., "1h 30m", "45m")
 */
export const formatDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  return `${minutes}m`;
};

/**
 * Format time remaining for timer display (MM:SS)
 */
export const formatTimeRemaining = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Check if session should show urgency warning (< 10 min remaining)
 */
export const shouldShowUrgencyWarning = (session: ReflectionSession): boolean => {
  const remaining = getTimeRemaining(session);
  return remaining > 0 && remaining < 10;
};

/**
 * Get session theme icon (text-based)
 */
export const getThemeIcon = (theme: string): string => {
  switch (theme) {
    case 'reflection':
      return '◈';
    case 'memory':
      return '◆';
    case 'creative':
      return '◇';
    case 'open':
      return '○';
    default:
      return '◈';
  }
};

/**
 * Validate session title
 */
export const validateSessionTitle = (title: string): { valid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  if (title.length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters' };
  }
  if (title.length > 100) {
    return { valid: false, error: 'Title must be less than 100 characters' };
  }
  return { valid: true };
};

/**
 * Validate session capacity
 */
export const validateCapacity = (capacity: number): { valid: boolean; error?: string } => {
  if (capacity < 2) {
    return { valid: false, error: 'Capacity must be at least 2' };
  }
  if (capacity > 8) {
    return { valid: false, error: 'Capacity cannot exceed 8' };
  }
  return { valid: true };
};
