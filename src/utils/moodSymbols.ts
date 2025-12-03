/**
 * Mood Symbol Mapping
 * Poetic symbols for different emotional states
 */

export type MoodType = 'joy' | 'sorrow' | 'calm' | 'unrest' | 'anger' | 'fear' | 'love' | 'loss';

export interface MoodSymbol {
  icon: string;
  label: string;
  color: string;
  description: string;
}

export const MOOD_SYMBOLS: Record<MoodType, MoodSymbol> = {
  joy: {
    icon: '✨',
    label: 'Radiant',
    color: '#ffd700',
    description: 'A moment of light',
  },
  sorrow: {
    icon: '💔',
    label: 'Fractured',
    color: '#6b7280',
    description: 'A cracked heart',
  },
  calm: {
    icon: '🕊️',
    label: 'Serene',
    color: '#93c5fd',
    description: 'Peaceful stillness',
  },
  unrest: {
    icon: '🌿',
    label: 'Thorned',
    color: '#a53e3e',
    description: 'A thorned branch',
  },
  anger: {
    icon: '🔥',
    label: 'Burning',
    color: '#dc2626',
    description: 'Flames within',
  },
  fear: {
    icon: '🦋',
    label: 'Moth',
    color: '#9333ea',
    description: 'A lost thought',
  },
  love: {
    icon: '🌹',
    label: 'Blooming',
    color: '#ec4899',
    description: 'A rose in bloom',
  },
  loss: {
    icon: '🥀',
    label: 'Wilted',
    color: '#78716c',
    description: 'Faded petals',
  },
};

/**
 * Infer mood from text content using keywords
 */
export function inferMoodFromText(text: string): MoodType {
  const lowerText = text.toLowerCase();
  
  // Sorrow keywords
  if (/(sad|cry|tear|hurt|pain|miss|lost|alone|empty|broken)/i.test(lowerText)) {
    return 'sorrow';
  }
  
  // Joy keywords
  if (/(happy|joy|love|wonderful|amazing|beautiful|perfect|smile|laugh)/i.test(lowerText)) {
    return 'joy';
  }
  
  // Anger keywords
  if (/(angry|mad|hate|furious|rage|annoyed|frustrated)/i.test(lowerText)) {
    return 'anger';
  }
  
  // Fear keywords
  if (/(scared|afraid|fear|terrified|anxious|worried|nervous)/i.test(lowerText)) {
    return 'fear';
  }
  
  // Unrest keywords
  if (/(restless|uneasy|disturbed|troubled|unsettled|chaos)/i.test(lowerText)) {
    return 'unrest';
  }
  
  // Loss keywords
  if (/(gone|goodbye|farewell|ended|over|finished|died|death)/i.test(lowerText)) {
    return 'loss';
  }
  
  // Love keywords
  if (/(adore|cherish|treasure|beloved|dear|precious)/i.test(lowerText)) {
    return 'love';
  }
  
  // Default to calm
  return 'calm';
}

/**
 * Get symbol for a mood
 */
export function getMoodSymbol(mood?: string): MoodSymbol {
  if (!mood || !(mood in MOOD_SYMBOLS)) {
    return MOOD_SYMBOLS.calm;
  }
  return MOOD_SYMBOLS[mood as MoodType];
}
