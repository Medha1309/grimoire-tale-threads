/**
 * Application configuration
 */

export * from './routes';

export const APP_CONFIG = {
  name: 'GRIMR',
  description: 'Horror writing platform - Write, read, and share tales of terror',
  version: '0.0.1',
} as const;

export const ANIMATION_CONFIG = {
  pageTransition: {
    duration: 0.4,
    ease: 'easeInOut',
  },
  flickerInterval: 3000,
  flickerDuration: 150,
} as const;

export const THEME = {
  colors: {
    primary: '#ffb6d9',
    background: {
      dark: '#000000',
      darker: '#0a0a0a',
      zinc: '#18181b',
    },
    text: {
      primary: '#f4f4f5',
      secondary: '#a1a1aa',
      muted: '#52525b',
    },
  },
  fonts: {
    serif: 'ui-serif',
    parisienne: 'Parisienne',
  },
} as const;
