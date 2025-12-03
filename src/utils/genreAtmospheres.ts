/**
 * Genre Atmosphere System
 * Defines visual themes and effects for each genre
 */

export type Genre = 
  | 'horror' 
  | 'thriller' 
  | 'mystery' 
  | 'romance' 
  | 'fantasy'
  | 'sci-fi'
  | 'dystopian'
  | 'paranormal'
  | 'dark-fantasy'
  | 'gothic'
  | 'psychological'
  | 'supernatural';

// Legacy type support
export type LegacyGenre = 'horror' | 'thriller' | 'mystery' | 'romance';

export interface GenreAtmosphere {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
    text: string;
  };
  effects: {
    type: 'flicker' | 'pulse' | 'fog' | 'particles' | 'static' | 'glow' | 'drift' | 'shimmer';
    intensity: 'subtle' | 'moderate' | 'intense';
  };
  ambiance: string; // Description of the mood
}

export const genreAtmospheres: Record<Genre, GenreAtmosphere> = {
  horror: {
    name: 'Horror',
    colors: {
      primary: '#8B0000',
      secondary: '#4a0000',
      accent: '#ff6b6b',
      glow: 'rgba(220, 38, 38, 0.4)',
      text: '#ffcccc',
    },
    effects: {
      type: 'flicker',
      intensity: 'intense',
    },
    ambiance: 'Flickering candlelight in darkness',
  },
  
  thriller: {
    name: 'Thriller',
    colors: {
      primary: '#6b21a8',
      secondary: '#4c1d95',
      accent: '#a78bfa',
      glow: 'rgba(168, 85, 247, 0.4)',
      text: '#e9d5ff',
    },
    effects: {
      type: 'pulse',
      intensity: 'intense',
    },
    ambiance: 'Electric tension and suspense',
  },
  
  mystery: {
    name: 'Mystery',
    colors: {
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#60a5fa',
      glow: 'rgba(59, 130, 246, 0.4)',
      text: '#dbeafe',
    },
    effects: {
      type: 'fog',
      intensity: 'moderate',
    },
    ambiance: 'Misty moonlit investigation',
  },
  
  romance: {
    name: 'Romance',
    colors: {
      primary: '#c2410c',
      secondary: '#ea580c',
      accent: '#fb923c',
      glow: 'rgba(251, 146, 60, 0.4)',
      text: '#fed7aa',
    },
    effects: {
      type: 'glow',
      intensity: 'subtle',
    },
    ambiance: 'Warm candlelit intimacy',
  },
  
  fantasy: {
    name: 'Fantasy',
    colors: {
      primary: '#7c3aed',
      secondary: '#6d28d9',
      accent: '#c4b5fd',
      glow: 'rgba(139, 92, 246, 0.4)',
      text: '#ede9fe',
    },
    effects: {
      type: 'shimmer',
      intensity: 'moderate',
    },
    ambiance: 'Magical sparkles and wonder',
  },
  
  'sci-fi': {
    name: 'Sci-Fi',
    colors: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#22d3ee',
      glow: 'rgba(6, 182, 212, 0.4)',
      text: '#cffafe',
    },
    effects: {
      type: 'static',
      intensity: 'moderate',
    },
    ambiance: 'Neon-lit futuristic interface',
  },
  
  dystopian: {
    name: 'Dystopian',
    colors: {
      primary: '#44403c',
      secondary: '#292524',
      accent: '#78716c',
      glow: 'rgba(120, 113, 108, 0.4)',
      text: '#d6d3d1',
    },
    effects: {
      type: 'static',
      intensity: 'subtle',
    },
    ambiance: 'Decaying industrial wasteland',
  },
  
  paranormal: {
    name: 'Paranormal',
    colors: {
      primary: '#4c1d95',
      secondary: '#5b21b6',
      accent: '#d8b4fe',
      glow: 'rgba(192, 132, 252, 0.4)',
      text: '#f3e8ff',
    },
    effects: {
      type: 'drift',
      intensity: 'moderate',
    },
    ambiance: 'Ethereal spirits drifting',
  },
  
  'dark-fantasy': {
    name: 'Dark Fantasy',
    colors: {
      primary: '#831843',
      secondary: '#9f1239',
      accent: '#fb7185',
      glow: 'rgba(251, 113, 133, 0.4)',
      text: '#fecdd3',
    },
    effects: {
      type: 'pulse',
      intensity: 'moderate',
    },
    ambiance: 'Blood magic and shadows',
  },
  
  gothic: {
    name: 'Gothic',
    colors: {
      primary: '#18181b',
      secondary: '#27272a',
      accent: '#a1a1aa',
      glow: 'rgba(161, 161, 170, 0.4)',
      text: '#e4e4e7',
    },
    effects: {
      type: 'fog',
      intensity: 'intense',
    },
    ambiance: 'Victorian shadows and decay',
  },
  
  psychological: {
    name: 'Psychological',
    colors: {
      primary: '#713f12',
      secondary: '#854d0e',
      accent: '#fbbf24',
      glow: 'rgba(251, 191, 36, 0.4)',
      text: '#fef3c7',
    },
    effects: {
      type: 'pulse',
      intensity: 'subtle',
    },
    ambiance: 'Unsettling mental distortion',
  },
  
  supernatural: {
    name: 'Supernatural',
    colors: {
      primary: '#065f46',
      secondary: '#047857',
      accent: '#6ee7b7',
      glow: 'rgba(52, 211, 153, 0.4)',
      text: '#d1fae5',
    },
    effects: {
      type: 'shimmer',
      intensity: 'moderate',
    },
    ambiance: 'Otherworldly energy',
  },
};

// Helper to get genre atmosphere
export const getGenreAtmosphere = (genre: Genre): GenreAtmosphere => {
  return genreAtmospheres[genre] || genreAtmospheres.horror;
};

// Get all available genres
export const getAllGenres = (): Genre[] => {
  return Object.keys(genreAtmospheres) as Genre[];
};
