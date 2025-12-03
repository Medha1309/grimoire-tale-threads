/**
 * Diary Headline Generator
 * Auto-generates gothic-themed headlines from entry content
 */

import { DiaryMood } from '../types/diary';

const MOOD_PREFIXES: Record<DiaryMood, string[]> = {
  joy: ['Radiant', 'Bright', 'Gleaming', 'Luminous', 'Blissful'],
  sorrow: ['Melancholy', 'Shadowed', 'Somber', 'Wistful', 'Veiled'],
  calm: ['Serene', 'Tranquil', 'Peaceful', 'Hushed', 'Still'],
  unrest: ['Restless', 'Turbulent', 'Haunted', 'Fevered', 'Tormented'],
  secret: ['Whispered', 'Hidden', 'Veiled', 'Cryptic', 'Shrouded'],
};

/**
 * Extract key phrases from content
 */
const extractKeyPhrases = (content: string): string[] => {
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their']);
  
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);
};

/**
 * Generate headline from entry content and mood
 */
export const generateDiaryHeadline = (content: string, mood: DiaryMood): string => {
  if (!content || content.trim().length === 0) {
    return 'Untitled Confession';
  }
  
  const prefixes = MOOD_PREFIXES[mood];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  const keyPhrases = extractKeyPhrases(content);
  
  if (keyPhrases.length > 0) {
    const phrase = keyPhrases[0].charAt(0).toUpperCase() + keyPhrases[0].slice(1);
    return `${prefix} ${phrase}`;
  }
  
  const templates = [
    `A ${prefix.toLowerCase()} confession`,
    `${prefix} thoughts`,
    `${prefix} whispers`,
    `${prefix} secrets`,
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};
