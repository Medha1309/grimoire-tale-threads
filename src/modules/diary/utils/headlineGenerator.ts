/**
 * Diary Module - Headline Generator
 * Auto-generates catchy headlines from entry content
 */

import { DiaryMood } from '../types';

const MOOD_PREFIXES: Record<DiaryMood, string[]> = {
  happy: ['Joyful', 'Bright', 'Cheerful', 'Sunny', 'Radiant'],
  sad: ['Melancholy', 'Quiet', 'Reflective', 'Somber', 'Pensive'],
  calm: ['Peaceful', 'Serene', 'Tranquil', 'Gentle', 'Relaxed'],
  anxious: ['Restless', 'Uneasy', 'Tense', 'Worried', 'Nervous'],
  excited: ['Thrilling', 'Electric', 'Energetic', 'Vibrant', 'Dynamic'],
  thoughtful: ['Contemplative', 'Introspective', 'Mindful', 'Philosophical', 'Meditative'],
};

const GENERIC_TEMPLATES = [
  'A {mood} day',
  '{mood} thoughts',
  'Today was {mood}',
  '{mood} moments',
  'Feeling {mood}',
];

/**
 * Extract key phrases from content
 */
const extractKeyPhrases = (content: string): string[] => {
  // Remove common words
  const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'my', 'your', 'his', 'her', 'its', 'our', 'their']);
  
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.has(word));
  
  // Get word frequency
  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top 3
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word]) => word);
};

/**
 * Generate headline from entry content and mood
 */
export const generateHeadline = (content: string, mood: DiaryMood): string => {
  if (!content || content.trim().length === 0) {
    return 'Untitled Entry';
  }
  
  // Get mood prefix
  const prefixes = MOOD_PREFIXES[mood];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  // Extract key phrases
  const keyPhrases = extractKeyPhrases(content);
  
  if (keyPhrases.length > 0) {
    // Use first key phrase with mood prefix
    const phrase = keyPhrases[0].charAt(0).toUpperCase() + keyPhrases[0].slice(1);
    return `${prefix} ${phrase}`;
  }
  
  // Fallback to generic template
  const template = GENERIC_TEMPLATES[Math.floor(Math.random() * GENERIC_TEMPLATES.length)];
  return template.replace('{mood}', prefix.toLowerCase());
};

/**
 * Generate headline with character limit
 */
export const generateHeadlineWithLimit = (content: string, mood: DiaryMood, maxLength: number = 50): string => {
  const headline = generateHeadline(content, mood);
  
  if (headline.length <= maxLength) {
    return headline;
  }
  
  return headline.substring(0, maxLength - 3) + '...';
};
