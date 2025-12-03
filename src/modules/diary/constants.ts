/**
 * Diary Module - Constants
 * Mood configurations and sticker library
 */

import { DiaryMood, MoodSticker } from './types';

export const MOOD_CONFIG: Record<DiaryMood, { color: string; bg: string; label: string; icon: string }> = {
  happy: { color: '#fbbf24', bg: '#fef3c7', label: 'Happy', icon: '😊' },
  sad: { color: '#60a5fa', bg: '#dbeafe', label: 'Sad', icon: '😢' },
  calm: { color: '#34d399', bg: '#d1fae5', label: 'Calm', icon: '😌' },
  anxious: { color: '#f87171', bg: '#fee2e2', label: 'Anxious', icon: '😰' },
  excited: { color: '#a78bfa', bg: '#ede9fe', label: 'Excited', icon: '🤩' },
  thoughtful: { color: '#94a3b8', bg: '#f1f5f9', label: 'Thoughtful', icon: '🤔' },
};

export const STICKER_LIBRARY: MoodSticker[] = [
  // Emotions
  { id: 'heart', emoji: '❤️', label: 'Heart', category: 'emotion' },
  { id: 'star', emoji: '⭐', label: 'Star', category: 'emotion' },
  { id: 'fire', emoji: '🔥', label: 'Fire', category: 'emotion' },
  { id: 'sparkles', emoji: '✨', label: 'Sparkles', category: 'emotion' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow', category: 'emotion' },
  
  // Weather
  { id: 'sun', emoji: '☀️', label: 'Sunny', category: 'weather' },
  { id: 'cloud', emoji: '☁️', label: 'Cloudy', category: 'weather' },
  { id: 'rain', emoji: '🌧️', label: 'Rainy', category: 'weather' },
  { id: 'snow', emoji: '❄️', label: 'Snowy', category: 'weather' },
  { id: 'thunder', emoji: '⚡', label: 'Stormy', category: 'weather' },
  
  // Activities
  { id: 'coffee', emoji: '☕', label: 'Coffee', category: 'activity' },
  { id: 'book', emoji: '📚', label: 'Reading', category: 'activity' },
  { id: 'music', emoji: '🎵', label: 'Music', category: 'activity' },
  { id: 'game', emoji: '🎮', label: 'Gaming', category: 'activity' },
  { id: 'art', emoji: '🎨', label: 'Art', category: 'activity' },
  
  // Misc
  { id: 'pizza', emoji: '🍕', label: 'Pizza', category: 'misc' },
  { id: 'cake', emoji: '🎂', label: 'Cake', category: 'misc' },
  { id: 'plant', emoji: '🌱', label: 'Plant', category: 'misc' },
  { id: 'moon', emoji: '🌙', label: 'Moon', category: 'misc' },
  { id: 'rocket', emoji: '🚀', label: 'Rocket', category: 'misc' },
];

export const AUTO_SAVE_INTERVAL = 3000; // 3 seconds
export const IDLE_TIMEOUT = 30000; // 30 seconds for easter egg
export const TIMELINE_DAYS = 7; // Show last 7 days in timeline
