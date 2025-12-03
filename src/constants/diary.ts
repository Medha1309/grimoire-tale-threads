export const MOOD_COLORS = {
  joy: '#ffd700',
  sorrow: '#6b7280',
  calm: '#93c5fd',
  unrest: '#a53e3e',
  secret: '#ffb6d9',
} as const;

export const MOOD_ICONS = {
  joy: '♡',
  sorrow: '✦',
  calm: '◇',
  unrest: '✧',
  secret: '◈',
} as const;

export type Mood = keyof typeof MOOD_COLORS;
