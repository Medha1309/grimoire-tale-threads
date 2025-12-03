// MySpace-style profile types

export interface ProfileCustomization {
  backgroundColor: string;
  backgroundImage?: string;
  textColor: string;
  linkColor: string;
  profileSong?: {
    title: string;
    artist: string;
    url: string;
  };
  aboutMe: string;
  interests: string;
  favoriteQuote: string;
  customCSS?: string;
}

export interface Top8Friend {
  userId: string;
  displayName: string;
  position: number; // 1-8
  addedAt: Date;
}

export interface MySpaceProfile {
  userId: string;
  customization: ProfileCustomization;
  top8Friends: Top8Friend[];
  profileViews: number;
  lastUpdated: Date;
}

export const DEFAULT_CUSTOMIZATION: ProfileCustomization = {
  backgroundColor: '#000000',
  textColor: '#ffffff',
  linkColor: '#ff0000',
  aboutMe: '',
  interests: '',
  favoriteQuote: '',
};

export const MYSPACE_THEMES = {
  crimson: {
    name: 'Crimson Shadow',
    backgroundColor: '#0a0a0a',
    textColor: '#d4d4d4',
    linkColor: '#8b1219',
  },
  gilded: {
    name: 'Gilded Parlour',
    backgroundColor: '#171717',
    textColor: '#d4d4d4',
    linkColor: '#b8941f',
  },
  midnight: {
    name: 'Midnight',
    backgroundColor: '#000000',
    textColor: '#a3a3a3',
    linkColor: '#8a6f17',
  },
  graveyard: {
    name: 'Graveyard Mist',
    backgroundColor: '#262626',
    textColor: '#d4d4d4',
    linkColor: '#730f15',
  },
  haunted: {
    name: 'Haunted Manor',
    backgroundColor: '#0a0a0a',
    textColor: '#a3a3a3',
    linkColor: '#5b0c11',
  },
  classic: {
    name: 'Classic Dark',
    backgroundColor: '#171717',
    textColor: '#d4d4d4',
    linkColor: '#d4af37',
  },
};
